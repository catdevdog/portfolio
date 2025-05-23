import { create } from "zustand";

interface CommandHistoryItem {
  type: "user" | "sys";
  command: string;
}

interface StoreState {
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
}

export const useStore = create<StoreState>((set, get) => ({
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
      get().addSystemCommandHistory("start portfolio...");

      get().setDisplayOpen(true);
      get().setFocusDisplay(true);
    },
    guide: () => {
      const currentCommand = get().currentCommand;
      get().addCommandHistory(currentCommand);
      get().addSystemCommandHistory("guide portfolio...");
    },
    cls: () => {
      get().clearCommandHistory();
    },
  },
}));
