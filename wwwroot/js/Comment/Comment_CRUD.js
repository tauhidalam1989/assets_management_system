var Details = function (id,comdet) {
    var url = "/Comment/Details?id=" + id;
    $('#titleMediumModal').html(comdet);
    loadMediumModal(url);
};

var AssetDetails = function (id,assetdet) {
    var url = "/Asset/Details?id=" + id;
    $('#titleBigModal').html(assetdet);
    loadBigModal(url);
};

var Delete = function (id,del,yes) {
    Swal.fire({
        title: del,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: yes
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "DELETE",
                url: "/Comment/Delete?id=" + id,
                success: function (result) {                
                    Swal.fire({
                        title: result,
                        icon: 'info',
                        onAfterClose: () => {                            
                            $('#tblComment').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};
