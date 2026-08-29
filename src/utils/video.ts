type VideoRef = React.RefObject<HTMLVideoElement | null>;

const thresholdMilliseconds = 25;

export function togglePlayPause(e: KeyboardEvent, leftVideo: VideoRef, rightVideo: VideoRef) {
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

export function syncVideos(e: React.SyntheticEvent<HTMLVideoElement, Event>, leftVideo: VideoRef, rightVideo: VideoRef) {
    if (leftVideo.current && rightVideo.current) {
        const deltaMilliseconds = (leftVideo.current.currentTime - rightVideo.current.currentTime) * 1000;
        if (Math.abs(deltaMilliseconds) >= thresholdMilliseconds) {
            leftVideo.current.currentTime = e.currentTarget.currentTime;
            rightVideo.current.currentTime = e.currentTarget.currentTime;
            console.log("sincronizando");
        }
    }
}
