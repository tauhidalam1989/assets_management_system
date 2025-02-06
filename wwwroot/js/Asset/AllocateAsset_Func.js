var AllocateAsset = function (id) {
    var url = "/Asset/AllocateAsset?id=" + id;
    $('#titleExtraBigModal').html("Allocate Asset");
    loadExtraBigModal(url);
};

var AllocateAssetSave = function () {
    var _AssetId = $("#AssetId").val();
    var _EmployeeId = $("#AssetAssignEmployeeId").val();

    if (_EmployeeId == null || _EmployeeId == '') {
        Swal.fire({
            title: 'Employee field can not be null or empty.',
            icon: "warning",
            onAfterClose: () => {
                $("#AssetAssignEmployeeId").focus();
            }
        });
        return;
    }

    var _AssigneeAssetFormData = new FormData()
    _AssigneeAssetFormData.append('AssetId', _AssetId)
    _AssigneeAssetFormData.append('EmployeeId', _EmployeeId)

    $.ajax({
        type: "POST",
        url: "/Asset/AllocateAssetSave",
        data: _AssigneeAssetFormData,
        processData: false,
        contentType: false,
        success: function (result) {
            if (result == true) {
                Swal.fire({
                    title: 'Already Assigned this Asset to the Selected Employee, Please Check!',
                    icon: "warning",
                    onAfterClose: () => {
                        $("#AssetAssignEmployeeId").focus();
                    }
                });
            }
            else {
                var url = "/Asset/AllocateAsset?id=" + _AssetId;
                $('#titleExtraBigModal').html("Allocate Asset");
                loadExtraBigModal(url);
            }
        }
    });
};


var RemoveAllocateAsset = function (id) {
    console.log(id);

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
                type: "DELETE",
                url: "/Asset/RemoveAllocateAsset?id=" + id,
                success: function (result) {
                    Swal.fire({
                        title: "Asset Unassigned Successful",
                        icon: 'info',
                        onAfterClose: () => {
                            var url = "/Asset/AllocateAsset?id=" + result.AssetId;
                            $('#titleExtraBigModal').html("Allocate Asset");
                            loadExtraBigModal(url);
                        }
                    });
                }
            });
        }
    });
};
