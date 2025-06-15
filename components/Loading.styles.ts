import styled from "styled-components";

export const LoadingContainer = styled.div`
  display: flex;
  padding: 8rem 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  min-width: 300px;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .dot {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;

    background-color: #27c93f;
    will-change: transform;
  }

  p {
    margin-top: 2rem;

    font-size: 0.9rem;
  }
`;
