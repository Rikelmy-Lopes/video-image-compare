function SliderIcon() {
    return (
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
    );
}

export default SliderIcon;
