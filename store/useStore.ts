import { create } from "zustand";

interface CommandHistoryItem {
  type: "user" | "sys";
  command: string;
}

interface windowPosition {
  x: number;
  y: number;
}

interface StoreState {
  // theme
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;

  // 시작 상태 TODO: startState와 displayOpen는 같은 역할을 하는지, 개념적으로 분리가 필요한지.
  startState: boolean;
  setStartState: (start: boolean) => void;

  // 메인 디스플레이 토글
  displayOpen: boolean;
  setDisplayOpen: (open: boolean) => void;

  // 디스플레이 상태 / 현재 디스플레이에 표기 할 것
  windowArr: {
    name: string;
    state: boolean;
    focus: boolean; // 포커스 상태
  }[];
  addWindow: (Window: string) => void;
  removeWindow: (Window: string) => void;

  windowPositions: Record<string, windowPosition>;
  setWindowPosition: (windowName: string, position: windowPosition) => void;

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

export const useStore = create<StoreState>((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),

  startState: false,
  setStartState: (start) => set({ startState: start }),

  windowArr: [],
  addWindow: (Window) =>
    set((state) => {
      const existingWindow = state.windowArr.find(
        (item) => item.name === Window
      );
      if (existingWindow) {
        return {
          windowArr: state.windowArr.map((item) =>
            item.name === Window
              ? { ...item, state: true, focus: true }
              : {
                  ...item,
                  focus: false, // 다른 창을 열면 포커스 해제
                }
          ),
        };
      }
      return {
        windowArr: [
          ...state.windowArr,
          { name: Window, state: true, focus: true },
        ],
      };
    }),
  removeWindow: (Window) =>
    set((state) => ({
      windowArr: state.windowArr.map((item) =>
        item.name === Window ? { ...item, state: false, focus: false } : item
      ),
    })),

  windowPositions: {},
  setWindowPosition: (windowName: string, position: windowPosition) =>
    set((state) => ({
      windowPositions: {
        ...state.windowPositions,
        [windowName]: position,
      },
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
