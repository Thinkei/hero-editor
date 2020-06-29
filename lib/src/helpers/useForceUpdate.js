import { useState, useRef } from 'react';

const useForceUpdate = () => {
  const prev = useRef(0);
  const [curr, setCurr] = useState(0);
  const isForceUpdated = prev.current !== curr;
  prev.current = curr;
  return { isForceUpdated, forceUpdate: () => setCurr(curr + 1) };
};

export default useForceUpdate;
