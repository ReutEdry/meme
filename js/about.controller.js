'use strict'

function onReadAbout(ev) {
    ev.preventDefault()
    document.querySelector('.dialog').showModal()
}

function closeModal() {
    document.querySelector('.dialog').close()
}

function onClickOutside(ev, elDialog) {
    const dialogDimensions = elDialog.getBoundingClientRect()
    if (
        ev.clientX < dialogDimensions.left ||
        ev.clientX > dialogDimensions.right ||
        ev.clientY < dialogDimensions.top ||
        ev.clientY > dialogDimensions.bottom
    ) {
        elDialog.close()
    }
}

