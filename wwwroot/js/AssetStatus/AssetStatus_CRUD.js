var Details = function (id,assetstatusdet) {
    var url = "/AssetStatus/Details?id=" + id;
    $('#titleBigModal').html(assetstatusdet);
    loadBigModal(url);
};


var AddEdit = function (id,edit,add) {
    var url = "/AssetStatus/AddEdit?id=" + id;
    if (id > 0) {
        $('#titleBigModal').html(edit);
    }
    else {
        $('#titleBigModal').html(add);
    }
    loadBigModal(url);
};

var Save = function (pleasewait,save) {
    if (!$("#frmAssetStatus").valid()) {
        return;
    }

    var _frmAssetStatus = $("#frmAssetStatus").serialize();
    $("#btnSave").val(pleasewait);
    $('#btnSave').attr('disabled', 'disabled');
    $.ajax({
        type: "POST",
        url: "/AssetStatus/AddEdit",
        data: _frmAssetStatus,
        success: function (result) {
            Swal.fire({
                title: result,
                icon: "success"
            }).then(function () {
                document.getElementById("btnClose").click();
                $("#btnSave").val(save);
                $('#btnSave').removeAttr('disabled');
                $('#tblAssetStatus').DataTable().ajax.reload();
            });
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var Delete = function (id,del,yes,delmsg) {
    if (DemoUserAccountLockAll() == 1) return;
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
                type: "POST",
                url: "/AssetStatus/Delete?id=" + id,
                success: function (result) {
                    var message = delmsg + ": " + result.Id;
                    Swal.fire({
                        title: message,
                        icon: 'info',
                        onAfterClose: () => {
                            $('#tblAssetStatus').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};
