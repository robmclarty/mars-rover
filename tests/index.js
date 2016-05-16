'use strict';

const {
  land,
  launch,
  scan,
  outputPosition,
  execCommands
} = require('../server/rover');

const commands = 'RMMMMMMMMM';
let roverState = land('1 3 N');
let plateauState = scan('10 10');
let execRoverCommands = execCommands(plateauState);
roverState = execRoverCommands(roverState)(commands);
roverState = execRoverCommands(roverState)('LMMMLMMMMMRM');
console.log(outputPosition(roverState.x, roverState.y, roverState.dir));
