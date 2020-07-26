import styled from "styled-components";

const selectorTileElementHeight = "5px";

export const SelectorDiv = styled.div`
  display: inline-flex;
  padding: 0 ${selectorTileElementHeight};
  max-height: 32px;
  width: 90%;

  @media (max-width: 580px) {
    width: -webkit-fill-available;
  }
`;

export const SelectorUl = styled.ul`
  background: #171d29;
  position: absolute;
  padding: 0px;
  list-style: none;
  margin: 32px 0px 0px 0px;
  max-height: 250px;
  max-width: 204px;
  min-width: 204px;
  width: 206px;
  overflow-y: auto;
  z-index: 1;
  text-overflow: ellipsis;

  @media (min-width: 769px) {
    min-width: unset;
    width: calc(50% - 40px);
  }

  @media (min-width: 997px) {
    max-width: unset;
    min-width: unset;
    width: calc(50% - 21px);
    overflow-x: hidden;
    word-break: break-word;
  }
`;

export const SelectorLi = styled.li`
  overflow: hidden;
  white-space: nowrap;
  background: #171d29;
  border: solid 1px white;
  padding: 10px;
  font-size: 12px;
  text-overflow: ellipsis;
`;

export const SelectorInput = styled.input`
  background: #171d29;
  padding-left: 5px;
  width: calc(100% - 24px);
  font-size: 13px;
  word-wrap: break-word;
  text-overflow: ellipsis;
  outline: 0;
  white-space: normal;
  min-height: 1.7em;
  color: #ffffff;
  box-shadow: none;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-bottom-left-radius: 0.3rem;
  border-top-left-radius: 0.3rem;
`;

export const SelectorButton = styled.button`
  background-color: #171d29;
  border: none;
  cursor: pointer;
  border-bottom-right-radius: 0.3rem;
  border-top-right-radius: 0.3rem;

  &:focus {
    outline: 0;
  }
`;
