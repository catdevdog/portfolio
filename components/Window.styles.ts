import styled from "styled-components";
import { motion } from "motion/react";

export const Window = styled(motion.div)`
  overflow: hidden;
  position: absolute;
  border: 1px solid ${({ theme }) => theme.windowHeader.background};

  color: ${({ theme }) => theme.colors.text};
  border-radius: 7px;
  box-sizing: border-box;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
  max-height: calc(var(--vh, 1vh) * 100);

  ${({ theme }) => theme.media.mobile} {
    z-index: 10;
    max-height: 100%;

    background-color: ${({ theme }) => theme.colors.background};
    backdrop-filter: none;
  }
`;

export const WindowTrafficLight = styled.div<{ color: string }>`
  width: 18px;
  height: 18px;
  border-radius: 50%;

  background-color: ${({ color }) => color};
  cursor: pointer;
  transform: scale(0.8);
  transition: transform 0.3s ease;

  ${({ theme }) => theme.media.mobile} {
    width: 22px;
    height: 22px;
  }
`;

export const WindowHeader = styled.div`
  display: flex;
  position: relative;
  z-index: 10;
  padding: 10px;

  background-color: ${({ theme }) => theme.windowHeader.background};
  align-items: center;
  justify-content: space-between;
  border-radius: 6px 6px 0 0;
  cursor: grab;
  touch-action: none;
  user-select: none; /* 선택 방지 */

  &:hover {
    ${WindowTrafficLight} {
      transform: scale(1);
    }
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 12px 16px;
    ${WindowTrafficLight} {
      transform: scale(1);
    }
  }
`;

export const WindowTrafficLightWrap = styled.div`
  display: flex;
  gap: 10px;

  ${({ theme }) => theme.media.mobile} {
    gap: 15px;
  }
`;

export const WindowTitle = styled.div`
  position: absolute;
  left: 50%;

  color: #eee;
  font-family: ${({ theme }) => theme.systemFontFamily};
  transform: translateX(-50%);

  ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

export const WindowContent = styled.div<{ $maximized: boolean }>`
  position: relative;
  top: 0;
  left: 0;
  width: auto;
  transition: all 0.3s ease;
  overflow-y: auto;
  max-height: ${({ $maximized }) =>
    $maximized ? "calc(calc(var(--vh, 1vh) * 100) - 38px)" : "70vh"};

  ${({ theme }) => theme.media.mobile} {
    max-height: ${({ $maximized }) =>
      $maximized ? "calc(calc(var(--vh, 1vh) * 100) - 46px)" : "70vh"};
  }
`;

export const ScrollPercentageBar = styled(motion.div)`
  position: absolute;
  top: 38px;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 4px;

  background-color: #27c93f;

  ${({ theme }) => theme.media.mobile} {
    top: 46px;
  }
`;

export const Background3D = styled(motion.div)`
  --color-grey-200: #e0e0e0;
  --color-grey-300: #cfcfcf;
  --color-grey-400: #bfbfbf;
  --color-grey-500: #afafaf;
  --color-grey-600: #9f9f9f;
  --color-grey-700: #8f8f8f;

  position: absolute;
  top: 100px;
  left: 10%;
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;

  .side {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.1;
  }

  .front {
    transform: rotateY(0deg) translateZ(50px);

    background-color: var(--color-grey-200);
  }

  .right {
    transform: rotateY(90deg) translateZ(50px);

    background-color: var(--color-grey-300);
  }

  .back {
    transform: rotateY(180deg) translateZ(50px);

    background-color: var(--color-grey-400);
  }

  .left {
    transform: rotateY(-90deg) translateZ(50px);

    background-color: var(--color-grey-500);
  }

  .top {
    transform: rotateX(90deg) translateZ(50px);

    background-color: var(--color-grey-600);
  }

  .bottom {
    transform: rotateX(-90deg) translateZ(50px);

    background-color: var(--color-grey-700);
  }
`;
