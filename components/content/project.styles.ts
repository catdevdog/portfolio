import styled from "styled-components";
import Link from "next/link";

export const Wrap = styled.div`
  margin: 0 auto;
  max-width: 900px;
`;

export const Intro = styled.h2`
  margin: 2rem 0;

  font-size: 1.2rem;
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.2rem;

  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const ProjectCard = styled.div`
  padding-bottom: 2.5rem;

  font-size: 1rem;
  border-radius: 6px;

  h3 {
    margin-bottom: 0.6rem;
    padding-bottom: 0.6rem;
    word-break: auto-phrase;

    font-size: 1.4rem;
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
    margin-bottom: 0.6rem;
  }

  .tag {
    display: inline-block;
    padding: 0.2rem 0.5rem;

    background-color: #ff5f57;

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

    font-size: 0.9rem;

    &-item {
      strong {
        display: block;
        margin-bottom: 0.5rem;

        font-weight: bold;
      }
    }
  }

  .description {
    padding: 1rem 0 1.5rem;

    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;
    line-height: 1.4;
    white-space: pre-wrap;
    border-radius: 4px;
    word-break: auto-phrase;
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

export const Footer = styled.p`
  margin-top: 12rem;

  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  text-align: right;
  opacity: 0.5;

  a {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const Button = styled(Link)`
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
