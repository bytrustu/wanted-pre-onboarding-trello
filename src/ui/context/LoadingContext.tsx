import { createContext, useMemo, useState } from 'react';

type LoadingContextType = {
  loading: boolean;
  onChangeLoading: (isLoading: boolean) => void;
}

type LoadingProviderProps = {
  children: React.ReactNode;
}

const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  onChangeLoading: () => {},
});

const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = useState(false);
  const onChangeLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  const value = useMemo(() => ({ loading, onChangeLoading }), [loading]);

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

const { Consumer: LoadingConsumer } = LoadingContext;
export { LoadingProvider, LoadingConsumer };
export default LoadingContext;
