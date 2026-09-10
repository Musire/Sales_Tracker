'use client';

import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { useCallback, useEffect, useRef, useState } from "react";
import { PANEL_REGISTRY } from "./PanelRegistry";

export default function BottomDrawer() {
    const { isOpen, currentModal, clearModal, modalData } = useBottomDrawer();
    const [renderedModal, setRenderedModal] = useState(currentModal);
    const [isVisible, setIsVisible] = useState(false);
    
    // Dragging state variables
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    
    // Mutable refs for high-frequency touch event calculations
    const isDraggingRef = useRef(false);
    const startYRef = useRef(0);
    const currentOffsetRef = useRef(0);
    const drawerRef = useRef<HTMLElement | null>(null);

    // Look up component in registry
    const ActiveComponent = renderedModal ? PANEL_REGISTRY[renderedModal] : null;

    // --- Animation & Paint Syncing ---
    useEffect(() => {
        if (currentModal) {
            setRenderedModal(currentModal);
            setDragOffset(0);
            currentOffsetRef.current = 0;

            // Double requestAnimationFrame forces mobile browsers to paint 
            // the translate3d(0, 100%, 0) state prior to triggering the slide-up transition
            let animFrame1: number;
            let animFrame2: number;

            animFrame1 = requestAnimationFrame(() => {
                animFrame2 = requestAnimationFrame(() => {
                    setIsVisible(true);
                });
            });

            return () => {
                cancelAnimationFrame(animFrame1);
                cancelAnimationFrame(animFrame2);
            };
        } else {
            setIsVisible(false);
            const timer = setTimeout(() => {
                setRenderedModal(null);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [currentModal]);

    // --- Touch / Drag Event Engine ---
    const handleTouchStart = (clientY: number) => {
        isDraggingRef.current = true;
        setIsDragging(true);
        startYRef.current = clientY;
    };

    const handleTouchMove = useCallback((e: TouchEvent | MouseEvent) => {
        if (!isDraggingRef.current) return;
        
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const deltaY = clientY - startYRef.current;
        
        // Prevent background pulling on mobile Safari / Chrome
        if (e.cancelable) e.preventDefault();

        if (deltaY >= 0) {
            currentOffsetRef.current = deltaY;
            setDragOffset(deltaY);
        }
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (!isDraggingRef.current) return;
        
        isDraggingRef.current = false;
        setIsDragging(false);

        if (drawerRef.current) {
            const drawerHeight = drawerRef.current.offsetHeight;
            // Clear modal if dragged down past 30% of height
            if (currentOffsetRef.current > drawerHeight * 0.3) {
                clearModal();
            } else {
                setDragOffset(0);
                currentOffsetRef.current = 0;
            }
        }
    }, [clearModal]);

    // Attach global listeners during drag cycles so rapid gestures don't drop target focus
    useEffect(() => {
        if (!isDragging) return;

        const onTouchMove = (e: TouchEvent) => handleTouchMove(e);
        const onMouseMove = (e: MouseEvent) => handleTouchMove(e);
        const onEnd = () => handleTouchEnd();

        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend', onEnd);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onEnd);

        return () => {
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onEnd);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onEnd);
        };
    }, [isDragging, handleTouchMove, handleTouchEnd]);

    if (!isOpen && !renderedModal) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center">
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={clearModal} />

            <aside 
                ref={drawerRef}
                style={{
                    transform: isDragging
                        ? `translate3d(0, ${dragOffset}px, 0)`
                        : isVisible
                            ? "translate3d(0, 0, 0)"
                            : "translate3d(0, 100%, 0)",
                    transition: isDragging ? "none" : "transform 300ms cubic-bezier(0.32, 0.72, 0, 1)",
                    willChange: "transform",
                }}
                className="fixed bottom-0 z-50 border border-border w-full md:max-w-xl bg-background rounded-t-2xl shadow-2xl flex flex-col  max-h-[85dvh] overflow-hidden"
            >
                {/* Drag Handle Zone */}
                <div 
                    className="w-full flex justify-center py-4 cursor-grab active:cursor-grabbing touch-none select-none shrink-0"
                    onTouchStart={(e) => handleTouchStart(e.touches[0].clientY)}
                    onMouseDown={(e) => handleTouchStart(e.clientY)}
                >
                    <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
                </div>

                {/* Dynamic Content Body Container with Fallback Diagnostics */}
                <div className="overflow-y-auto flex-1 h-full w-full flex p-6 pt-0 overscroll-contain">
                    {ActiveComponent ? (
                        <ActiveComponent data={modalData} />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-2">
                            <p className="text-sm font-semibold text-destructive">
                                Unable to render panel
                            </p>
                            <div className="p-3 bg-muted rounded-md text-xs font-mono text-muted-foreground w-full break-all text-left">
                                <div><strong>Key Requested:</strong> {String(renderedModal)}</div>
                                <div><strong>Registered Keys:</strong> {Object.keys(PANEL_REGISTRY).join(", ") || "None"}</div>
                                <div><strong>Modal Data:</strong> {modalData ? JSON.stringify(modalData) : "null/undefined"}</div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );
}