#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: install-quirk-skills.sh <target-repo-path> [source-repo-path]

Copies the quirk skills bundle into <target-repo-path>.
If source-repo-path is omitted, the script uses the directory containing this script.
EOF
}

if [[ $# -lt 1 || $# -gt 2 ]]; then
  usage
  exit 1
fi

target_repo="$1"
if [[ $# -eq 2 ]]; then
  source_repo="$2"
else
  script_dir="$(CDPATH= cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
  source_repo="$(CDPATH= cd -- "$script_dir/.." && pwd)"
fi

copy_path() {
  local src="$1"
  local dst="$2"
  if [[ -e "$src" ]]; then
    rm -rf "$dst"
    mkdir -p "$(dirname -- "$dst")"
    cp -a "$src" "$dst"
  fi
}

mkdir -p "$target_repo"
copy_path "$source_repo/.agents/skills" "$target_repo/.agents/skills"
copy_path "$source_repo/.claude/skills" "$target_repo/.claude/skills"
copy_path "$source_repo/docs/agents" "$target_repo/docs/agents"
copy_path "$source_repo/docs/adr/README.md" "$target_repo/docs/adr/README.md"
copy_path "$source_repo/CONTEXT.md" "$target_repo/CONTEXT.md"
copy_path "$source_repo/skills-lock.json" "$target_repo/skills-lock.json"

echo "Installed quirk Skills into $target_repo"
