"use client";

import HeroRenderer from "@/components/HeroRenderer";
import { Window } from "@/components/Window";
import ARROW from "@/public/icons/right-arrow.png";
import THEME from "@/public/icons/theme.json";
import { useCommandProcessor } from "@/store/useCommands";
import { useStore } from "@/store/useStore";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import * as S from "./page.styles";

const LANG = [
  "HELLO!",
  "MY",
  "NAME",
  "IS",
  "KANG-MINGU",
  "I'M",
  "FRONT-END",
  "DEVELOPER",
  "ICONS-BY-ICONS8",
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
  const {
    theme,
    setTheme,
    startState,
    currentCommand,
    addCommandHistory,
    setCurrentCommand,
    displayOpen,
    windowArr,
  } = useStore((state) => state);

  // 명령어 감지 프로세서
  const { handlers } = useCommandProcessor({ watch: true });
  const themeButtonRef = useRef<LottieRefCurrentProps>(null);
  const windowConstraintRef = useRef<HTMLDivElement>(null);
  const commandInputRef = useRef<HTMLInputElement>(null);
  const commandListRef = useRef<
    {
      label: string;
      value: string;
    }[]
  >([
    {
      label: "명령어 안내 보기",
      value: "guide",
    },
    {
      label: "프로필",
      value: "profile",
    },
    {
      label: "프로젝트",
      value: "project",
    },
  ]);

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

  // 명령어 입력 후 클릭 (=enter)
  const handleCommandClick = (command: string) => {
    setCurrentCommand(command);
    addCommandHistory(command);
  };

  const updateVh = () => {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
  };

  // active check
  const isActive = (command: string) => {
    return windowArr.some(
      (window) => window.name.toLowerCase() === command && window.state
    );
  };

  // 테마 토글
  const toggleTheme = () => {
    if (!themeButtonRef.current) return;
    const currentTheme = theme;
    if (currentTheme === "light") {
      themeButtonRef.current.playSegments([0, 12], true);
      setTheme("dark");
    } else {
      themeButtonRef.current.playSegments([12, 0], true);
      setTheme("light");
    }
  };

  useEffect(() => {
    commandInputRef.current?.focus();
    themeButtonRef.current?.pause();
    window.addEventListener("resize", updateVh);
    // 뷰포트 높이 업데이트
    handlers.start();
    handlers.profile();
    updateVh();
  }, []);

  return (
    <S.HomeContainer>
      <S.BackgroundText>
        {[...LANG, ...LANG].map((lang, idx) => (
          <span key={`${lang}_${idx}`}>{lang}</span>
        ))}
      </S.BackgroundText>
      <S.HeroSection id="HeroSection" $open={displayOpen}>
        <HeroRenderer />
        <S.ControlBox>
          {(true || startState) && (
            <S.RecommendedCommand>
              {commandListRef.current.map((item, index) => (
                <S.RecommendedCommandItem
                  key={index}
                  onClick={() => handleCommandClick(item.value)}
                  $active={index > 0 ? isActive(item.value) : true}
                >
                  {item.label}
                </S.RecommendedCommandItem>
              ))}
            </S.RecommendedCommand>
          )}
          <S.themeButton onClick={toggleTheme}>
            <Lottie
              animationData={THEME}
              loop={false}
              lottieRef={themeButtonRef}
            />
          </S.themeButton>
          <S.HeroCommandInput
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            placeholder={
              !startState ? `"start" or click button` : "Type command here"
            }
            onKeyDown={(e) => handelKeyDown(e)}
            ref={commandInputRef}
            id="commandInput"
            maxLength={15}
          />
          <S.HeroCommandButton onClick={handleClick}>
            <Image width={46} src={ARROW} alt="명령어 입력하기" />
          </S.HeroCommandButton>
        </S.ControlBox>
      </S.HeroSection>
      {startState && windowArr.length && (
        <S.WindowContainer ref={windowConstraintRef}>
          {windowArr.map(
            (window, index) =>
              // <AnimatePresence initial={false}>
              /**
               * state로 제어하는 방식으로 변경
               * 배열 자체는 수정하지 않고 객체 속성으로 제어
               */
              window.state && (
                <Window
                  windowData={window}
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
