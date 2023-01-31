// Загрузка городов
document.addEventListener('DOMContentLoaded', getCities)
window.addEventListener('resize', getCities)

async function getCities() {
    if (!sessionStorage.getItem('cities')) {
        const response = await fetch('../database/cities.json')
        const result = await response.json()
        const cities = result.cities

        sessionStorage.setItem('cities', JSON.stringify(cities))
    }
    buildCitiesHTML()
}

const headerLocationInput = document.querySelector('.modal-location__input input')

if (headerLocationInput) {
    headerLocationInput.addEventListener('input', buildCitiesHTML)
}


function buildCitiesHTML() {
    const json = sessionStorage.getItem('cities')
    const value = headerLocationInput.value.trim()
    if (!json) return

    let cities = JSON.parse(json)

    if (value) {

        cities = cities.filter(function(city) {
            return city.name.toLowerCase().includes(value.toLowerCase())
        })
    }

    const currentColumns = document.querySelectorAll('.modal-location__column')

    const row = document.querySelector('.modal-location__row')
    row.innerHTML = ''

    let columnsCount;

    if (window.matchMedia('(min-width: 1024.98px)').matches) {
        columnsCount = 3
    } else if (window.matchMedia('(min-width: 768.98px) and (max-width: 1024.98px)').matches) {
        columnsCount = 4
    } else {

        columnsCount = 2
    }

    // if (columnsCount === currentColumns.length) return


    const count = Math.floor(cities.length / columnsCount)

    let begin = 0
    let end = count
    if (cities.length <= columnsCount) {
        columnsCount = 1
    }
    for (let index = 0; index < columnsCount; index++) {

        let arr = cities.slice(begin, end)

        if (index === columnsCount - 1) {
            arr = cities.slice(begin)
        }

        begin = end
        end += count

        const column = document.createElement('div')
        column.classList.add('modal-location__column')

        arr.forEach(function(city) {
            const item = document.createElement('label')
            item.classList.add('modal-location__item')

            let checked = false

            if (city.value === 1) {
                checked = true
            }

            item.innerHTML = `
                  <input ${checked ? 'checked' : ''} value="${city.value}" name="city" type="radio">
                  <span>${city.name}</span>
            `

            column.appendChild(item)
        })

        row.appendChild(column)
    }
}

window.addEventListener('click', function(e) {
    if (e.target.closest('.modal-location__item')) {
        const location = e.target.closest('.modal-location__item')
        document.querySelector('.location-header__name').innerHTML = location.querySelector('span').innerHTML
    }
})


const locationHeaderLink = document.querySelector('.location-header__link')
const locationButtonYes = document.querySelector('#location-button-yes')
const locationButtonOther = document.querySelector('#location-button-other')

const locationHeaderWindow = document.querySelector('.location-header__window')

function closeLocationWindow() {
    if (locationHeaderWindow && locationHeaderWindow.classList.contains('active')) {
        locationHeaderWindow.classList.remove('active')
    }
}
if (locationHeaderLink) {
    locationHeaderLink.addEventListener('click', closeLocationWindow)
}

if (locationButtonYes) {
    locationButtonYes.addEventListener('click', function(e) {

        e.preventDefault()
        closeLocationWindow()
    })
}

if (locationButtonOther) {
    locationButtonOther.addEventListener('click', closeLocationWindow)
}


// Анимация кнопок

const submitButtons = document.querySelectorAll('.submit-button')

if (submitButtons.length > 0) {
    for (let index = 0; index < submitButtons.length; index++) {
        const submitButton = submitButtons[index]

        submitButton.addEventListener('click', function(e) {
            const button = e.currentTarget
            button.classList.add('loading')

            // Запрос на сервер
            new Promise(function(resolve, reject) {
                setTimeout(function() {
                    resolve(1)
                }, 1000)
            }).finally(function() {
                button.classList.remove('loading')
                button.classList.add('save')
                button.textContent = button.dataset.saveText || "Сохранено";
                button.setAttribute('disabled', '')
            })


            e.preventDefault()
        })
    }
}

// Открытие popup при успешном добавлении товара
const cartPopup = document.querySelector('.cart-window');

function removeCartPopup() {
    setTimeout(() => {

        if (cartPopup.classList.contains('enter')) return

        cartPopup.classList.remove('visible')
    }, 2000)
}

if (cartPopup) {
    window.addEventListener('click', function(e) {

        if (e.target.closest('.item-product__button')) {
            e.preventDefault()
            if (cartPopup.classList.contains('visible')) return

            cartPopup.classList.add('visible')

            removeCartPopup()


        }
    })

    cartPopup.addEventListener('mouseenter', function(e) {
        cartPopup.classList.add('enter')
    })
    cartPopup.addEventListener('mouseleave', function(e) {
        cartPopup.classList.remove('enter')
        removeCartPopup()
    })
}

