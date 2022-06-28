# Expo Safari Extension

Test making the iOS Safari extension workflow similar to Expo e.g. HMR, no `ios` folder, etc.

## Features

### No `ios/` Folder

The idea here is to hoist the relevant content outside of the `ios` folder so the user can modify it while leaving the majority of the iOS content in a regenerative state.

> **Warning** this project is currently not using a Config Plugin to generate the iOS project so it is not properly _managed_ yet.

### No `pbxproj` file linking

For this, I've setup the `web-extension/public` folder to be a reference in Xcode. This means Xcode will blindly copy the contents of the folder without verifying them. This enables users to add, remove, modify files without having to tell Xcode each time. This reduces the chance of failure by misconfiguration by a ton.

### Hot Module Reloading

> **Warning** not working.


Arguably the most important part, I haven't gotten this working yet. It appears that Safari may be blocking localhost requests.

```
Refused to load http://localhost:19000/index.bundle?platform=web&dev=true&hot=false because it does not appear in the script-src directive of the Content Security Policy.
```
- Attempted to add to the `manifest.json`
- Attempted to add to the `index.html`
- Attempted to add to the JS response headers

### `manifest.js`

The `manifest.json` is used across a couple different web extension platforms meaning it has values which aren't supported everywhere. Using a `manifest.js` generation script means we can dynamically apply different values based on the build target.

Every time the Xcode project is built, the manifest.json will be regenerated.

## Links

- https://developer.apple.com/documentation/safariservices/safari_web_extensions/running_your_safari_web_extension