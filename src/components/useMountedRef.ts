import {MutableRefObject, useEffect, useRef} from 'react';

export function useMountedRef(): MutableRefObject<boolean> {
  let isMountedRef = useRef(false);
  useEffect(() => {
    isMountedRef.current = true;
    console.log('useMounted effect', isMountedRef.current);

    return () => {
      isMountedRef.current = false;
      console.log('useMounted 卸载', isMountedRef.current);
    };
  }, []);
  return isMountedRef;
}
