"use client";

import HeroRenderer from "@/components/HeroRenderer";
import { useStore } from "@/store/useStore";
import { useEffect, useMemo, useRef } from "react";
import * as S from "./page.styles";
import { useCommandProcessor } from "@/store/useCommands";
import { Window } from "@/components/Window";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const windowConstraintRef = useRef<HTMLDivElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const commandListRef = useRef<string[]>([
    "guide",
    "profile",
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
    displayOpen,
    windowArr,
    windowPositions,
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

  useEffect(() => {
    // console.log("log---", commandHistory);
  }, [commandHistory]);

  useEffect(() => {
    // windowArr.forEach((windowName) => {
    //   const position = windowPositions[windowName];
    //   if (position && windowConstraintRef.current) {
    //     const windowElement = document.getElementById(`window ${windowName}`);
    //     if (windowElement) {
    //       windowElement.style.transform = `translate(${position.x}px, ${position.y}px)`;
    //     }
    //   }
    // });
  }, [windowArr.length]);

  const WindowsRenderer = useMemo(
    () => (
      <S.WindowContainer ref={windowConstraintRef}>
        {windowArr.map((window, index) => (
          <Window
            windowName={window}
            key={`${window}_${index}`}
            dragConstraintsRef={windowConstraintRef}
          />
        ))}
      </S.WindowContainer>
    ),
    [windowArr.length]
  );

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
        {windowArr}
      </S.HeroSection>
      {/* {startState && WindowsRenderer} */}
      {startState && (
        <S.WindowContainer ref={windowConstraintRef}>
          {windowArr.map((window, index) => (
            <Window
              windowName={window}
              key={`${window}_${index}`}
              dragConstraintsRef={windowConstraintRef}
            />
          ))}
        </S.WindowContainer>
      )}
    </S.HomeContainer>
  );
}
