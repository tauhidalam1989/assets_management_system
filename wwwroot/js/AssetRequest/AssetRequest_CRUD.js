var Details = function (id) {
    var url = "/AssetRequest/Details?id=" + id;
    $('#titleBigModal').html("Asset Request Details");
    loadBigModal(url);
};


var AddEdit = function (id) {
    var url = "/AssetRequest/AddEdit?id=" + id;
    if (id > 0) {
        $('#titleExtraBigModal').html("Edit Asset Request");
    }
    else {
        $('#titleExtraBigModal').html("Add Asset Request");
    }
    loadExtraBigModal(url);
};

var SaveAssetRequest = function () {
    if (!$("#frmAssetRequest").valid()) {
        return;
    }

    var _frmAssetRequest = $("#frmAssetRequest").serialize();
    $("#btnSave").val("Please Wait");
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
                $("#btnSave").val("Save");
                $('#btnSave').removeAttr('disabled');
                $('#tblAssetRequest').DataTable().ajax.reload();
            });
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var Delete = function (id) {
    if (DemoUserAccountLockAll() == 1) return;
    Swal.fire({
        title: 'Do you want to delete this item?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/AssetRequest/Delete?id=" + id,
                success: function (result) {
                    var message = "Asset Request has been deleted successfully. Asset Request ID: " + result.Id;
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
