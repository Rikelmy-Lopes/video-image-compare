import { useRef, useEffect, useState } from "react";
import "./App.css";

function App() {
    const slider = useRef<HTMLInputElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const updatePosition = (clientX: number) => {
        if (!container.current || !slider.current) return;

        const rect = container.current.getBoundingClientRect();
        let percent = ((clientX - rect.left) / rect.width) * 100;
        percent = Math.min(100, Math.max(0, percent));
        slider.current.value = String(percent);
        container.current.style.setProperty("--position", `${percent}%`);
    };

    useEffect(() => {
        if (!isDragging) return;

        const handleMove = (e: PointerEvent) => updatePosition(e.clientX);
        const handleUp = () => setIsDragging(false);

        window.addEventListener("pointermove", handleMove);
        window.addEventListener("pointerup", handleUp);

        return () => {
            window.removeEventListener("pointermove", handleMove);
            window.removeEventListener("pointerup", handleUp);
        };
    }, [isDragging]);

    return (
        <>
            <div className="container" ref={container}>
                <div className="image-container">
                    <video className="image-before slider-image" src="/video1.mp4" muted autoPlay></video>
                    <video className="image-after slider-image" src="/video2.mp4" muted autoPlay></video>
                </div>

                <input
                    ref={slider}
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    aria-label="Percentage of before photo shown"
                    className="slider"
                    style={{ pointerEvents: "none" }}
                    readOnly
                />
                <div
                    className="slider-line"
                    aria-hidden="true"
                    style={{ pointerEvents: "auto", cursor: "ew-resize" }}
                    onPointerDown={(e) => {
                        setIsDragging(true);
                        updatePosition(e.clientX);
                    }}
                ></div>
                <div className="slider-button" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 256 256">
                        <rect width="256" height="256" fill="none"></rect>
                        <line
                            x1="128"
                            y1="40"
                            x2="128"
                            y2="216"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        ></line>
                        <line
                            x1="96"
                            y1="128"
                            x2="16"
                            y2="128"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        ></line>
                        <polyline
                            points="48 160 16 128 48 96"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        ></polyline>
                        <line
                            x1="160"
                            y1="128"
                            x2="240"
                            y2="128"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        ></line>
                        <polyline
                            points="208 96 240 128 208 160"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="16"
                        ></polyline>
                    </svg>
                </div>
            </div>
        </>
    );
}

export default App;
