import styled from "styled-components";
import { motion } from "motion/react";

export const Window = styled(motion.div)`
  position: absolute;

  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.windowHeader.background};
  border-radius: 7px;
  color: ${({ theme }) => theme.colors.text};
  // background-color: rgba(255, 255, 255, 0.4);
  box-sizing: border-box;
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 100vh;
  overflow: hidden;

  ${({ theme }) => theme.media.mobile} {
    z-index: 10;
    max-height: calc(100vh - 200px);
    background-color: ${({ theme }) => theme.colors.background};
    backdrop-filter: none;
    border-radius: 0;
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
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: ${({ theme }) => theme.windowHeader.background};
  border-radius: 6px 6px 0 0;
  position: relative;
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
    border-radius: 0;
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
  font-family: ${({ theme }) => theme.systemFontFamily};
  color: #eee;

  left: 50%;
  transform: translateX(-50%);

  ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

export const WindowContent = styled.div<{ $maximized: boolean }>`
  position: relative;
  top: 0px;
  left: 0;
  width: auto;
  transition: all 0.3s ease;
  overflow-y: auto;
  max-height: ${({ $maximized }) =>
    $maximized ? "calc(100vh - 38px)" : "70vh"};
`;

export const ScrollPercentageBar = styled(motion.div)`
  position: absolute;
  top: 38px;
  left: 0;
  height: 4px;
  background-color: #27c93f;
  width: 100%;
  z-index: 10;
`;

export const Background3D = styled(motion.div)`
  // motion.div로 변경
  width: 100px;
  height: 100px;
  position: absolute;
  transform-style: preserve-3d;
  left: 10%;
  top: 100px;
  // 초기 transform 설정

  // perspective: 500px; // 3D 효과를 위한 원근감 설정

  .side {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.1;
  }

  --color-grey-200: #e0e0e0;
  --color-grey-300: #cfcfcf;
  --color-grey-400: #bfbfbf;
  --color-grey-500: #afafaf;
  --color-grey-600: #9f9f9f;
  --color-grey-700: #8f8f8f;

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
