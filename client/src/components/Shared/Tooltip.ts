// Tooltip styling
import styled from "styled-components";
import {Layer} from "../../config/theme.ts";

export const Tooltip = styled.div`
  visibility: hidden;
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 5px;
  border-radius: 4px;
  font-size: 12px;
  position: absolute;
  z-index: ${Layer.Tooltip};
  bottom: 125%; /* Position above the button */
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.2s;

  /* Arrow pointing downwards */
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }
`;