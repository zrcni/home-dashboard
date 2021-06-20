#!/bin/bash

set -e

clj -J-Duser.country=FI -J-Duser.language=en -M:repl:dev
