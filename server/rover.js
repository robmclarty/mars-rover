'use strict';

const NORTH = 'N';
const EAST = 'E';
const SOUTH = 'S';
const WEST = 'W';
const DIRECTIONS = [NORTH, EAST, SOUTH, WEST];

const LEFT = 'L';
const RIGHT = 'R';
const MOVE = 'M';

// Return a new state that is not in orbit and has the coordinates and direction
// specified in the landing position input, which is a set of 3 characters
// separated by spaces. The first char being the X pos, the second being the Y
// pos, and the third being the initial direction the rover should point in.
const land = str => {
  const landingPos = str.split(' ');

  return {
    x: Number(landingPos[0]),
    y: Number(landingPos[1]),
    dir: Number(DIRECTIONS.indexOf(landingPos[2])),
    inOrbit: false
  };
};

// When the rover takes off from the planet surface, reset all its values and
// set inOrbit to true.
const launch = () => {
  return {
    x: 0,
    y: 0,
    dir: 0,
    inOrbit: true
  };
};

// Scan the surface of the planet for a landing area and return the size of the
// zone within which the rover may safely operate its mission.
// Return an object with maxx and maxy values matching the arguments.
const scan = str => {
  const size = str.split(' ');

  return {
    maxx: Number(size[0]),
    maxy: Number(size[1])
  };
};

// Ping the rover for it's current position.
// Return a string representing the rover's current position as "x y direction".
const outputPosition = (x, y, dirIndex) => {
  return `${ x } ${ y } ${ DIRECTIONS[dirIndex] }`;
};

// Given a direction index, move one cardinal direction to the left (or wrap
// back around to the last direction if at the beginning).
const turnLeft = dirIndex => {
  return dirIndex - 1 < 0 ?
    DIRECTIONS.length - 1 :
    dirIndex - 1;
};

// Given a direction index, move one cardinal direction to the right (or wrap
// back around to the first direction if at the end).
const turnRight = dirIndex => {
  return dirIndex + 1 >= DIRECTIONS.length - 1 ?
    0 :
    dirIndex + 1;
};

// Move in a cardinal direction but stay within the bounds of plateauState.
// If a movement puts the coordinates outside the bounds, then remain in the
// current valid position without moving.
const moveWithin = plateauState => (x, y, dirIndex) => {
  const { maxx, maxy } = plateauState;

  switch (DIRECTIONS[dirIndex]) {
  case NORTH:
    return {
      x,
      y: y + 1 > maxy ? y : y + 1
    };
  case EAST:
    return {
      x: x + 1 > maxx ? x : x + 1,
      y
    };
  case SOUTH:
    return {
      x,
      y: y - 1 <= 0 ? y : y - 1
    };
  case WEST:
    return {
      x: x - 1 <= 0 ? x : x - 1,
      y
    };
  default:
    return { x, y };
  }
};

// Take an input string and execute any legitimate commands, ignoring any that
// are not valid, returning the resultant rover position.
const execCommands = plateauState => roverState => str => {
  const move = moveWithin(plateauState);

  return str.split('').reduce((accState, char) => {
    const { x, y, dir } = accState;

    switch (char) {
    case LEFT:
      return Object.assign(
        accState,
        { dir: turnLeft(dir) }
      );
    case RIGHT:
      return Object.assign(
        accState,
        { dir: turnRight(dir) }
      );
    case MOVE:
      return Object.assign(
        accState,
        move(x, y, dir)
      );
    default: // ignore
      return accState;
    }
  }, roverState);
};

const commands = 'RMMMMMMMMM';
let roverState = land('1 3 N');
let plateauState = scan('10 10');
let execRoverCommands = execCommands(plateauState)(roverState);
roverState = execRoverCommands(commands);
roverState = execRoverCommands('LMMMLMMMMMRM');
console.log(outputPosition(roverState.x, roverState.y, roverState.dir));
