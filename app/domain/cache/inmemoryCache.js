/**
 * Добавляем сущность в хранилище
 * @param {Object<String, Object>} store - хранилище, в нашем случае обьект в памяти
 * @param {Object} entity - хранимая сущность
 */
const add = (store, entity) => ({
  ...store,
  [entity.id]: entity,
});

/**
 * Получаем все обьекты в хранилище,
 * по хорошему нужно возвращать массив, но это не боевой код
 * пожтому вот так)
 * @param {Object<String, Object>} store
 * @return {Object<String, Object>}
 */
const getAll = (store) => store;
/**
 * Получаем сущность по ключу
 * @param {Object<String, Object>} store
 * @param {String} key - id сущности 
 */
const get = (store, key) => store[key];
/**
 * Получаем количество сущностей в кэш
 * @param {Object<String, Object>} store
 * @returns {Number}
 */
const count = (store) => Object.keys(store).length;

/**
 * Инициализируем хранилище, грязно)
 * @param {Object<String, Object>} initState - начальные значения, может гдето сохранены были
 */
const inMemoryCahe = (initState) => {
  let data = { ...initState };

  // eslint-disable-next-line no-return-assign
  const updateState = (store, newData) => data = newData
    ? { ...store, ...newData }
    : {};


  return {
    getAll: () => getAll(data),
    get: (k) => get(data, k),
    add: (e) => updateState(
      data,
      add(data, e),
    ),
    count: () => count(data),
    clear: () => updateState(
      data,
      null,
    ),
  };
};

export default inMemoryCahe;
