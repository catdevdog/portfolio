import { useEffect } from "react";
import { useStore } from "./useStore";

type TypeCommandProcessorProps = {
  watch?: boolean; // 명령어 감시 여부
};

export const useCommandProcessor = ({ watch }: TypeCommandProcessorProps) => {
  const {
    startState,
    setStartState,
    clearCurrentCommand,
    currentCommand,
    commandHistory,
    windowArr,
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
      validateWindowArr("Profile");
    },
    project: () => {
      addSystemCommandHistory("프로젝트를 불러오는 중...");
      validateWindowArr("Project");
    },
    etc: () => {
      addSystemCommandHistory("etc");
    },
  };

  // 명령어 유효성 검사 및 실행
  const validateCommand = (command: string) => {
    const fn = handlers[command.toLowerCase()];

    if (fn) fn();
    else addSystemCommandHistory(`'${command}'는 유효하지 않은 명령어입니다.`);

    clearCurrentCommand();
  };

  // 창 상태 확인
  const validateWindowArr = (windowName: string) => {
    if (startState === false) handlers.start();

    if (windowArr.some((item) => item.name === windowName && item.state))
      addSystemCommandHistory(`${windowName} 이미 실행 중입니다.`);
    else addSystemCommandHistory(`${windowName} 실행 중...`);

    // 없는 창이면 추가, 있는 창이면 state, focus 상태 변경
    addWindow(windowName);
  };

  // 함수들 외부에서 실행할때 validateCommand 중복 검사 방지
  useEffect(() => {
    if (currentCommand && watch) {
      validateCommand(currentCommand);
    }
  }, [commandHistory]);

  return {
    validateCommand,
    validateWindowArr,
    handlers,
  };
};
