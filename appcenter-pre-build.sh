#!/usr/bin/env bash
#Replacing Secret Variables from ENV
envsubst < settings.js > .tmp
mv .tmp settings.js
