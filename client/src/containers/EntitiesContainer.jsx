import { updateEntities } from "../socket";
import React, { useState, useEffect } from "react";
import { getState, onUndate, updateState } from "../storage";
import Entities from "../components/Entities";

let currentTimeout = null;

const update = (timeout = 0) =>
  (currentTimeout = setTimeout(() => {
    updateEntities();
    update(getState().userSetting.tableUpdateDelay);
  }, timeout));

export default (props) => {
  const [state, setState] = useState(getState());

  useEffect(() => {
    onUndate(() => setState(getState()));
  });

  useEffect(() => {
    update();
    return  () => clearTimeout(currentTimeout);
  }, []);

  const onIntervalChange = (v) =>
    v > 100 &&
    updateState({
      userSetting: {
        ...getState().userSetting,
        tableUpdateDelay: v,
      },
    });

  const onAgregationChange = (index, val) =>
    updateState({
      userSetting: {
        ...getState().userSetting,
        paramsAggregators: (() => {
          const arr = [...getState().userSetting.paramsAggregators];
          arr[index] = val;
          return arr;
        })(),
      },
    });

  return (
    <Entities
      onAgregationChange={onAgregationChange}
      onIntervalChange={onIntervalChange}
      {...props}
      {...state}
    />
  );
};
