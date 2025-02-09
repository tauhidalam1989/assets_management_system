
var AllocateAsset = function (id, allocateassest) {
    var url = "/Asset/AllocateAsset?id=" + id;    
    $('#titleExtraBigModal').html(allocateassest);
    loadExtraBigModal(url);
};

var AllocateAssetSave = function (_title, allocateassest) {
    var _AssetId = $("#AssetId").val();
    var _EmployeeId = $("#AssetAssignEmployeeId").val();

    if (_EmployeeId == null || _EmployeeId == '') {
        Swal.fire({
            title: _title,
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
                    title: 'Assest Assigned successfully',
                    icon: "warning",
                    onAfterClose: () => {
                        $("#AssetAssignEmployeeId").focus();
                    }
                });
            }
            else {
                var url = "/Asset/AllocateAsset?id=" + _AssetId;
                $('#titleExtraBigModal').html(allocateassest);
                loadExtraBigModal(url);
            }
        }
    });
};


var RemoveAllocateAsset = function (id, _title, allocateassest) {
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
                url: "/Asset/RemoveAllocateAsset?id=" + id,
                success: function (result) {
                    Swal.fire({
                        title: _title,                        
                        icon: 'info',
                        onAfterClose: () => {
                            var url = "/Asset/AllocateAsset?id=" + result.AssetId;
                            $('#titleExtraBigModal').html(allocateassest);
                            loadExtraBigModal(url);
                        }
                    });
                }
            });
        }
    });
};
