import React, { useState, useRef, useEffect, useCallback } from "react";

export default function BeforeAfterVideoSlider({ beforeSrc, afterSrc }) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [scale, setScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);

    const scaledContentRef = useRef(null);
    const beforeVideoRef = useRef(null);
    const afterVideoRef = useRef(null);

    // Sincronização dos vídeos
    useEffect(() => {
        const v1 = beforeVideoRef.current;
        const v2 = afterVideoRef.current;
        if (!v1 || !v2) return;

        const syncPlay = () => v2.play();
        const syncPause = () => v2.pause();
        const syncSeek = () => {
            v2.currentTime = v1.currentTime;
        };

        v1.addEventListener("play", syncPlay);
        v1.addEventListener("pause", syncPause);
        v1.addEventListener("seeking", syncSeek);

        return () => {
            v1.removeEventListener("play", syncPlay);
            v1.removeEventListener("pause", syncPause);
            v1.removeEventListener("seeking", syncSeek);
        };
    }, []);

    // Atualiza a posição do divisor
    const handleMove = useCallback((clientX) => {
        if (!scaledContentRef.current) return;
        const rect = scaledContentRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) handleMove(e.clientX);
        };
        const handleTouchMove = (e) => {
            if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
        };
        const handleStopDrag = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleStopDrag);
            window.addEventListener("touchmove", handleTouchMove);
            window.addEventListener("touchend", handleStopDrag);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleStopDrag);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleStopDrag);
        };
    }, [isDragging, handleMove]);

    const handleWheel = (e) => {
        e.preventDefault();
        setScale((prev) => Math.min(Math.max(1, prev - e.deltaY * 0.002), 4));
    };

    return (
        <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", fontFamily: "sans-serif" }}>
            {/* Controle de Zoom */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <label htmlFor="zoom-input">Zoom:</label>
                <input id="zoom-input" type="range" min="1" max="4" step="0.1" value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} />
                <span>{scale.toFixed(1)}x</span>
                <button onClick={() => setScale(1)}>Resetar Zoom</button>
            </div>

            {/* Janela de Visualização (Viewport) */}
            <div
                onWheel={handleWheel}
                style={{
                    position: "relative",
                    width: "100%",
                    height: "500px",
                    overflow: "hidden",
                    backgroundColor: "#000",
                    userSelect: "none",
                }}
            >
                {/* Container Escalado */}
                <div
                    ref={scaledContentRef}
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        transform: `scale(${scale})`,
                        transformOrigin: "center center",
                        transition: isDragging ? "none" : "transform 0.05s ease-out",
                    }}
                >
                    {/* Vídeo Depois */}
                    <video
                        ref={afterVideoRef}
                        src={afterSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />

                    {/* Vídeo Antes (Recortado) */}
                    <video
                        ref={beforeVideoRef}
                        src={beforeSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                        }}
                    />

                    {/* Linha Divisória */}
                    <div
                        onMouseDown={() => setIsDragging(true)}
                        onTouchStart={() => setIsDragging(true)}
                        style={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: `${sliderPosition}%`,
                            width: "4px",
                            backgroundColor: "#ffffff",
                            cursor: "ew-resize",
                            transform: `translateX(-50%) scaleX(${1 / scale})`,
                            transformOrigin: "center center",
                            zIndex: 10,
                            boxShadow: "0 0 8px rgba(0,0,0,0.5)",
                        }}
                    >
                        {/* Botão Central com Escala Inversa */}
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: `translate(-50%, -50%) scale(${1 / scale})`,
                                transformOrigin: "center center",
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                backgroundColor: "#ffffff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
                                color: "#333",
                                fontSize: "14px",
                            }}
                        >
                            &#8596;
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
