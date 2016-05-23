// 'use strict';
//
// const {
//   land,
//   launch,
//   scan,
//   getPosition,
//   sendCommands
// } = require('../server/rover');
//
// const landingState = land('1 3 N');
// const plateauState = scan('10 10');
// const sendRoverCommands = sendCommands(plateauState)(landingState);
//
// let roverState = landingState;
//
// roverState = sendRoverCommands('RMMMMMMMMM');
// console.log(getPosition(roverState));
//
// roverState = sendRoverCommands('LMMMLMMMMMRM');
// console.log(getPosition(roverState));
