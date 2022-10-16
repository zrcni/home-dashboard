#!/bin/bash

# Build the app for production environment.

set -e

source ~/.nvm/nvm.sh
# electron setup the project uses fs.rm method, which requires node >14.14 (?)
nvm use 14.18

npm run package
