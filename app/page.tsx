"use client";

import HeroRenderer from "@/components/HeroRenderer";
import { useStore } from "@/store/useStore";
import { useEffect, useRef } from "react";
import * as S from "./page.styles";

export default function Home() {
  const commandInputRef = useRef<HTMLInputElement>(null);
  const commandListRef = useRef<string[]>([
    "menu",
    "intro",
    "project",
    "cls",
    "etc",
  ]);

  const {
    startState,
    commandHistory,
    currentCommand,
    addCommandHistory,
    setCurrentCommand,
    clearCurrentCommand,
    displayOpen,
    setDisplayOpen,
    definedFunctions,
    validateCommand,
  } = useStore((state) => state);

  // 명령어 입력시
  const handelKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (currentCommand === "start") {
        setDisplayOpen(true);
        definedFunctions.start();
        clearCurrentCommand();
      } else validateCommand(currentCommand);
    }
  };

  // 마우스로 클릭시
  const handleClick = () => {
    if (commandInputRef.current) {
      commandInputRef.current.value = "start";
      setCurrentCommand("start");
      definedFunctions.start();
      clearCurrentCommand();
    }
  };

  const handleCommandClick = (command: string) => {
    setCurrentCommand(command);
    validateCommand(command);
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
            placeholder={
              !startState
                ? `Type 'start' or click '>'`
                : "Use the command below"
            }
            onKeyDown={(e) => handelKeyDown(e)}
            ref={commandInputRef}
            id="commandInput"
            maxLength={15}
          />
          <S.HeroCommandButton onClick={() => handleClick()}>
            {">"}
          </S.HeroCommandButton>
          {startState && (
            <S.RecommendedCommand>
              {/* <span>추천 : </span> */}
              {commandListRef.current.map((item, index) => (
                <S.RecommendedCommandItem
                  key={index}
                  onClick={() => handleCommandClick(item)}
                >
                  {item}
                </S.RecommendedCommandItem>
              ))}
            </S.RecommendedCommand>
          )}
        </S.ControlBox>
      </S.HeroSection>
      <S.MainDisplay>dd</S.MainDisplay>
    </S.HomeContainer>
  );
}
