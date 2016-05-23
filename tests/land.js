'use strict';

const { expect } = require('chai');
const {
  land,
  scan,
  NORTH,
  EAST,
  SOUTH,
  WEST
} = require('../server/rover');

describe('Land', () => {
  const plateauState = scan('10 10');
  const landOnPlateau = land(plateauState);

  it('should return all keys x, y, dir, and inOrbit', () => {
    const state = landOnPlateau('1 5 E');

    expect(state).to.have.all.keys('x', 'y', 'dir', 'inOrbit');
  });

  it('should convert coordinates to numbers', () => {
    const state = landOnPlateau('1 5 E');

    expect(state.x).to.be.a('number');
    expect(state.y).to.be.a('number');
    expect(state.x).to.equal(1);
    expect(state.y).to.equal(5);
  });

  it('should set dir to the index of NORTH in DIRECTIONS for input "N"', () => {
    const state = landOnPlateau('1 5 N');

    expect(state.dir).to.be.a('string');
    expect(state.dir).to.equal(NORTH);
  });

  it('should set dir to the index of EAST in DIRECTIONS for input "E"', () => {
    const state = landOnPlateau('1 5 E');

    expect(state.dir).to.be.a('string');
    expect(state.dir).to.equal(EAST);
  });

  it('should set dir to the index of SOUTH in DIRECTIONS for input "S"', () => {
    const state = landOnPlateau('1 5 S');

    expect(state.dir).to.be.a('string');
    expect(state.dir).to.equal(SOUTH);
  });

  it('should set dir to the index of WEST in DIRECTIONS for input "W"', () => {
    const state = landOnPlateau('1 5 W');

    expect(state.dir).to.be.a('string');
    expect(state.dir).to.equal(WEST);
  });

  it('should set dir to the index of NORTH in DIRECTIONS for invalid input', () => {
    let state = landOnPlateau('1 5 X');

    expect(state.dir).to.be.a('string');
    expect(state.dir).to.equal(NORTH);

    state = landOnPlateau('1 1 *');

    expect(state.dir).to.be.a('string');
    expect(state.dir).to.equal(NORTH);

    state = landOnPlateau('1 1 14');

    expect(state.dir).to.be.a('string');
    expect(state.dir).to.equal(NORTH);

    state = landOnPlateau('1 1 s');

    expect(state.dir).to.be.a('string');
    expect(state.dir).to.equal(NORTH);
  });


  it('should not be in orbit after landing', () => {
    const state = landOnPlateau('1 5 E');

    expect(state.inOrbit).to.be.false;
  });

  it('should be able to land at 0 0', () => {
    const state = landOnPlateau('0 0');

    expect(state.x).to.equal(0);
    expect(state.y).to.equal(0);
  });

  it('should not go above the maximum boundaries', () => {
    const state = landOnPlateau('1234567890 1234567890 N');

    expect(state.x).to.equal(10);
    expect(state.y).to.equal(10);
  });

  it('should not go below the minimum boundaries', () => {
    const state = landOnPlateau('-10 -10 N');

    expect(state.x).to.equal(0);
    expect(state.y).to.equal(0);
  });

  it('should return value of 0 when incorrrect params', () => {
    const state = landOnPlateau('* E 8');

    expect(state).to.have.all.keys('x', 'y', 'dir', 'inOrbit');
    expect(state.x).to.be.a('number');
    expect(state.y).to.be.a('number');
    expect(state.dir).to.be.a('string');
    expect(state.x).to.equal(0);
    expect(state.y).to.equal(0);
    expect(state.dir).to.equal(NORTH);
  });

  it('should return value of 0 when missing params', () => {
    const state = landOnPlateau('');

    expect(state).to.have.all.keys('x', 'y', 'dir', 'inOrbit');
    expect(state.x).to.be.a('number');
    expect(state.y).to.be.a('number');
    expect(state.dir).to.be.a('string');
    expect(state.x).to.equal(0);
    expect(state.y).to.equal(0);
    expect(state.dir).to.equal(NORTH);
  });
});
