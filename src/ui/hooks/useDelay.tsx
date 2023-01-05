import { useEffect, useState } from 'react';

import { sleep } from '../../lib/utils/sleep';

type useDelayType = () => {
  loading: boolean;
  delay: (ms: number) => void;
}

const useDelay: useDelayType = () => {
  const [loading, setLoading] = useState(false);
  const [delayMS, setDelayMS] = useState(0);

  const delay = async (ms: number) => {
    setDelayMS(ms);
    await sleep(ms);
  };

  console.log('loading>>>', loading);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      setDelayMS(0);
    }, delayMS);
    return () => clearTimeout(timer);
  }, [delayMS]);

  return {
    loading,
    delay,
  };
};

export default useDelay;
