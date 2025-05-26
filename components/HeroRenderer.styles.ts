import styled from "styled-components";

export const HeroContainer = styled.div`
  height: calc(100% - 250px);
  text-align: left;
  canvas {
    width: 100%;
    height: 100%;
  }
`;
export const CommandBox = styled.div`
  font-family: "DungGeunMo";
  background: rgba(0, 0, 0, 0);
  color: white;
  font-size: 28px;
  width: 330px;
  height: 250px;
  word-break: break-word;
  overflow: auto;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

export const currentCommand = styled.div`
  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  display: inline-block;

  .blink {
    font-family: "DungGeunMo";
    animation: blink 1s infinite;
    -webkit-animation: blink 1s infinite;
    -moz-animation: blink 1s infinite;
    -o-animation: blink 1s infinite;
    -ms-animation: blink 1s infinite;
  }
`;

export const commandHistory = styled.div`
  font-family: "DungGeunMo";
  color: #ffffff;
  font-size: 28px;
  margin-bottom: 4px;
  white-space: pre-wrap;
`;

export const commandHistoryItem = styled.div`
  font-family: "DungGeunMo";
  color: #ffffff;
  font-size: 28px;
  margin-bottom: 4px;
`;
