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
    setDisplayState,
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
      addSystemCommandHistory("명령어를 입력하거나 클릭하세요.");
    },
    cls: () => {
      clearCommandHistory();
    },

    menu: () => {
      addSystemCommandHistory("menu");
    },
    intro: () => {
      addSystemCommandHistory("intro");
    },
    project: () => {
      addSystemCommandHistory("project");
      setDisplayState("project");
    },
    etc: () => {
      addSystemCommandHistory("etc");
    },
  };

  // 명령어 유효성 검사 및 실행
  const validateCommand = (command: string) => {
    if (handlers[command]) {
      handlers[command]();
    } else {
      addSystemCommandHistory(`Unknown command: ${command}`);
    }

    clearCurrentCommand();
  };

  useEffect(() => {
    if (currentCommand) {
      validateCommand(currentCommand);
    }
  }, [commandHistory]);
};
