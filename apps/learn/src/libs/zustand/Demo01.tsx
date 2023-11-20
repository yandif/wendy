import { create } from 'zustand';
import { Chrome } from '../../components/Chrome';
import { useCountStore } from './stores/countStore';

type State = {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
};

const useStore = create<State>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
useStore.subscribe((state) => {
  console.log(state);
});
useStore.setState({ bears: 1 });
useStore.getState();

export const Demo01 = () => {
  const state = useCountStore();

  return (
    <Chrome center={false} tall label="基础知识">
      <div className="px-60">
        <button
          className="mr-8"
          onClick={() => state.dispatch({ type: 'increment', qty: 1 })}>
          加一
        </button>
        <button onClick={() => state.dispatch({ type: 'decrement', qty: 1 })}>
          减一
        </button>
        <h2> {state.count}</h2>
      </div>
    </Chrome>
  );
};
