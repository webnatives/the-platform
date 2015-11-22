#!/usr/bin/env bash

cd server
forever stopall
forever start -w server.js