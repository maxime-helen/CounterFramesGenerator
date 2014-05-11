"use strict";

//Load the framesGen module
var framesGen = require("./src/framesGen");

//Load command line parser
var commander = require("commander");

//Command line options
commander
	.version('0.0.1')
	.option('-t, --target <target>', "specify target <target> for saving generated frames","./")
	.option('-f, --fps <fps>', "set the <fps> value",24)
	.option('-l, --limit <limit>', "set the <limit> number of generated frames",100)
	.option('-s, --size <size>', "set the <size> value of generated frames, [width]x[height]","1600x900")

//Add footer to the help output 
var footer = function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ node generate_frames.js --help');
  console.log('    $ node generate_frames.js --version');
  console.log('    $ node generate_frames.js -t ./example -f 30 -l 90');
  console.log('    $ node generate_frames.js --target ./example --fps 30 --limit 90');
};
commander
	.on('-help',footer)
	.on('--help',footer)
	.on('-h',footer) 

//Init the parser
commander.parse(process.argv);

//Stdout of options 
if(commander.target||commander.fps||commander.limit||!program.args.length){
	console.log('  -> path target: %s  ', commander.target);
	console.log('  -> fps:         %j  ', commander.fps);
	console.log('  -> limit:       %j  ', commander.limit);
	console.log('  -> size:        %s  ', commander.size);
}

framesGen.init(commander.target,commander.fps,commander.limit, commander.size);