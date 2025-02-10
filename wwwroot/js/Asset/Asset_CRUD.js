$(document).ready(function () {
    $("#AssignEmployeeId").select2();    
});

var Details = function (id, assetdetail) {
    var url = "/Asset/Details?id=" + id;
    $('#titleExtraBigModal').html(assetdetail);
    loadExtraBigModal(url);
};

var DetailsGeneral = function (id, assetdetail) {
    var url = "/Asset/DetailsGeneral?id=" + id;
    $('#titleExtraBigModal').html(assetdetail);
    loadExtraBigModal(url);
};

var AssignEmployeeInfo = function (id,val1,val2) {
    if (id == 0) {
        FieldValidationAlert(null, val1, "info");
    }
    else {
        var url = "/UserManagement/ViewUserDetails?Id=" + id;
        $('#titleExtraBigModal').html(val2);
        loadExtraBigModal(url);
    }
};

var UnassignedAssetWarning = function (id, val1) {
    FieldValidationAlert(null, val1, "info");
};


var Delete = function (id,_title,_Issuccess) {
    if (DemoUserAccountLockAll() == 1) return;
    Swal.fire({
        title: _title,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "DELETE",
                url: "/Asset/Delete?id=" + id,
                success: function (result) {
                    var message = _Issuccess + result.Id;
                    Swal.fire({
                        title: message,
                        icon: 'info',
                        onAfterClose: () => {
                            $('#tblAsset').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};


var AddNewComment = function (IsView,_title) {
    var _CommentMessage = $("#CommentMessage").val();
    if (_CommentMessage == "" || _CommentMessage == null) {
        Swal.fire({
            title: _title,
            icon: "warning",
            onAfterClose: () => {
                $("#CommentMessage").focus();
            }
        });
        return;
    }

    var _AssetId = $("#tmpAssetId").val();
    var _FormData = new FormData()
    _FormData.append('AssetId', _AssetId)
    _FormData.append('Message', $("#CommentMessage").val())

    $.ajax({
        type: "POST",
        url: "/Comment/AddNewComment",
        data: _FormData,
        processData: false,
        contentType: false,
        success: function (result) {
            UIRoutSwitch(IsView);
            //$('#tblCommentHistory').DataTable().ajax.reload();
        }
    });
};


var DeleteComment = function (id, IsView,_title) {
    Swal.fire({
        title: _title,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: "DELETE",
                url: "/Comment/Delete?id=" + id,
                success: function (result) {
                    Swal.fire({
                        title: result,
                        icon: 'info',
                        onAfterClose: () => {
                            UIRoutSwitch(IsView);
                            //$('#tblCommentHistory').DataTable().ajax.reload();
                        }
                    });
                }
            });
        }
    });
};


var UIRoutSwitch = function (IsView) {
    var _AssetId = $("#tmpAssetId").val();
    if (IsView) {
        Details(_AssetId);
        setTimeout(function () {
            activaTab('divCommentHistoryInView');
        }, 100);
    }
    else {
        AddEdit(_AssetId);
        setTimeout(function () {
            activaTab('divCommentHistoryTab');
        }, 100);
    }
}

var PrintAsset = function (id) {
    location.href = "/Asset/PrintAsset?id=" + id;
};

var AddEdit = function (id,edit,add) {
    var url = "/Asset/AddEdit?id=" + id;
    if (id > 0) {
        $('#titleExtraBigModal').html(edit);
    }
    else {
        $('#titleExtraBigModal').html(add);
    }
    loadExtraBigModal(url);
};

var SaveAsset = function (val1,val2,val3,val4) {
    if (!FieldValidation('#Name')) {
        FieldValidationAlert('#Name', val1, "warning");
        return;
    }
    if (!FieldValidation('#Category')) {
        FieldValidationAlert('#Category', val2, "warning");
        return;
    }

    $("#btnSave").prop('value',val3);
    $('#btnSave').prop('disabled', true);

    $.ajax({
        type: "POST",
        url: "/Asset/AddEdit",
        data: PreparedFormObj(),
        processData: false,
        contentType: false,
        success: function (result) {
            $('#btnSave').prop('disabled', false);
            Swal.fire({
                title: result.AlertMessage,
                icon: "success"
            }).then(function () {
                document.getElementById("btnClose").click();
                if (result.CurrentURL == "/") {
                    setTimeout(function () {
                        $("#tblAsset").load("/ #tblAsset");
                    }, 1000);
                }
                else {
                    $('#tblAsset').DataTable().ajax.reload();
                }
            });
        },
        error: function (errormessage) {
            $("#btnSave").prop('value', val4);
            SwalSimpleAlert(errormessage.responseText, "warning");
        }
    });
}


var UpdateBarcode = function (val1,val2) {
    var _AssetId = $("#AssetId").val();
    if (_AssetId.length > 10) {
        FieldValidationAlert('#AssetId', val1, "warning");
        return;
    }

    Swal.fire({
        title: val2,
        icon: "success"
    }).then(function () {
        $("#Barcode").JsBarcode(_AssetId);
    });
}

var GenerateQRCode = function (val1) {
    var _QRCode = $("#QRCode").val();
    if (_QRCode.length > 20) {
        FieldValidationAlert('#QRCode', val1, "warning");
        return;
    }
    $('#divQRCode').empty();
    var qrcode = new QRCode("divQRCode", {
        text: _QRCode,
        width: 180, //default 128
        height: 180,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}


var PreparedFormObj = function () {
    var _FormData = new FormData()
    _FormData.append('Id', $("#Id").val())
    _FormData.append('CreatedDate', $("#CreatedDate").val())
    _FormData.append('CreatedBy', $("#CreatedBy").val())
    _FormData.append('AssetId', $("#AssetId").val())
    _FormData.append('AssetModelNo', $("#AssetModelNo").val())
    _FormData.append('Name', $("#Name").val())

    _FormData.append('Description', $("#Description").val())
    _FormData.append('UnitPrice', $("#UnitPrice").val())
    _FormData.append('Category', $("#Category").val())
    _FormData.append('SubCategory', $("#SubCategory").val())
    _FormData.append('Supplier', $("#Supplier").val())

    _FormData.append('Department', $("#Department").val())
    _FormData.append('SubDepartment', $("#SubDepartment").val())
    _FormData.append('DateOfManufacture', $("#DateOfManufacture").val())
    _FormData.append('YearOfValuation', $("#YearOfValuation").val())
    _FormData.append('WarranetyInMonth', $("#WarranetyInMonth").val())

    _FormData.append('DepreciationInMonth', $("#DepreciationInMonth").val())
    _FormData.append('Location', $("#Location").val())
    _FormData.append('ImageURL', $("#ImageURL").val())
    _FormData.append('ImageURLDetails', $('#ImageURLDetails')[0].files[0])
    _FormData.append('PurchaseReceipt', $("#PurchaseReceipt").val())
    _FormData.append('PurchaseReceiptDetails', $('#PurchaseReceiptDetails')[0].files[0])

    _FormData.append('AssetStatus', $("#AssetStatus").val())
    _FormData.append('Note', $("#Note").val())
    _FormData.append('Barcode', $('#Barcode').attr('src'))


    _FormData.append('QRCode', $("#QRCode").val())
    var _divQRCode = document.getElementById('divQRCode');
    var _src = _divQRCode.children[0].toDataURL("image/png");
    _FormData.append('QRCodeImage', _src)

    _FormData.append('AssignEmployeeId', $("#AssignEmployeeId").val())
    _FormData.append('CurrentURL', $("#CurrentURL").val())
    return _FormData;
}