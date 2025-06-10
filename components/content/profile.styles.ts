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
  position: relative;
  z-index: 1;
  width: 100%;

  font-size: 1.2rem;

  h2 {
    margin-bottom: 1.5rem;

    font-size: 4rem;
    line-height: 1.2;
    white-space: wrap;
    font-family: IntelOneMono;
    transition: 0.3s ease;
    word-break: keep-all;
  }

  &:not(:last-child) {
    margin-bottom: 8rem;
    padding-bottom: 8rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  }

  li {
    display: flex;
    justify-content: flex-start;
    gap: 0.5rem 1rem;
    flex-wrap: wrap;
    align-items: baseline;
    margin-bottom: 1rem;
  }

  .year {
    font-weight: bold;
    font-size: 1.1rem;
  }

  .name {
    border-left: 1px solid ${({ theme }) => theme.colors.text};
    padding-left: 1rem;

    font-size: 1.1rem;
  }

  .description {
    font-size: 1rem;
    word-break: keep-all;
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
`;

export const IntroPlus = styled.div`
  visibility: hidden;
  height: 0;
`;

export const Career = styled(content)``;

export const Education = styled(content)``;

export const Skill = styled(content)`
  ul {
    li {
      margin-bottom: 1rem;
      flex-flow: column wrap;
      justify-content: flex-start;
      gap: 0;

      .category {
        margin-right: 0.5rem;

        font-weight: bold;
        font-size: 1.2rem;
      }

      .description {
        margin-bottom: 0.5rem;

        color: ${({ theme }) => theme.colors.text};
        font-size: 0.85rem;
        opacity: 0.8;
      }

      .items {
        flex: 1 1 auto;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem 0.3rem;

        .item {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          border: 1px solid ${({ theme }) => theme.colors.text};
          border-radius: 100px;

          font-size: ${({ theme }) => theme.fontSizes.sm};
        }
      }
    }
  }
`;

export const Contact = styled(content)``;

export const Button = styled.button`
  position: relative;
  z-index: 1;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.text};

  background-color: transparent;

  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  line-height: 1.6;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover,
  &:focus-visible {
    background-color: rgb(255 255 255 / 10%);
  }

  ${({ theme }) => theme.media.mobile} {
    margin-top: 0.5rem;
    padding: 0.4rem 0.8rem;

    font-size: 0.9rem;
  }
`;
