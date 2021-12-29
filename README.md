# Gulp Starter for Twig Templating

## What is _Gulp Starter_?

Gulp Starter is the twig templating starter pack. It consist of some pre configured gulpjs setting for creating an HTML templates with twig. It was always geting an extra burden of work when I need to start my templating works. So, I planned to create this repo which will consist of all the basic files pre configured. This lets me just clone this repo and start templating 😉.

## Folder Structure

```
|__src
|  |__ fonts
|  |__ img
|  |__ js
|  |__ layout
|  |__ sass
|__ index.twig
|__ .gitignore
|__ gulpfile.js
|__ package.json
|__ README.md


```

To begin first install the npm dependencies

```
npm install
```

To run the engine. It will create the build folder with all the HTML files.

```
npm run serve
```

To build for production

```
npm run prod
```

It is configured with the following.

- gulp-twig2html (Convets all the twig files to HTML)
- gulp-sass (To Compile the SASS/SCSS files)
- postcss (The postcss middleware used to convert css which can be understood by most browsers)
- autoprefixer (Used to add prefix of css as per the browsers)
- browser-sync (Used to create a local server and test the development builds)
- gulp
- gulp-imagemin (To minify the images)
- gulp-postcss (The postcss plugin for gulp)
- gulp-rename (To remanme the twig file to HTML)
- gulp-sass-glob
- gulp-sourcemaps
- gulp-uglify (Minify JS)
- webpack
