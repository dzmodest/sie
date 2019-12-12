# SIE
Simple Image Editor (JS)

## Features:
This script was made by a request, thus the editor has only 2 main functions: add text, add image (+brush), however all other functions can be easily implemented, beside that here some other features
- Simple to use
- Undo, Redo
- Font Preview
- Shortkeys (Ctrl+Z, Ctrl+Shift+Z, DEL)
- Can start from an image or from scratch
- 40 Instagram Filters

## Behind The Scenes:
SIE uses [Fabric.js Javascript Canvas Library](http://fabricjs.com/)

## Usage:
Just make sure to include all the required js files
```
js/editor.js is for fabricjs functions
js/controls.js is for some controls functions
js/filterous.min.js is required for instagram filters
js/jquery.menu.js is required for the menu bar (windows like)
```
##### IMPORTANT:
index.html have some inline js that are also required

## How to add a font:
1. Edit css/fonts.css and import your font
2. Edit js/editors.js search for ```var fonts =``` and add your font-family to the array

# Contributors
made with :heart: by [abdelhafidh.com](http://abdelhafidh.com) for YALAGROUP

# License
Simple Image Editor is released under [General Public License v3.0](https://github.com/dzmodest/sie/blob/master/LICENSE).
