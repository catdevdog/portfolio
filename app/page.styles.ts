import styled from "styled-components";
import { motion } from "motion/react";

export const HomeContainer = styled.div`
  display: flex;
  overflow: hidden;
  height: calc(var(--vh, 1vh) * 100);

  background-color: ${({ theme }) => theme.colors.background};

  color: ${({ theme }) => theme.colors.text};
  justify-content: space-between;

  ${({ theme }) => theme.media.mobile} {
    display: block;
  }
`;

export const BackgroundText = styled.div`
  overflow: hidden;
  position: absolute;
  inset: 0 -1rem -1rem;
  font-family: IntelOneMono;
  pointer-events: none;

  span {
    color: transparent;
    font-size: 10.1vw;
    line-height: 0.55;
    letter-spacing: -0.09em;
    opacity: 0.04;
    word-break: break-all;
    -webkit-text-stroke: 3px ${({ theme }) => theme.colors.text};
  }

  span:nth-child(even) {
    color: ${({ theme }) => theme.colors.text};
    -webkit-text-stroke: 0;
  }

  ${({ theme }) => theme.media.mobile} {
    inset: 0;

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

  /* 초기 진입시 css트릭 */

  transform: translateX(
    ${({ $open }) => ($open ? "0%" : "calc(50vw - 200px)")}
  );
  transition: transform ${({ $open }) => ($open ? "1.5s" : "0s")} ease-in-out;

  ${({ theme }) => theme.media.mobile} {
    position: relative;
    height: calc(var(--vh, 1vh) * 100);
    transform: none;
  }
`;

export const ControlBox = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 8px;
  width: 320px;
  min-width: 320px;
  max-width: 340px;
  margin: 0 auto;

  ${({ theme }) => theme.media.mobile} {
    position: absolute;
    right: 16px;
    bottom: 16px;
    left: 10px;
    width: auto;
    margin: 0;
    max-width: calc(100% - 32px);
  }
`;

export const HeroCommandInput = styled.input`
  z-index: 10;
  height: 22px;
  padding: 12px 16px;
  // border: 1px solid ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 100px;

  background-color: rgb(255 255 255 / 80%);
  box-shadow: 2px 4px 4px rgb(0 0 0 / 10%);

  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  flex: 1 0 auto;
  font-family: ${({ theme }) => theme.systemFontFamily};

  &:focus-visible,
  &:hover {
    background-color: #fff;
  }
`;

export const HeroCommandButton = styled.button`
  position: absolute;
  z-index: 10;
  right: 0px;
  bottom: 0px;
  height: 46px;
  width: 46px;
  padding: 0;
  border: none;
  border-radius: 100px;
  background-color: transparent;

  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  font-family: ${({ theme }) => theme.systemFontFamily};
  flex: 0 0 48px;
  cursor: pointer;
  transform: rotate(-180deg);
  transition: transform 0.3s ease;

  &:hover {
    transform: rotate(0deg);
  }

  &:focus-visible {
    transform: rotate(0deg);
    outline: 1px solid ${({ theme }) => theme.colors.text};
  }
`;

export const RecommendedCommand = styled.div`
  display: flex;
  width: 100%;
  margin-top: 4px;

  color: #fff;
  white-space: pre-wrap;
  flex-wrap: wrap;
  justify-content: space-between;
  font-family: ${({ theme }) => theme.systemFontFamily};
  gap: 8px;

  ${({ theme }) => theme.media.mobile} {
    justify-content: center;
    gap: 8px;
  }
`;

export const RecommendedCommandItem = styled.button<{ $active?: boolean }>`
  flex: 1 0 auto;
  padding: 4px 8px;
  border: none;
  border: 1px solid ${({ theme }) => theme.colors.text};

  background-color: rgb(255 255 255 / 3%);

  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: Pretendard-Regular;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: rgb(255 255 255 / 10%);
  }

  ${({ theme }) => theme.media.mobile} {
    border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0;
    }
  }

  ${({ $active, theme }) =>
    $active &&
    `
    position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 1px;
        left: 1px;

        width: 6px;
        height: 6px;
        background-color: #27C93F;
        z-index: 1;

        // animation: blink 1s infinite;
      }
    `}
`;

// Window
export const WindowContainer = styled(motion.div)`
  flex: 1 1 75%;
  position: relative;
  height: 100%;

  ${({ theme }) => theme.media.mobile} {
    position: fixed;
    top: 0.5rem;
    right: 0.5rem;
    left: 0.5rem;
    z-index: 10;
    height: calc(100% - 110px - 0.5rem);
  }
`;
