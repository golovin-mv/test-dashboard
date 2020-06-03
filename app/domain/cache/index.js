/**
 * Здесь содержиться логика иничиализация кэша с которого мы будем отдавать
 * на клиента сущьности.1
 */

/**
 * Получаем обьект который храним в кэше
 * @function
 * @param {Array<Object>} initialArray
 * @returns {Object<String, Object>}
 */
const initialState = (initialArray) => initialArray
  .reduce((acc, entity) => {
    acc[entity.id] = entity;
    return acc;
  }, {});

/**
 * Получаем обьект кэша,
 * т.к. скорее всего, если мы бумем использовать какой нибудь
 * сторонний сервия для кэширования, типо Redis или Memcache -
 * у нас будет возвращаться промис, обернем возвращаемое значение в промис
 * что-бы в будущем безболезненно поменять адаптер
 * @param {} cacheAdapter
 * @param {*} initialArray
 * @returns {Promise<Object>} - возвращаем обьект кэша, да не помешали бы интерфейсы
 */
const cache = (cacheAdapter, initialArray = []) => new Promise((res, rej) => {
  if (!cacheAdapter) {
    return rej(
      new Error('Adapter is undefined'),
    );
  }

  return res(cacheAdapter(
    initialState(initialArray),
  ));
});

export default cache;
