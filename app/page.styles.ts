import styled from "styled-components";
import { motion } from "motion/react";

export const HomeContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};

  height: 100vh;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: space-between;
  overflow: hidden;
`;

export const AccentText = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
`;

export const SubText = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
`;

interface HeroSectionProps {
  $open: boolean;
}

export const HeroSection = styled.div<HeroSectionProps>`
  flex: 0 0 18%;
  min-width: 340px;
  max-width: 460px;
  overflow: hidden;
  text-align: left;

  // 초기 진입시 css트릭
  transform: translateX(
    ${({ $open }) => ($open ? "0%" : "calc(50vw - 170px)")}
  );
  transition: transform ${({ $open }) => ($open ? "1.5s" : "0s")} ease-in-out;
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
  justify-content: space-between;
  font-family: ${({ theme }) => theme.systemFontFamily};
  color: #ffffff;
  white-space: pre-wrap;
  margin-top: 4px;
  gap: 4px;
`;

export const RecommendedCommandItem = styled.button`
  font-family: ${({ theme }) => theme.systemFontFamily};
  background: rgba(0, 0, 0, 0);
  border: none;
  border-bottom: 2px solid #eee;
  background-color: ${({ theme }) => theme.colors.background};
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
  // margin: 10px;
`;
