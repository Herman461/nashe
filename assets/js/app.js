// Функционал шапки
document.addEventListener('DOMContentLoaded', function() {
    const iconMenu = document.querySelector(".icon-menu");
    const header = document.querySelector('.header');

    if (iconMenu) {
        const menuContent = document.querySelector(".menu");
        iconMenu.addEventListener('click', function () {

            header.classList.add('active');
            menuContent.classList.add("active");
        })

        const closeButton = document.querySelector('.header-menu__close');
        closeButton.addEventListener('click', function() {

            header.classList.remove('active');
            menuContent.classList.remove("active");
        })
    }


    const submenu = document.querySelectorAll('.menu__item')

    if (submenu.length > 0) {
        for (let index = 0; index < submenu.length; index++) {
            const item = submenu[index]
            item.addEventListener('mouseenter', function() {
                if (!window.matchMedia('(min-width: 1024.98px)').matches) return

                const submenuBody = item.querySelector('.submenu')

                if (!submenuBody) return

                if (document.querySelector('.menu__item.active')) {
                    document.querySelector('.menu__item.active').classList.remove('active')
                    document.querySelector('.submenu.active').classList.remove('active')
                }
                submenuBody.classList.add('active')
                item.classList.add('active')
            })
            item.addEventListener('mouseleave', function() {
                if (!window.matchMedia("(min-width: 1024.98px)").matches) return
                // if (document.querySelector('.submenu.active') && !e.target.closest('.header')) {
                //
                // }
                document.querySelector('.menu__item.active').classList.remove('active')
                document.querySelector('.submenu.active').classList.remove('active')

                // if (document.querySelector('.submenu.active') && !e.target.closest('.header')) {
                //
                // }
                //
                // if (document.querySelector('.cart.active') && !e.target.closest('.header')) {
                //     document.querySelector('.cart.active').classList.remove('active')
                // }
            })
        }
    }


    const cartButton = document.querySelector('.actions-main-header__item_cart');

    if (cartButton) {
        cartButton.addEventListener('mouseenter', function() {
            const cart = document.querySelector('.cart')
            if (!cart.classList.contains('active')) {
                cart.classList.add('active')
            }
        })
        cartButton.addEventListener('click', function(e) {
            const cart = document.querySelector('.cart')
            if (cart.classList.contains('active')) {
                cart.classList.remove('active')
            }
            e.preventDefault()
        })
        window.addEventListener('click', function(e) {
            if (!e.target.closest('.cart') && document.querySelector('.cart.active')) {
                document.querySelector('.cart.active').classList.remove('active')
            }
        })
    }

    const additionalCategories = document.querySelectorAll('.additional-categories__link')

    if (additionalCategories.length > 0) {
        for (let index = 0; index < additionalCategories.length; index++) {
            const additionalCategory = additionalCategories[index]
            additionalCategory.addEventListener('mouseenter', function(e) {
                if (!window.matchMedia('(min-width: 1024.98px)').matches) return

                e.currentTarget.closest('.submenu').querySelector('.additional-categories__link.active').classList.remove('active')
                e.currentTarget.classList.add('active')
                const category = e.currentTarget.dataset.category
                const activeContent = e.currentTarget.closest('.submenu').querySelectorAll('[data-category-content].active')

                activeContent.forEach(el => {
                    el.classList.remove('active')
                })

                const content = e.currentTarget.closest('.submenu').querySelectorAll(`[data-category-content="${category}"]`)
                content.forEach(el => {
                    el.classList.add('active')
                })
                e.stopPropagation()
            }, true)
        }
    }

    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header')
        if (document.documentElement.scrollTop > 10 && !header.classList.contains('scroll')) {
            header.classList.add('scroll')
            return
        }

        if (document.documentElement.scrollTop <= 0 && header.classList.contains('scroll')) {
            header.classList.remove('scroll')
        }
    })

    window.addEventListener('click', function(e) {
        if (!window.matchMedia('(max-width: 1024.98px)').matches) return


        const menuHeader = document.querySelector('.top-menu')

        if (e.target.closest('.top-menu__prev')) {


            if (document.querySelector('.submenu__categories.mobile-active')) {
                document.querySelector('.submenu__categories.mobile-active').classList.remove('mobile-active')
                menuHeader.classList.remove('deep')
                menuHeader.querySelector('.top-menu__title').lastChild.remove()
            } else {
                menuHeader.classList.remove('active')
                document.querySelector('.submenu.active').classList.remove('active')
            }
            return;
        }

        if (e.target.closest('.top-menu__close')) {
            document.querySelector('.menu.active').classList.remove('active')
            document.querySelector('.submenu.active').classList.remove('active')
            menuHeader.classList.remove('active')

            if (document.querySelector('.submenu__categories.mobile-active')) {
                document.querySelector('.submenu__categories.mobile-active').classList.remove('mobile-active')
                menuHeader.classList.remove('deep')
                menuHeader.querySelector('.top-menu__title').lastChild.remove()
            }
            return;
        }

        if (e.target.closest('.additional-categories__link')) {
            const link = e.target.closest('.additional-categories__link')
            const category = link.dataset.category

            const menuHeaderTitleElement = document.querySelector('.top-menu__title')
            menuHeaderTitleElement.append(link.textContent)
            menuHeader.classList.add('deep')
            e.target.closest('.submenu').querySelector(`.submenu__categories[data-category-content="${category}"]`).classList.add('mobile-active')
            e.preventDefault()
            return;
        }


        if (e.target.closest('.menu__item')) {
            const menuHeaderTitleElement = document.querySelector('.top-menu__title').querySelector('span')
            const menuItem = e.target.closest('.menu__item')

            menuHeaderTitleElement.textContent = menuItem.querySelector('.menu__link').textContent;
            menuItem.querySelector('.submenu').classList.add('active')
            menuHeader.classList.add('active')
            if (e.target.closest('.menu__link')) {
                e.preventDefault()
            }

        }


    })
});

