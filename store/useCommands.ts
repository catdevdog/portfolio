import { add } from "three/tsl";
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
    windowArr,
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
  ┣━ project: 참여 프로젝트 목록
  ┣━ cls: 이력 초기화
  ┗━ etc: 기타 명령어
`);
    },
    cls: () => {
      clearCommandHistory();
    },

    profile: () => {
      addSystemCommandHistory("프로필을 불러오는 중...");
      validateWindowArr("Profile") && addWindow("Profile");
    },
    project: () => {
      addSystemCommandHistory("프로젝트를 불러오는 중...");
      validateWindowArr("Project") && addWindow("Project");
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

  // 창 상태 확인
  const validateWindowArr = (windowName: string): boolean => {
    if (windowArr.includes(windowName)) {
      addSystemCommandHistory(`이미 실행 중입니다.`);
      return false;
    }
    addSystemCommandHistory(`${windowName} 실행 중...`);
    return true;
  };

  useEffect(() => {
    if (currentCommand) {
      validateCommand(currentCommand);
    }
  }, [commandHistory]);
};
