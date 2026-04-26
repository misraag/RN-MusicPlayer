import { createContext, useContext } from 'react';
import { usePlayer } from '../hooks/usePlayer';

const PlayerContext = createContext<any>(null);

export const PlayerProvider = ({ children }: any) => {
  const player = usePlayer();

  return (
    <PlayerContext.Provider value={player}>
      {children}
    </PlayerContext.Provider>
  );
};

export const useGlobalPlayer = () => {
  return useContext(PlayerContext);
};