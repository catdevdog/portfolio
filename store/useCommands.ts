import { useStore } from "./useStore";
import { useEffect } from "react";

export const useCommandProcessor = () => {
  const {
    startState,
    setStartState,
    lastCommand,
    setLastCommand,
    clearCurrentCommand,
    currentCommand,
    commandHistory,
    addCommandHistory,
    clearCommandHistory,
    addWindow,
    setDisplayOpen,
    setFocusDisplay,
    addSystemCommandHistory,
  } = useStore((state) => state);

  // 명령어 정의
  const handlers: Record<string, () => void> = {
    start: () => {
      if (startState) {
        addSystemCommandHistory("already started...");
        return;
      }
      addSystemCommandHistory("start project...");
      setDisplayOpen(true);
      setFocusDisplay(true);
      setStartState(true);
    },
    guide: () => {
      addSystemCommandHistory(`
명령어 목록
┣━ guide: 명령어 안내
┣━ profile: 소개 페이지
┣━ project: 프로젝트
┣━ cls: 이력 초기화
┗━ etc: 기타 명령어
        `);
    },
    cls: () => {
      clearCommandHistory();
    },

    profile: () => {
      addSystemCommandHistory("profile");
      addWindow("Profile");
    },
    project: () => {
      addSystemCommandHistory("project");
      addWindow("Project");
    },
    etc: () => {
      addSystemCommandHistory("etc");
    },
  };

  // 명령어 유효성 검사 및 실행
  const validateCommand = (command: string) => {
    const fn = handlers[command];

    fn
      ? fn()
      : addSystemCommandHistory(`'${command}'는 유효하지 않은 명령어입니다.`);

    clearCurrentCommand();
  };

  useEffect(() => {
    if (currentCommand) {
      validateCommand(currentCommand);
    }
  }, [commandHistory]);
};
