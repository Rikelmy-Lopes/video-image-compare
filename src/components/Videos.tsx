import "../css/Videos.css";
import { useEffect, useRef } from "react";
import { syncVideos, togglePlayPause } from "../utils/video";

function Videos() {
    const leftVideo = useRef<HTMLVideoElement>(null);
    const rightVideo = useRef<HTMLVideoElement>(null);

    function syncVideosHelper(e: React.SyntheticEvent<HTMLVideoElement, Event>) {
        syncVideos(e, leftVideo, rightVideo);
    }

    function togglePlayPauseHelper(e: KeyboardEvent) {
        togglePlayPause(e, leftVideo, rightVideo);
    }

    useEffect(() => {
        window.addEventListener("keydown", togglePlayPauseHelper);

        return () => {
            window.removeEventListener("keydown", togglePlayPauseHelper);
        };
    }, []);

    return (
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
    );
}

export default Videos;
