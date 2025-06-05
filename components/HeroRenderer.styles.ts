import styled from "styled-components";

export const HeroContainer = styled.div`
  z-index: 1;
  height: calc(100% - 250px);

  text-align: left;

  canvas {
    width: 100%;
    height: 100%;
  }

  ${({ theme }) => theme.media.mobile} {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: calc(100% - 110px);
  }
`;
export const CommandBox = styled.div`
  overflow: auto;
  width: 500px;
  height: 240px;
  padding: 10px;

  color: white;
  line-height: 1.2;
  user-select: none;
  border-radius: 0 0 16px;
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
    animation: blink 1s infinite;
  }
`;

export const commandHistory = styled.div`
  margin-bottom: 4px;

  color: #fff;
  white-space: pre-wrap;
`;

export const commandHistoryItem = styled.div`
  margin-bottom: 4px;

  color: #fff;
`;
