var Details = function (id,desgdet) {
    var url = "/Designation/Details?id=" + id;
    $('#titleMediumModal').html(desgdet);
    loadMediumModal(url);
};


var AddEdit = function (id,editdesg,adddesg) {
    var url = "/Designation/AddEdit?id=" + id;
    if (id > 0) {
        $('#titleMediumModal').html(editdesg);
    }
    else {
        $('#titleMediumModal').html(adddesg);
    }
    loadMediumModal(url);
};

var Save = function () {
    if (!$("#frmDesignation").valid()) {
        return;
    }

    var _frmDesignation = $("#frmDesignation").serialize();
    $.ajax({
        type: "POST",
        url: "/Designation/AddEdit",
        data: _frmDesignation,
        success: function (result) {
            Swal.fire({
                title: result,
                icon: "success"
            }).then(function () {
                document.getElementById("btnClose").click();
                $('#tblDesignation').DataTable().ajax.reload();
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
                type: "DELETE",
                url: "/Designation/Delete?id=" + id,
                success: function (result) {
                    var message = delmsg + ": " + result.Id;
                    Swal.fire({
                        title: message,
                        icon: 'info',
                        onAfterClose: () => {
                            $('#tblDesignation').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};
