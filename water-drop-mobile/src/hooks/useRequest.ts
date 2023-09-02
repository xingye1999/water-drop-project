import { useCallback, useState } from 'react';
import useMount from './useMount';

interface IOptions {
  params: Record<string, string>
  manual?: boolean
  onSucess?: (res: unknown) => void
  onError?: (res: unknown) => void
}

/**
 * 1.实现组件初始化，发送请求获取数据
 * 2.手动触发请求
 * @param service
 * @param params
 * @returns
 */
const useRequest = (
  service: (params: Record<string, string>) => Promise<unknown>,
  options: IOptions,
) => {
  const [data, setData] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(false);
  // useCallback 防止init重新创建
  const init = useCallback(
    (curParams: Record<string, string>) => {
      setLoading(true);
      service(curParams)
        .then((res) => {
          setData(res);
          setLoading(false);
          if (options.onSucess) {
            options.onSucess(res);
          }
        })
        .catch((error) => {
          setLoading(false);
          if (options.onError) {
            options.onError(error);
          }
        });
    },
    [service],
  );

  useMount(() => {
    if (!options.manual) {
      init(options.params);
    }
  });

  const run = (runParams: Record<string, string>) => {
    init(runParams);
  };

  return [loading, data, run];
};

export default useRequest;
