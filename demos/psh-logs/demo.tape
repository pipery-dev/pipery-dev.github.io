Output out/psh-logs-demo.gif

Set Shell "bash"
Set FontSize 16
Set Width 1200
Set Height 650
Set Padding 20
Set TypingSpeed 50ms
Set Theme '{"name":"Pipery","black":"#0C1424","red":"#EF4444","green":"#10B981","yellow":"#F59E0B","blue":"#6366F1","magenta":"#7C3AED","cyan":"#06B6D4","white":"#E5E7EB","brightBlack":"#94A3B8","brightRed":"#EF4444","brightGreen":"#10B981","brightYellow":"#F59E0B","brightBlue":"#6366F1","brightMagenta":"#7C3AED","brightCyan":"#06B6D4","brightWhite":"#F4F7FF","background":"#0C1424","foreground":"#E5E7EB","cursor":"#06B6D4","cursorAccent":"#0C1424","selection":"#1F2A44"}'

Hide
Type `cd workspace && export PATH="$PWD/../fixtures:$PATH" && rm -f pipery.jsonl && clear`
Enter
Show

Type "psh -h"
Enter
Sleep 4s

Type "clear"
Enter
Sleep 500ms

Type "cat step-lint.sh"
Enter
Sleep 1500ms

Type "./step-lint.sh"
Enter
Sleep 1500ms

Type "cat pipery.jsonl | jq ."
Enter
Sleep 2s

Type `echo '{"event":"build","status":"failure","tool":"docker","error":"image pull failed"}' >> pipery.jsonl`
Enter
Sleep 1s

Type `jq 'select(.status == "failure")' pipery.jsonl`
Enter
Sleep 2s

Type "echo 'Full history? open pipery.jsonl in pipery-dashboard.'"
Enter
Sleep 2s
