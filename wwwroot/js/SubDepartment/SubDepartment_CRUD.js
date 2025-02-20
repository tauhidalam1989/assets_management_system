var Details = function (id, SubDeptDet) {
    var url = "/SubDepartment/Details?id=" + id;
    $('#titleBigModal').html(SubDeptDet);
    loadBigModal(url);
};


var AddEdit = function (id, editSubDept, addSubDept) {
    var url = "/SubDepartment/AddEdit?id=" + id;
    if (id > 0) {
        $('#titleBigModal').html(editSubDept);
    }
    else {
        $('#titleBigModal').html(addSubDept);
    }
    loadBigModal(url);
};

var Save = function (pleasewait,save) {
    if (!$("#frmSubDepartment").valid()) {
        return;
    }

    var _frmSubDepartment = $("#frmSubDepartment").serialize();
    $("#btnSave").val(pleasewait);
    $('#btnSave').attr('disabled', 'disabled');
    $.ajax({
        type: "POST",
        url: "/SubDepartment/AddEdit",
        data: _frmSubDepartment,
        success: function (result) {
            Swal.fire({
                title: result,
                icon: "success"
            }).then(function () {
                document.getElementById("btnClose").click();
                $("#btnSave").val(save);
                $('#btnSave').removeAttr('disabled');
                $('#tblSubDepartment').DataTable().ajax.reload();
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
                url: "/SubDepartment/Delete?id=" + id,
                success: function (result) {
                    var message = msgdel + ": " + result.Id;
                    Swal.fire({
                        title: message,
                        icon: 'info',
                        onAfterClose: () => {
                            $('#tblSubDepartment').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};
