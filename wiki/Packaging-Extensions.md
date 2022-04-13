---
layout: page
permalink: /wiki/Packaging-Extensions
---

# Packaging

Moosync extensions are packed in a zip archive and renamed to ```filename.msox```. This process can be automated using the package [@moosync/packer](https://www.npmjs.com/package/@moosync/packer).  

<br />

- Install @moosync/packer
  ```shell 
  yarn add @moosync/packer
  ```

- Add a script in package.json
  ```json
  "scripts": {
    "pack": "mopack --path ."
  }
  ```

  This will pack all files in the current directory.

By default ```mopack``` will exclude node_modules, .git, *.lock, *.zip, *.msox.  
To customize this include / exclude list

- Add a ```mopack``` key in your package.json
  ```json
  "mopack": {
    "include": ["node_modules", "*.zip"],
    "exclude": ["file_to_exclude", "glob_pattern_to_exclude"]
  }
  ```

The output file with the name ```${name}-${version}.msox``` (name and version are fetched from package.json) can be found in the same directory from where the command was run.
