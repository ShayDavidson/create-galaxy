# Create Galaxy

![galaxy](https://raw.githubusercontent.com/ShayDavidson/create-galaxy/master/public/readme.png)

## [https://creategalaxy.com](creategalaxy.com)

Create awesome procedurally generated galaxies.

## Known Issues

- 2d canvas `globalCompositeOperation` and `filter` are not supported in Safari (mobile and desktop). They are also very slow in Firefox.

### So why not WebGL? 🤔

There was an experiment to make this render on WebGL (using `pixi-js` v5) rather than a 2D canvas. It enabled having blending modes and filters in the unsupported browsers with better performance everywhere. However, there were problems:

- Couldn't get a good-looking gaussian blur filter.
- WebGL blend modes are limited.

My experience with WebGL is limited so it might be achieved afterall. **Contributions to try and get it right are welcome**.

## Development

To run Create Galaxy locally:

1. Clone this repo: `git@github.com:ShayDavidson/create-galaxy.git`.
2. Run `npm install`.
3. Run `npm start`.

The app is built with `create-react-app`.

If you're interested in the procedural generation aspect of the galaxy, check out the [`galaxy.js`](https://github.com/ShayDavidson/create-galaxy/blob/master/src/logic/galaxy.js) file.

## Contributing

Any contribution is welcome!

If you want to add more control over galaxy creation, migrate rendering to WebGL or anything you think is cool, feel free to open a PR.
