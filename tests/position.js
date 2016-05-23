'use strict';

const { expect } = require('chai');
const { getPosition, EAST, DIRECTIONS } = require('../server/rover');

describe('Position', () => {
  it('should return a string position as `X Y DIR`', () => {
    const position = getPosition({
      x: 3,
      y: 5,
      dir: DIRECTIONS.indexOf(EAST)
    });

    expect(position).to.be.a('string');
    expect(position).to.equal('3 5 E');
  });

  it('should return ? for omitted params', () => {
    const position = getPosition({});

    expect(position).to.be.a('string');
    expect(position).to.equal('? ? ?');
    expect(getPosition({ x: 5 })).to.equal('5 ? ?');
    expect(getPosition({ x: 5, y: 10 })).to.equal('5 10 ?');
    expect(getPosition({ dir: 2 })).to.equal('? ? S');
    expect(getPosition({ y: 5, dir: 1 })).to.equal('? 5 E');
    expect(getPosition({ y: 6 })).to.equal('? 6 ?');
  });
});
