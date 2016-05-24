'use strict';

const NORTH = 'N';
const EAST = 'E';
const SOUTH = 'S';
const WEST = 'W';
const DIRECTIONS = [NORTH, EAST, SOUTH, WEST];

const LEFT = 'L';
const RIGHT = 'R';
const MOVE = 'M';

// TODO: Refactor string parsing out into a higher level module and leave this
// module to deal strictly with numbers.

// Scan the surface of the planet for a landing area and return the size of the
// zone within which the rover may safely operate its mission.
// Return an object with maxx and maxy values matching the arguments.
const scan = str => {
  const input = str.split(' ');
  const inputX = Number(input[0]);
  const inputY = Number(input[1]);

  return {
    maxx: inputX >= 0 ? inputX : 0,
    maxy: inputY >= 0 ? inputY : 0
  };
};

// Return a new state for the rover that is not in orbit and has the coordinates
// and direction specified in the landing position input, which is a set of 3
// characters separated by spaces. The first char being the X pos, the second
// being the Y pos, and the third being the initial direction the rover should
// point in. If no input is provided, or bad input is provided, default value of
// 0 will be used. If outside the boundaries, set to closest coord inside the
// boundaries.
//
// e.g.,
// "1 5 N" would return `{ x: 1, y: 5, dir: N, inOrbit: false }`
// "" would return `{ x: 0, y: 0, dir: N, inOrbit: false }`
// "2 @ E" would return `{ x: 2, y: 0, dir: E, inOrbit: false }`
const land = ({ maxx, maxy }) => str => {
  const input = str.split(' ');
  const inputX = Number(input[0]);
  const inputY = Number(input[1]);
  const inputDir = input[2];
  const isCardinalDirection = DIRECTIONS.indexOf(inputDir) >= 0;
  const dirChar = isCardinalDirection ? inputDir : NORTH;

  // If outside max boundary, set to maximum.
  let landingX = inputX > maxx ? maxx : inputX;
  let landingY = inputY > maxy ? maxy : inputY;

  // If below min boundary, set to 0.
  landingX = landingX >= 0 ? landingX : 0;
  landingY = landingY >= 0 ? landingY : 0;

  return {
    x: landingX,
    y: landingY,
    dir: dirChar,
    inOrbit: false
  };
};

// When the rover takes off from the planet surface, reset all its values and
// set inOrbit to true.
const launch = name => {
  return {
    name,
    x: 0,
    y: 0,
    dir: NORTH,
    inOrbit: true
  };
};

// Ping the rover for it's current position.
// Return a string representing the rover's current position as "x y direction".
const getPosition = ({x = '?', y = '?', dir = '?' }) => {
  return `${ x } ${ y } ${ dir }`;
};

// Given a direction, move one cardinal direction to the left (or wrap
// back around to the last direction if at the beginning).
const turnLeft = dir => {
  const dirIndex = DIRECTIONS.indexOf(dir);
  const newDirIndex = dirIndex - 1 < 0 ?
    DIRECTIONS.length - 1 :
    dirIndex - 1;

  return DIRECTIONS[newDirIndex];
};

// Given a direction, move one cardinal direction to the right (or wrap
// back around to the first direction if at the end).
const turnRight = dir => {
  const dirIndex = DIRECTIONS.indexOf(dir);
  const newDirIndex = dirIndex + 1 < DIRECTIONS.length ?
    dirIndex + 1 :
    0;

  return DIRECTIONS[newDirIndex];
};

// Move in a cardinal direction but stay within the bounds of the plateau (the
// first function's param). If a movement puts the coordinates outside the
// bounds, then remain in the current valid position without moving.
const move = ({ maxx, maxy }) => ({x, y, dir}) => {
  switch (dir) {
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
// are not valid, returning the resultant rover state.
const instruct = plateauState => roverState => str => {
  const moveRover = move(plateauState);

  return str.split('').reduce((prevState, char) => {
    switch (char) {
    case LEFT:
      return Object.assign(
        prevState,
        { dir: turnLeft(prevState.dir) }
      );
    case RIGHT:
      return Object.assign(
        prevState,
        { dir: turnRight(prevState.dir) }
      );
    case MOVE:
      return Object.assign(
        prevState,
        moveRover(prevState)
      );
    default: // ignore
      return prevState;
    }
  }, Object.assign({}, roverState));
};

Object.assign(exports, {
  land,
  launch,
  scan,
  turnLeft,
  turnRight,
  move,
  getPosition,
  instruct,
  NORTH,
  EAST,
  SOUTH,
  WEST,
  DIRECTIONS,
  LEFT,
  RIGHT,
  MOVE
});
