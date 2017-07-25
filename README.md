# Cheese Jokes for Google Assistant

Ask google assistant to tell you a joke about cheese.

## Contributing

Code contribution piece to come. If you have an incredible cheese joke you'd like to share make a pull request.

## Hosting the backend

This project uses firebase, install the cli with:

`npm -i g firebase-tools`

Login to firebase.

`firebase login`

Create a project on the following URL:

`https://console.firebase.google.com`

List your projects in the cli:

`firebase list`

Use the project you just made:

`firebase use --add $(project ID from last step)`

Deploy the backend:

`cd functions`

`npm install`

`cd ..`

`firebase deploy`

Make a note of your function URL.
