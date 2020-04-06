import {useCallback, useEffect, useRef} from "react";

function useRefCallback<T extends (...arg:any[]) => any>(fn:T,deps:Array<any>):T {
    const ref = useRef(null);
    useEffect(()=>{
        ref.current = fn as any;
    },[fn]);
    return useCallback<T>(function () {
        // @ts-ignore
        return ref.current.apply(this, arguments);
    } as T, [ref]);
}
export {useRefCallback}
