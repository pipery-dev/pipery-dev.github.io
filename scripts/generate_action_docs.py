#!/usr/bin/env python3
from __future__ import annotations

import base64
import json
import os
import re
import shutil
import sys
import textwrap
import tomllib
from dataclasses import dataclass
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parent.parent
WORKSPACE = ROOT.parent
ORG = os.environ.get("GITHUB_REPOSITORY_OWNER", "pipery-dev")
TOKEN = os.environ.get("GITHUB_TOKEN", "")
FORCE_REMOTE = os.environ.get("PIPERY_FORCE_REMOTE", "").lower() in {"1", "true", "yes"}


@dataclass
class ActionRepo:
    name: str
    title: str
    description: str
    version: str
    action_kind: str
    source_url: str
    docs_path: str
    icon_url: str
    readme: str
    tag: str


def api_json(url: str):
    request = Request(url, headers=api_headers())
    with urlopen(request) as response:
        return json.load(response)


def api_headers():
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "pipery-docs-generator",
    }
    if TOKEN:
        headers["Authorization"] = f"Bearer {TOKEN}"
    return headers


def fetch_text(url: str) -> str:
    request = Request(url, headers=api_headers())
    with urlopen(request) as response:
        return response.read().decode("utf-8")


def discover_local_repos() -> list[Path]:
    return sorted(
        path
        for path in WORKSPACE.iterdir()
        if path.is_dir()
        and re.fullmatch(r"pipery-.+-(ci|cd)", path.name)
        and (path / "README.md").exists()
        and (path / "pipery-action.toml").exists()
    )


def discover_remote_repo_names() -> list[str]:
    repos = api_json(f"https://api.github.com/orgs/{ORG}/repos?per_page=100&type=public")
    names = [
        repo["name"]
        for repo in repos
        if re.fullmatch(r"pipery-.+-(ci|cd)", repo["name"])
    ]
    return sorted(names)


def repo_info(repo: str) -> dict:
    return api_json(f"https://api.github.com/repos/{ORG}/{repo}")


def latest_tag(repo: str) -> str:
    try:
        release = api_json(f"https://api.github.com/repos/{ORG}/{repo}/releases/latest")
        return release["tag_name"]
    except HTTPError as exc:
        if exc.code != 404:
            raise
    tags = api_json(f"https://api.github.com/repos/{ORG}/{repo}/tags?per_page=1")
    if tags:
        return tags[0]["name"]
    return "main"


def remote_file(repo: str, ref: str, path: str) -> str:
    raw_url = f"https://raw.githubusercontent.com/{ORG}/{repo}/{quote(ref)}/{path}"
    return fetch_text(raw_url)


def try_remote_file(repo: str, ref: str, path: str) -> str | None:
    try:
        return remote_file(repo, ref, path)
    except HTTPError as exc:
        if exc.code == 404:
            return None
        raise


def local_repo_to_action(path: Path) -> ActionRepo:
    with (path / "pipery-action.toml").open("rb") as handle:
        meta = tomllib.load(handle)
    readme = (path / "README.md").read_text()
    return build_action(
        name=path.name,
        meta=meta,
        readme=readme,
        tag=f"v{str(meta.get('version', 'main')).split('.')[0]}",
    )


def remote_repo_to_action(repo: str) -> ActionRepo:
    info = repo_info(repo)
    default_branch = info.get("default_branch", "main")
    candidates: list[str] = []
    for ref in (latest_tag(repo), default_branch, "main", "master"):
        if ref and ref not in candidates:
            candidates.append(ref)

    last_missing: tuple[str, str] | None = None
    for ref in candidates:
        meta_text = try_remote_file(repo, ref, "pipery-action.toml")
        if meta_text is None:
            last_missing = (ref, "pipery-action.toml")
            continue

        readme_text = try_remote_file(repo, ref, "README.md")
        if readme_text is None:
            last_missing = (ref, "README.md")
            continue

        meta = tomllib.loads(meta_text)
        return build_action(name=repo, meta=meta, readme=readme_text, tag=ref)

    missing_ref, missing_path = last_missing or (default_branch, "README.md")
    raise HTTPError(
        url=f"https://raw.githubusercontent.com/{ORG}/{repo}/{quote(missing_ref)}/{missing_path}",
        code=404,
        msg=f"Missing {missing_path} for {repo} at refs: {', '.join(candidates)}",
        hdrs=None,
        fp=None,
    )


def build_action(name: str, meta: dict, readme: str, tag: str) -> ActionRepo:
    action_kind = "ci" if name.endswith("-ci") else "cd"
    docs_path = f"/docs/actions/{action_kind}/{name}/"
    icon_url = f"https://raw.githubusercontent.com/{ORG}/{name}/{quote(tag)}/assets/icon.png"
    cleaned_readme = sanitize_readme(rewrite_relative_links(readme, name, tag))
    return ActionRepo(
        name=name,
        title=meta.get("title", name),
        description=meta.get("description", ""),
        version=str(meta.get("version", tag)),
        action_kind=action_kind,
        source_url=f"https://github.com/{ORG}/{name}",
        docs_path=docs_path,
        icon_url=icon_url,
        readme=cleaned_readme,
        tag=tag,
    )


