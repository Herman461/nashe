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
        breakpoints: {
            1280.98: {
                slidesPerView: 4,
                spaceBetween: 24,
            },
            1024.98: {
                slidesPerView: 3,
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
        breakpoints: {
            1280.98: {
                slidesPerView: 4,
                spaceBetween: 24,
            },
            1024.98: {
                slidesPerView: 3,
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

document.addEventListener('DOMContentLoaded', calculateSlidersBg)
window.addEventListener('resize', calculateSlidersBg)

function calculateSlidersBg() {
    if (window.matchMedia('(max-width: 1400.98px)').matches) return

    const containerWidth = document.querySelector('.container').offsetWidth - 120;
    const productsSliders = document.querySelectorAll('.product-slider')

    const bgWidth = (window.innerWidth - containerWidth) / 2

    for (let index = 0; index < productsSliders.length; index++) {
        const slider = productsSliders[index]

        const leftBg = document.createElement('span')
        leftBg.classList.add('left-bg')
        leftBg.style.width = bgWidth + 'px'

        const rightBg = document.createElement('span')

        rightBg.classList.add('right-bg')
        rightBg.style.width = bgWidth + 'px'

        const wrapper = slider.closest('[data-product-slider]')

        const prevLeftBg = wrapper.querySelector('.left-bg')
        const prevRightBg = wrapper.querySelector('.right-bg')

        if (prevLeftBg) {
            prevLeftBg.remove()
        }
        if (prevRightBg) {
            prevRightBg.remove()
        }
        wrapper.appendChild(leftBg)
        wrapper.appendChild(rightBg)
    }
}


