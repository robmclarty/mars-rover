'use strict';

const NORTH = 'N';
const EAST = 'E';
const SOUTH = 'S';
const WEST = 'W';
const ORBIT = 'O';
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
    x: landingPos[0],
    y: landingPos[1],
    dir: DIRECTIONS.indexOf(landingPos[2]),
    inOrbit: false
  };
};

const launch = () => {
  return {
    x: 0,
    y: 0,
    dir: 0,
    inOrbit: true
  };
};

const setPlateauSize = (maxx, maxy) => {
  return {
    maxx,
    maxy
  };
};

// Return a string representing the rover's current position as "x y direction".
const outputPosition = (x, y, dirIndex) => {
  return `${ x } ${ y } ${ DIRECTIONS[dirIndex] }`;
};

const turnLeft = dirIndex => {
  return dirIndex - 1 < 0 ?
    DIRECTIONS.length - 1 :
    dirIndex - 1;
};

const turnRight = dirIndex => {
  return dirIndex + 1 >= DIRECTIONS.length - 1 ?
    0 :
    dirIndex + 1;
};

const moveWithin = plateauState => (x, y, dirIndex) => {
  const { maxx, maxy } = plateauState;

  switch (DIRECTIONS[dirIndex]) {
  case NORTH:
    return {
      x,
      y: y + 1 > maxxy ? y : y + 1
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
    return {
      x,
      y
    };
  }
};

// Take an input string and execute any legitimate commands, ignoring any that
// are not valid, returning the resultant rover position.
const execCommands = plateauState => roverState => str => {
  const move = moveWithin(plateauState);

  return str.split().reduce((accState, char) => {
    const { x, y, dir } = accState;

    switch (char) {
    case LEFT:
      return {
        ...accState,
        dir: turnLeft(dir)
      };
    case RIGHT:
      return {
        ...accState,
        dir: turnRight(dir)
      };
    case MOVE:
      return {
        ...accState,
        ...move(x, y, dir)
      };
    default: // ignore
      return accState;
    }
  }, state);
};

//const commands = 'LMLMLMLMLMM';
//const roverState = launch();
//const plateauState = setPlateauSize(10, 10);
//const execCommandsFor = execCommands(plateauState);
//const execRoverCommands = execCommandsFor(roverState);
//roverState = execRoverCommands(commands);
//execRoverCommands = execCommandsFor(roverState);
//console.log(outputPosition(roverState.x, roverState.y, roverState.dir));
