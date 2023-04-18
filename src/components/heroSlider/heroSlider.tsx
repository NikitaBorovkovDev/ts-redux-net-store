import Swiper, {Navigation, Pagination} from "swiper";
import "swiper/css";
import "./heroSlider.scss";
import {useEffect, useState, useRef} from "react";
import Spinner from "../spinner/Spinner";
import RenderSlides from "./RenderSlides";

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

    const changePaginationColor = () => {
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

    useEffect(() => {
        // eslint-disable-next-line
        const swiper = new Swiper(".hero-slider .swiper", {
            modules: [Navigation, Pagination],
            observer: true,
            simulateTouch: false,
            on: {
                slideChangeTransitionStart: changePaginationColor,
                observerUpdate: changePaginationColor,
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
        RenderSlides().then((res) => {
            setSlides(res);
            setColorAnalysisInProgress(false);
        });
        return function disableSlider() {
            swiper.destroy();
        };
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
