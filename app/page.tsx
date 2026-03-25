export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-[#E5E7EB]">
      <section className="relative overflow-hidden border-b border-[#6366F1]/20 bg-[#0F172A]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.2),_transparent_25%),radial-gradient(circle_at_80%_20%,_rgba(99,102,241,0.2),_transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="mb-8 flex items-center justify-between gap-6">
            <div className="logo-sprite" aria-hidden="true" />
            <span className="rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-4 py-2 text-xs font-semibold text-[#E5E7EB]">
              Beta launch · modern DevOps
            </span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold tracking-tight text-[#6366F1] sm:text-6xl lg:text-7xl">
              Production-grade CI/CD pipelines — ship faster with confidence.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#CBD5E1] sm:text-xl">
              Stop rewriting fragile workflows. Use reusable, secure, observable
              Pipery pipelines and focus on delivering product value.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#pipelines"
                className="inline-flex items-center justify-center rounded-xl bg-[#06B6D4] px-6 py-3 text-base font-semibold text-[#0F172A] transition hover:bg-[#22D3EE]"
              >
                Browse Pipelines
              </a>
              <a
                href="#cta"
                className="inline-flex items-center justify-center rounded-xl border border-[#6366F1]/40 bg-[#1E293B]/80 px-6 py-3 text-base font-semibold text-[#E5E7EB] transition hover:bg-[#334155]"
              >
                Get Started
              </a>
            </div>

            <p className="mt-6 text-sm text-[#94A3B8]">
              Trusted building blocks for modern DevOps teams.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#06B6D4]">
              The Problem
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#E5E7EB] sm:text-4xl">
              CI/CD pipelines should not be this hard.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#CBD5E1]">
              Every team ends up rebuilding the same pipelines: copy-pasted YAML,
              slow and flaky builds, security risks from untrusted workflows, and
              almost no visibility into what is actually going wrong.
            </p>
            <p className="mt-4 text-lg leading-8 text-[#CBD5E1]">
              You do not need another CI tool. You need better pipelines.
            </p>
          </div>

          <div className="rounded-3xl border border-[#6366F1]/30 bg-[#6366F1]/10 p-8 shadow-2xl shadow-[#0f172a]/60 backdrop-blur">
            <ul className="space-y-5 text-[#CBD5E1]">
              {[
                'Copy-pasted YAML across repositories',
                'Slow, flaky builds',
                'Security risks from untrusted workflows',
                'No visibility into performance or failures',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#06B6D4]" />
                  <span className="text-[#CBD5E1]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-[#6366F1]/25 bg-[#111827]/50">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#06B6D4]">
              Meet Pipery
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#E5E7EB] sm:text-4xl">
              The Bitnami of CI/CD pipelines.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#CBD5E1]">
              Pipery provides production-grade, reusable CI/CD pipelines that are
              standardized, versioned, secure, and observable.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: 'Standardized',
                body: 'Consistent pipelines across repos and teams.',
              },
              {
                title: 'Versioned',
                body: 'Stable releases with predictable upgrades.',
              },
              {
                title: 'Secure',
                body: 'Reviewed and maintained to reduce workflow risk.',
              },
              {
                title: 'Observable',
                body: 'Understand performance, failures, and trends.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#6366F1]/20 bg-[#111827]/80 p-6"
              >
                <h3 className="text-lg font-semibold text-[#E5E7EB]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#CBD5E1]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#06B6D4]">
            How it works
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#E5E7EB] sm:text-4xl">
            From YAML chaos to clean pipelines.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#CBD5E1]">
            Replace hundreds of lines of brittle workflow logic with a single,
            trusted pipeline.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-[#6366F1]/25 bg-[#6366F1]/10 p-6">
            <div className="mb-4 text-sm font-medium uppercase tracking-[0.16em] text-[#A5B4FC]">
              Before
            </div>
            <pre className="overflow-x-auto rounded-2xl bg-[#111827] p-5 text-sm leading-7 text-[#CBD5E1]">
              <code>{`# messy, duplicated, hard to maintain
run: npm install && npm test && docker build ...`}</code>
            </pre>
          </div>

          <div className="rounded-3xl border border-[#06B6D4]/25 bg-[#06B6D4]/10 p-6">
            <div className="mb-4 text-sm font-medium uppercase tracking-[0.16em] text-[#7DD3FC]">
              After
            </div>
            <pre className="overflow-x-auto rounded-2xl bg-[#111827] p-5 text-sm leading-7 text-[#CBD5E1]">
              <code>{`jobs:
  build:
    uses: pipery/node-ci@v1`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section className="border-y border-[#6366F1]/25 bg-[#111827]/35">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#06B6D4]">
              Features
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#E5E7EB] sm:text-4xl">
              Everything your pipelines were missing.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                emoji: '🧩',
                title: 'Reusable building blocks',
                body: 'Use the same proven pipelines across all your repositories.',
              },
              {
                emoji: '🔒',
                title: 'Secure by default',
                body: 'Reduce exposure to risky third-party actions and fragile workflow logic.',
              },
              {
                emoji: '📦',
                title: 'Versioned and stable',
                body: 'Pin versions, manage upgrades cleanly, and avoid breaking changes.',
              },
              {
                emoji: '📊',
                title: 'Built-in observability',
                body: 'Track runtime, failures, and trends across your pipelines.',
              },
              {
                emoji: '⚡',
                title: 'Optimized performance',
                body: 'Ship with faster builds, better defaults, and less CI waste.',
              },
              {
                emoji: '✅',
                title: 'Verified pipelines',
                body: 'Tested, documented, and maintained for real-world production use.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-6"
              >
                <div className="text-2xl">{item.emoji}</div>
                <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pipelines" className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#06B6D4]">
              Pipeline catalog
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Start with the essentials.
            </h2>
          </div>
          <a href="#cta" className="text-base font-medium text-[#6366F1] hover:text-[#A5B4FC]">
            Explore all pipelines →
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            'Node.js CI pipeline',
            'Docker build and push',
            'Kubernetes deployment',
            'Terraform workflows',
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[#6366F1]/25 bg-[#1E293B]/70 p-6 text-lg font-medium text-[#E5E7EB]"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-[#6366F1]/25 bg-[#111827]/40">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#06B6D4]">
              Built for real-world teams
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#E5E7EB] sm:text-4xl">
              Built for the teams tired of rewriting pipelines.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#CBD5E1]">
              Pipery is designed for startups and platform teams that want faster,
              safer, and more maintainable CI/CD without rebuilding the same
              workflows over and over again.
            </p>
          </div>
        </div>
      </section>

      <section id="cta" className="mx-auto max-w-5xl px-6 py-24 text-center sm:px-8 lg:px-12">
        <div className="rounded-3xl border border-[#06B6D4]/20 bg-[#06B6D4]/10 px-6 py-14 shadow-2xl shadow-[#0f172a]/40">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#22D3EE]">
            Get started
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#E5E7EB] sm:text-5xl">
            Stop maintaining pipelines.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#CBD5E1]">
            Start shipping faster with Pipery.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="https://pipery.dev"
              className="inline-flex items-center justify-center rounded-xl bg-[#6366F1] px-5 py-3 text-base font-medium text-[#E5E7EB] transition hover:bg-[#7C3AED]"
            >
              Get started for free
            </a>
            <a
              href="mailto:hello@pipery.dev"
              className="inline-flex items-center justify-center rounded-xl border border-[#6366F1]/25 bg-transparent px-5 py-3 text-base font-medium text-[#E5E7EB] transition hover:bg-[#6366F1]/15"
            >
              Talk to us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
