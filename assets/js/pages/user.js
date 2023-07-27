document.addEventListener('DOMContentLoaded', function() {

    const sideUserClose = document.querySelector('.side-user__close')

    if (sideUserClose) {
        sideUserClose.addEventListener('click', function() {
            document.querySelector('.user__side').classList.remove('active')
            document.body.classList.remove('lock')
        })
    }

})
