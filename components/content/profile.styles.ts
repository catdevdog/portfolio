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
`;

export const content = styled.div`
  width: 100%;

  h2 {
    font-family: "IntelOneMono";
    font-size: 4rem;
    transition: 0.3s ease;
  }
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
`;

export const Intro = styled(content)`
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
  button {
    position: relative;
    z-index: 1;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text};
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.text};
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover,
    &:focus-visible {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

export const IntroPlus = styled.div`
  height: 0px;
  visibility: hidden;
`;

export const Career = styled(content)``;

export const Education = styled(content)``;

export const Skill = styled(content)``;

export const Contact = styled(content)``;
