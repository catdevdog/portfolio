import styled from "styled-components";

export const Wrap = styled.div`
  margin: 0 auto;
  max-width: 800px;
`;

export const Intro = styled.h2`
  margin: 3rem 0;

  font-size: 1.2rem;
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const ProjectCard = styled.div`
  border-radius: 8px;
  margin-bottom: 3rem;

  font-size: 1rem;

  h3 {
    margin-bottom: 0.8rem;
    padding-bottom: 0.8rem;

    font-size: 1.5rem;
    line-height: 1.2;
    border-bottom: 1px solid ${({ theme }) => theme.colors.text};

    ${({ theme }) => theme.media.mobile} {
      font-size: 1.5rem;
    }
  }

  .status {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .tag {
    display: inline-block;
    padding: 0.3rem 0.5rem;
    border: 1px solid #27c93f;

    background-color: #27c93f;

    color: #fff;
    font-size: 0.9rem;
    flex: 0 0 auto;
    border-radius: 100px;
  }

  .date {
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;
    flex: 0 0 auto;
  }

  .info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;

    &-item {
      strong {
        display: block;
        margin-bottom: 0.5rem;

        font-weight: bold;
        font-size: 1rem;
      }
    }
  }

  .ai-summary {
    opacity: 0.8;

    h4 {
      margin-bottom: 0.2rem;

      font-style: normal;
    }

    margin-top: 0.5rem;
    padding: 0.5rem 0;

    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;
    line-height: 1.4;

    border-radius: 8px;

    p {
      margin: 0;
      padding: 0.6rem;
      border: 1px solid ${({ theme }) => theme.colors.text};

      background-color: ${({ theme }) => theme.colors.background};
      border-radius: 4px;

      white-space: break-spaces;
      word-break: break-all;
    }
  }
`;
