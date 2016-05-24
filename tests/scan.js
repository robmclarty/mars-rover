'use strict';

const { expect } = require('chai');
const { scan } = require('../app/rover');

describe('Scan', () => {
  it('should return an object with properties maxx and maxy which correspond to input', () => {
    const state = scan('5 10');

    expect(state).to.have.all.keys('maxx', 'maxy');
    expect(state.maxx).to.be.a('number');
    expect(state.maxy).to.be.a('number');
    expect(state.maxx).to.equal(5);
    expect(state.maxy).to.equal(10);
  });

  it('should use a value of 0 for non-numeric inputs', () => {
    const state = scan('& R');

    expect(state).to.have.all.keys('maxx', 'maxy');
    expect(state.maxx).to.be.a('number');
    expect(state.maxy).to.be.a('number');
    expect(state.maxx).to.equal(0);
    expect(state.maxy).to.equal(0);
  });

  it('should not assign a number less than 0', () => {
    const state = scan('-5 -17');

    expect(state).to.have.all.keys('maxx', 'maxy');
    expect(state.maxx).to.be.a('number');
    expect(state.maxy).to.be.a('number');
    expect(state.maxx).to.equal(0);
    expect(state.maxy).to.equal(0);
  });

  it('should use a value of 0 when missing parameters', () => {
    const state = scan('');

    expect(state).to.have.all.keys('maxx', 'maxy');
    expect(state.maxx).to.be.a('number');
    expect(state.maxy).to.be.a('number');
    expect(state.maxx).to.equal(0);
    expect(state.maxy).to.equal(0);
  });
});
