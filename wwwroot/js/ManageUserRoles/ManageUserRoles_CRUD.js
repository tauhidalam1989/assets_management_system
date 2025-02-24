var Details = function (id,roledet) {
    var url = "/ManageUserRoles/Details?id=" + id;
    $('#titleExtraBigModal').html(roledet);
    loadExtraBigModal(url);
};


var AddEdit = function (id,editrole,addrole) {
    if (DemoUserAccountLockAll() == 1) return;

    var url = "/ManageUserRoles/AddEdit?id=" + id;
    if (id > 0) {
        $('#titleExtraBigModal').html(editrole);
    }
    else {
        $('#titleExtraBigModal').html(addrole);
    }
    loadExtraBigModal(url);
};

var Save = function (pleasewait,save) {
    if (!$("#frmUserRoles").valid()) {
        return;
    }

    var _frmUserRoles = $("#frmUserRoles").serialize();
    $("#btnSave").val(pleasewait);
    $('#btnSave').attr('disabled', 'disabled');
    $.ajax({
        type: "POST",
        url: "/ManageUserRoles/AddEdit",
        data: _frmUserRoles,
        success: function (result) {
            Swal.fire({
                title: result,
                icon: "success"
            }).then(function () {
                document.getElementById("btnClose").click();
                $("#btnSave").val(save);
                $('#btnSave').removeAttr('disabled');
                $('#tblManageUserRoles').DataTable().ajax.reload();
            });
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var Delete = function (id,msgdel,yes,delmsg) {
    if (DemoUserAccountLockAll() == 1) return;
    
    Swal.fire({
        title: msgdel,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: yes
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "POST",
                url: "/ManageUserRoles/Delete?id=" + id,
                success: function (result) {
                    var message = delmsg + ": " + result.Id;
                    Swal.fire({
                        title: message,
                        icon: 'info',
                        onAfterClose: () => {
                            $('#tblManageUserRoles').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};