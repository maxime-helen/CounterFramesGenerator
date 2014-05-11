"use strict";

//Load GraphicsMagick, mageMagick and Q modules
var fs = require('fs'), gm = require('gm').subClass({ imageMagick: true }), Q = require('Q')

//Init object plugin
var FrameGen = {
	x1: 0,
	x2: 0,
	Y: 0,
	X: 0,
	scaleWidth: 3,
	scaleHeight: 2,
	index: 0,
	flag: true,
	stdout: "Init stdout\n",
	stderr: "Init stderr\n"
};

//Init method, that is the only function to call for getting started
FrameGen.init=function(target,fps,limit,size){
	FrameGen.target = target;
	FrameGen.fps = fps;
	FrameGen.limit = limit;
	var checkSize = size.split('x');
	if (fs.existsSync(target)&&checkSize.length==2){
		FrameGen.width = checkSize[0];FrameGen.height =  checkSize[1];
		FrameGen.display().then(this.control).then(function(){
			fs.writeFile(FrameGen.target+"/stderr.log", FrameGen.stderr, function(err) { //create stderr log
			    if(err) {
			        console.log(err);
			    } else {
			        console.log("Log stderr created");
			    }
			}); 
			fs.writeFile(FrameGen.target+"/stdout.log", FrameGen.stdout, function(err) { //create stderr log
			    if(err) {
			        console.log(err);
			    } else {
			        console.log("Log stdout created");
			    }
			}); 
			console.log('Finishing...');
		}); 
	}
	else{
		console.log("the target path doesn't exist or the size specified is wrong, cannot proceed. Lunch --help for more details");
	}
}

//refresh values 
FrameGen.increment_counter = function(){
	FrameGen.index++;
	FrameGen.X++;
	FrameGen.x2++;
	if(FrameGen.x2>9){
		FrameGen.x2=0;FrameGen.x1++;
	}
	if(FrameGen.X==FrameGen.fps){
		FrameGen.X=0;
		FrameGen.x1=0;FrameGen.x2=0;
		FrameGen.Y++;
	}
	if(FrameGen.index==FrameGen.limit){
		FrameGen.flag=false;
	}
}

// The promise control method for building a synchrnous chain with asynchronous methods
FrameGen.control = function(){
        var deferred = Q.defer();
        if(FrameGen.flag){
                FrameGen.display().then(FrameGen.control).then(function(){
                        deferred.resolve();
                    });
            }
        else{
        	deferred.resolve();
        } 
        return deferred.promise;
    }

// Create counter image 
FrameGen.display = function(){
	var q = Q.defer();
	gm(FrameGen.width, FrameGen.height, "#ffffffff")
 	.fontSize(200)
 	.fill("#FF0000")
	.drawText(FrameGen.width/FrameGen.scaleWidth,FrameGen.height/FrameGen.scaleHeight, FrameGen.Y.toString()+":"+FrameGen.x1.toString()+FrameGen.x2.toString())
	.write(FrameGen.target+"/frame_"+FrameGen.index+".png", function(err){
    	if (err){
    		FrameGen.stderr += arguments + "\n";
    		q.reject(arguments);
    	} else{
    		console.log(this.outname + ' created');
    		FrameGen.stdout += this.outname + ' created\n';
    		FrameGen.increment_counter();
    		q.resolve();
    	}
  	});
	return q.promise;
}

// Set <FrameGen> object as module to export
module.exports = FrameGen;