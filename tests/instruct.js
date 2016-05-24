'use strict';

const { expect } = require('chai');
const {
  land,
  scan,
  instruct,
  NORTH,
  EAST,
  SOUTH,
  WEST
} = require('../app/rover');

describe('Instructions', () => {
  const plateauState = scan('10 10');
  const landOnPlateau = land(plateauState);
  const plateauInstructions = instruct(plateauState);

  it('should accept multiple commands', () => {
    const landingState = landOnPlateau('5 5 N');
    const instructRover = plateauInstructions(landingState);
    const roverState = instructRover('RMMMRRMMMLMMM');

    expect(roverState).to.be.an('object');
    expect(roverState.x).to.equal(5);
    expect(roverState.y).to.equal(2);
    expect(roverState.dir).to.equal(SOUTH);
  });

  it('should ignore invalid commands', () => {
    const landingState = landOnPlateau('5 5 N');
    const instructRover = plateauInstructions(landingState);
    const roverState = instructRover('RMM*FM RR#MM-+ MLM $MM');

    expect(roverState).to.be.an('object');
    expect(roverState.x).to.equal(5);
    expect(roverState.y).to.equal(2);
    expect(roverState.dir).to.equal(SOUTH);
  });

  it('should remain in position if issued no commands', () => {
    const landingState = landOnPlateau('5 5 N');
    const instructRover = plateauInstructions(landingState);
    const roverState = instructRover('');

    expect(roverState).to.be.an('object');
    expect(roverState.x).to.equal(5);
    expect(roverState.y).to.equal(5);
    expect(roverState.dir).to.equal(NORTH);
  });
});
