import React from "react";

export default ({ entity, onIntervalChange, entityUpdateDelay }) => {
  const renderEntityParams = (entity) => {
    const { id, ...params } = entity;

    return Object.keys(params).map((key) => (
      <div>
        {key}: {params[key]}
      </div>
    ));
  };

  return (
    <div>
      <div>
        <span>Интервал обновления ms: </span>
        <input
          min="100"
          value={entityUpdateDelay}
          type="number"
          onChange={(e) => onIntervalChange(e.target.value)}
        ></input>
      </div>
      {entity && (
        <div>
          <h1>{entity.id}</h1>
          {renderEntityParams(entity)}
        </div>
      )}
    </div>
  );
};
