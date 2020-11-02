import Styled from "@emotion/styled";

export const DashWrapper = Styled.div`
  max-width: 100%;
  width: 100%;
  height: 100%;
  background: #F1F3F9;

  display: flex;
  flex-direction: column;
`;

export const Stats = Styled.div`
  flex-basis: 15%;
  background: #5E72E4;
  padding: 1.5em 2em;

  @media(max-width: 768px) {
    padding: 1.5em 1em;
  }
`;

export const Charts = Styled.div`
  flex-basis: 42%;
  padding: 1em 2em;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1em;
    justify-content: space-evenly;
    row-gap: 2em;
  }
`;

export const Chart = Styled.div`
  flex-basis: 45%;
  background: white;
  padding: 1em 1em 1em 1.5em;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  row-gap: 1em;
  box-shadow: 2px 2px 3px lightgray;

  header {
    opacity: 0.7;
  }

  @media(max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`;

export const Table = Styled.div`
  flex-basis: 42%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;

  @media(max-width: 768px) {
    margin: 2em auto;
  }
`;

export const MiniFooter = Styled.div`
  flex-basis: 1%;
  padding: 0em 2em;
  opacity: 0.8;
  font-size: smaller;

  @media(max-width: 768px) {
    display: none;
  }
`;

export const Functions = Styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 0.7em;

  button {
    background: white;
    padding: 0.5em 1em;
    font-size: small;
    border-radius: 3px;
    box-shadow: 1px 1px 2px darkgray;
    color: #5E72E4;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }
`;

export const Statistics = Styled.div`
  display: flex;
  align-items: center; 
  justify-content: space-between;
  padding: 2em 0px 0px 0px;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: space-evenly;
    row-gap: 2em;
  }
`;

export const Stat = Styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  column-gap: 4em;
  background: #FFF;
  padding: 1em;
  border-radius: 5px;
  box-shadow: 1px 1px 2px darkgray;

  @media(max-width: 768px) {
    width: 100%;
    max-width: 100%;
    justify-content: space-between;
  }
`;

export const StatTxt = Styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5em;

  div:first-of-type {
    font-size: small;
    text-transform: uppercase;
    opacity: 0.7;
  }

  div:nth-of-type(2) {
    font-weight: bold;
  }

  div:last-child {
    color: lightgreen;
  }
`;

export const StatIcon = Styled.div`
`;

export const Change = Styled.div`
  display: flex;
  column-gap: 0.3em;
  align-items: center;
  align-content: center;
  justify-content; flex-start;
  line-height: 100%;

  div {
    font-weight: normal !important;
    font-size: 1.2em !important;
    color: #6CD74E !important;
  }
`;
