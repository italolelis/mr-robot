#!/bin/sh

cp .env lib/
cp -r node_modules lib/
cd lib
zip -r mr-robot.zip .

rm -rf node_modules/
rm .env

cd -