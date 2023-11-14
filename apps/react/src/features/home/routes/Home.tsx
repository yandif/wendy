import { useDebugValue, useState } from 'react';
import { Link } from 'react-router-dom';

function useA(online?: boolean) {
  const [state, setState] = useState(online);
  // useDebugValue(state ? 'Online' : 'Offline');
  // useDebugValue(state ? 'a' : 'b');
  return state ? 'Online' : 'Offline';
}

export const Home = () => {
  const a = useA();
  const b = useA(true);
  return (
    <div>
      {a}
      {b}
      <Link to={'/demo/'}>demo</Link> <br />
      <Link to={'/auth/login'}>Login</Link> <br />
    </div>
  );
};
