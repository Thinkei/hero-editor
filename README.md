<p align="center">
  <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/honey-pot_1f36f.png">
</p>

<h1 align="center">
  Hero Editor
</h1>

<p align="center">
  <img src="https://github.com/Thinkei/hero-editor/workflows/CI/badge.svg">
  <img src="https://img.shields.io/badge/node-10.16.0-brightgreen">
  <img src="https://img.shields.io/badge/npm-6.9.0-red">
  <img src="https://img.shields.io/badge/yarn-1.22.4-blue">
</p>

Hero editor is a WYSIWYG built on top of Slate (v0.58.3). It's designed for mobile-first, hence all of the communications from plugins to the editor must go through message channel. This package also includes serializers and renderers for the Slate content.

## Development

- Start bundler
```
yarn dev
```
- Start playground
```
yarn storybook
```

## Plugins

- [x] bold
- [x] italic
- [x] underline
- [x] bulleted list
- [x] numbered list
- [x] mention/placeholder
- [ ] heading
- [ ] table
- [ ] link
