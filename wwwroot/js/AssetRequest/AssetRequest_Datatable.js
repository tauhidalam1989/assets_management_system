$(document).ready(function () {
    var doctitle = $('#resourceTitle').data('title-msg');
    document.title = doctitle;
    var assetreqdet = $('#resourceassetreqdet').data('assetreqdet-msg');
    var editassetreq = $('#resourceEditassetreq').data('editassetreq-msg');
    var addassetreq = $('#resourceAddassetreq').data('addassetreq-msg');
    var edit = $('#resourceedit').data('edit-msg');
    var del = $('#resourcedelete').data('delete-msg');
    var yes = $('#resourceyes').data('yes-msg');
    var delmsg = $('#resourceDelMsg').data('delmsg-msg');
    var assetreqdel = $('#resourceassetreqdel').data('assetreqdel-msg');
    $("#tblAssetRequest").DataTable({
        paging: true,
        select: true,
        "order": [[0, "desc"]],
        dom: 'Bfrtip',


        buttons: [
            'pageLength',
        ],


        "processing": true,
        "serverSide": true,
        "filter": true, //Search Box
        "orderMulti": false,
        "stateSave": true,

        "ajax": {
            "url": "/AssetRequest/GetDataTabelData",
            "type": "POST",
            "datatype": "json"
        },


        "columns": [
            {
                data: "Id", "name": "Id", render: function (data, type, row) {
                    return "<a href='#' class='fa fa-eye' onclick='Details(\"" + row.Id + "\", \"" + assetreqdet + "\");'>" + row.Id + "</a>";
                }
            },
            { "data": "AssetDisplay", "name": "AssetDisplay" },
            { "data": "RequestedEmployeeDisplay", "name": "RequestedEmployeeDisplay" },
            { "data": "ApprovedByEmployeeDisplay", "name": "ApprovedByEmployeeDisplay" },          
            {
                data: null, render: function (data, type, row) {
                    if (row.Status == 'New') {
                        return "<button class='btn btn-xs btn-success'><span>New</span ><i class='fa fa-check-circle' aria-hidden='true'></i></button>";
                    }
                    else {
                        return "<button class='btn btn-xs btn-primary'><span>'" + row.Status + "'</span ><i class='fa fa-flag' aria-hidden='true'></i></button>";
                    }
                }
            },
            {
                "data": "RequestDate",
                "name": "RequestDate",
                "autoWidth": true,
                "render": function (data) {
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return (month.length > 1 ? month : month) + "/" + date.getDate() + "/" + date.getFullYear();
                }
            },
            {
                "data": "ReceiveDate",
                "name": "ReceiveDate",
                "autoWidth": true,
                "render": function (data) {
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return (month.length > 1 ? month : month) + "/" + date.getDate() + "/" + date.getFullYear();
                }
            },
            {
                data: null, render: function (data, type, row) {                 
                    if (row.IsAdmin) {
                        return "<a href='#' class='btn btn-info btn-xs' onclick='AddEdit(\"" + row.Id + "\", \"" + editassetreq + "\", \"" + addassetreq + "\");'>" + edit + "</a>";
                    }
                    else {
                        return "-";
                    }
                }
            },
            {
                data: null, render: function (data, type, row) {                   
                    if (row.IsAdmin) {
                        return "<a href='#' class='btn btn-danger btn-xs' onclick='Delete(\"" + row.Id + "\", \"" + delmsg + "\", \"" + yes + "\", \"" + assetreqdel + "\");'>" + del + "</a>";
                    }
                    else {
                        return "-";
                    }
                }
            }
        ],

        'columnDefs': [{
            'targets': [7, 8],
            'orderable': false,
        }],

        "lengthMenu": [[20, 10, 15, 25, 50, 100, 200], [20, 10, 15, 25, 50, 100, 200]]
    });

});

