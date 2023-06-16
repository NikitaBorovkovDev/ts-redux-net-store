import { Navigation, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import './specialOffers.scss';

const SpecialOffers = () => {
	const calcWidth = (swiper: any) => {
		let sliderWidth = 0;
		swiper.slides.forEach((slide: any) => {
			if (
				slide.querySelector('span').getBoundingClientRect().width >
				sliderWidth
			) {
				sliderWidth = slide
					.querySelector('span')
					.getBoundingClientRect().width;
			}
		});
		swiper.el.style.width = sliderWidth + 72 + 'px';
	};

	return (
		<div className="special-offers">
			<Swiper
				modules={[Navigation, A11y]}
				navigation
				simulateTouch={false}
				onSwiper={(swiper: any) => {
					calcWidth(swiper);
				}}
				onSlideChange={(swiper: any) => {}}>
				<SwiperSlide>
					<span className="_slide-content extrasmall-bold">
						Up to 70% Off.&nbsp;
						<a href="#" className="_slide-content__link">
							Shop our latest sale styles
						</a>
					</span>
				</SwiperSlide>
				<SwiperSlide>
					<span className="_slide-content">
						Lorem ipsum dolor sit amet consectetur.
					</span>
				</SwiperSlide>
				<SwiperSlide>
					<span className="_slide-content">
						Lorem ipsum dolor sit.
					</span>
				</SwiperSlide>
				<SwiperSlide>
					<span className="_slide-content">
						Lorem ipsum dolor sit amet.
					</span>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default SpecialOffers;
