import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useCallback,
} from "react";
import { useUnityContext } from "react-unity-webgl";

// Create UnityGame context
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UnityGameContext = createContext<any>(null);

interface GameProviderProps {
  children: ReactNode;
}

export const UnityGameProvider: React.FC<GameProviderProps> = ({
  children,
}) => {
  const { isLoaded, unityProvider } = useUnityContext({
    loaderUrl: "build/Build/Build.loader.js",
    dataUrl: "build/Build/Build.data",
    frameworkUrl: "build/Build/Build.framework.js",
    codeUrl: "build/Build/Build.wasm",
  });

  //susssss

  return (
    <UnityGameContext.Provider
      value={{
        isLoaded,
        unityProvider,
      }}
    >
      {children}
    </UnityGameContext.Provider>
  );
};

export default UnityGameContext;
