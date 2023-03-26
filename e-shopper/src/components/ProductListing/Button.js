import styled from "styled-components/macro";
import colors from "../../components/ProductListing/colors";

const { btn } = colors;

const getColor = (color, layer) =>
  color ? `${btn[color].normal[layer]}` : `${btn.primary.normal[layer]}`;

const Button = styled.button`
  color: ${({ color }) => `${getColor(color, "fg")}`};
  background: ${({ color }) => `${getColor(color, "bg")}`};

  padding: 10px;
  width: ${({ width }) => width || "fit-content"};
  border-radius: 3px;

  font-weight: bold;

  &:hover,
  &:disabled {
    background: ${({ color }) => `${getColor(color, "bg")}`};
  }

  &:focus,
  &:active {
    border: 1px solid black;
  }

  &:disabled {
    pointer-events: none;
  }
`;

export default Button;
