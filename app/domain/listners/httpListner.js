import http from 'http';
import url from 'url';
import { EventEmitter } from 'events';
import logger from '../../utils/logger.js';

/**
 * Слушатель http поднимает сервер,
 * слушает POST на /entity
 */
class HttpListner extends EventEmitter {
  constructor({ port = 1337 }) {
    super();
    this.port = port;
    this.server = http.createServer(this.handleRequest.bind(this));

    this.server.on('error', (err) => this.emit('error', err));
  }

  /**
   * Запускаем слушателя
   * @returns {void}
   */
  listen() {
    this.server.listen(this.port, () => this.emit('start', `Http listner started on port: ${this.port}`));
  }

  /**
   * Останасливаем слушателя
   * @returns {void}
   */
  stop() {
    this.server.close(() => this.emit('stop'));
  }

  /**
   * Обрабатываем запрос
   * @param {http.ClientRequest} req - запрос
   * @param {http.OutgoingMessage} res - ответ
   * @returns {void}
   */
  handleRequest(req, res) {
    if (req.method === 'POST' && url.parse(req.url).pathname === '/entity') {
      return this.handleMessage(req, res);
    }
    res.statusCode = 404;
    return res.end();
  }

  /**
   * Если запрос ок, обрабатываем сообщение,
   * отправляем событие
   * @param {http.ClientRequest} req - запрос
   * @param {http.OutgoingMessage} res - ответ
   * @returns {void}
   */
  handleMessage(req, res) {
    let body = '';

    // eslint-disable-next-line no-return-assign
    req.on('data', (chunk) => (body += chunk));

    req.on('end', () => {
      res.setHeader('Content-Type', 'application/json');
      try {
        const entity = JSON.parse(body);
        this.emit('message', entity);
        res.statusCode = 200;
      } catch (error) {
        logger.error(error);
        res.statusCode = 400;
        res.write(error.message);
      }

      res.end();
    });
  }
}

export default HttpListner;
