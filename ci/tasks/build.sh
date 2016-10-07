#!/bin/sh

echo "Disable strict host check for github"
mkdir -p ~/.ssh/
cp ./ci/config ~/.ssh/

echo "Installing dependencies"
sed -e "s/foo/${NPM_TOKEN}/g" package.json.dist > package.json
npm install babel-cli
npm install rimraf
npm install

echo "Creating environment variables"
sed -i -e "s/slack-webhook/${SLACK_WEBHOOK}/g" .env.dist
sed -i -e "s/slack-channel/${SLACK_CHANNEL}/g" .env.dist
sed -i -e "s/weather-apikey/${WEATHER_API_KEY}/g" .env.dist
sed -i -e "s/api-v2-url/${API_V2_URL}/g" .env.dist
sed -i -e "s/weather-url/${WEATHER_URL}/g" .env.dist
sed -i -e "s/client-id/${CLIENT_ID}/g" .env.dist
sed -i -e "s/client-secret/${CLIENT_SECRET}/g" .env.dist
sed -i -e "s/test-country/${TEST_COUNTRY}/g" .env.dist

cp .env.dist .env

echo "Compiling the app"
npm run compile

echo "Create zip file"
./ci/tasks/create_artifact.sh

echo "Coping the zip file to the artifacts folder"
cd ..
cp app-master/lib/mr-robot.zip artifacts/
