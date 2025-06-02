"use client";

import HeroRenderer from "@/components/HeroRenderer";
import { useStore } from "@/store/useStore";
import { useEffect, useRef } from "react";
import * as S from "./page.styles";
import { useCommandProcessor } from "@/store/useCommands";
import { Window } from "@/components/Window";

const LANG = [
  "HELLO!",
  "MY",
  "NAME",
  "IS",
  "KANG-MINGU",
  "I'M",
  "FRONT-END",
  "DEVELOPER",
  "MY-SKILL-SET@",
  "HTML",
  "CSS",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "JQUERY",
  "VUE",
  "REACT",
  "NEXT",
  "NUXT",
  "VITE",
  "ROUTER",
  "ZUSTAND",
  "PINIA",
  "SCSS",
  "TAILWIND",
  "STYLED-COMPONENTS",
  "FIREBASE",
  "VERCEL",
  "GCP",
  "NODE",
  "EXPRESS",
  "MYSQL",
  "GIT",
];

export default function Home() {
  const windowConstraintRef = useRef<HTMLDivElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const commandListRef = useRef<string[]>([
    "guide",
    "profile",
    "project",
    "etc",
    "cls",
    "skill",
  ]);

  const {
    startState,
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
    setCurrentCommand(command);
    addCommandHistory(command);
  };

  useEffect(() => {
    commandInputRef.current?.focus();
  }, []);

  useCommandProcessor();

  return (
    <S.HomeContainer>
      <S.BackgroundText>
        {LANG.map((lang, idx) => (
          <span key={`${lang}_${idx}`}>{lang}</span>
        ))}
      </S.BackgroundText>
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
          {windowArr.map(
            (window, index) =>
              // <AnimatePresence initial={false}>
              /**
               * 이름이 있는 경우(false가 아닌경우) 렌더링하도록 변경, 꺼진 경우 'windowName' -> false
               * windowArr.length에 영향이 없기 때문에 리렌더링 되지 않음 -> 팝업 시 깜빡임 이슈 해결
               * typeof 로 제어하는게 괜찮은 방법인지는 재고할 필요가 있음
               */
              window.state && (
                <Window
                  windowName={window.name}
                  key={`${window}_${index}`}
                  dragConstraintsRef={windowConstraintRef}
                />
              )
            // </AnimatePresence>
          )}
        </S.WindowContainer>
      )}
    </S.HomeContainer>
  );
}
