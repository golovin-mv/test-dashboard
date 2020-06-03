import React from "react";
import styled from "styled-components";
import { Link } from "simple-react-router";

const options = [
  { label: "sum", value: "sum" },
  { label: "min", value: "min" },
  { label: "max", value: "max" },
  { label: "avg", value: "avg" },
];

const sum = (arr = []) => arr.reduce((acc, val) => acc + val);

const min = (arr = []) => Math.min(...arr);

const max = (arr = []) => Math.max(...arr);

const avg = (arr = []) => sum(arr) / arr.length;

const aggregator = {
  sum,
  min,
  max,
  avg,
};

const getBackground = (val) => {
  if (val === 0) {
    return "rgb(255, 255, 255)";
  }

  if (val < 0) {
    return `rgba(255, 140, 0, ${Math.abs(val)})`;
  }

  return `rgba(0, 0, 0, ${Math.abs(val)})`;
};

const getColor = (val) => {
  if (val > 0.5) {
    return "#fff";
  }
  return `#000`;
};

const rotate = (matrix = []) =>
  matrix[0]
    ? matrix[0].map((val, index) => matrix.map((val) => val[index]))
    : [];
const IdCell = styled.td`
  background-color: #c4c4c4;
  color: #000;
  padding: 0.4em;
`;

const ValueCell = styled.td`
  background-color: ${(props) => getBackground(parseFloat(props.children))};
  color: ${(props) => getColor(parseFloat(props.children))};
  mix-blend-mode: difference;
  padding: 0.4em;
`;

const StyledTable = styled.table`
  width: 100%;
  text-align: center;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.4em;
`;

export default ({
  entities,
  onIntervalChange,
  onAgregationChange,
  userSetting: { tableUpdateDelay, paramsAggregators },
}) => {
  const renderParams = (params) =>
    Object.values(params).map((val) => <ValueCell key={val}>{val.toFixed(4)}</ValueCell>);

  const renderTableHeader = (aggregatorsArray) =>
    Object.values(aggregatorsArray).map((val, i) => (
      <th key={val + i}>
        <StyledSelect onChange={(e) => onAgregationChange(i, e.target.value)} value={aggregatorsArray[i]}>
          {options.map((opt) => (
            <option
              value={opt.value}
              key={opt.value + i}
            >
              {opt.label}
            </option>
          ))}
        </StyledSelect>
      </th>
    ));

  const renderRow = (entity) => {
    const { id, ...params } = entity;
    return (
      <tr key={id}>
        <IdCell>
          <Link  href={`/entity/?id=${id}`}>{id}</Link>
        </IdCell>
        {renderParams(params)}
      </tr>
    );
  };

  const renderEntities = (arr) =>
    Object.values(arr).map((val) => renderRow(val));

  const renderSummary = (entities = {}) =>
    rotate(
      Object.values(entities).map((entity) => {
        const { id, ...params } = entity;
        return Object.values(params);
      })
    )
      .reduce((acc, val, i) => {
        acc.push(aggregator[paramsAggregators[i]](val));
        return acc;
      }, [])
      .map((aggregated) => <td key={aggregated}>{aggregated.toFixed(4)}</td>);

  return (
    <div>
      <div>
        <span>Интервал обновления ms: </span>
        <input
          min="100"
          value={tableUpdateDelay}
          type="number"
          onChange={(e) => onIntervalChange(e.target.value)}
        ></input>
      </div>
      <StyledTable>
        <thead>
          <tr>
          <th key="idth"></th>
            {renderTableHeader(paramsAggregators)}
          </tr>
        </thead>
        <tbody>
          {renderEntities(entities)}
          <tr>
            <td>ИТОГО:</td>
            {renderSummary(entities)}
          </tr>
        </tbody>
      </StyledTable>
    </div>
  );
};
