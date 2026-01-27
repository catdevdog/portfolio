import * as S from "./_3d.styles";
import styled from "styled-components";

const Dummy3DContainer = styled.div`
  width: 1000px;
  height: 500px;
`;

export const _3d = () => {
  return (
    <S.ContentContainer>
      <Dummy3DContainer>더미</Dummy3DContainer>
    </S.ContentContainer>
  );
};