// Функционал поиска в шапке
document.addEventListener('DOMContentLoaded', function() {
    function debounce(callback, ms) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout)

            timeout = setTimeout(function() {
                callback(...args)
            }, ms)
        }
    }

    const searchCancel = document.querySelector('.search__cancel')
    if (searchCancel) {
        searchCancel.addEventListener('click', function(e) {
            e.preventDefault()
            if (searchCancel.closest('.modal').classList.contains('active')) {
                searchCancel.closest('.modal').classList.remove('active')

            }
        })
    }

    const searchModal = document.querySelector('#modal-search');
    searchModal.addEventListener('click', function(e) {
        if (searchModal.classList.contains('active') && !e.target.closest('.search')) {
            searchModal.classList.remove('active')

        }
    })

    const searchButton = document.querySelector('.actions-main-header__item_search')
    const searchInput = document.querySelector('.search__input input')

    if (searchButton) {
        searchButton.addEventListener('click', async function(e) {

            setTimeout(() => {
                searchInput.focus()
            }, timeout)
            await search(e)
        })

    }


    if (searchInput) {
        searchInput.addEventListener('input', debounce(search, 100))
    }


    async function search(e) {
        let value = e.target.value

        if (typeof value !== 'string') {
            const input = document.querySelector('.search__input input')
            value = input.value.toLowerCase()
        }

        value = value.toLowerCase()

        const loader = document.querySelector('.search__loader')
        const label  = document.querySelector('.search__label')


        loader.classList.add('active')

        const productsWrapper = document.querySelector('.search__products')
        productsWrapper.innerHTML = ''

        const categoriesWrapper = document.querySelector('.search__categories')
        categoriesWrapper.innerHTML = ''

        const searchEmpty = document.querySelector('.search__empty')


        const resultsWrapper = document.querySelector('.search__results')

        // Искусственная задержка
        setTimeout(() => {
            loader.classList.remove('active')
        }, 900);


        // Если нет значения, то делаем запрос на актуальные категории
        if (value.length === 0) {
            label.textContent = 'Актуальное'

            const categories = [
                {
                    id: '1',
                    text: 'Зимние носки',
                    link: '',
                },
                {
                    id: '1',
                    text: 'Джемпер чёрный',
                    link: '',
                },
                {
                    id: '1',
                    text: 'Джемпер',
                    link: '',
                },
                {
                    id: '1',
                    text: 'Носки с рисунком',
                    link: '',
                },
                {
                    id: '1',
                    text: 'Детские носки',
                    link: '',
                },
                {
                    id: '1',
                    text: 'Домашняя футболка',
                    link: '',
                },
            ]


            categories.forEach(category => {
                const categoryDOM = document.createElement('a')
                categoryDOM.className = 'search__item item-search'

                categoryDOM.innerHTML = `
                <div class="item-search__icon">
                    <svg>
                        <use xlink:href="../assets/images/icons/icons.svg#search"></use>
                    </svg>
                </div>
                <p class="item-search__text">${category.text}</p>
            `
                categoryDOM.setAttribute('href', category.link)
                categoriesWrapper.appendChild(categoryDOM)
            })
            return
        }


        // Искусственно полученные данные
        const products = [
            {
                id: '1',
                title: 'Джемпер однотонный с круглой горловиной',
                imageSrc: '../assets/images/products/product.png',
                link: '/product.html',
                price: 999,
            },
            {
                id: '2',
                title: 'Джемпер однотонный с круглой горловиной №1',
                imageSrc: '../assets/images/products/product.png',
                link: '/product.html',
                price: 999,
            },
            {
                id: '3',
                title: 'Джемпер однотонный с круглой горловиной №2',
                imageSrc: '../assets/images/products/product.png',
                link: '/product.html',
                price: 999,
            },
            {
                id: '4',
                title: 'Джемпер однотонный с круглой горловиной №3',
                imageSrc: '../assets/images/products/product.png',
                link: '/product.html',
                price: 999,
            },
            {
                id: '5',
                title: 'Джемпер однотонный с круглой горловиной №4',
                imageSrc: '../assets/images/products/product.png',
                link: '/product.html',
                price: 999,
            },
        ]

        const filteredProducts = products.filter(product => product.title.toLowerCase().includes(value))

        if (filteredProducts.length > 0 ) {
            label.textContent = 'Найденные товары'

            if (!searchEmpty.classList.contains('hidden')) {
                searchEmpty.classList.add('hidden')
            }


            filteredProducts.forEach(product => {
                const productDOM = document.createElement('a')
                productDOM.className = "search__product product-search"
                productDOM.innerHTML = `
                <div class="product-search__image">
                    <img src="${product.imageSrc}" alt="">
                </div>
                <div class="product-search__content">
                    <div class="product-search__price">${product.price} руб.</div>
                    <div class="product-search__title">${product.title}</div>
                </div>
            `

                productDOM.setAttribute('href', product.link)
                productsWrapper.appendChild(productDOM)
            })
        } else {
            if (searchEmpty.classList.contains('hidden')) {
                searchEmpty.classList.remove('hidden')
            }
        }

    }



    window.addEventListener('click', function(e) {
        if (e.target.closest('.base-sizes__button_plus')) {
            const input = e.target.closest('.base-sizes__input').querySelector('input')
            input.value = Number(input.value) + 1
        }
        if (e.target.closest('.base-sizes__button_minus')) {
            const input = e.target.closest('.base-sizes__input').querySelector('input')

            if (Number(input.value) > 0) {
                input.value = Number(input.value) - 1
            }
        }
    })

    const baseSizeInputs = document.querySelectorAll('.base-sizes__input input')

    if (baseSizeInputs.length > 0) {
        for (let index = 0; index < baseSizeInputs.length; index++) {
            const input = baseSizeInputs[index]
            input.addEventListener('focus', function(e) {
                if (document.querySelector('.base-sizes__input.focus')) {
                    document.querySelector('.base-sizes__input.focus').classList.remove('focus')
                }
                e.target.closest('.base-sizes__input').classList.add('focus')
            })
            input.addEventListener('blur', function(e) {
                e.target.closest('.base-sizes__input').classList.add('focus')
            })
        }
    }

})



