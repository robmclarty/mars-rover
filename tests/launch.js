'use strict';

const { expect } = require('chai');
const { launch, NORTH } = require('../server/rover');

describe('Launch', () => {
  const state = launch();

  it('should reset all values after launch', () => {
    expect(state.x).to.be.a('number');
    expect(state.y).to.be.a('number');
    expect(state.dir).to.be.a('string');
    expect(state.x).to.equal(0);
    expect(state.y).to.equal(0);
    expect(state.dir).to.equal(NORTH);
  });

  it('should be in orbit after launch', () => {
    expect(state.inOrbit).to.be.true;
  });
});
