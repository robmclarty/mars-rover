'use strict';

const { expect } = require('chai');
const {
  turnLeft,
  turnRight,
  EAST,
  SOUTH,
  WEST,
  NORTH
} = require('../app/rover');

describe('Turn', () => {
  it('should point W if turning left from N', () => {
    const newDirection = turnLeft(NORTH);

    expect(newDirection).to.be.a('string');
    expect(newDirection).to.equal(WEST);
  });

  it('should point S if turning left from W', () => {
    const newDirection = turnLeft(WEST);

    expect(newDirection).to.be.a('string');
    expect(newDirection).to.equal(SOUTH);
  });

  it('should point E if turning left from S', () => {
    const newDirection = turnLeft(SOUTH);

    expect(newDirection).to.be.a('string');
    expect(newDirection).to.equal(EAST);
  });

  it('should point N if turning left from E', () => {
    const newDirection = turnLeft(EAST);

    expect(newDirection).to.be.a('string');
    expect(newDirection).to.equal(NORTH);
  });

  it('should point E if turning right from N', () => {
    const newDirection = turnRight(NORTH);

    expect(newDirection).to.be.a('string');
    expect(newDirection).to.equal(EAST);
  });

  it('should point S if turning right from E', () => {
    const newDirection = turnRight(EAST);

    expect(newDirection).to.be.a('string');
    expect(newDirection).to.equal(SOUTH);
  });

  it('should point W if turning right from S', () => {
    const newDirection = turnRight(SOUTH);

    expect(newDirection).to.be.a('string');
    expect(newDirection).to.equal(WEST);
  });

  it('should point N if turning right from W', () => {
    const newDirection = turnRight(WEST);

    expect(newDirection).to.be.a('string');
    expect(newDirection).to.equal(NORTH);
  });
});
