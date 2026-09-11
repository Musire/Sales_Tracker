import { ActionResponse } from '@/domains/identity/types';
import { useCallback, useRef, useState, useTransition } from 'react';

export type LoadModalOptions<T = any, A extends any[] = any[]> = {
  data?: T;
  fetchFn?: (...args: A) => Promise<ActionResponse<T>>;
  fetchArgs?: A;
};

export function useDrawerState() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const requestIdRef = useRef(0);
  const isLoadingRef = useRef(false);

  const openSidePanel = useCallback(() => setIsOpen(true), []);
  const closeSidePanel = useCallback(() => setIsOpen(false), []);

  const loadModal = useCallback(<T, A extends any[]>(modal: string, options?: LoadModalOptions<T, A>) => {
    // 1. Ref-based guard prevents triggers while loading without closure staleness
    if (isLoadingRef.current) return;

    const currentRequestId = ++requestIdRef.current;
    
    setCurrentModal(modal);
    setIsOpen(true);

    // Case 1: Pre-fetched data provided directly
    if (options?.data !== undefined) {
      setModalData(options.data);
      setIsLoading(false);
      isLoadingRef.current = false;
      return;
    }

    // Case 2: Async fetch function provided
    if (options?.fetchFn) {
      setIsLoading(true);
      isLoadingRef.current = true;
      setModalData(null);

      const fetcher = options.fetchFn;
      // Properly typed cast for optional rest arguments
      const args = (options.fetchArgs ?? []) as unknown as A;

      // Wrap state updates in startTransition, keep async execution clean outside
      (async () => {
        try {
          const res = await fetcher(...args);
          if (currentRequestId === requestIdRef.current) {
            startTransition(() => {
              setModalData(res?.data);
            });
          }
        } catch (err) {
          if (currentRequestId === requestIdRef.current) {
            console.error("Failed to load panel data:", err);
          }
        } finally {
          if (currentRequestId === requestIdRef.current) {
            setIsLoading(false);
            isLoadingRef.current = false;
          }
        }
      })();
      return;
    }

    // Case 3: Opened without payload
    setModalData(null);
    setIsLoading(false);
    isLoadingRef.current = false;
  }, []);

  const clearModal = useCallback(() => {
    // Invalidate any in-flight fetches when the drawer is closed
    requestIdRef.current++;
    isLoadingRef.current = false;
    
    setCurrentModal(null);
    setModalData(null);
    setIsLoading(false);
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    isLoading: isLoading || isPending,
    currentModal,
    modalData,
    loadModal,
    clearModal,
    openSidePanel,
    closeSidePanel,
  };
}