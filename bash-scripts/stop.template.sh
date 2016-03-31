#!/bin/sh

kill -9 `ps ax | grep node | awk '{print $1}'` && forever stopall
