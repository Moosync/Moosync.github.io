---
layout: page
permalink: /wiki/Develop-Extensions
---

# Creating an extension

## Getting started

It is recommended to write your extensions using [Typescript](https://www.typescriptlang.org/).  
Typescript is Javascript but with strict typechecking which helps in preventing some (but not all) runtime errors.

We will be using [Yarn](https://yarnpkg.com/) in all code snippets below.

## Create a new project

To get started with creating an extension, 

- You may use a [boilerplate / template](https://github.com/Moosync/extension-typescript-template)  
```shell
git clone https://github.com/Moosync/extension-typescript-template.git myExtension
cd myExtension
yarn install
```

- Or you may create a new project from scratch
```shell
yarn init

yarn add @moosync/types  #Contains definitions for Moosync api
```

### package.json attributes
&nbsp;  
Moosync extensions are recognized through specific attributes in ```package.json```

```json
{
  "name": "moosync.extension.starter",
  "version": "1.0.0",
  "description": "A sample extension",
  "icon": "assets/icon.svg",
  "extensionEntry": "dist/index.js",
  "moosyncExtension": true,
  "displayName": "My Extension",
}
```  

Here,
- **name**: Unique package name
- **version**: The version in [semver format](https://semver.org/)
- **description**: A short description 
- **icon**: Icon is displayed when your extensions provides a playlist or song (For example the Youtube icon in image below)  
![Extension icon example](./images/extension_icon_example.png)
- **extensionEntry**: File from which the extension is created
- **moosyncExtension**: true if this package is a moosync extension.
- **displayName**: A human readable name for this extension

A complete example of ```package.json``` can be found [here](https://github.com/Moosync/extension-typescript-template/blob/main/package.json)


## Creating extension descriptor

For the extension to be created, we need to export a default class which contain the extension descriptor.  
The extension descriptor is an object which as 2 methods
- registerPreferences
- create

<details><summary>Typescript</summary>

```ts
import {
  ExtensionData,
  ExtensionFactory,
  ExtensionPreferenceGroup,
  MoosyncExtensionTemplate
} from '@moosync/moosync-types'

export default class MyExtensionData implements ExtensionData {
  extensionDescriptors: ExtensionFactory[] = [new MyExtensionFactory()]
}

class MyExtensionFactory implements ExtensionFactory {
  async registerPreferences(): Promise<ExtensionPreferenceGroup[]> {
    ...
  }

  async create(): Promise<MoosyncExtensionTemplate> {
    ...
  }
}

```

</details>



<details><summary>Javascript</summary>

```js
export default class MyExtensionData {
  extensionDescriptors = [new MyExtensionFactory()]
}

class MyExtensionFactory {
  async registerPreferences() {
    ...
  }

  async create() {
    ...
  }
}

```

</details>


#### registerPreferences()
This method should return an array of preferences which will be displayed in **Settings > Extensions** of Moosync  
Each preference has a "type" from one of the following:
- CheckboxGroup
- DirectoryGroup
- FilePicker
- EditText
- ButtonGroup
- ProgressBar

<details>
<summary>Typescript</summary>


``` typescript
async registerPreferences(): Promise<ExtensionPreferenceGroup[]> {
    return [
      {
        type: 'CheckboxGroup',
        key: 'test_checkbox',
        title: 'Checkbox Group',
        description: 'This is a checkbox',
        items: [
          {
            title: 'this is an example checkbox',
            key: 'checkbox_1',
            enabled: false
          },
          {
            title: 'this is an example checkbox 2',
            key: 'checkbox_2',
            enabled: false
          }
        ]
      },
      {
        type: 'DirectoryGroup',
        key: 'test_dirgroup',
        title: 'Directories',
        description: 'This is a checkbox',
        default: []
      },
      {
        type: 'FilePicker',
        key: 'test_filepicker',
        title: 'Directories',
        description: 'This is a checkbox',
        default: ''
      },
      {
        type: 'EditText',
        key: 'test_editText',
        title: 'Input Field',
        description: 'This is an Input Field',
        default: 'This is test value'
      },
      {
        type: 'ButtonGroup',
        key: 'test_buttongroup',
        title: 'Button Group',
        description: 'This is a Button group',
        items: [
          {
            title: 'Button1',
            key: 'button1',
            lastClicked: 0
          },
          {
            title: 'Button2',
            key: 'button2',
            lastClicked: 0
          },
          {
            title: 'Button3',
            key: 'button3',
            lastClicked: 0
          }
        ]
      },
      {
        type: 'ProgressBar',
        key: 'test_progressBar',
        title: 'ProgressBar',
        description: 'Progress bar that shows progress',
        default: 0
      }
    ]
  }
```

</details>

#### create()
This method is responsible for creating an instance of your extension.  
It should return an object having methods: 
- onStarted()
- onStopped()

<details>
<summary>Typescript</summary>


``` typescript
async create(): Promise<MoosyncExtensionTemplate> {
  return new MyExtension()
}
```

[MyExtension class implementation](#creating-myextension-class)

</details>

## Writing code for extension
### Creating MyExtension class

This class will contain the logic for your extension. You may use the api freely in this class to do whatever you want

<details><summary>Typescript</summary>

```ts
import { MoosyncExtensionTemplate } from '@moosync/moosync-types'

export class MyExtension implements MoosyncExtensionTemplate {
  async onStarted() {
    logger.info('Extension started')
  }

  async onStopped() {
    logger.info('Extension stopped')
  }
}
```
</details>


<details><summary>Javascript</summary>

```js
export class MyExtension {
  async onStarted() {
    logger.info('Extension started')
  }

  async onStopped() {
    logger.info('Extension stopped')
  }
}
```

</details>

