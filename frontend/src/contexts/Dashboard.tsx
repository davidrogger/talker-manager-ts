import {
  Dispatch, ReactNode, SetStateAction, createContext, useContext, useState,
} from 'react';

import { getAllTalkers } from '@/services/api';

import { ITalker } from '@/types';

export type IDashboardContextProps = {
  isLoadingTalkers: boolean;
  setLoadingTalkers: Dispatch<SetStateAction<boolean>>;
  loadTalkers: () => Promise<void>;
  displayedTalkers: ITalker[];
}

const DashboardContext = createContext({} as IDashboardContextProps);

export default function DashboardProvider({ children }: { children:ReactNode }) {
  const [isLoadingTalkers, setLoadingTalkers] = useState<boolean>(true);
  const [displayedTalkers, setDisplayedTalkers] = useState<ITalker[]>([]);

  async function loadTalkers() {
    const { talkers } = await getAllTalkers();

    if (talkers) {
      setDisplayedTalkers(talkers);
    }

    setLoadingTalkers(false);
  }

  return (
    <DashboardContext.Provider value={{
      isLoadingTalkers, displayedTalkers, setLoadingTalkers, loadTalkers,
    }} >
      { children }
    </DashboardContext.Provider>
  );
}

export const useDashboardContext = () => useContext(DashboardContext);
