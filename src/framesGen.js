"use strict";

//Load GraphicsMagick, mageMagick and Q modules
var fs = require('fs'), gm = require('gm').subClass({ imageMagick: true }), Q = require('Q')

//Init object plugin
var FrameGen = {
	x1: 0,
	x2: 1,
	Y: 0,
	X: 0,
	scaleWidth: 2,
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

// The promise control method for building a synchronous chain with asynchronous methods
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
// sample cote a cote
	// gm(FrameGen.target+"/frame_0.png", "#ffffffff")
	// .append("./src/bar_blue.png","./src/bar_blue.png",true)

FrameGen.buildSampleBlue = function(){
	var sample = gm(10,10);
	console.log("Y ",FrameGen.Y)
	for(var i=0;i<FrameGen.Y;i++){
		sample.append("./src/bar_blue.png",true)
	}
	if(FrameGen.Y!==0){
		sample.write(FrameGen.target+"/sample_blue.png", function (err) {
		  if (err) console.log(err) 
		  else{
		  	console.log(FrameGen.target+"/sample_blue.png created")
		  }
		});
		return FrameGen.target+"/sample_blue.png"
	}
	else{
		return "./src/bar_empty.png";
	}
}

FrameGen.buildSampleRed = function(){
	var sample = gm(10,10);
	console.log("X ",FrameGen.X)
	for(var i=0;i<FrameGen.X;i++){
		sample.append("./src/bar_red.png",true)
	}
	if(FrameGen.X!==0){
		sample.write(FrameGen.target+"/sample_red.png", function (err) {
		  if (err) console.log(err) 
		  else{
		  	console.log(FrameGen.target+"/sample_red.png created")
		  }
		});
		return FrameGen.target+"/sample_red.png"
	}
	else{
		return "./src/bar_empty.png";
	}
}

// Create counter image 
FrameGen.display = function(){
	var q = Q.defer();
	// gm(FrameGen.width, FrameGen.height, "#ffffffff")
 // 	.fontSize(200)
 // 	.fill("#FF0000")
	// .drawText(FrameGen.width/FrameGen.scaleWidth,FrameGen.height/FrameGen.scaleHeight, FrameGen.Y.toString()+":"+FrameGen.x1.toString()+FrameGen.x2.toString())
	// .write(FrameGen.target+"/frame_"+FrameGen.index+".png", function(err){
 //    	if (err){
 //    		FrameGen.stderr += arguments + "\n";
 //    		q.reject(arguments);
 //    	} else{
 //    		console.log(this.outname + ' created');
 //    		FrameGen.stdout += this.outname + ' created\n';
 //    		FrameGen.increment_counter();
 //    		q.resolve();
 //    	}
 //  	});
	var Y =  FrameGen.buildSampleBlue();
	var X = FrameGen.buildSampleRed();
	setTimeout(function(){
		var newfile = gm(FrameGen.width, FrameGen.height, "#ffffffff")
		if(X){
			newfile.append(Y)
		}
		if(Y){
			newfile.append(X)
		}
		// newfile.fontSize(200)
 	// 	newfile.fill("#FF0000")
		// newfile.drawText(FrameGen.width/FrameGen.scaleWidth,FrameGen.height/FrameGen.scaleHeight, FrameGen.Y.toString()+":"+FrameGen.x1.toString()+FrameGen.x2.toString())
		newfile.write(FrameGen.target+"/frame_"+FrameGen.index+".png", function(err){
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
	},500)
	// var Y = FrameGen.buildSampleBlue();
	// 
	// .append()
	// .append(FrameGen.buildSampleBlue())
	// .write(FrameGen.target+"/frame_"+FrameGen.index+".png", function(err){
 //    	if (err){
 //    		FrameGen.stderr += arguments + "\n";
 //    		q.reject(arguments);
 //    	} else{
 //    		console.log(this.outname + ' created');
 //    		FrameGen.stdout += this.outname + ' created\n';
 //    		FrameGen.increment_counter();
 //    		q.resolve();
 //    	}
 //  	});
	return q.promise;
}

// Set <FrameGen> object as module to export
module.exports = FrameGen;