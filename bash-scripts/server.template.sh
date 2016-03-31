#!/bin/sh

export ROOT_URL=YOUR_ROOT_URL
export NODE_ENV=production
export MONGO_URL=YOUR_MONGODB_URL
export MAIL_URL=smtp://YOUR_SMTP_URL
export METEOR_SETTINGS="$(cat settings.json)"
export PORT=3000

node bundle/main.js
