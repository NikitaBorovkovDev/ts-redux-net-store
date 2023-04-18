import {URL_HERO_SLIDER_CONTENT} from "../../usedUrls";
import ButtonOutline from "../buttonOutline/ButtonOutline";
import ButtonSolid from "../buttonSolid/ButtonSolid";
import findBackgroundColor from "../../services/findBackgroundColor";
import clsx from "clsx";
import chroma from "chroma-js";
import axios from "axios";

const RenderSlides = async () => {
    interface ISliderContent {
        subheading?: string;
        heading?: string;
        background?: {
            image?: string;
            color?: string;
        };
    }

    const fetchingData = await axios(URL_HERO_SLIDER_CONTENT);
    const sliderContent: ISliderContent[] = await fetchingData.data;
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

export default RenderSlides;
