#!/bin/bash

cd src/content/en/fundamentals/getting-started/codelabs
../../../../../../tools/claat update
cd ../../../../../..

gulp build:codelabs
