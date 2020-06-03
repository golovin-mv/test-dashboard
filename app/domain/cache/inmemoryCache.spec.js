import chai from 'chai';
import inMemoryCahe from './inmemoryCache.js';
import { entity } from '../../../mockSender.js';

const { expect } = chai;
let cache = null;

const entityKey = 'Entity1';

const initialState = {
  [entityKey]: {
    param1: 0.11,
  },
};

describe('In memory cache', () => {
  beforeEach(() => {
    cache = inMemoryCahe(initialState);
  });


  it('getAll method should return all entities', () => {
    expect(initialState).to.deep.equal(cache.getAll());
  });

  it('get method should return entity by key', () => {
    expect(initialState[entityKey]).to.equal(
      cache.get(entityKey),
    );
  });

  it('clear method should clear cache', () => {
    cache.clear();
    expect(cache.count()).to.be.equal(0);
  });

  it('count method should return count', () => {
    const count = 3;

    for (let index = 0; index < count; index++) {
      cache.add(entity(index));
    }

    expect(cache.count()).to.be.equal(count);
  });

  describe('Add method', () => {
    let newEntity = null;

    beforeEach(() => {
      newEntity = entity(3);
      cache.add(newEntity);
    });

    it('shoul append new entity', () => {
      expect(cache.count()).to.be.equal(2);
      expect(newEntity).to.equal(
        cache.get(newEntity.id),
      );
    });

    it('should update entity', () => {
      const anotherEntity = {
        ...entity(8),
        id: [entityKey],
      };

      cache.add(anotherEntity);

      expect(cache.count()).to.be.equal(2);
      expect(anotherEntity).to.be.equal(cache.get(entityKey));
    });
  });
});
