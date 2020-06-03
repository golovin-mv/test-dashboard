import React, { useState, useEffect } from "react";
import { updateEntity } from "../socket";
import { getState, onUndate, updateState } from "../storage";
import Entity from "../components/Entity";

let currentTimeout = null;

const update = (id, timeout = 0) =>
  (currentTimeout = setTimeout(() => {
    updateEntity(id);
    update(id, getState().userSetting.entityUpdateDelay);
  }, timeout));

export default (props) => {
  const id = new URL(window.location.href).searchParams.get("id");

  const [entity, setEntity] = useState(getState().entities[id]);
  const [state, setState] = useState(getState());
  
  useEffect(() => {
    onUndate(() => {
      setEntity(getState().entities[id]);
      setState(getState());
    });
  });

  useEffect(() => {
    update(id);
    
    return () => clearTimeout(currentTimeout);
  }, []);

  const onIntervalChange = (v) =>
    v > 100 &&
    updateState({
      userSetting: {
        ...getState().userSetting,
        entityUpdateDelay: v,
      },
    });

  return <Entity onIntervalChange={onIntervalChange} entity={entity} entityUpdateDelay={state.userSetting.entityUpdateDelay} {...props} />;
};
