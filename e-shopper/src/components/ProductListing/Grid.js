import React from "react";
import styled from "styled-components/macro";

export const Row = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`;

export const getGrid = ({ items, colCount, rowProps }) => {
  const gridItems = [];
  let i = 0;

  for (; i < items.length; i += colCount) {
    gridItems.push(
      <Row {...rowProps} key={`row-${i}`}>
        {[...items.slice(i, i + colCount)]}
      </Row>
    );
  }
  gridItems.push(
    <Row key={`row-${i}`} {...rowProps}>
      {[...items.slice(i)]}
    </Row>
  );

  return gridItems;
};
