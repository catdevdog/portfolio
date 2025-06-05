import styled from "styled-components";

export const ContentContainer = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.spacing.lg} 4rem;

  font-size: ${({ theme }) => theme.fontSizes.lg};

  ${({ theme }) => theme.media.mobile} {
    padding: ${({ theme }) => theme.spacing.md};
    word-break: break-all;
  }
`;
