#!/bin/bash

set -e

extensions="clj,cljc,cljs"
match_count=0
changed_filenames=$(git diff --name-only --cached)

while IFS="\n" read -r line; do

  for ext in ${extensions//,/ }
  do
    pattern="^(.*\.$ext$)"
    if [[ $line =~ $pattern ]]; then
      match_count=$(($match_count + 1))
    fi
  done

done <<< "$changed_filenames"

if [ ! "$match_count" -gt 0 ]; then
  echo "No files matching extensions $extensions. Skipping pre-commit tests."
  exit 0
fi

cd app && clj -M:test
