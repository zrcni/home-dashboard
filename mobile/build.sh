#!/bin/bash

set -e

clj -m krell.main -v -co build.edn -O advanced -c

cd android && ./gradlew assembleRelease
