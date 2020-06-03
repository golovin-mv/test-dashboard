import axios from 'axios';

/**
 * Количество оригинальных сущностей
 * @type {Number}
 */
const ENTITY_COUNT = 20;
/**
 * Количество параметров в сушности
 */
const ENTITY_PARAMS_COUNT = 20;
/**
 * Адрес сервиса
 */
const SERVICE_URL = 'http://localhost:1337/entity';

const MESSAGE_PER_SECOND = 10;

/**
 * Получаем рандомное значение в интервале
 * @param {Number} min
 * @param {Number} max
 * @function
 * @returns {() => Number}
 */
const randomNumber = (min, max) => () => Math.random() * (max - min) + min;

/**
 * Получаем рандомное целое значение в интервале
 * @param {Number} min
 * @param {Number} max
 * @function
 * @returns {() => Number}
 */
const randomInteger = (min, max) => () => Math.floor(randomNumber(min, max)());

/**
 * Получаем рандомное значение параметра в промежутке
 * от -1 до 1
 * @function
 * @returns {() => Number}
 */
const randomFieldValue = randomNumber(-1, 1);

const randomEntityNumber = randomInteger(0, ENTITY_COUNT);

/**
 * Получаем массив длинной num
 * @param {Number} num
 * @function
 * @returns {Array<Number>}
 */
const arrayFromNumber = (num) => [...Array(num).keys()];

/**
 * Получаем entity
 * @param {*} key
 * @function
 * @returns {Object}
 */
const entity = (key) => ({
  id: `Entity${key}`,
  ...arrayFromNumber(ENTITY_PARAMS_COUNT).reduce((acc, val) => {
    acc[`Parameter${val}`] = randomFieldValue();
    return acc;
  }, {}),
});

/**
 * Получаем все entity
 * @function
 * @returns {Object<String, Object>}
 */
const getEtities = () => arrayFromNumber(ENTITY_COUNT).map((e) => entity(e));

/**
 * То чезез что мы будем отправлять сообщения.
 * Лучше конечно искользовать messageBusSender
 * и отправлять через брокер RabbitMq, ActiveMq, Kafkd почему бы и нет
 * но это тестовое задание поэтому так.
 * @param {Object} settings
 * @param {string} settings.url - адрес сервиса
 */
const httpSender = ({ url }) => ({
  send: (e) => axios.post(url, e)
    .catch(console.error),
});

const sendEntity = (sender) => (e) => sender.send(e);

const sendHttpMessage = sendEntity(
  httpSender({ url: SERVICE_URL }),
);

/**
 * Получаем задержку отправки - рандомное число [-10, 10]
 * если чисто < 0 то задержка - 1 секунда
 * если больше по это число
 * @function
 * @returns {Number}
 */
const getDelay = () => {
  const delay = randomInteger(-10, 10);

  return (delay >= 0
    ? delay
    : 1) * 1000;
};

const run = (timeout = 0) => setTimeout(() => {
  arrayFromNumber(MESSAGE_PER_SECOND)
    .forEach(() => sendHttpMessage(
      entity(randomEntityNumber()),
    ));
  run(getDelay());
}, timeout);


export {
  getEtities,
  entity,
  run,
};
