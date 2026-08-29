import { useRef, useEffect } from "react";
import { syncVideos, togglePlayPause } from "../utils/video";

function VideoCompare() {
    const leftVideo = useRef<HTMLVideoElement>(null);
    const rightVideo = useRef<HTMLVideoElement>(null);
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

    function togglePlayPauseHelper(e: KeyboardEvent) {
        togglePlayPause(e, leftVideo, rightVideo);
    }

    function syncVideosHelper(e: React.SyntheticEvent<HTMLVideoElement, Event>) {
        syncVideos(e, leftVideo, rightVideo);
    }

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

    useEffect(() => {
        window.addEventListener("keydown", togglePlayPauseHelper);

        return () => {
            window.removeEventListener("keydown", togglePlayPauseHelper);
        };
    }, []);

    return (
        <>
            <div className="container" ref={container}>
                <div className="video-container">
                    <video
                        className="video-before slider-video"
                        ref={leftVideo}
                        onTimeUpdate={syncVideosHelper}
                        src="/video1.mp4"
                        muted
                        autoPlay
                        loop
                    ></video>
                    <video className="video-after slider-video" ref={rightVideo} src="/video2.mp4" muted autoPlay loop></video>
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
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                ></div>
                <div className="slider-button" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
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

export default VideoCompare;
