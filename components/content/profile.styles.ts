import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10rem;
  margin: 0 auto;
  color: #444;

  max-width: 700px;
  height: 100%;
  line-height: 1.5;
  padding-top: 10rem;
  div {
    // border: 1px solid #444;
    width: 100%;
    &:hover {
      h2 {
        color: ${({ theme }) => theme.colors.text};
        transition: color 0.3s ease;
      }
    }
  }
  h2 {
    font-family: "IntelOneMono";
    font-size: 4rem;
  }
`;

export const Intro = styled.div`
  width: 100%;
  h2 {
    font-family: unset;
    font-size: 2rem;
  }
`;

export const Career = styled.div``;

export const Education = styled.div``;

export const Skill = styled.div``;

export const Contact = styled.div``;
