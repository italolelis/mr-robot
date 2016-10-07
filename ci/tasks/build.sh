#!/bin/sh

echo "Installing dependencies"
npm install

echo "Compiling the app"
npm run compile

echo "Create zip file"
./create_artifact.sh

echo "Coping the zip file to the artifacts folder"
cd ..
cp app-master/lib/mr-robot.zip artifacts/

