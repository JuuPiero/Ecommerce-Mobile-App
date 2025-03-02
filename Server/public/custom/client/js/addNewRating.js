function addNewRating(productId, numStar, comment) {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    })
    $.ajax({
        url: window.location.origin + '/user/create/rating',
        type: "POST",
        dataType: "json",
        data : {
            'product_id' : productId,
            'rating' : numStar,
            'comment' : comment,
        },
        success: function (response) {
            alert(response.message);

        }
    })
}

const submitRatingBtnElement = document.querySelector('.submit-rating-btn')
const formRatingElement = document.querySelector('.new-review-form')
formRatingElement.addEventListener('submit', (e) => {
    e.preventDefault()
    const productId = document.querySelector('.rating-product-id').value
    const numStar = document.querySelector('.num-star').value
    const comment = document.querySelector('.rating-comment').value
    // console.log(productId, numStar, comment);
    addNewRating(productId, numStar, comment)
    formRatingElement.reset()
})
