import path from 'path';
import http from 'http';
import express from 'express';
import {
  Worker, isMainThread, parentPort,
} from 'worker_threads';
import logger from './app/utils/logger.js';
import inMemoryCache from './app/domain/cache/inmemoryCache.js';
import { getEtities } from './mockSender.js';
import cache from './app/domain/cache/index.js';
import listner from './app/domain/listners/index.js';
import socket from './socket.js';

const SERVER_PORT = 3000;

if (isMainThread) {
  /**
   * Запустим проложение восновном потоке
   */
  const app = express();
  app.use(express.static(path.join('client', 'build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join('client', 'build', 'index.html'));
  });

  const server = http.createServer(app);
// инициализируем кэш
  cache(
    inMemoryCache,
    getEtities(),
  )
  // инициализируем сокет сервер
    .then((cacheObject) => {
      socket(server, cacheObject);
      return cacheObject;
    })
    // запускам слушателя
    .then((cacheObject) => {
      const worker = new Worker('./app.js');
      worker.on('message', (entity) => cacheObject.add(entity));
    })
    .then(() => server.listen(SERVER_PORT))
    .then(() => logger.info(`Server listen port:${SERVER_PORT}`))
    .catch(logger.error);
} else {
  /**
   * Слушателя спрячем в отдельном трэде
   * чтобы не мешал отдавать фронт)
   */
  const currentListnerlistner = listner();
  currentListnerlistner.on('start', logger.info);
  currentListnerlistner.listen();
  currentListnerlistner.on('message', (m) => parentPort.postMessage(m));
}
