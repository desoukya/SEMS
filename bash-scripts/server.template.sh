#!/bin/sh

cd <app-folder>

export MONGO_URL=mongo-url
export ROOT_URL=app-root-url
export NODE_ENV=development|production

meteor --settings settings.json --port PORT --production
