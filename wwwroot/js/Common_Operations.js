
var SaveBase = function (apiUrl, _formName, tableName) {
    if (!$("#" + _formName).valid()) {
        return;
    }

    $("#btnSave").val("Please Wait");
    $('#btnSave').attr('disabled', 'disabled');

    const _formData = SerializeFormToJson(_formName);
    PostAPIData(apiUrl, _formData)
        .then(data => {
            Swal.fire({
                title: data,
                icon: "success"
            }).then(function () {
                document.getElementById("btnClose").click();
                $("#btnSave").val("Save");
                $('#btnSave').removeAttr('disabled');
                $('#' + tableName).DataTable().ajax.reload();
            });
        })
        .catch(error => {
            $("#btnSave").val("Save");
            $('#btnSave').removeAttr('disabled');
            SwalSimpleAlert("Error:" + error, "warning");
        });
}

var DeleteBase = function (_url, _message, tableName) {
    Swal.fire({
        title: 'Do you want to delete this item?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.value) {
            DeleteAPIData(_url)
                .then(data => {
                    Swal.fire({
                        title: _message + data.Id,
                        icon: 'info',
                        onAfterClose: () => {
                            $('#' + tableName).DataTable().ajax.reload();
                        }
                    });
                });
        }
    });
};


var GetDropDownDataBase = function (ItemName, _url) {
    const _FetchData = FetchAPIData(_url);
    _FetchData.then(data => {
        for (var i = 0; i < data.length; i++) {
            var _ItemName = document.getElementById(ItemName);
            var _option = document.createElement("option");
            _option.text = data[i].Name;
            _option.value = data[i].Id;
            _ItemName.add(_option);
        }
    });
};

var OpenModalView = function (url, ModalSize, ModalTitle) {
    $("#divModalSize").removeClass('modal-sm');
    $("#divModalSize").removeClass('modal-md');
    $("#divModalSize").removeClass('modal-lg');
    $("#divModalSize").removeClass('modal-xl');

    $("#divModalSize").addClass(ModalSize);
    $('#ModalTitle').html(ModalTitle);

    $("#ModalBody").load(url, function () {
        $("#GenericModal").modal("show");
    });
};

var displayThumbnail = function (fileInputId, thumbnailId) {
    var fileInput = document.getElementById(fileInputId);
    var thumbnail = document.getElementById(thumbnailId);
    if (fileInput.files && fileInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            thumbnail.src = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}