#!/bin/bash

set -e

# Load environment variables from .env.build
if [ -f .env.build ]; then
  export $(cat .env.build | xargs)
else
  echo ".env.build file not found!"
  exit 1
fi

npm run make