def rewrite_relative_links(markdown: str, repo: str, tag: str) -> str:
    blob_base = f"https://github.com/{ORG}/{repo}/blob/{quote(tag)}/"
    raw_base = f"https://raw.githubusercontent.com/{ORG}/{repo}/{quote(tag)}/"

    def link_repl(match: re.Match[str]) -> str:
        label, target = match.group(1), match.group(2)
        if target.startswith(("http://", "https://", "#", "mailto:", "/")):
            return match.group(0)
        if target.lower().startswith("assets/") and re.search(r"\.(png|svg|jpg|jpeg|gif|webp)$", target, re.I):
            return f"![{label}]({raw_base}{target})" if match.group(0).startswith("![") else f"[{label}]({raw_base}{target})"
        return f"[{label}]({blob_base}{target})"

    pattern = re.compile(r"(!?)\[([^\]]+)\]\(([^)]+)\)")

    def outer(match: re.Match[str]) -> str:
        bang, label, target = match.group(1), match.group(2), match.group(3)
        if target.startswith(("http://", "https://", "#", "mailto:", "/")):
            return match.group(0)
        if bang:
            if target.lower().startswith("assets/"):
                return f"![{label}]({raw_base}{target})"
            return f"![{label}]({blob_base}{target})"
        return f"[{label}]({blob_base}{target})"

    return pattern.sub(outer, markdown)


def sanitize_readme(markdown: str) -> str:
    lines = markdown.strip().splitlines()
    while lines and not lines[0].strip():
        lines.pop(0)
    if lines:
        lines[0] = lines[0].lstrip("\ufeff")
    if lines and lines[0].lstrip().startswith("#"):
        lines.pop(0)
        while lines and not lines[0].strip():
            lines.pop(0)
    return "\n".join(lines).strip() + "\n"


def generate_catalog(actions: list[ActionRepo]) -> str:
    ci = [a for a in actions if a.action_kind == "ci"]
    cd = [a for a in actions if a.action_kind == "cd"]
    lines = [
        "---",
        'title: "Pipery Action Catalog"',
        'description: "Catalog of Pipery CI and CD GitHub Actions, with links to source repositories and release-tag documentation."',
        "---",
        "",
        "# Pipery Action Catalog",
        "",
        "Browse Pipery GitHub Actions by pipeline type. Each entry links to the source repository and its docs page generated from the latest release-tag README.",
        "",
        "## CI Actions",
        "",
        "| Action | Description | Version | Docs | Source |",
        "|---|---|---|---|---|",
    ]
    for action in ci:
        lines.append(
            f"| {action.title} | {action.description} | `{action.tag}` | [Docs]({action.docs_path}) | [GitHub]({action.source_url}) |"
        )
    lines.extend([
        "",
        "## CD Actions",
        "",
        "| Action | Description | Version | Docs | Source |",
        "|---|---|---|---|---|",
    ])
    for action in cd:
        lines.append(
            f"| {action.title} | {action.description} | `{action.tag}` | [Docs]({action.docs_path}) | [GitHub]({action.source_url}) |"
        )
    return "\n".join(lines) + "\n"


def generate_doc_page(action: ActionRepo, weight: int) -> str:
    header = (
        "---\n"
        f'title: "{escape_quotes(action.title)}"\n'
        f'description: "{escape_quotes(action.description)}"\n'
        'type: "docs"\n'
        f"weight: {weight}\n"
        "---\n\n"
        f"# {action.title}\n\n"
        f"- Repository: [`{action.name}`]({action.source_url})\n"
        f"- Release tag: `{action.tag}`\n"
        "- Catalog: [/catalog/](/catalog/)\n\n"
    )
    return header + action.readme.strip() + "\n"


def escape_quotes(value: str) -> str:
    return value.replace('"', '\\"')


def write_text(path: Path, content: str):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content)


def main():
    docs_ci_dir = ROOT / "content/docs/actions/ci"
    docs_cd_dir = ROOT / "content/docs/actions/cd"
    for directory in (docs_ci_dir, docs_cd_dir):
        for child in directory.glob("*.md"):
            child.unlink()

    local_repos = [] if FORCE_REMOTE else discover_local_repos()
    actions = []
    if local_repos:
        actions = [local_repo_to_action(path) for path in local_repos]
    else:
        actions = [remote_repo_to_action(name) for name in discover_remote_repo_names()]

    actions.sort(key=lambda item: (item.action_kind, item.title.lower()))

    for index, action in enumerate([a for a in actions if a.action_kind == "ci"], start=1):
        write_text(docs_ci_dir / f"{action.name}.md", generate_doc_page(action, index))
    for index, action in enumerate([a for a in actions if a.action_kind == "cd"], start=1):
        write_text(docs_cd_dir / f"{action.name}.md", generate_doc_page(action, index))

    catalog_dir = ROOT / "content/catalog"
    if catalog_dir.exists():
        shutil.rmtree(catalog_dir)
    catalog_dir.mkdir(parents=True, exist_ok=True)
    write_text(catalog_dir / "_index.md", generate_catalog(actions))


if __name__ == "__main__":
    try:
        main()
    except (HTTPError, URLError) as exc:
        print(f"generation failed: {exc}", file=sys.stderr)
        sys.exit(1)
