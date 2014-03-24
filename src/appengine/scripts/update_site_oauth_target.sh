#!/bin/bash

versionStr=${1:-master}

appcfg.py --oauth2 --version=$versionStr update ../
