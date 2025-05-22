'use client';

import * as S from './page.styles';
import HeroRenderer from '@/components/HeroRenderer';
import { useState, useEffect } from 'react';

export default function Home() {
  const [commandState, setCommandState] = useState<string>('');
  const [focusCommandState, setFocusCommand] = useState<boolean>(false);

  useEffect(() =>{ 
    setFocusCommand(commandState.length > 0);
  }, [commandState]);

  return (
    <S.HomeContainer>
      <S.HeroSection>
        <HeroRenderer
          focusCommand={focusCommandState}
          command={commandState}
        />
        <S.ControlBox>
          <S.HeroCommandInput
            value={commandState}
            onChange={(e) => setCommandState(e.target.value)}
            placeholder="Type 'start' or click '>'"
          />
          <S.HeroCommandButton>
            {'>'}
          </S.HeroCommandButton>
        </S.ControlBox>
      </S.HeroSection>
    </S.HomeContainer>
  );
}
