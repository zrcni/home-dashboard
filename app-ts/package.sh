#!/bin/bash

# Build the app for production environment.

set -e

source ~/.nvm/nvm.sh
# electron setup the project uses fs.rm method, which requires node >14.14 (?)
nvm use 14.18

# Copy bindings that are built on Raspberry Pi 3 
cp -r ./lib/rpi3-sqlite3/lib/binding/napi-v6-linux-glibc-arm \
  ./release/app/node_modules/sqlite3/lib/binding/napi-v6-linux-glibc-arm

npm run package
