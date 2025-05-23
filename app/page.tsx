"use client";

import * as S from "./page.styles";
import HeroRenderer from "@/components/HeroRenderer";
import { useState, useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";

export default function Home() {
  const commandInputRef = useRef<HTMLInputElement>(null);

  const {
    commandHistory,
    currentCommand,
    addCommandHistory,
    setCurrentCommand,
    clearCurrentCommand,
    displayOpen,
    setDisplayOpen,
    definedFunctions,
  } = useStore((state) => state);

  const handelKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (definedFunctions[currentCommand]) {
        definedFunctions[currentCommand]();
        clearCurrentCommand();
      } else {
        console.log("wrong command", currentCommand);
      }
    }
  };

  const handleClick = () => {
    if (commandInputRef.current) {
      commandInputRef.current.value = "start";
      setCurrentCommand("start");
      definedFunctions.start();
      clearCurrentCommand();
    }
  };

  useEffect(() => {
    commandInputRef.current?.focus();
  }, []);

  useEffect(() => {
    console.log("log---", commandHistory);
  }, [commandHistory]);

  return (
    <S.HomeContainer>
      <S.HeroSection id="HeroSection" $open={displayOpen}>
        <HeroRenderer command={currentCommand} />
        <S.ControlBox>
          <S.HeroCommandInput
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            placeholder="Type 'start' or click '>'"
            onKeyDown={(e) => handelKeyDown(e)}
            ref={commandInputRef}
            id="commandInput"
            maxLength={15}
          />
          <S.HeroCommandButton onClick={() => handleClick()}>
            {">"}
          </S.HeroCommandButton>
        </S.ControlBox>
      </S.HeroSection>
      <S.MainDisplay>dd</S.MainDisplay>
    </S.HomeContainer>
  );
}
