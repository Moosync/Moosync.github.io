---
layout: page
permalink: /wiki/Extension-API
---

# API examples
A moosync extension can be split into 3 parts
- Lifecycle hooks
- Methods
- Events

## Lifecycle hooks
There are 2 optional lifecycle hooks for an extension
- onStarted
- onStopped

### onStarted
```onStarted``` hook is invoked after moosync's [extension host](/wiki/extensions#extension-host) has started or after the extension has been installed.  
This method only signifies that your extension can now communicate with moosync.  
It is recommended to initialize your custom code in this method.

### onStopped
```onStopped``` hook is invoked after moosync's [extension host](/wiki/extensions#extension-host) has stopped or after the extension has been uninstalled.  
It is recommended to destroy all objects and stop all tasks in this method.


## Methods
Your extension is provided with a global constant ```api```.  
For typescript, this can be declared inside your declaration file

```ts
declare const api: import('@moosync/moosync-types').extensionAPI
```

```api``` exposes some methods, namely:
- [openExternalURL](https://moosync.app/docs/interfaces/extensionAPI.html#openExternalURL)
- [registerOAuth](https://moosync.app/docs/interfaces/extensionAPI.html#registerOAuth)
- [addPlaylist](https://moosync.app/docs/interfaces/extensionAPI.html#addPlaylist)
- [addSongsToPlaylist](https://moosync.app/docs/interfaces/extensionAPI.html#addSongsToPlaylist)
- [addSongs](https://moosync.app/docs/interfaces/extensionAPI.html#addSongs)
- [removeSong](https://moosync.app/docs/interfaces/extensionAPI.html#removeSong)
- [getCurrentSong](https://moosync.app/docs/interfaces/extensionAPI.html#getCurrentSong)
- [getPlayerState](https://moosync.app/docs/interfaces/extensionAPI.html#getPlayerState)
- [getQueue](https://moosync.app/docs/interfaces/extensionAPI.html#getQueue)
- [getSongs](https://moosync.app/docs/interfaces/extensionAPI.html#getSongs)
- [getTime](https://moosync.app/docs/interfaces/extensionAPI.html#getTime)
- [getVolume](https://moosync.app/docs/interfaces/extensionAPI.html#getVolume)
- [setSecure](https://moosync.app/docs/interfaces/extensionAPI.html#setSecure)
- [getSecure](https://moosync.app/docs/interfaces/extensionAPI.html#getSecure)
- [getPreferences](https://moosync.app/docs/interfaces/extensionAPI.html#getPreferences)
- [setPreferences](https://moosync.app/docs/interfaces/extensionAPI.html#setPreferences)


## Events
Events can be listened to using [api.on(...)](https://moosync.app/docs/interfaces/extensionAPI.html#on)

List of events:
- ```requestedPlaylists```<font color=red>*</font>
- ```requestedPlaylistSongs```<font color=red>*</font>
- ```oauthCallback```
- ```songQueueChanged```
- ```seeked```
- ```volumeChanged```
- ```playerStateChanged```
- ```songChanged```
- ```preferenceChanged```

<font color=red>*</font> These events require you to return some data from their callbacks

## Documentation
[Documentation for API and models can be found here](https://moosync.app/docs/)

## Examples
[API examples can be found here](https://github.com/Moosync/extension-typescript-template/blob/main/src/extension.ts)
