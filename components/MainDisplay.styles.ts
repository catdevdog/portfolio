import styled from "styled-components";

export const MainDisplay = styled.div`
  color: ${({ theme }) => theme.colors.text};
  height: 100%;
  max-height: calc(100vh - 40px);
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  position: fixed;
  width: auto;
`;
