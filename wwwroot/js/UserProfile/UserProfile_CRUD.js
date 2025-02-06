
var ResetPasswordGeneral = function () {
    if (DemoUserAccountLockAll() == 1) return;
    var _ApplicationUserId = $("#ApplicationUserId_Index").val();
    $('#titleMediumModal').html("<h4>Reset Password</h4>");
    var url = "/UserProfile/ResetPasswordGeneral?ApplicationUserId=" + _ApplicationUserId;
    loadMediumModal(url);
};

var SaveResetPasswordGeneral = function () {
    if (!$("#frmResetPasswordGeneral").valid()) {
        return;
    }

    $.ajax({
        type: "POST",
        url: "/UserProfile/SaveResetPasswordGeneral",
        data: PreparedFormObjUserProfile(),
        processData: false,
        contentType: false,
        success: function (result) {
            var _error = result.substring(0, 5);
            if (_error == 'error') {
                var _result = result.slice(5);
                Swal.fire({
                    title: _result,
                    icon: "warning"
                }).then(function () {
                    setTimeout(function () {
                        $('#OldPassword').focus();
                    }, 400);
                });
            }
            else {
                Swal.fire({
                    title: result,
                    icon: "success"
                }).then(function () {
                    document.getElementById("btnResetPasswordGeneralClose").click();
                });
            }
        },
        error: function (errormessage) {
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}

var PreparedFormObjUserProfile = function () {
    var _FormData = new FormData()
    _FormData.append('ApplicationUserId', $("#ApplicationUserId_ResetPasswordGeneral").val())
    _FormData.append('OldPassword', $("#OldPassword").val())
    _FormData.append('NewPassword', $("#NewPassword").val())
    _FormData.append('ConfirmPassword', $("#ConfirmPassword").val())
    return _FormData;
}