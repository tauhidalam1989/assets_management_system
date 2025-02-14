var Details = function (id,assestsubcatdet) {
    var url = "/AssetSubCategorie/Details?id=" + id;
    $('#titleBigModal').html(assestsubcatdet);
    loadBigModal(url);
};


var AddEdit = function (id, editassestsubcat,addassestsubcat) {
    var url = "/AssetSubCategorie/AddEdit?id=" + id;
    if (id > 0) {
        $('#titleBigModal').html(editassestsubcat);
    }
    else {
        $('#titleBigModal').html(addassestsubcat);
    }
    loadBigModal(url);
};

var Save = function (pleasewait,save) {
    if (!$("#frmAssetSubCategorie").valid()) {
        return;
    }

    var _frmAssetSubCategorie = $("#frmAssetSubCategorie").serialize();
    $("#btnSave").val(pleasewait);
    $('#btnSave').attr('disabled', 'disabled');
    $.ajax({
        type: "POST",
        url: "/AssetSubCategorie/AddEdit",
        data: _frmAssetSubCategorie,
        success: function (result) {
            Swal.fire({
                title: result.AlertMessage,
                icon: "success"
            }).then(function () {
                document.getElementById("btnClose").click();
                $("#btnSave").val(save);
                $('#btnSave').removeAttr('disabled');
                $('#tblAssetSubCategorie').DataTable().ajax.reload();
            });
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var Delete = function (id, delmsg, yes, msgassetsubcatdel) {
    if (DemoUserAccountLockAll() == 1) return;
    Swal.fire({
        title: delmsg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: yes
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "DELETE",
                url: "/AssetSubCategorie/Delete?id=" + id,
                success: function (result) {
                    var message = msgassetsubcatdel + " " + result.Id;
                    Swal.fire({
                        title: message,
                        icon: 'info',
                        onAfterClose: () => {
                            $('#tblAssetSubCategorie').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};
