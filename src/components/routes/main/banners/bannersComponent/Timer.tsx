import {memo} from "react";
import "../banners.scss";

interface ITimer {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const Timer = memo((props: {timeLeft: ITimer}): JSX.Element => {
    const {days, hours, minutes, seconds} = props.timeLeft;

    return (
        <div className="timer">
            <div className="timer__countdown-text">Limited time offer</div>
            <div className="timer__countdown">
                <div>
                    <div className="timer__items">
                        <div className="timer__item">
                            <div className="timer__numbers timer__days heading-3">
                                {days}
                            </div>
                            <div className="timer__text">
                                {days === 1 ? "Day" : "Days"}
                            </div>
                        </div>

                        <div>
                            <div className="timer__numbers timer__hours heading-3">
                                {hours}
                            </div>
                            <div className="timer__text">
                                {hours === 1 ? "Hour" : "Hours"}
                            </div>
                        </div>

                        <div>
                            <div className="timer__numbers timer__minutes heading-3">
                                {minutes}
                            </div>
                            <div className="timer__text">
                                {minutes === 1 ? "Min" : "Mins"}
                            </div>
                        </div>

                        <div>
                            <div className="timer__numbers timer__seconds heading-3">
                                {seconds}
                            </div>
                            <div className="timer__text">Sec</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Timer;
