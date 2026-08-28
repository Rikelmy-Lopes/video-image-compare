import { useState, useRef, useEffect } from "react";
import "./App.css";

const thresholdMilliseconds = 25;

function App() {
    const [range, setRange] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const leftVideo = useRef<HTMLVideoElement>(null);
    const rightVideo = useRef<HTMLVideoElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setRange(percentage);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                handleMove(e.clientX);
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (isDragging) {
                handleMove(e.touches[0].clientX);
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("touchmove", handleTouchMove);
            window.addEventListener("mouseup", handleMouseUp);
            window.addEventListener("touchend", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchend", handleMouseUp);
        };
    }, [isDragging]);

    useEffect(() => {
        function toggleState(e: KeyboardEvent) {
            if (e.code === "Space") {
                if (leftVideo.current && rightVideo.current) {
                    if (leftVideo.current.paused && rightVideo.current.paused) {
                        leftVideo.current.play();
                        rightVideo.current.play();
                    } else {
                        leftVideo.current.pause();
                        rightVideo.current.pause();
                    }
                }
            }
        }

        function syncVideos(this: HTMLVideoElement, _e: Event) {
            if (leftVideo.current && rightVideo.current) {
                const deltaMilliseconds = (leftVideo.current.currentTime - rightVideo.current.currentTime) * 1000;
                if (Math.abs(deltaMilliseconds) >= thresholdMilliseconds) {
                    leftVideo.current.currentTime = this.currentTime;
                    rightVideo.current.currentTime = this.currentTime;
                    console.log("sincronizando");
                }
            }
        }
        window.addEventListener("keydown", toggleState);

        if (leftVideo.current && rightVideo.current) {
            leftVideo.current.addEventListener("timeupdate", syncVideos);
        }

        window.addEventListener("resize", () => {});

        return () => {
            window.removeEventListener("keydown", toggleState);
            if (leftVideo.current) {
                leftVideo.current.removeEventListener("timeupdate", syncVideos);
            }
        };
    }, []);

    return (
        <div className="container">
            <div className="video-container" ref={containerRef}>
                <video
                    ref={leftVideo}
                    style={{ clipPath: `inset(0 0 0 ${range}%)`, position: "absolute", top: 0, left: 0 }}
                    className="video-item"
                    src="/video1.mp4"
                    muted
                    autoPlay
                    loop
                />
                <video
                    ref={rightVideo}
                    style={{ clipPath: `inset(0 ${100 - range}% 0 0)`, position: "absolute", top: 0, left: 0 }}
                    className="video-item"
                    src="/video2.mp4"
                    muted
                    autoPlay
                    loop
                />
                <div
                    className="slider-line"
                    onMouseDown={() => setIsDragging(true)}
                    onTouchStart={() => setIsDragging(true)}
                    style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: `${range}%`,
                        width: "10px",
                        backgroundColor: "transparent",
                        cursor: "ew-resize",
                        zIndex: 10,
                        transform: "translateX(-50%)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            width: "2px",
                            height: "100%",
                            backgroundColor: "#fff",
                        }}
                    />
                    <div
                        className="slider-button"
                        style={{
                            position: "absolute",
                            width: "16px",
                            height: "16px",
                            backgroundColor: "#fff",
                            borderRadius: "50%",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
