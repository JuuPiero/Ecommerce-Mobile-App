async function deleteRow(id, table) {
    let returnValue = false;
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    })
    if (confirm("Are you sure you want to delete this item?")) {
        $.ajax({
            url: window.location.origin + '/admin/'+ table + '/delete/' + id,
            type: "DELETE",
            dataType: "json",
            success: function (response) {
                returnValue = true;
                alert(response.message);
            }
        });
    }
    return returnValue;
}

