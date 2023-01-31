document.addEventListener('DOMContentLoaded', function() {
    const mainSlider = new Swiper('.main-slider__body', {
        speed: 1000,
        loop: true,
        spaceBetween: 16,
        slidesPerView: 1.05,
        autoHeight: true,
        navigation: {
            nextEl: '.main-slider .slider-buttons__item_next',
            prevEl: '.main-slider .slider-buttons__item_prev'
        },
        pagination: {
            el: '.main-slider__dots',
            clickable: true,
        },
        breakpoints: {
            1024.98: {
                slidesPerView: 1,
            },
        }

    })
    const subSlider = new Swiper('.sub-slider__body', {
        speed: 1000,
        loop: true,
        spaceBetween: 16,
        slidesPerView: 2.2,
        navigation: {
            nextEl: '.sub-slider .slider-buttons__item_next',
            prevEl: '.sub-slider .slider-buttons__item_prev'
        },
        breakpoints: {
            1024.98: {
                slidesPerView: 1,
            },
            767.98: {
                slidesPerView: 3.1,
            },
            565.98: {
                slidesPerView: 2.5,
            },
        },
        pagination: {
            el: '.sub-slider__dots',
            clickable: true,
        },
    })
    const categoriesPageSlider = new Swiper('.categories-page__body', {
        speed: 1000,
        loop: true,
        spaceBetween: 16,
        slidesPerView: 2.15,
        breakpoints: {
            1024.98: {
                slidesPerView: 6,
                spaceBetween: 24,
            },
            767.98: {
                slidesPerView: 4.2,
            },
            575.98: {
                slidesPerView: 3.2,
            }
        },
    })
    const newProductsSlider = new Swiper('.new-products-page .product-slider__body', {
        speed: 1000,
        spaceBetween: 16,
        slidesPerView: 1.05,
        loop: true,
        allowTouchMove: true,
        breakpoints: {
            1280.98: {
                slidesPerView: 4,
                spaceBetween: 24,
                allowTouchMove: false,
            },
            1024.98: {
                slidesPerView: 3,
                allowTouchMove: false,
            },
            767.98: {
                slidesPerView: 2.05,
            }
        },
        navigation: {
            nextEl: '.new-products-page .slider-buttons__item_next',
            prevEl: '.new-products-page .slider-buttons__item_prev'
        },
    })
    const bestsellersSlider = new Swiper('.bestsellers .product-slider__body', {
        speed: 1000,
        spaceBetween: 16,
        slidesPerView: 1.05,
        loop: true,
        allowTouchMove: true,
        breakpoints: {
            1280.98: {
                slidesPerView: 4,
                spaceBetween: 24,
                allowTouchMove: false,
            },
            1024.98: {
                slidesPerView: 3,
                allowTouchMove: false,
            },
            767.98: {
                slidesPerView: 2.05,
            }
        },
        navigation: {
            nextEl: '.bestsellers .slider-buttons__item_next',
            prevEl: '.bestsellers .slider-buttons__item_prev'
        },
    })
})
