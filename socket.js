import Server from 'socket.io';

/**
 * Слушаем события
 * @function
 * @param {Object<String, Object>} cache 
 */
const initSocketEvents = (cache) => (socket) => {
  socket.on('entity', ({ id }) => {
    socket.emit('reseive-entity', cache.get(id));
  });

  socket.on('entities', () => {
    socket.emit('reseive-entities', cache.getAll());
  });
};

/**
 * Инициализируем сокет сервер,
 * слушаем события
 */
export default (server, cache) => {
  const io = new Server();

  const initWithCache = initSocketEvents(cache);

  io.attach(server);

  io.on('connection', (socket) => {
    socket.emit('reseive-entities', cache.getAll());
    initWithCache(socket);
  });
};
