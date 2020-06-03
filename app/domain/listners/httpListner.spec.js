import axios from 'axios';
import chai from 'chai';
import HttpListner from './httpListner.js';

import { entity } from '../../../mockSender.js';

const { expect } = chai;

describe('Http listner', () => {
  let listner = null;

  beforeEach((done) => {
    listner = new HttpListner({ port: 1338 });
    listner.listen();
    listner.on('start', done());
  });

  afterEach((done) => {
    listner.stop();
    listner.on('stop', done());
  });

  it('should reseive message', (done) => {
    const message = entity(1);
    listner.on('message', (m) => {
      expect(message).to.be.deep.equal(m);
      done();
    });

    axios.post('http://localhost:1338/entity', message);
  });

  it('should reseive 404 status with wrong path', () => axios.post('http://localhost:1337/weHaveProblem', {})
    .catch((err) => expect(404).to.equal(err.response.status)));
});