// Модальные окна
document.addEventListener('DOMContentLoaded', function() {
    const modalLinks = document.querySelectorAll('[data-modal-link]')

    if (modalLinks.length > 0) {
        for (let index = 0; index < modalLinks.length; index++) {
            const link = modalLinks[index]
            link.addEventListener('click', function(e) {
                e.preventDefault()
                const scrollWidth = window.innerWidth - document.body.clientWidth

                const modalTitle = '#' + e.currentTarget.dataset.modalLink

                document.querySelector(modalTitle).classList.add('active')



                document.body.style.paddingRight = scrollWidth + 'px'

            })
        }
    }

    const modalCloseButtons = document.querySelectorAll('.modal__close')

    if (modalCloseButtons.length > 0) {
        for (let index = 0; index < modalCloseButtons.length; index++) {
            const closeButton = modalCloseButtons[index]
            closeButton.addEventListener('click', function(e) {
                e.target.closest('.modal').classList.remove('active')

                setTimeout(() => {

                    document.body.style.paddingRight = 0
                }, timeout)
            })
        }
    }
})


// Табы
document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll("[data-tab-title]");
    const tabContent = document.querySelectorAll("[data-tab-content]");


    if (tabContent.length > 0)  {
        tabLinks.forEach(function(el) {
            el.addEventListener("click", openTabs);
        });

    }

    function openTabs(el) {
        el.preventDefault()
        const btnTarget = el.currentTarget;
        const title = btnTarget.dataset.tabTitle;
        const category = btnTarget.dataset.tabCategory

        const tabContent = document.querySelectorAll(`[data-tab-content][data-tab-category="${category}"]`);
        const tabLinks = document.querySelectorAll(`[data-tab-title][data-tab-category="${category}"]`);

        tabContent.forEach(function(el) {
            el.classList.remove("active");
        });

        tabLinks.forEach(function(el) {
            el.classList.remove("active");
        });

        const activeContent = document.querySelectorAll(`[data-tab-content="${title}"][data-tab-category="${category}"]`)
        activeContent.forEach(function(el) {
            el.classList.add('active')
        })
        document.querySelector(`[data-tab-content="${title}"]`).classList.add("active");

        btnTarget.classList.add("active");

    }
})


