---
layout: page
title: Wiki
permalink: /wiki/
index: 0
---

# Welcome to the Moosync Wiki

Moosync is an Electron based simple music player with a primary goal to provide a clean and easy interface. Through Moosync you can easily listen to music from your desktop, YouTube or Spotify.

## Features

- Play audio files on your desktop.
- Seamlessly integrate your Spotify and Youtube playlists.
- Add Spotify and Youtube tracks and playlists by URLs.
- Play songs directly from youtube using youtube embed
- Scrobble your tracks on LastFM.
- Get music recommendations directly from Spotify, Youtube and LastFM
- Mix and match songs from different providers in a single playlist
- Easy to use interface
- Customizable theme engine
- Develop own apps on top of Moosync Extension API
- Available on Windows and Linux

## Download latest release

**The latest release can be found under [Releases](https://github.com/Moosync/Moosync/releases) section**

## Known bugs
- **libvips-cpp.so.42 missing** - [Sharp](https://sharp.pixelplumbing.com/), a module required for Moosync to work requires libvips-cpp.so. If this library is missing for you, it will need to be installed manually.
  
  ### Archlinux
  Vips can be installed from [official repo](https://archlinux.org/packages/community/x86_64/libvips/) using
  ```bash
  yay -S libvips
  ```

  ### Ubuntu/Debian
  On Ubuntu and Debian, libvips can be installed using
  ```bash
  apt-get install libvips-dev
  ```

  ### Fedora
  On fedora, libvips can be installed using dnf

  ```bash
  dnf install vips
  ```

  ### Installing manually
  If none of the above methods apply to you, you may try to find libvips for your distro. Or you may build it from source by following [this guide](https://www.libvips.org/install.html)


