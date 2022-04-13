---
layout: page
permalink: /wiki/Publishing-Extensions
---

# Publishing extensions to store

The extension discover feature fetches its data from [https://github.com/Moosync/moosync-exts](https://github.com/Moosync/moosync-exts).  
To add your extension in the store, 

- Fork [moosync-exts](https://github.com/Moosync/moosync-exts) repository from Github
- Clone your forked repo
  ```
  git clone https://github.com/<your-username>/moosync-exts
  ```
- Create a new directory inside the cloned repository. The name of the directory should be the [displayName](/wiki/Develop-Extensions.md#package.json-attributes) of your extension
- Inside the newly created directory, create a new file called ```extension.yml```
  
  ```yml
  name: Display name of your extension
  description: Description of your extension
  url: URL to your github repository or a readme
  logo: URL to logo or path relative to extension.yml
  packageName: Package name of your extension
  release: 
    url: Direct download URL for the latest version
    version: Latest version number in semver format (eg. 1.0.0)
  ```

- Create a pull request

Please drop a message on our [Discord](https://discord.gg/HsbqbRune3) if your pull request is not merged.
