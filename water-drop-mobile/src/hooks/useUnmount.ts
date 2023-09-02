import { useEffect } from 'react';
import useLatest from './useLatest';
/**
 * 组件卸载时运行
 * @param fn
 */
const useUnmount = (fn: () => void) => {
  // 获取最新value+防止不必要的更新(fn一般是一个固定的方法)
  const fnRef = useLatest(fn);
  useEffect(() => fnRef.current(), []);
};
export default useUnmount;
