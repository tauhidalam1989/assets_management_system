var Details = function (id,deptdet) {
    var url = "/Department/Details?id=" + id;
    $('#titleBigModal').html(deptdet);
    loadBigModal(url);
};


var AddEdit = function (id,editdept,adddept) {
    var url = "/Department/AddEdit?id=" + id;
    if (id > 0) {
        $('#titleBigModal').html(editdept);
    }
    else {
        $('#titleBigModal').html(adddept);
    }
    loadBigModal(url);
};

var Save = function (pleasewait,save) {
    if (!$("#frmDepartment").valid()) {
        return;
    }

    var _frmDepartment = $("#frmDepartment").serialize();
    $("#btnSave").val(pleasewait);
    $('#btnSave').attr('disabled', 'disabled');
    $.ajax({
        type: "POST",
        url: "/Department/AddEdit",
        data: _frmDepartment,
        success: function (result) {
            Swal.fire({
                title: result,
                icon: "success"
            }).then(function () {
                document.getElementById("btnClose").click();
                $("#btnSave").val(save);
                $('#btnSave').removeAttr('disabled');
                $('#tblDepartment').DataTable().ajax.reload();
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
                type: "POST",
                url: "/Department/Delete?id=" + id,
                success: function (result) {
                    var message = msgdel + ": " + result.Id;
                    Swal.fire({
                        title: message,
                        icon: 'info',
                        onAfterClose: () => {
                            $('#tblDepartment').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};
