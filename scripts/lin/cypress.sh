#!/bin/sh
# Script to create a testing ready instance of the containers. That is, the normal devcontainers but a non-persistent database.
docker-compose -f ./docker-compose.test.yml down
docker-compose -f ./docker-compose.test.yml build
docker-compose -f ./docker-compose.test.yml up -d
# After this run: npm run cypress:open