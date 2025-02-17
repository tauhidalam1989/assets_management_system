var Details = function (id,det) {
    var url = "/AssetIssue/Details?id=" + id;
    $('#titleBigModal').html(det);
    loadBigModal(url);
};

var AddEdit = function (id,edit,add) {
    var url = "/AssetIssue/AddEdit?id=" + id;
    if (id > 0) {
        $('#titleExtraBigModal').html(edit);
    }
    else {
        $('#titleExtraBigModal').html(add);
    }
    loadExtraBigModal(url);
};

var SaveAssetIssue = function (pleasewait,save) {
    if (!$("#frmAssetIssue").valid()) {
        return;
    }

    var _frmAssetIssue = $("#frmAssetIssue").serialize();
    $("#btnSave").val(pleasewait);
    $('#btnSave').attr('disabled', 'disabled');
    $.ajax({
        type: "POST",
        url: "/AssetIssue/AddEdit",
        data: _frmAssetIssue,
        success: function (result) {
            Swal.fire({
                title: result,
                icon: "success"
            }).then(function () {
                document.getElementById("btnClose").click();
                $("#btnSave").val(save);
                $('#btnSave').removeAttr('disabled');
                $('#tblAssetIssue').DataTable().ajax.reload();
            });
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var Delete = function (id,delqt,yes,delmsg) {
    if (DemoUserAccountLockAll() == 1) return;
    Swal.fire({
        title: delqt,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: yes
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/AssetIssue/Delete?id=" + id,
                success: function (result) {
                    var message = delmsg + ": " + result.Id;
                    Swal.fire({
                        title: message,
                        icon: 'info',
                        onAfterClose: () => {
                            $('#tblAssetIssue').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};
