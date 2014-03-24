#!/bin/bash

versionStr=${1:-master}

(
  cd ../../
  make build
)

appcfg.py --oauth2 --version=$versionStr update ../
