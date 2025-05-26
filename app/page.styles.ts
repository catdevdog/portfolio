import styled from "styled-components";

export const HomeContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};

  height: 100vh;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: space-between;
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
  flex: 0 0 380px;
  overflow: hidden;
  text-align: left;

  // 초기 진입시 css트릭
  transform: translateX(
    ${({ $open }) => ($open ? "0%" : "calc(50vw - 190px)")}
  );
  transition: transform ${({ $open }) => ($open ? "1.5s" : "0s")} ease-in-out;
`;

export const ControlBox = styled.div`
  width: 340px;
  min-width: 340px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 8px;
`;

export const HeroCommandInput = styled.input`
  font-family: "DungGeunMo";
  padding: 12px 0;

  background-color: ${({ theme }) => theme.colors.background};
  color: white;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  border-bottom: 2px solid ${({ theme }) => theme.colors.text};
  z-index: 10;
  height: 22px;

  &:focus-visible {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const HeroCommandButton = styled.button`
  font-family: "DungGeunMo";
  flex: 0 0 48px;
  height: 48px;
  font-size: 24px;
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
  font-family: "DungGeunMo";
  color: #ffffff;
  white-space: pre-wrap;
  margin-top: 4px;
  font-size: 20px;
`;

export const RecommendedCommandItem = styled.button`
  font-family: "DungGeunMo";
  background: rgba(0, 0, 0, 0);
  border: none;
  border-bottom: 2px solid #eee;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  padding: 4px 8px;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

// Main Content
export const MainDisplayContainer = styled.div`
  flex: 0 1 75%;
  height: calc(100% - 40px);
  // border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
`;
