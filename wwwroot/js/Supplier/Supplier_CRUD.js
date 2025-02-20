var Details = function (id,supdet) {
    var url = "/Supplier/Details?id=" + id;
    $('#titleBigModal').html(supdet);
    loadBigModal(url);
};


var AddEdit = function (id,editsup,addsup) {
    var url = "/Supplier/AddEdit?id=" + id;
    if (id > 0) {
        $('#titleBigModal').html(editsup);
    }
    else {
        $('#titleBigModal').html(addsup);
    }
    loadBigModal(url);
};

var Save = function (pleasewait,save) {
    if (!$("#frmSupplier").valid()) {
        return;
    }

    var _frmSupplier = $("#frmSupplier").serialize();
    $("#btnSave").val(pleasewait);
    $('#btnSave').attr('disabled', 'disabled');
    $.ajax({
        type: "POST",
        url: "/Supplier/AddEdit",
        data: _frmSupplier,
        success: function (result) {
            Swal.fire({
                title: result,
                icon: "success"
            }).then(function () {
                document.getElementById("btnClose").click();
                $("#btnSave").val(save);
                $('#btnSave').removeAttr('disabled');
                $('#tblSupplier').DataTable().ajax.reload();
            });
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var Delete = function (id,delmsg,yes,msgdel) {
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
                url: "/Supplier/Delete?id=" + id,
                success: function (result) {
                    var message = msgdel + ": " + result.Id;
                    Swal.fire({
                        title: message,
                        icon: 'info',
                        onAfterClose: () => {
                            $('#tblSupplier').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};