// Выбор количества товара
document.addEventListener('DOMContentLoaded', function() {
    const quantityButtons = document.querySelectorAll(".quantity__button");

    if (quantityButtons.length > 0) {
        for (let index = 0; index < quantityButtons.length; index++) {
            const quantityButton = quantityButtons[index];
            quantityButton.addEventListener("click", function(e) {
                let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
                if (!value) {
                    value = 1
                    quantityButton.closest('.quantity').querySelector('input').value = value;
                    return
                }
                if (quantityButton.classList.contains('quantity__button_plus')) {
                    value++;
                } else {
                    value = value - 1;
                    if (value < 1) {
                        value = 1;
                    }
                }
                quantityButton.closest('.quantity').querySelector('input').value = value;
            });
        }
    }


    function initProductsSliders() {
        const productsSliders = document.querySelectorAll('.item-product__slider');
        if (productsSliders.length > 0) {
            for (let index = 0; index < productsSliders.length; index++) {
                const productsSlider = productsSliders[index]

                const slider = new Swiper(productsSlider, {
                    speed: 800,
                    loop: true,
                    allowTouchMove: false,
                    spaceBetween: 8,
                    slidesPerView: 1,
                    pagination: {
                        el: productsSlider.nextElementSibling,
                        clickable: true,
                    },
                })
            }
        }
    }

    initProductsSliders()


    const productsSlidersEls = document.querySelectorAll('.product-slider')


    if (productsSlidersEls.length > 0) {
        for (let index = 0; index < productsSlidersEls.length; index++) {
            const el = productsSlidersEls[index]

            const slider = new Swiper(el.querySelector('.product-slider__body'), {
                speed: 1000,
                spaceBetween: 16,
                slidesPerView: 1.05,
                loop: true,
                allowTouchMove: false,
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
                    nextEl: el.querySelector('.slider-buttons__item_next'),
                    prevEl: el.querySelector('.slider-buttons__item_prev')
                },
            })


        }
    }

    document.addEventListener('mousemove', function(e) {

        if (e.target.closest('.item-product') && !e.target.closest('.item-product').classList.contains('active')) {
            if (document.querySelector('.item-product.hover')) {
                document.querySelector('.item-product.hover').classList.remove('hover')
            }
            const itemProduct = e.target.closest('.item-product')

            if (itemProduct) {
                const itemProductActions = itemProduct.querySelector('.item-product__actions')
                itemProduct.classList.add('active')

                if (itemProduct.closest('.items-products__column')) {
                    itemProduct.closest('.items-products__column').style.height = (itemProduct.offsetHeight - itemProductActions.offsetHeight) + 'px';
                }
            }


        }
    })


    $('select').on('select2:opening', function (e) {
        $(e.target).closest(".item-product").addClass('hover')
    });

    $('select').on('change', function (e) {
        if ($('.catalog').length > 0) {
            $(e.target).closest(".item-product").removeClass('hover')
        }

    });

    calculateSlidersBg()
    window.addEventListener('resize', calculateSlidersBg)

    function calculateSlidersBg() {
        const productsSliders = document.querySelectorAll('[data-product-slider]')

        for (let index = 0; index < productsSliders.length; index++) {
            const sliderWrapper = productsSliders[index]

            const sliderWidth = sliderWrapper.offsetWidth
            const sliderCoords = sliderWrapper.getBoundingClientRect()

            const sliderLeftOffset = sliderCoords.left
            const sliderRightOffset = window.innerWidth - sliderLeftOffset - sliderWidth


            const leftBg = document.createElement('span')
            leftBg.classList.add('left-bg')
            leftBg.style.width = sliderLeftOffset + 'px'
            leftBg.style.left = '-' + sliderLeftOffset + 'px'

            const rightBg = document.createElement('span')

            rightBg.classList.add('right-bg')
            rightBg.style.width = sliderRightOffset + 'px'
            rightBg.style.left = (sliderWidth) + 'px'


            const prevLeftBg = sliderWrapper.querySelector('.left-bg')
            const prevRightBg = sliderWrapper.querySelector('.right-bg')

            if (prevLeftBg) {
                prevLeftBg.remove()
            }
            if (prevRightBg) {
                prevRightBg.remove()
            }
            sliderWrapper.appendChild(leftBg)
            sliderWrapper.appendChild(rightBg)
        }
    }
})
