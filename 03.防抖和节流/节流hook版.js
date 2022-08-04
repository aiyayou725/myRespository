import { useEffect, useCallback, useRef } from "react";

export default function useThrottle(fn, wait, dep = []) {
  const { current } = useRef({ fn, timer: null });
  useEffect(function () {
    current.fn = fn;
  }, [fn])
  return useCallback(function f(...args) {
    if (!current.timer) {
      current.timer = setTimeout(() => {
        delete current.timer
      }, wait)
      current.fn.apply(this, ...args)
    }
  }, dep)
}