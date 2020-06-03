import chai from 'chai';
import cache from './index.js';
import { getEtities } from '../../../mockSender.js';

const { expect } = chai;

const testAdapter = (initialState) => ({
  getAll: () => initialState,
});

describe('Cache Builder', () => {
  it('should cheare cache with initial state', () => {
    const initialArray = getEtities();

    return cache(testAdapter, initialArray)
      .then((c) => expect(
        Object.values(c.getAll()),
      ).to.be.deep.equal(initialArray));
  });
});
