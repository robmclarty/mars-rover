'use strict';

const prompt = require('prompt');
const {
  land,
  scan,
  launch,
  move,
  getPosition,
  instruct,
  NORTH,
  EAST,
  SOUTH,
  WEST
} = require('./rover');

const LIST = 'list';
const SCAN = 'scan';
const ROVER = 'rover';
const CREATE = 'create';
const LAND = 'land';
const LAUNCH = 'launch';
const INSTRUCTIONS = 'instructions';

const rovers = [];
const plateau = { maxx: 0, maxy: 0 };

prompt.start();

// Send instructions to rover.
const sendRoverInput = args => {
  const i = rovers.findIndex(r => r.name === args[1]);

  // If a valid index was found, parse the instructions, otherwise ignore them.
  if (i >= 0) {
    switch(args[2]) {
    case LAND:
      const landOnPlateau = land(plateau);
      Object.assign(rovers[i], landOnPlateau(`${ args[3] } ${ args[4] } ${ args[5] }`));
    case INSTRUCTIONS:
      const instructRover = instruct(plateau)(rovers[i]);
      Object.assign(rovers[i], instructRover(`${ args[3] }`));
    }
  }
};

const roverStats = rover => {
  const landingStatus = rover.inOrbit ? 'in orbit' : 'on Mars';

  return `Rover ${ rover.name } @ ${ getPosition(rover) } ${ landingStatus }`;
};

// Process user input to determine what actions to take.
const processInput = str => {
  const input = str.split(' ');
  const subject = input[0];

  // e.g., "plateau 5 5"
  if (subject === SCAN) {
    Object.assign(plateau, scan(`${ input[1] } ${ input[2] }`));

    return `Plateau scanned with dimensions ${ input[1] } ${ input[2] }\n`;
  }

  // e.g., "launch rover1"
  if (subject === LAUNCH) {
    const i = rovers.findIndex(rover => rover.name === input[1]);

    // If there is an existing rover with that name, update it's state,
    // otherwise launch a new rover into space.
    if (i >= 0) {
      rovers[i] = launch(input[1]);
    } else {
      rovers.push(launch(input[1]));
    }

    return `Launched new rover "${ input[1] }"\n`;
  }

  // e.g., "rover rover1 land 5 3 N" or
  // "rover rover1 instructions LMMMRMMMLLMM"
  if (subject === ROVER) {
    sendRoverInput(input);

    return rovers.reduce((output, rover) => {
      return `${ output }${ roverStats(rover) }\n`;
    }, '');
  }

  // e.g., "list"
  if (subject === LIST) {
    let output = `Plateau: ${ plateau.maxx || '?' } ${ plateau.maxy || '?' }\n\n`;
    output += 'Available rovers:\n';
    rovers.forEach(rover => output += `${ roverStats(rover) }\n`);

    return output;
  }

  // If no valid command was matched, return an error message.
  return 'invalid input\n';
};

const onError = err => {
  console.log(err);
  return 1;
};

// Prompt the user and wait for instructions.
// Entering "quit" or "q" will stop the program.
const getInstructions = () => {
  prompt.get(['input'], (err, result) => {
    if (err) return onErr(err);
    if (result.input === 'quit' || result.input === 'q') return 1;

    // Print the results of the processed input to the console.
    console.log(processInput(result.input));

    getInstructions();
  });
};

getInstructions();
