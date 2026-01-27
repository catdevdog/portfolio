import styled from "styled-components";

// 컨텐츠 전체 공통
export const ContentContainer = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.spacing.lg} 4rem;

  font-family: Pretendard-Regular;

  font-size: ${({ theme }) => theme.fontSizes.lg};

  ${({ theme }) => theme.media.mobile} {
    padding: ${({ theme }) => theme.spacing.md};
    word-break: break-all;
  }
`;
