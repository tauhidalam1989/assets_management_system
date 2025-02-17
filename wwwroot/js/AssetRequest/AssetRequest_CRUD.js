var Details = function (id,assetreqdet) {
    var url = "/AssetRequest/Details?id=" + id;
    $('#titleBigModal').html(assetreqdet);
    loadBigModal(url);
};


var AddEdit = function (id,editassetreq,addassetreq) {
    var url = "/AssetRequest/AddEdit?id=" + id;
    if (id > 0) {
        $('#titleExtraBigModal').html(editassetreq);
    }
    else {
        $('#titleExtraBigModal').html(addassetreq);
    }
    loadExtraBigModal(url);
};

var SaveAssetRequest = function (pleasewait, save) {
    if (!$("#frmAssetRequest").valid()) {
        return;
    }

    var _frmAssetRequest = $("#frmAssetRequest").serialize();
    $("#btnSave").val(pleasewait);
    $('#btnSave').attr('disabled', 'disabled');
    $.ajax({
        type: "POST",
        url: "/AssetRequest/AddEdit",
        data: _frmAssetRequest,
        success: function (result) {
            Swal.fire({
                title: result,
                icon: "success"
            }).then(function () {
                document.getElementById("btnClose").click();
                $("#btnSave").val(save);
                $('#btnSave').removeAttr('disabled');
                $('#tblAssetRequest').DataTable().ajax.reload();
            });
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var Delete = function (id,del,yes,msgdel) {
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
                url: "/AssetRequest/Delete?id=" + id,
                success: function (result) {
                    var message = msgdel + ": " + result.Id;
                    Swal.fire({
                        title: message,
                        icon: 'info',
                        onAfterClose: () => {
                            $('#tblAssetRequest').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};
