import { create } from "zustand";

interface CommandHistoryItem {
  type: "user" | "sys";
  command: string;
}

interface StoreState {
  startState: boolean;
  setStartState: (start: boolean) => void;

  // 명령어 이력
  commandHistory: CommandHistoryItem[];
  addCommandHistory: (command: string) => void;
  addSystemCommandHistory: (command: string) => void;

  // 현재 입력중인 명령어 (in input)
  currentCommand: string;
  setCurrentCommand: (command: string) => void;
  clearCurrentCommand: () => void;
  clearCommandHistory: () => void;

  // 메인 디스플레이 토글
  displayOpen: boolean;
  setDisplayOpen: (open: boolean) => void;

  // 모델 디스플레이 포커스
  focusDisplay: boolean;
  setFocusDisplay: (open: boolean) => void;

  // 정의된 명령어
  // definedCommands: string[];

  // command 실행

  definedFunctions: {
    [key: string]: () => void;
  };
  validateCommand: (command: string) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  startState: false,
  setStartState: (start) => set({ startState: start }),

  commandHistory: [],
  addCommandHistory: (command) =>
    set((state) => ({
      commandHistory: [...state.commandHistory, { type: "user", command }],
    })),
  addSystemCommandHistory: (command) =>
    set((state) => ({
      commandHistory: [...state.commandHistory, { type: "sys", command }],
    })),

  currentCommand: "",
  setCurrentCommand: (command) => set({ currentCommand: command }),

  clearCurrentCommand: () => set({ currentCommand: "" }),
  clearCommandHistory: () => set({ commandHistory: [] }),

  displayOpen: false,
  setDisplayOpen: (open) => set({ displayOpen: open }),

  focusDisplay: false,
  setFocusDisplay: (open) => set({ focusDisplay: open }),

  definedFunctions: {
    start: () => {
      const currentCommand = get().currentCommand;
      get().addCommandHistory(currentCommand);
      if (get().startState) {
        get().addSystemCommandHistory("already started...");
        return;
      }
      get().addSystemCommandHistory("start project...");
      get().setDisplayOpen(true);
      get().setFocusDisplay(true);
      get().setStartState(true);
    },
    guide: () => {
      get().addSystemCommandHistory("guide portfolio...");
    },
    cls: () => {
      get().clearCommandHistory();
    },

    menu: () => {
      get().addSystemCommandHistory("menu");
    },
    intro: () => {
      get().addSystemCommandHistory("intro");
    },
    project: () => {
      get().addSystemCommandHistory("project");
    },
    etc: () => {
      get().addSystemCommandHistory("etc");
    },
  },
  // 명령어 검증 후 실행
  validateCommand: (command) => {
    if (!get().startState) {
      console.log("wrong command", command);
      return;
    }

    // 명령어 유지/기록에 저장
    const currentCommand = get().currentCommand;
    get().addCommandHistory(currentCommand);

    // 명령어 검증
    if (get().definedFunctions[command] == undefined) {
      get().addSystemCommandHistory("존재하지 않는 명령어입니다.");
      get().clearCurrentCommand();
      return;
    }

    // 명령어 확인/실행
    const definedFunctions = get().definedFunctions;
    definedFunctions[command] && definedFunctions[command]();
    get().clearCurrentCommand();
  },
}));
