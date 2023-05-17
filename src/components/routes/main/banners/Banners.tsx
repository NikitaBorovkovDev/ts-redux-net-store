import ButtonOutline from "components/commonComponents/buttonOutline/ButtonOutline";
import "./banners.scss";
import {memo, useEffect, useState} from "react";
import Timer from "./bannersComponent/Timer";
import Banner from "./bannersComponent/Banner";
import SubscribeBanner from "./bannersComponent/SubscribeBanner";
import {BannerType} from "interfaces";

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

const Banners = memo(() => {
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
            subTitle: "New collection",
            title: "Shoes & Bags autumn / winter 2020",
            button: (
                <ButtonOutline>
                    <>See offers</>
                </ButtonOutline>
            ),
            deadline: 1688364200000,
        },
        {
            type: BannerType.SubscribeForm,
            subTitle: "For All new Email Subscribers",
            title: "Get 5% Off & Free Delivery",
            emailSubscribe: {
                inputPlaceholderText: "Your working email",
                buttonText: "Subscribe",
                text: "*Sign up to be the first to hear about exclusive deals, special offers and upcoming collections.",
            },
        },
    ];

    useEffect(() => {
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

    let timerIndex = 0;

    return (
        <section className="banners">
            {content.map((banner, index) => {
                const {subTitle, title, button, deadline, emailSubscribe} =
                    banner;
                if (deadline) {
                    const component = (
                        <Banner key={index} content={{subTitle, title, button}}>
                            <Timer
                                key={timerIndex}
                                timeLeft={
                                    timeLeft[timerIndex]
                                        ? timeLeft[timerIndex]
                                        : {
                                              days: 0,
                                              hours: 0,
                                              minutes: 0,
                                              seconds: 0,
                                          }
                                }
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
                        <Banner
                            key={index}
                            content={{subTitle, title, button}}
                        />
                    );
                }
            })}
        </section>
    );
});

export default Banners;
