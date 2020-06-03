const listners = [];

let state = {
  entities: {},
  userSetting: {
    tableUpdateDelay: 3000,
    entityUpdateDelay: 3000,
    paramsAggregators: Array(20).fill('sum')
  },
};

const getState = () => state;

const updateState = (data) => {
  state = Object.assign({}, state, data);
  listners.forEach((cb) => cb());
};

const onUndate = (cb) => listners.push(cb);

export { getState, updateState, onUndate };
