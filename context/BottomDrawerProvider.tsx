'use client';

import { createContext, ReactNode, useContext, useState } from "react";

type BottomDrawerContextType = {
  isOpen: boolean;
  currentModal: string | null;
  loadModal: (id: string, data?: unknown) => void;
  clearModal: () => void;
  openSidePanel: () => void;
  closeSidePanel: () => void;
  modalData: unknown;
};

const BottomDrawerContext = createContext<BottomDrawerContextType | undefined>(undefined);

type BottomDrawerProviderProps = {
  children: ReactNode;
};

export function BottomDrawerProvider({ children }: BottomDrawerProviderProps) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<unknown>(null);

  const openSidePanel = () => {
    setOpen(true)
  }

  const closeSidePanel = () => {
    setOpen(false)
  }

  const loadModal = (modal: string, data?: unknown) => {
    setCurrentModal(modal);
    setModalData(data);
  };

  const clearModal = () => {
    setCurrentModal(null)
    closeSidePanel()
  };


  return (
    <BottomDrawerContext.Provider 
      value={{ 
        isOpen,
        currentModal,
        loadModal,
        clearModal, 
        openSidePanel, 
        closeSidePanel,
        modalData
      }}
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