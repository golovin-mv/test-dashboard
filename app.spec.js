import chai from 'chai';
import io from 'socket.io-client';
import axios from 'axios';
import './app.js';

const { expect } = chai;

describe('App integration tests', () => {
  it('should get the initial state on the socket when connected', (done) => {
    const socket = io('http://localhost:3000');
    socket.on('reseive-entities', (m) => {
      expect(m).to.have.all.keys([...Array(20).keys()]
        .map((e) => `Entity${e}`));
      done();

      socket.close();
    });
  });

  describe('Then socket connected', () => {
    let socket = null;

    const updateEntity = (newEntity) => new Promise((res) => {
      setTimeout(() => axios
        .post('http://localhost:1337/entity', newEntity)
        .then(res),
      0);
    });


    before((done) => {
      socket = io('http://localhost:3000');
      socket.on('connect', done);
    });

    after(() => {
      socket.close();
    });

    it('should get single entity', (done) => {
      socket.emit('entity', { id: 'Entity7' });
      socket.once('reseive-entity', (m) => {
        expect('Entity7').to.equal(m.id);
        done();
      });
    });

    it('should get updated entity', () => {
      const newEntity = {
        id: 'Entity8',
        foo: 'bar',
      };

      return updateEntity(newEntity)
        .then(() => socket.emit('entity', { id: newEntity.id }))
        .then(() => new Promise((res) => {
          socket.once('reseive-entity', res);
        }))
        .then((res) => expect(newEntity).to.deep.equal(res))
        .catch((err) => console.error(err));
    });
  });
});
