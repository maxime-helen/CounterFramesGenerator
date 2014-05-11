CounterFramesGenerator
======================

## Description

Simple node js back end solution for generating frames according to a fps value. It could be useful for testing video streams encode/decode and making sure any frames has been missed.  

## Compatibility

Check out this [page] (https://github.com/aheckmann/gm/wiki/GraphicsMagick-and-ImageMagick-versions) before starting. It lists which OS are supported for using the application. 

## Requirements
 
 * [nodejs] (http://nodejs.org/)
 * [Homebrew] (http://brew.sh/)
 * [npm] (https://www.npmjs.org/)

## Installation
Enter those following commands into the application repository for setting up dependencies:
 * Install [ghostcript](http://www.ghostscript.com/) and [homebrew](http://www.graphicsmagick.org/)
``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
brew install gs graphicsmagick
``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
 * Install [imagemagick](http://www.imagemagick.org/)
``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
brew install imagemagick
``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
 * Install node modules. Check the [package.json](https://github.com/MaximeHelen/CounterFramesGenerator/blob/master/package.json) for more informations
``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
npm install
``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````

## Get started
 * Lunch application with default values. It generates 100 frames sized by 1600*900 for 24 fps in the `./test` repository 
``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
node generate_frames.js
``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
 * You can set your favorite options, everything is explained into the help output:
``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
node generate_frames.js -h
``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
OR
``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
node generate_frames.js --help
``````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
