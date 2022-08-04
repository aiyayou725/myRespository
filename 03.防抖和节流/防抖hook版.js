import { useEffect, useCallback, useRef } from 'react';
export default function useDebounce(fn, wait, dep = []) {
  const { current } = useRef({ fn, timer: null });
  useEffect(() => {
    current.fn = fn;
  }, fn);
  return useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.apply(this, args);
    }, wait)
  }, dep)
}