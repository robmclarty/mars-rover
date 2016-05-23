'use strict';

const { expect } = require('chai');
const {
  land,
  scan,
  sendCommands,
  NORTH,
  EAST,
  SOUTH,
  WEST
} = require('../server/rover');

describe('Commands', () => {
  const plateauState = scan('10 10');
  const landOnPlateau = land(plateauState);
  const plateauCommands = sendCommands(plateauState);

  it('should accept multiple commands', () => {
    const landingState = landOnPlateau('5 5 N');
    const sendRoverCommands = plateauCommands(landingState);
    const roverState = sendRoverCommands('RMMMRRMMMLMMM');

    expect(roverState).to.be.an('object');
    expect(roverState.x).to.equal(5);
    expect(roverState.y).to.equal(2);
    expect(roverState.dir).to.equal(SOUTH);
  });

  it('should ignore invalid commands', () => {
    const landingState = landOnPlateau('5 5 N');
    const sendRoverCommands = plateauCommands(landingState);
    const roverState = sendRoverCommands('RMM*FM RR#MM-+ MLM $MM');

    expect(roverState).to.be.an('object');
    expect(roverState.x).to.equal(5);
    expect(roverState.y).to.equal(2);
    expect(roverState.dir).to.equal(SOUTH);
  });

  it('should remain in position if issued no commands', () => {
    const landingState = landOnPlateau('5 5 N');
    const sendRoverCommands = plateauCommands(landingState);
    const roverState = sendRoverCommands('');

    expect(roverState).to.be.an('object');
    expect(roverState.x).to.equal(5);
    expect(roverState.y).to.equal(5);
    expect(roverState.dir).to.equal(NORTH);
  });
});
