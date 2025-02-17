$(document).ready(function () {
    var doctitle = $('#resourceTitle').data('title-msg');
    var editassetissue = $('#resourceEditassetissue').data('editassetissue-msg');
    var addassetissue = $('#resourceAddassetissue').data('addassetissue-msg');
    var edit = $('#resourceEdit').data('edit-msg');
    var print = $('#resourcePrint').data('print-msg');
    var del = $('#resourceDel').data('del-msg');
    var delmsg = $('#resourceDelMsg').data('delete-msg');
    var yes = $('#resourceYesMsg').data('yes-msg');
    var assetissuedet = $('#resourceassetissuedet').data('assetissuedet-msg');
    var assetissuedel = $('#resourceassetissuedel').data('msgassetissuedel-msg');
    document.title = doctitle;

    $("#tblAssetIssue").DataTable({
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
            "url": "/AssetIssue/GetDataTabelData",
            "type": "POST",
            "datatype": "json"
        },


        "columns": [
            {
                data: "Id", "name": "Id", render: function (data, type, row) {
                    return "<a href='#' class='fa fa-eye' onclick='Details(\"" + row.Id + "\", \"" + assetissuedet + "\");'>" + row.Id + "</a>";
                }
            },
            { "data": "AssetDisplay", "name": "AssetDisplay" },
            { "data": "RaisedByEmployeeDisplay", "name": "RaisedByEmployeeDisplay" },
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
                "data": "ExpectedFixDate",
                "name": "ExpectedFixDate",
                "autoWidth": true,
                "render": function (data) {
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return (month.length > 1 ? month : month) + "/" + date.getDate() + "/" + date.getFullYear();
                }
            },
            {
                "data": "ResolvedDate",
                "name": "ResolvedDate",
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
                        return "<a href='#' class='btn btn-info btn-xs' onclick='AddEdit(\"" + row.Id + "\", \"" + editassetissue + "\", \"" + addassetissue + "\");'>" + edit + "</a>";
                    }
                    else {
                        return "-";
                    }
                }
            },
            {
                data: null, render: function (data, type, row) {                   
                    if (row.IsAdmin) {
                        return "<a href='#' class='btn btn-danger btn-xs' onclick='Delete(\"" + row.Id + "\", \"" + delmsg + "\", \"" + yes + "\", \"" + assetissuedel + "\");'>" + del + "</a>";
                    }
                    else {
                        return "-";
                    }
                }
            }
        ],

        'columnDefs': [{
            'targets': [6, 7],
            'orderable': false,
        }],

        "lengthMenu": [[20, 10, 15, 25, 50, 100, 200], [20, 10, 15, 25, 50, 100, 200]]
    });

});

