import type { FC } from 'react';
import { useReducer } from 'react';

enum CountActionKind {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
}

interface CountAction {
  type: CountActionKind;
  payload?: number;
}

interface CountState {
  count: number;
}

function counterReducer(state: CountState, action: CountAction) {
  const { type, payload = 1 } = action;
  switch (type) {
    case CountActionKind.INCREASE:
      return {
        ...state,
        count: state.count + payload,
      };
    case CountActionKind.DECREASE:
      return {
        ...state,
        count: state.count - payload,
      };
    default:
      return state;
  }
}

const Counter: FC = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: CountActionKind.INCREASE })}>
        -
      </button>
      <button onClick={() => dispatch({ type: CountActionKind.DECREASE })}>
        +
      </button>
    </div>
  );
};

export default Counter;
