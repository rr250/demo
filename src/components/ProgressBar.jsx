import { useEffect, useState } from "react";
import "./styles.css";

const Progress = ({ progress }) => {
    const [animatedProgress, setAnimatedProgress] = useState(0);

    useEffect(() => {
        const timeoutId = setTimeout(() => setAnimatedProgress(progress), 100);
        return () => clearTimeout(timeoutId);
    }, [progress]);
    return (
        <div key={progress} className="progress-bar-container">
            <div
                className="progress-bar"
                style={{
                    // width: `${animatedProgress}%`, // slow since it repaints entire bar
                    transform: `translateX(${animatedProgress - 100}%)`, // fast since it only moves the bar
                }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                {progress}%
            </div>
        </div>
    );
};

const ProgressBar = () => {
    const progresses = [5, 25, 50, 75, 100];
    return (
        <div>
            {progresses.map((progress) => (
                <Progress key={progress} progress={progress} />
            ))}
        </div>
    );
};

export default ProgressBar;
