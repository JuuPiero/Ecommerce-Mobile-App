const accountActionsEl = document.querySelector('.account-actions')

accountActionsEl?.addEventListener('click', e => {
    const menu = document.querySelector('.account-actions ul')
    menu.classList.toggle('active')
})



const btnClosePopupElement = document.querySelector('.btn.closepopup')
const popupElement = document.querySelector('#popup-container')
if(btnClosePopupElement) {
    btnClosePopupElement.addEventListener('click', () => {
        popupElement.style.display = 'none'
    })
}