# Expo Safari Extension

Test making the iOS Safari extension workflow similar to Expo e.g. HMR, no `ios` folder, etc.

This is reference work to help improve the [Safari Extension Expo Config Plugin](https://github.com/andrew-levy/react-native-safari-extension).

## Features

### Static folder

[Refer to the local README](./web-extension/README.md)

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
- Attempted to add to the `manifest.json` under random permissions.
- Attempted to add to the [`index.html`](https://github.com/EvanBacon/expo-safari-extension-test/blob/7515b8e673dcad909cc6181471395cf870e002ff/web-extension/public/index.html#L7-L11).
- Attempted to add to the [JS response headers](https://github.com/EvanBacon/expo-safari-extension-test/blob/7515b8e673dcad909cc6181471395cf870e002ff/patches/metro%2B0.67.0.patch#L22).

#### `web-extension/public/index.html`

This is setup to use `react-native-web` via Expo CLI. 

The script tag uses [experimental Expo Metro web](https://github.com/expo/expo/pull/17927):
```
http://localhost:19000/index.bundle?platform=web&dev=true&hot=false
```

You can change it to `https://localhost:19006/static/js/bundle.js` to use Expo Webpack.

Start the dev server with `expo start --web`. This won't load because it appears to be blocked by Safari. You can open up desktop Safari and navigate to: `Develop > Simulator > webext -- Extension Popup Page -- **` then reloading to see the error.

### `manifest.js`

The `manifest.json` is used across a couple different web extension platforms meaning it has values which aren't supported everywhere. Using a `manifest.js` generation script means we can dynamically apply different values based on the build target.

Every time the Xcode project is built, the manifest.json will be regenerated.

## Links

- https://developer.apple.com/documentation/safariservices/safari_web_extensions/running_your_safari_web_extension