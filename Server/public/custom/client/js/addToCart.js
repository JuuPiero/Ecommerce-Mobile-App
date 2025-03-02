const cartCountEl = document.querySelector('#CartCount')

function addToCart(id, quantity = 1) {
    $.ajax({
        url: window.location.origin + '/cart/add/' + id + '/' + quantity,
        type: "GET",
        dataType: "json",
        success: function (response) {
            alert(response.message);
            if(cartCountEl) cartCountEl.innerHTML = parseInt(cartCountEl.innerHTML) + quantity
        }
    })
}

function removeFromCart(id) {
    $.ajax({
        url: window.location.origin + '/cart/remove/' + id,
        type: "GET",
        dataType: "json",
        success: function (response) {
            alert(response.message);
            // if(cartCountEl) cartCountEl.innerHTML = parseInt(cartCountEl.innerHTML) + 1
        }
    })
}

$(".btn-addto-cart").click(e => {
    e.preventDefault();
    const productId = e.target.getAttribute('data-id');
    if(document.querySelector('#Quantity')) {
        const quantity = parseInt(document.querySelector('#Quantity').value)
        addToCart(productId, quantity)
    }
    else {
        addToCart(productId)
    }
    console.log(productId);
})
