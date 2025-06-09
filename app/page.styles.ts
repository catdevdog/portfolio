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
  display: flex;
  position: relative;
  width: 320px;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 8px;
  min-width: 320px;
  max-width: 340px;

  ${({ theme }) => theme.media.mobile} {
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    left: 0.5rem;
    width: auto;
    margin: 0;
    max-width: none;
    min-width: 0;
  }
`;

export const HeroCommandInput = styled.input`
  z-index: 10;
  height: 22px;
  padding: 12px 52px 12px 16px;
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
  right: 0;
  bottom: 0;
  z-index: 10;
  width: 46px;
  height: 46px;
  padding: 0;
  border: none;

  background-color: transparent;

  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  border-radius: 100px;
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

  ${({ theme }) => theme.media.mobile} {
    transform: rotate(-90deg);

    &:hover {
      transform: rotate(-90deg);
    }
  }
`;

export const RecommendedCommand = styled.div`
  display: flex;
  width: 100%;
  margin-top: 4px;

  color: #fff;
  white-space: pre-wrap;
  flex-wrap: wrap;
  justify-content: space-around;
  font-family: ${({ theme }) => theme.systemFontFamily};
  gap: 8px;

  ${({ theme }) => theme.media.mobile} {
    gap: 8px;
  }
`;

export const RecommendedCommandItem = styled.button<{ $active?: boolean }>`
  position: relative;
  flex: 0 0 auto;
  padding: 4px 8px;
  border: none;

  background-color: rgb(255 255 255 / 3%);

  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: Pretendard-Regular;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: rgb(255 255 255 / 10%);
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 0;
    }
  }

  &::before {
    position: absolute;
    top: 1px;
    left: 1px;
    z-index: 1;

    width: 6px;
    height: 6px;

    background-color: #ff5f57;
    content: "";
    border-radius: 50%;

    animation: blink 2s infinite;
  }
  ${({ $active }) =>
    $active &&
    `
    &::before {
      animation: none;
      background-color: #27c93f;
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
    height: calc(100% - 100px - 0.5rem);
  }
`;
