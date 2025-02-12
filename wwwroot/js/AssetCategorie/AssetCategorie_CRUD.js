var Details = function (id, assetcatdet) {
    var url = "/AssetCategorie/Details?id=" + id;
    $('#titleBigModal').html(assetcatdet);
    loadBigModal(url);
};


var AddEdit = function (id,editassetcat,addassetcat) {
    var url = "/AssetCategorie/AddEdit?id=" + id;
    if (id > 0) {
        $('#titleBigModal').html(editassetcat);
    }
    else {
        $('#titleBigModal').html(addassetcat);
    }
    loadBigModal(url);
};

var Save = function (pleasewait,save) {
    if (!$("#frmAssetCategorie").valid()) {
        return;
    }

    var _frmAssetCategorie = $("#frmAssetCategorie").serialize();
    $("#btnSave").val(pleasewait);
    $('#btnSave').attr('disabled', 'disabled');
    $.ajax({
        type: "POST",
        url: "/AssetCategorie/AddEdit",
        data: _frmAssetCategorie,
        success: function (result) {
            Swal.fire({
                title: result,
                icon: "success"
            }).then(function () {
                document.getElementById("btnClose").click();
                $("#btnSave").val(save);
                $('#btnSave').removeAttr('disabled');
                $('#tblAssetCategorie').DataTable().ajax.reload();
            });
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var Delete = function (id, msgdelete, yes, msgassetcatdel) {
    if (DemoUserAccountLockAll() == 1) return;
    Swal.fire({
        title: msgdelete,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: yes
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/AssetCategorie/Delete?id=" + id,
                success: function (result) {
                    var message = msgassetcatdel + result.Id;
                    Swal.fire({
                        title: message,
                        icon: 'info',
                        onAfterClose: () => {
                            $('#tblAssetCategorie').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};
