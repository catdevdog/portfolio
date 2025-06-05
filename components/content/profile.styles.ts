import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  height: 100%;
  margin: 0 auto;
  padding-top: 10rem;

  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  max-width: 700px;
`;

export const content = styled.div`
  width: 100%;

  font-size: 1.2rem;

  h2 {
    font-family: IntelOneMono;

    font-size: 4rem;
    transition: 0.3s ease;
  }

  &:not(:last-child) {
    margin-bottom: 8rem;
    padding-bottom: 8rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  }

  &:hover {
    h2 {
      padding-left: 0.5rem;
    }
  }

  ${({ theme }) => theme.media.mobile} {
    font-size: 1rem;

    h2 {
      font-size: 2.5rem;

      &:hover {
        padding-left: 0;
      }
    }

    &:not(:last-child) {
      margin-bottom: 4rem;
      padding-bottom: 4rem;
      border-bottom: none;
    }
  }
`;

export const Intro = styled(content)`
  width: 100%;

  h2 {
    margin-bottom: 2rem;

    font-size: 2.5rem;
    font-family: unset;
  }

  p {
    margin-top: 1.2rem;

    line-height: 1.8;
  }

  button {
    position: relative;
    z-index: 1;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.text};

    background-color: transparent;

    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover,
    &:focus-visible {
      background-color: rgb(255 255 255 / 10%);
    }
  }
`;

export const IntroPlus = styled.div`
  visibility: hidden;
  height: 0;
`;

export const Career = styled(content)``;

export const Education = styled(content)``;

export const Skill = styled(content)``;

export const Contact = styled(content)``;
