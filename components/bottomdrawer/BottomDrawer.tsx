'use client';
import { useBottomDrawer } from "@/context/BottomDrawerProvider";
import { useEffect, useRef, useState } from "react";
import { PANEL_REGISTRY } from "./PanelRegistry";

export default function BottomDrawer() {
    const { isOpen, currentModal, clearModal, modalData } = useBottomDrawer();
    const [renderedModal, setRenderedModal] = useState(currentModal);
    const [isVisible, setIsVisible] = useState(false);
    
    // Dragging state variables
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startYRef = useRef(0);
    const drawerRef = useRef<HTMLElement | null>(null);

    const ActiveComponent = renderedModal
            ? PANEL_REGISTRY[renderedModal]
            : null;

    useEffect(() => {
        if (currentModal) {
            setRenderedModal(currentModal);
            setDragOffset(0); // Reset offset on open
            // Force a micro-delay/next frame so the initial translateY(100%) renders first, 
            // then triggers the transition to translateY(0)
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 10);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
            const timer = setTimeout(() => {
                setRenderedModal(null);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [currentModal]);

    // --- Touch / Drag Handlers ---
    const handleTouchStart = (clientY: number) => {
        setIsDragging(true);
        startYRef.current = clientY;
    };

    const handleTouchMove = (clientY: number) => {
        if (!isDragging) return;
        const deltaY = clientY - startYRef.current;
        // Only allow dragging downwards (positive delta)
        if (deltaY >= 0) {
            setDragOffset(deltaY);
        }
    };

    const handleTouchEnd = () => {
        if (!isDragging || !drawerRef.current) return;
        setIsDragging(false);

        const drawerHeight = drawerRef.current.offsetHeight;
        // Check if dragged down at least 50%
        if (dragOffset > drawerHeight * 0.5) {
            clearModal();
        } else {
            // Snap back up
            setDragOffset(0);
        }
    };

    if (!isOpen && !renderedModal) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center">
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={clearModal} />

            <aside 
                ref={drawerRef}
                style={{
                    transform: renderedModal
                    ? isDragging
                        ? `translateY(${dragOffset}px)`
                        : isVisible
                            ? "translateY(0)"
                            : "translateY(100%)"
                    : "translateY(100%)",
                    transition: isDragging ? "none" : "transform 300ms ease-in-out",
                }}
                onTouchStart={(e) => handleTouchStart(e.touches[0].clientY)}
                onTouchMove={(e) => handleTouchMove(e.touches[0].clientY)}
                onTouchEnd={handleTouchEnd}
                onMouseDown={(e) => handleTouchStart(e.clientY)}
                onMouseMove={(e) => isDragging && handleTouchMove(e.clientY)}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
                className="fixed z-50 border border-border w-full md:max-w-xl bg-background rounded-t-2xl shadow-2xl p-6 flex flex-col max-h-[85vh] select-none touch-none"
            >
                {/* Drawer Notch / Grab Bar */}
                <div className="w-full flex justify-center pb-4 cursor-grab active:cursor-grabbing">
                    <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full" />
                </div>

                {/* Dynamic Component Body */}
                <div className="overflow-y-auto flex-1 z-50">
                    {ActiveComponent ? <ActiveComponent data={modalData} /> : null}
                </div>
            </aside>
        </div>
    );
}