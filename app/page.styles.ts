import styled from "styled-components";
import { motion } from "motion/react";

export const HomeContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};

  height: 100vh;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: space-between;
  overflow: hidden;

  ${({ theme }) => theme.media.mobile} {
    display: block;
  }
`;

export const BackgroundText = styled.div`
  position: absolute;
  top: 0;
  left: -1rem;
  bottom: -1rem;
  right: -1rem;
  overflow: hidden;
  font-family: "IntelOneMono";
  pointer-events: none;
  span {
    font-size: 10.1vw;
    color: transparent;
    opacity: 0.04;
    line-height: 0.55;
    letter-spacing: -0.09em;
    word-break: break-all;
    -webkit-text-stroke: 3px ${({ theme }) => theme.colors.text};
  }
  span:nth-child(even) {
    // odd
    color: ${({ theme }) => theme.colors.text};
    -webkit-text-stroke: 0px;
  }

  ${({ theme }) => theme.media.mobile} {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    span {
      font-size: 20vw;
      -webkit-text-stroke: 1px ${({ theme }) => theme.colors.text};
    }
  }
`;
export const HeroSection = styled.div<{ $open: boolean }>`
  flex: 0 0 400px;
  overflow: hidden;
  text-align: left;

  // 초기 진입시 css트릭
  transform: translateX(
    ${({ $open }) => ($open ? "0%" : "calc(50vw - 170px)")}
  );
  transition: transform ${({ $open }) => ($open ? "1.5s" : "0s")} ease-in-out;

  ${({ theme }) => theme.media.mobile} {
    height: 100vh;
    display: flex;
    flex-direction: column;
    transform: none;
  }
`;

export const ControlBox = styled.div`
  width: 320px;
  min-width: 320px;
  max-width: 340px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 8px;

  ${({ theme }) => theme.media.mobile} {
    // 모바일일때 부모(HeroSection) display: flex; direction: column;
    flex: 1 1 auto;
    width: auto;
    max-width: calc(100% - 32px);
    margin: 0;
    padding: 0 16px 100px 16px;
    gap: 8px;
  }
`;

export const HeroCommandInput = styled.input`
  flex: 1 0 auto;
  height: 22px;
  padding: 12px 0;

  font-family: ${({ theme }) => theme.systemFontFamily};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.text};
  z-index: 10;

  &:focus-visible {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const HeroCommandButton = styled.button`
  font-family: ${({ theme }) => theme.systemFontFamily};
  flex: 0 0 48px;
  height: 48px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const RecommendedCommand = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-family: ${({ theme }) => theme.systemFontFamily};
  color: #ffffff;
  white-space: pre-wrap;
  margin-top: 4px;
  gap: 4px;

  ${({ theme }) => theme.media.mobile} {
    justify-content: center;
    gap: 8px;
  }
`;

export const RecommendedCommandItem = styled.button`
  font-family: ${({ theme }) => theme.systemFontFamily};
  background: rgba(0, 0, 0, 0);
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.text};
  background-color: rgba(255, 255, 255, 0.03);
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: 4px 4px;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

// Window
export const WindowContainer = styled(motion.div)`
  flex: 1 1 75%;
  position: relative;
  height: 100%;

  ${({ theme }) => theme.media.mobile} {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 200px);
  }
`;
