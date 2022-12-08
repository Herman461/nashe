window.addEventListener('click', toggleFilterModal)


function toggleFilterModal(e) {
    if (!window.matchMedia('(max-width: 1024.98px)').matches) return

    if (e.target.closest('.side__title')) {
        const sideTitle = e.target.closest('.side__title')
        const text = sideTitle.textContent

        sideTitle.nextElementSibling.classList.add('open')
        document.querySelector('.header-filter-catalog__title').append(text)
        document.querySelector('.header-filter-catalog').classList.add('open')
        if (!sideTitle.hasAttribute('data-categories')) {
            document.querySelector('.side__reset').classList.add('show')
        }
    }

    if (e.target.closest('.header-filter-catalog__back')) {
        document.querySelector('.side__content.open').classList.remove('open')
        document.querySelector('.header-filter-catalog').classList.remove('open')
        document.querySelector('.side__reset').classList.remove('show')
        document.querySelector('.header-filter-catalog__title').lastChild.remove()
        if (document.querySelector('.side__reset').classList.contains('show')) {
            document.querySelector('.side__reset').classList.remove('show')
        }
    }

    if (e.target.closest('.header-filter-catalog__close')) {
        document.querySelector('.filter-catalog__content').classList.remove('active')
        document.body.classList.remove('lock')
    }
    if (e.target.closest('.filter-catalog__button')) {
        document.querySelector('.filter-catalog__content').classList.add('active')
        document.body.classList.add('lock')
        e.preventDefault()
    }
}

if (document.querySelector('.catalog__select_visible')) {
    document.querySelector('.catalog__select_visible').addEventListener('click', function(e) {
        if (!window.matchMedia('(max-width: 575.98px)').matches) return

        const sortModal = document.querySelector('#sort-modal');
        sortModal.classList.add('active')
        document.body.classList.add('lock')
        e.stopPropagation()
    }, true)
}


document.addEventListener('DOMContentLoaded', function() {
    const productsSliders = document.querySelectorAll('.item-product__slider');
    if (productsSliders.length > 0) {
        for (let index = 0; index < productsSliders.length; index++) {
            const productsSlider = productsSliders[index]

            const slider = new Swiper(productsSlider, {
                speed: 800,
                loop: true,
                spaceBetween: 8,
                slidesPerView: 1,
                pagination: {
                    el: productsSlider.nextElementSibling,
                    clickable: true,
                },
            })
        }
    }

})
document.addEventListener('mousemove', function(e) {

    if (e.target.closest('.item-product') && !e.target.closest('.item-product').classList.contains('active')) {
        const itemProduct = e.target.closest('.item-product')
        const itemProductActions = itemProduct.querySelector('.item-product__actions')
        itemProduct.classList.add('active')
        itemProduct.closest('.items-products__column').style.height = (itemProduct.offsetHeight - itemProductActions.offsetHeight) + 'px';
    }
})

const sideSwitchers = document.querySelectorAll('.side__switch');

if (sideSwitchers.length > 0) {
    for (let index = 0; index < sideSwitchers.length; index++) {
        const sideSwitcher = sideSwitchers[index]

        sideSwitcher.addEventListener('mouseenter', function(e) {
            const action = e.target.closest('.side__action')
            action.querySelector('.side__tooltip').classList.add('active')
        })

        sideSwitcher.addEventListener('mouseleave', function(e) {
            const action = e.target.closest('.side__action')
            action.querySelector('.side__tooltip').classList.remove('active')
        })
    }
}

