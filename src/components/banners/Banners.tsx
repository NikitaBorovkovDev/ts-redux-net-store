import ButtonOutline from "../buttonOutline/ButtonOutline";
import "./banners.scss";
import {useEffect, useState} from "react";
import Timer from "./bannersComponent/Timer";
import Banner from "./bannersComponent/Banner";
import SubscribeBanner from "./bannersComponent/SubscribeBanner";

enum BannerType {
    Default,
    SubscribeForm,
}

export interface IContent {
    type: BannerType;
    subTitle: string;
    title: string;
    button?: JSX.Element;
    deadline?: number;
    emailSubscribe?: {
        inputPlaceholderText: string;
        buttonText: string;
        text: string;
    };
}

const Banners = () => {
    // const [banners, setBanners] = useState<JSX.Element[]>([]);
    const [timeLeft, setTimeLeft] = useState<
        {days: number; hours: number; minutes: number; seconds: number}[]
    >([]);

    const content: IContent[] = [
        {
            type: BannerType.Default,
            subTitle: "Summer Collections",
            title: "Sale Up to 70%",
            button: <ButtonOutline>Explore new prices</ButtonOutline>,
        },
        {
            type: BannerType.Default,
            subTitle: "Deal of the week",
            title: "Stay Warm With Our New Sweaters",
            button: <ButtonOutline>Shop now</ButtonOutline>,
            deadline: +new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                0o1
            ),
        },
        {
            type: BannerType.Default,
            subTitle: "Deal of the week",
            title: "Stay Warm With Our New Sweaters",
            button: (
                <ButtonOutline>
                    <>
                        See offers
                        <span className="icon-arrow icon-arrowRight"></span>
                    </>
                </ButtonOutline>
            ),
            deadline: 1688364200000,
        },
        {
            type: BannerType.SubscribeForm,
            subTitle: "Deal of the week",
            title: "Stay Warm With Our New Sweaters",
            emailSubscribe: {
                inputPlaceholderText: "Your working email",
                buttonText: "Subscribe",
                text: "*Sign up to be the first to hear about exclusive deals, special offers and upcoming collections.",
            },
        },
    ];

    const getTimeDifference = (timeDifference: number) => {
        let days =
            timeDifference > 0
                ? Math.floor(timeDifference / 1000 / 60 / 60 / 24)
                : 0;
        let hours =
            timeDifference > 0
                ? Math.floor(timeDifference / 1000 / 60 / 60) % 24
                : 0;
        let minutes =
            timeDifference > 0
                ? Math.floor(timeDifference / 1000 / 60) % 60
                : 0;
        let seconds =
            timeDifference > 0 ? Math.floor(timeDifference / 1000) % 60 : 0;
        return {days, hours, minutes, seconds};
    };

    useEffect(() => {
        const deadlines: number[] = [];
        content.forEach((banner) => {
            if (banner.deadline) {
                deadlines.push(banner.deadline);
            }
        });

        let timerId = setInterval(() => {
            const time = deadlines.map((deadline) => {
                const diff = deadline - +new Date();
                return getTimeDifference(diff);
            });
            setTimeLeft(time);
        }, 1000);
        return () => clearInterval(timerId);
    }, []);

    const bannersRender = () => {
        let timerIndex = 0;
        return content.map((banner, index) => {
            const {subTitle, title, button, deadline, emailSubscribe} = banner;
            if (deadline) {
                const component = (
                    <Banner key={index} content={{subTitle, title, button}}>
                        <Timer
                            key={timerIndex}
                            timeLeft={timeLeft[timerIndex]}
                        />
                    </Banner>
                );
                timerIndex = timerIndex + 1;
                return component;
            } else if (emailSubscribe) {
                return (
                    <SubscribeBanner
                        key={index}
                        content={{
                            subTitle,
                            title,
                            emailSubscribe,
                        }}></SubscribeBanner>
                );
            } else {
                return (
                    <Banner key={index} content={{subTitle, title, button}} />
                );
            }
        });
    };

    let bannersContent =
        timeLeft.length === 0 ? <h1>loading</h1> : bannersRender();
    return <section className="banners">{bannersContent}</section>;
};

export default Banners;
