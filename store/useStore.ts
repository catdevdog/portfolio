import { create } from "zustand";

interface CommandHistoryItem {
  type: "user" | "sys";
  command: string;
}

interface StoreState {
  // 시작 상태 TODO: startState와 displayOpen는 같은 역할을 하는지, 개념적으로 분리가 필요한지.
  startState: boolean;
  setStartState: (start: boolean) => void;

  // 메인 디스플레이 토글
  displayOpen: boolean;
  setDisplayOpen: (open: boolean) => void;

  // 디스플레이 상태 / 현재 디스플레이에 표기 할 것
  displayArr: string[];
  addDisplay: (display: string) => void;
  removeDisplay: (display: string) => void;

  // 명령어 이력
  commandHistory: CommandHistoryItem[];
  addCommandHistory: (command: string) => void;
  addSystemCommandHistory: (command: string) => void;
  clearCommandHistory: () => void;

  // 실제로 쓰인 마지막 명령어
  lastCommand: CommandHistoryItem | undefined;
  setLastCommand: (command: CommandHistoryItem) => void;

  // 현재 입력중인 명령어 (only input)
  currentCommand: string;
  setCurrentCommand: (command: string) => void;
  clearCurrentCommand: () => void;

  // 모델 디스플레이 포커스
  focusDisplay: boolean;
  setFocusDisplay: (open: boolean) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  startState: false,
  setStartState: (start) => set({ startState: start }),

  displayArr: [],
  addDisplay: (display) =>
    set((state) => {
      // 있는 디스플레이는 제일 뒤로
      if (state.displayArr.includes(display)) {
        return {
          displayArr: state.displayArr
            .filter((d) => d !== display)
            .concat(display),
        };
      }
      return {
        displayArr: [...state.displayArr, display],
      };
    }),
  removeDisplay: (display) =>
    set((state) => ({
      displayArr: state.displayArr.filter((d) => d !== display),
    })),

  commandHistory: [],
  addCommandHistory: (command) =>
    set((state) => ({
      commandHistory: [...state.commandHistory, { type: "user", command }],
    })),
  addSystemCommandHistory: (command) =>
    set((state) => ({
      commandHistory: [...state.commandHistory, { type: "sys", command }],
    })),

  lastCommand: undefined,
  setLastCommand: (command) =>
    set((state) => ({
      commandHistory: [...state.commandHistory, command],
    })),

  currentCommand: "",
  setCurrentCommand: (command) => set({ currentCommand: command }),

  clearCurrentCommand: () => set({ currentCommand: "" }),
  clearCommandHistory: () => set({ commandHistory: [] }),

  displayOpen: false,
  setDisplayOpen: (open) => set({ displayOpen: open }),

  focusDisplay: false,
  setFocusDisplay: (open) => set({ focusDisplay: open }),
}));
