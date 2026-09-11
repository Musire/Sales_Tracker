'use client';

import { createContext, ReactNode, useContext, useMemo } from "react";
import { LoadModalOptions, useDrawerState } from "./useDrawerState";

type BottomDrawerContextType = {
  isOpen: boolean;
  isLoading: boolean;
  currentModal: string | null;
  modalData: unknown;
  loadModal: (id: string, options?: LoadModalOptions) => void;
  clearModal: () => void;
  openSidePanel: () => void;
  closeSidePanel: () => void;
};

const BottomDrawerContext = createContext<BottomDrawerContextType | undefined>(undefined);

type BottomDrawerProviderProps = {
  children: ReactNode;
};

export function BottomDrawerProvider({ children }: BottomDrawerProviderProps) {
  const drawerState = useDrawerState()

  const value = useMemo(() => drawerState, [
    drawerState.isOpen,
    drawerState.isLoading,
    drawerState.currentModal,
    drawerState.modalData,
    drawerState.loadModal,
    drawerState.clearModal,
  ]);

  return (
    <BottomDrawerContext.Provider 
      value={value}
    >
      {children}
    </BottomDrawerContext.Provider>
  );
}

export function useBottomDrawer() {
  const context = useContext(BottomDrawerContext);
  if (!context) {
    throw new Error("useBottomDrawer must be used within BottomDrawerProvider");
  }
  return context;
}