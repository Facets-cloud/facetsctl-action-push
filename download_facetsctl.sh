#!/bin/bash

set -e

ARCH=$(uname -m)
URL=""

if [[ "$ARCH" == "x86_64" ]]; then
  URL="https://facets-cf-templates.s3.amazonaws.com/oclif-tarballs/v3/production/1.0.0/facetsctl-linux-x64.tar.gz"
elif [[ "$ARCH" == "aarch64" ]]; then
  URL="https://facets-cf-templates.s3.amazonaws.com/oclif-tarballs/v3/production/1.0.0/facetsctl-linux-arm64.tar.gz"
else
  echo "Unsupported architecture: $ARCH"
  exit 1
fi

curl -L "$URL" -o facetsctl.tar.gz
mkdir -p facetsctl
tar -xzf facetsctl.tar.gz -C facetsctl --strip-components=1
chmod +x facetsctl/bin/facetsctl
