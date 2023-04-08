import ButtonOutline from "../buttonOutline/buttonOutline";
import ButtonSolid from "../buttonSolid/buttonSolid";
import findBackgroundColor from "../../services/findBackgroundColor";

import clsx from "clsx";

import chroma from "chroma-js";

import Swiper, {Navigation, Pagination} from "swiper";

import "swiper/css";

import "./heroSlider.scss";
import {useEffect, useState, useRef} from "react";
import Spinner from "../spinner/spinner";
import {URL_HERO_SLIDER_CONTENT} from "../../usedUrls";

const HeroSlider = () => {
    const swiperRef = useRef<HTMLDivElement>(null);
    const paginationRef = useRef<HTMLDivElement>(null);

    const [colorAnalysisInProgress, setColorAnalysisInProgress] =
        useState(true);
    const [slides, setSlides] = useState<(JSX.Element | null)[] | null>([]);

    const setPaginationColor = (color: string) => {
        paginationRef?.current
            ?.querySelectorAll(".swiper-pagination-bullet")
            .forEach((bullet) => {
                bullet.classList.remove(
                    color === "white"
                        ? "swiper-pagination-bullet-black"
                        : "swiper-pagination-bullet-white"
                );
                bullet.classList.add(
                    color !== "white"
                        ? "swiper-pagination-bullet-black"
                        : "swiper-pagination-bullet-white"
                );
            });
    };

    useEffect(() => {
        const paginationChangeColor = () => {
            let whiteActiveSlide = swiperRef?.current?.querySelector(
                ".swiper-slide-active .swiper-white-text"
            );
            let blackActiveSlide = swiperRef?.current?.querySelector(
                ".swiper-slide-active .swiper-black-text"
            );
            if (
                paginationRef?.current &&
                swiperRef?.current &&
                (whiteActiveSlide || blackActiveSlide)
            ) {
                if (
                    swiperRef.current.querySelector(
                        ".swiper-slide-active .swiper-white-text"
                    )
                ) {
                    let paginationColor = "white";
                    setPaginationColor(paginationColor);
                } else {
                    let paginationColor = "black";
                    setPaginationColor(paginationColor);
                }
            }
        };

        // eslint-disable-next-line
        const swiper = new Swiper(".hero-slider .swiper", {
            modules: [Navigation, Pagination],
            observer: true,
            simulateTouch: false,
            on: {
                slideChangeTransitionStart: paginationChangeColor,
                observerUpdate: paginationChangeColor,
            },
            pagination: {
                el: ".hero-slider .swiper-pagination",
                clickable: true,
                renderBullet: (
                    index: number | string,
                    bulletClassName: string
                ) => {
                    let currentIndex: number | string = +index + 1;
                    if (+currentIndex < 10) {
                        currentIndex = `0${currentIndex}`;
                    }
                    return `<span class=${bulletClassName}>${currentIndex}<span class="underline"></span></span>`;
                },
            },
            navigation: {
                nextEl: ".hero-slider .swiper-button-next",
                prevEl: ".hero-slider .swiper-button-prev",
            },
        });
        renderSlides().then((res) => {
            setSlides(res);
            setColorAnalysisInProgress(false);
        });
    }, []);

    const spinner = colorAnalysisInProgress ? (
        <div className="swiper-slide">
            <Spinner />
        </div>
    ) : null;

    const pagination = !colorAnalysisInProgress ? (
        <div className="swiper-pagination container" ref={paginationRef}></div>
    ) : (
        <div className="swiper-pagination container hide"></div>
    );

    const content = !spinner && pagination ? slides : null;
    return (
        <section className="hero-slider">
            <div className="swiper" ref={swiperRef}>
                <div className="swiper-wrapper">
                    <>
                        {spinner}
                        {content}
                    </>
                </div>

                {pagination}

                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>
        </section>
    );
};

export default HeroSlider;

const renderSlides = async () => {
    interface ISliderContent {
        subheading?: string;
        heading?: string;
        background?: {
            image?: string;
            color?: string;
        };
    }

    const fetchingData = await fetch(URL_HERO_SLIDER_CONTENT);
    const sliderContent: ISliderContent[] = await fetchingData.json();
    const slidesArr = await Promise.all(
        sliderContent.map(async (slide, index) => {
            if (Object.keys(slide).length === 0 || !slide) {
                return null;
            }
            let bgColor = "";
            let backgroundImage = "";
            if (slide.background?.image) {
                try {
                    bgColor = await findBackgroundColor(slide.background.image);
                    backgroundImage = slide.background.image;
                } catch (e) {
                    if (slide.background?.color) {
                        bgColor = slide.background.color;
                    } else {
                        bgColor = "white";
                    }
                }
            } else if (slide.background?.color) {
                bgColor = slide.background.color;
            } else {
                bgColor = "white";
            }
            let bgLuminance = chroma(bgColor).luminance();
            let fontColor = bgLuminance > 0.5 ? "black" : "white";
            let textColorClass =
                fontColor === "black"
                    ? "swiper-black-text"
                    : "swiper-white-text";
            let buttonColor = fontColor === "black" ? "" : "btn__lightGreen";

            let background = backgroundImage
                ? `url("${backgroundImage}")`
                : bgColor;
            return (
                <div
                    className="swiper-slide"
                    key={index}
                    style={{
                        background: background,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}>
                    <div className="container hero-slider__slide-container">
                        <div
                            className={clsx(
                                "hero-slider__slide-subheading",
                                textColorClass
                            )}>
                            {slide.subheading}
                        </div>
                        <h2
                            className={clsx(
                                "display-1 hero-slider__slide-heading",
                                textColorClass
                            )}>
                            {slide.heading}
                        </h2>
                        <div className="hero-slider__buttons">
                            <ButtonOutline addedClasses={buttonColor}>
                                Shop sale
                            </ButtonOutline>
                            <ButtonSolid>Shop the menswear</ButtonSolid>
                        </div>
                    </div>
                </div>
            );
        })
    );
    return slidesArr;
};
