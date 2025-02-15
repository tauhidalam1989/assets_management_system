var Details = function (id,assesthistdet) {
    var url = "/AssetHistory/Details?id=" + id;
    $('#titleBigModal').html(assesthistdet);
    loadBigModal(url);
};

var AssetDetails = function (id,assestdet) {
    var url = "/Asset/Details?id=" + id;
    $('#titleExtraBigModal').html(assestdet);
    loadExtraBigModal(url);
};

var AddEdit = function (id,editassesthist,addassesthist) {
    var url = "/AssetHistory/AddEdit?id=" + id;
    if (id > 0) {
        $('#titleMediumModal').html(editassesthist);
    }
    else {
        $('#titleMediumModal').html(addassesthist);
    }
    loadMediumModal(url);
};

var Delete = function (id,delqt,yes,delmsg,deleted) {
    Swal.fire({
        title: delqt,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: yes
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "DELETE",
                url: "/AssetHistory/Delete?id=" + id,
                success: function (result) {
                    var message = delmsg +": " + result.Id;
                    Swal.fire({
                        title: message,
                        text: deleted + '!',
                        onAfterClose: () => {
                            location.reload();
                        }
                    });
                }
            });
        }
    });
};
