'use strict';

const { expect } = require('chai');
const {
  scan,
  land,
  move,
  EAST,
  SOUTH,
  WEST,
  NORTH
} = require('../server/rover');

describe('Move', () => {
  const plateauState = scan('10 10');
  const landOnPlateau = land(plateauState);
  const moveRover = move(plateauState);

  it('should increase Y value by 1 when moving N', () => {
    let roverState = landOnPlateau('5 5 N');
    roverState = moveRover(roverState);

    expect(roverState.y).to.equal(6);
  });

  it('should increase X value by 1 when moving E', () => {
    let roverState = landOnPlateau('5 5 E');
    roverState = moveRover(roverState);

    expect(roverState.x).to.equal(6);
  });

  it('should decreate Y value by 1 when moving S', () => {
    let roverState = landOnPlateau('5 5 S');
    roverState = moveRover(roverState);

    expect(roverState.y).to.equal(4);
  });

  it('should decreate X value by 1 when moving W', () => {
    let roverState = landOnPlateau('5 5 W');
    roverState = moveRover(roverState);

    expect(roverState.x).to.equal(4);
  });

  it('should not go below minimum Y boundary', () => {
    let roverState = landOnPlateau('0 0 S');
    roverState = moveRover(roverState);

    expect(roverState.y).to.equal(0);
  });

  it('should not go below minimum X boundary', () => {
    let roverState = landOnPlateau('0 0 W');
    roverState = moveRover(roverState);

    expect(roverState.x).to.equal(0);
  });

  it('should not go above maximum Y boundary', () => {
    let roverState = landOnPlateau('10 10 N');
    roverState = moveRover(roverState);

    expect(roverState.y).to.equal(10);
  });

  it('should not go above maximum X boundary', () => {
    let roverState = landOnPlateau('10 10 E');
    roverState = moveRover(roverState);

    expect(roverState.x).to.equal(10);
  });
});
