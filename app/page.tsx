'use client';

import * as S from './page.styles';
import HeroRenderer from '@/components/HeroRenderer';

export default function Home() {
  return (
    <S.HomeContainer>
      <S.AccentText>Primanry Accent</S.AccentText>
      <S.SubText>Secondary Accent</S.SubText>

      <S.HeroSection>
        <HeroRenderer />
      </S.HeroSection>
    </S.HomeContainer>
  );
}
