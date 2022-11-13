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
