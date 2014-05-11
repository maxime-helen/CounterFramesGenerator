"use strict";

//Load GraphicsMagick/ImageMagick module
var fs = require('fs'), gm = require('gm').subClass({ imageMagick: true });

//Init object plugin
var FrameGen = {};

//Init counter values
var x1 = 0, x2 =0, Y = 0, X=0, index=0;

//refresh values 
var refresh_counter = function(){
	X++;
	x2++;
	if(x2>9){
		x2=0;x1++;
	}
	if(X==fps){
		X=0;
		x1=0;x2=0;
		Y++;
	}
}
//Init method, that is the only function to call for getting started
FrameGen.init=function(target,fps,limit){
		
 	gm(1600, 900, "#ffffffff")
 	.fontSize(200)
 	.fill("#FF0000")
	.drawText(575, 500, Y.toString()+":"+x1.toString()+x2.toString())
	.write("./test/frame_"+index+".png", function(err){
    	if (err) return console.dir(arguments)
    	console.log(this.outname + ' created');
  		});
	}
module.exports = FrameGen;