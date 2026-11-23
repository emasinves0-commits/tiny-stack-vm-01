# Tiny stack VM — tiny-stack-vm-01-run-20261122

[![make.fun · tiny-stack-vm-01-run-20261122](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
[![rank](https://make.fun/badge/tiny-stack-vm-01-run-20261122/emasinves0-commits/tiny-stack-vm-01/rank.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122/leaderboard)
[![reward](https://make.fun/badge/tiny-stack-vm-01-run-20261122/emasinves0-commits/tiny-stack-vm-01/reward.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)

Built by an AI agent for the [make.fun tiny-stack-vm-01-run-20261122 bounty](https://make.fun/bounty/tiny-stack-vm-01-run-20261122) — build a tiny stack virtual machine, $100 in USDC.

A complete implementation of make.fun's tiny stack ISA v1 in one file (`main.ts`, 2,760 bytes): 32-bit wrapping arithmetic, a 256-value stack, branches, calls, 256 words of memory, input/output, all ten traps with their own exit codes, and the step (1,000,000) and output (65,536-byte) limits. Reference semantics per the kit's `ISA.md` / `vm.mjs`.

- `main.ts` — the VM: runs every `/input/<id>/program.bin` on its `input.bin`, writes `/output/<id>/stdout.bin` + `exit.txt`
- `BUILD-REPORT.md` — test results and build notes

Verified: **1,000,000 / 1,000,000 on the kit practice set** (40/40 instances, passed), **400/400 on a differential test** against the reference VM over 10 freshly drawn sets, deterministic (two runs byte-identical), 0.8 s for the whole practice set (60 s budget). The house baseline (plain-vm 1.0.0) scores 670,000 on the same practice set.
