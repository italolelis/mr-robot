#!/bin/sh

echo "Disable strict host check for github"
mkdir -p ~/.ssh/
echo -e "Host *\n\tStrictHostKeyChecking no\n" > ~/.ssh/config

echo "Installing dependencies"
sed -e "s/foo/${NPM_TOKEN}/g" package.json.dist > package.json
npm install babel-cli
npm install

echo "Compiling the app"
npm run compile

echo "Create zip file"
./ci/tasks/create_artifact.sh

echo "Coping the zip file to the artifacts folder"
cd ..
cp app-master/lib/mr-robot.zip artifacts/

