import styled from "styled-components";
import { motion } from "motion/react";

export const Window = styled(motion.div)`
  position: fixed;
  // width: 75%;
  // height: 100%;
  max-height: calc(100vh - 40px);
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.windowHeader.background};
  border-radius: 7px;
  color: ${({ theme }) => theme.colors.text};
  background-color: rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
  backdrop-filter: blur(4px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const WindowHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  background-color: ${({ theme }) => theme.windowHeader.background};
  border-radius: 6px 6px 0 0;
  position: relative;
`;

export const WindowTrafficLights = styled.div`
  display: flex;
  gap: 8px;
`;

export const WindowTrafficLight = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  cursor: pointer;
`;

export const WindowTitle = styled.div`
  position: absolute;
  font-family: ${({ theme }) => theme.systemFontFamily};
  color: #eee;

  left: 50%;
  transform: translateX(-50%);
`;
