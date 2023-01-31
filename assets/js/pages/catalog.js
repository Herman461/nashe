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



const sideSwitchers = document.querySelectorAll('.side__switch');

if (sideSwitchers.length > 0) {
    for (let index = 0; index < sideSwitchers.length; index++) {
        const sideSwitcher = sideSwitchers[index]

        sideSwitcher.addEventListener('mouseenter', function(e) {
            const action = e.target.closest('.side__action')

            if (action.querySelector('.side__tooltip')) {
                action.querySelector('.side__tooltip').classList.add('active')
            }

        })

        sideSwitcher.addEventListener('mouseleave', function(e) {
            const action = e.target.closest('.side__action')

            if (action.querySelector('.side__tooltip')) {
                action.querySelector('.side__tooltip').classList.remove('active')
            }
        })
    }
}


// Ajax

// async function getProducts() {
//     const response = await fetch('database/products.json');
//
//     if (response.status >= 200 && response.status <= 299 ) {
//         const data = await response.json()
//
//         return data.products
//     } else {
//         return false
//     }
// }
//
// function buildItemProductHTML(data) {
//     if (data.images.length > 0) {
//         data.images = data.images.map(function(imageUrl) {
//             return `
//             <a href="${data.url}" class="item-product__image ibg">
//                 <img src="${imageUrl}" alt="">
//             </a>
//             `
//         })
//     }
//     return `
//         <div class="item-product">
//     <div class="item-product__favorite">
//         <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path fill-rule="evenodd" clip-rule="evenodd" d="M5.66529 2.59644C6.42803 2.27973 7.24578 2.1167 8.07166 2.1167C8.89754 2.1167 9.71529 2.27973 10.478 2.59644C11.2408 2.91315 11.9335 3.37732 12.5165 3.96231L12.5194 3.96524L12.6667 4.11446L12.814 3.96524L12.8169 3.96231C13.3998 3.37732 14.0926 2.91315 14.8553 2.59644C15.618 2.27973 16.4358 2.1167 17.2617 2.1167C18.0875 2.1167 18.9053 2.27973 19.668 2.59644C20.4305 2.91306 21.1231 3.37703 21.7059 3.96178C24.1978 6.45426 24.2636 10.5848 21.2911 13.6129L21.2854 13.6187L12.6667 22.2374L4.0422 13.6129C1.06972 10.5848 1.13551 6.45426 3.6274 3.96178C4.21026 3.37704 4.90279 2.91306 5.66529 2.59644ZM8.07166 3.8667C7.47611 3.8667 6.88641 3.98426 6.33639 4.21265C5.78637 4.44104 5.28684 4.77575 4.86645 5.1976L4.86538 5.19868C3.11848 6.94557 2.92394 9.97301 5.28833 12.3842L12.6667 19.7625L20.045 12.3842C22.4094 9.973 22.2148 6.94557 20.4679 5.19868L20.4669 5.1976C20.0465 4.77575 19.547 4.44104 18.9969 4.21265C18.4469 3.98426 17.8572 3.8667 17.2617 3.8667C16.6661 3.8667 16.0764 3.98426 15.5264 4.21265C14.977 4.44077 14.478 4.77498 14.0579 5.19615C14.0574 5.19664 14.0569 5.19712 14.0565 5.1976L12.6667 6.60546L11.2769 5.1976C11.2764 5.19712 11.2759 5.19664 11.2754 5.19615C10.8553 4.77498 10.3563 4.44077 9.80693 4.21265C9.25691 3.98426 8.66721 3.8667 8.07166 3.8667Z" fill="white" />
//             <path d="M6.3364 4.21265C6.88642 3.98426 7.47611 3.8667 8.07167 3.8667C8.66722 3.8667 9.25692 3.98426 9.80694 4.21265C10.3563 4.44077 10.8553 4.77498 11.2754 5.19615L11.2769 5.1976L12.6667 6.60546L14.0565 5.1976L14.0579 5.19615C14.478 4.77498 14.977 4.44077 15.5264 4.21265C16.0764 3.98426 16.6661 3.8667 17.2617 3.8667C17.8572 3.8667 18.4469 3.98426 18.9969 4.21265C19.547 4.44104 20.0465 4.77575 20.4669 5.1976L20.468 5.19868C22.2148 6.94557 22.4094 9.973 20.045 12.3842L12.6667 19.7625L5.28834 12.3842C2.92394 9.97301 3.11849 6.94557 4.86539 5.19868L4.86646 5.1976C5.28685 4.77575 5.78637 4.44104 6.3364 4.21265Z" fill="#C8C8C8" />
//         </svg>
//
//     </div>
//     <div class="item-product__images">
//         <div class="item-product__slider swiper">
//             ${data.images.join('')}
//         </div>
//         <div class="item-product__dots dots"></div>
//     </div>
//     <div class="item-product__content">
//         <div class="item-product__price">
//             ${data.bigSet}
//             <span>${data.smallSet}</span>
//         </div>
//         <a class="item-product__title" href="">Джемпер однотонный с круглой
//             горловиной</a>
//         <div class="item-product__char">
//             <p>Размеры в наличии: ${data.sizes.split(" ")}</p>
//         </div>
//         <div class="item-product__actions">
//             <div class="item-product__select select">
//                 <div class="select__icon">
//                     <svg>
//                         <use xlink:href="../assets/images/icons/icons.svg#angle-right"></use>
//                     </svg>
//                 </div>
//                 <select>
//                     <option value="1" selected>42</option>
//                     <option value="2">44</option>
//                     <option value="3">46</option>
//                 </select>
//             </div>
//             <a href="" class="item-product__button button">В корзину</a>
//         </div>
//     </div>
//
// </div>
//
//     `
// }
//

//
// function buildBlockProductHTML() {
//
// }


// async function setProducts() {
//     const products = await getProducts();
//
//     initProductsSliders()
// }
//
// setProducts()


const buttonUnion = document.querySelector('.show-catalog__union')


if (buttonUnion) {
    buttonUnion.addEventListener('click', function (e) {
        e.preventDefault()

        if (e.currentTarget.classList.contains('active')) {
            document.querySelector('.catalog__list').classList.remove('active')
            document.querySelector('.catalog__grid').classList.add('active')
        } else {
            document.querySelector('.catalog__list').classList.add('active')
            document.querySelector('.catalog__grid').classList.remove('active')
        }

        e.currentTarget.classList.toggle('active')
    })
}
