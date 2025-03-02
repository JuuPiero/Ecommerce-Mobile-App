const submitBtnEl = document.querySelector('.submit-btn')
const addNewAttrBtnEl = document.querySelector('.add-new-attr-btn')
const attrInputEl = document.querySelector('.attributes-input')
const formEl = document.querySelector('#mainForm')

addNewAttrBtnEl.onclick = e => {
    createNewAttriInput()
}

submitBtnEl.onclick = e => {
    e.preventDefault();
    const attributes = {}
    const attributeEls = document.querySelectorAll('.attribute')
    attributeEls.forEach(attribute => {
        const name = attribute.querySelector('input').value
        const value = attribute.querySelector('input:last-child').value
        if(name != '' && value != '') {
            attributes[name] = value
        }
    })
    // set value of input product attributes
    attrInputEl.value = Object.keys(attributes).length !== 0 ? JSON.stringify(attributes) : ""
    formEl.submit()
}

function createNewAttriInput() {
    const newAttrEl = document.createElement('div')
    newAttrEl.classList.add('form-group', 'row', 'attribute', 'ml-1')
    newAttrEl.innerHTML = `
        <input type="text" placeholder="Name " class="mr-sm-3 form-control col-sm-5">
        <input type="text" placeholder="Value" class=" mr-sm-3 form-control col-sm-5">
    `
    formEl.insertBefore(newAttrEl, addNewAttrBtnEl);
}