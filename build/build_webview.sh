#!/bin/bash
echo '=============================================='
echo "Building Webview started: $(date)"
node build/build_production.js
echo '=============================================='
vue-cli-service build --mode ${1:-production}
echo ''