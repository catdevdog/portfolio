import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // gap: 10rem;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.text};

  max-width: 700px;
  height: 100%;
  line-height: 1.5;
  padding-top: 10rem;
  div {
    width: 100%;
    &:not(:last-child) {
      padding-bottom: 8rem;
      margin-bottom: 8rem;
      border-bottom: 1px solid ${({ theme }) => theme.colors.text};
    }

    &:hover {
      h2 {
        padding-left: 0.5rem;
      }
    }
  }
  h2 {
    font-family: "IntelOneMono";
    font-size: 4rem;
    transition: 0.3s ease;
  }
`;

export const Intro = styled.div`
  width: 100%;
  h2 {
    font-family: unset;
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }
  p {
    font-size: 1.2rem;
    line-height: 1.8;
    margin-top: 1.2rem;
  }
`;

export const Career = styled.div``;

export const Education = styled.div``;

export const Skill = styled.div``;

export const Contact = styled.div``;
