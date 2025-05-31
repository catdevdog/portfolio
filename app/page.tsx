"use client";

import HeroRenderer from "@/components/HeroRenderer";
import { useStore } from "@/store/useStore";
import { useEffect, useMemo, useRef } from "react";
import * as S from "./page.styles";
import { useCommandProcessor } from "@/store/useCommands";
import { Window } from "@/components/Window";

export default function Home() {
  const windowConstraintRef = useRef<HTMLDivElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const commandListRef = useRef<string[]>([
    "guide",
    "profile",
    "project",
    "etc",
    "cls",
  ]);

  const {
    startState,
    commandHistory,
    currentCommand,
    addCommandHistory,
    setCurrentCommand,
    displayOpen,
    windowArr,
  } = useStore((state) => state);

  // 명령어 입력시
  const handelKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addCommandHistory(currentCommand);
    }
  };

  // 클릭으로 시작
  const handleClick = () => {
    if (!startState && commandInputRef.current) {
      commandInputRef.current.value = "start";
      setCurrentCommand("start");
      addCommandHistory("start");
    } else if (startState) {
      addCommandHistory(currentCommand);
    }
  };

  const handleCommandClick = (command: string) => {
    addCommandHistory(command);
    setCurrentCommand(command);
  };

  useEffect(() => {
    commandInputRef.current?.focus();
  }, []);

  useCommandProcessor();

  return (
    <S.HomeContainer>
      <S.HeroSection id="HeroSection" $open={displayOpen}>
        <HeroRenderer />
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
      {startState && (
        <S.WindowContainer ref={windowConstraintRef}>
          {windowArr.map((window, index) => (
            // <AnimatePresence initial={false}>
            <Window
              windowName={window}
              key={`${window}_${index}`}
              dragConstraintsRef={windowConstraintRef}
            />
            // </AnimatePresence>
          ))}
        </S.WindowContainer>
      )}
    </S.HomeContainer>
  );
}
