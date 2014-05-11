"use strict";

//Load GraphicsMagick, mageMagick and Q modules
var fs = require('fs'), gm = require('gm').subClass({ imageMagick: true }), Q = require('Q')

//Init object plugin
var FrameGen = {};

//Init counter values
var x1 = 0, x2 =0, Y = 0, X=0, index=0;

//Init method, that is the only function to call for getting started
FrameGen.init=function(target,fps,limit){
	this.target = target;
	this.fps = fps;
	this.limit = limit;
	var buffer = this.display();
	for(var i=0;i<limit;i++){
		buffer = buffer.then(this.display);
	}
}

//refresh values 
FrameGen.refresh_counter = function(){
	X++;
	x2++;
	if(x2>9){
		x2=0;x1++;
	}
	if(X==this.fps){
		X=0;
		x1=0;x2=0;
		Y++;
	}
}

FrameGen.display = function(){
	var q = Q.defer();
	this.refresh_counter();
	gm(1600, 900, "#ffffffff")
 	.fontSize(200)
 	.fill("#FF0000")
	.drawText(575, 500, Y.toString()+":"+x1.toString()+x2.toString())
	.write("./test/frame_"+index+".png", function(err){
    	if (err){
    		q.reject(arguments);
    	} else{
    		console.log(this.outname + ' created');
    		q.resolve();
    	}
  	});
	return q.promise;
}

// Set <FrameGen> object as module to export
module.exports = FrameGen;