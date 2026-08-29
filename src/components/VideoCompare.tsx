import { useRef } from "react";
import Videos from "./Videos";
import SliderIcon from "./SliderIcon";

function VideoCompare() {
    const slider = useRef<HTMLInputElement>(null);
    const container = useRef<HTMLDivElement>(null);

    const updatePosition = (clientX: number) => {
        if (!container.current || !slider.current) return;

        const rect = container.current.getBoundingClientRect();
        let percent = ((clientX - rect.left) / rect.width) * 100;
        percent = Math.min(100, Math.max(0, percent));
        slider.current.value = String(percent);
        container.current.style.setProperty("--position", `${percent}%`);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        updatePosition(e.clientX);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            updatePosition(e.clientX);
        }
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    return (
        <>
            <div className="container" ref={container}>
                <Videos />

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
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                ></div>

                <SliderIcon />
            </div>
        </>
    );
}

export default VideoCompare;
