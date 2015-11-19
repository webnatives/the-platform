#!/usr/bin/env bash

cd server
forever stopall
forever start -c nodemon server.js