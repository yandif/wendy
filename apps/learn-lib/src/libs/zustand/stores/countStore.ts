import { create } from 'zustand';

type State = {
  count: number;
  dispatch: (action: Action) => void;
};

type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
};

type Action = {
  type: keyof Actions;
  qty: number;
};

const countReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.qty };
    case 'decrement':
      return { count: state.count - action.qty };
    default:
      return state;
  }
};

export const useCountStore = create<State>((set) => ({
  count: 0,
  dispatch: (action) => set((state) => countReducer(state, action)),
}));
