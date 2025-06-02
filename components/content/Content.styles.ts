import styled from "styled-components";

export const ContentContainer = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.spacing.lg} 4rem;
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;
