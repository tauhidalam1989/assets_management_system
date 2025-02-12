$(document).ready(function () {
    var doctitle = $('#resourceTitle').data('title-msg');
    var assetcatdet = $('#resourceassestcat').data('asset-cat-msg');
    var editassetcat = $('#resourceEditassetcat').data('editassetcat-msg');
    var addassetcat = $('#resourceAddassetcat').data('addassetcat-msg');
    var edit = $('#resourceEdit').data('edit-msg');
    var print = $('#resourcePrint').data('print-msg');
    var del = $('#resourceDel').data('del-msg');
    var delmsg = $('#resourceDelMsg').data('delete-msg');
    var yes = $('#resourceYesMsg').data('yes-msg');
    var msgassetcatdel = $('#resourceAssetCatDel').data('assetcatdel-msg');
    document.title = doctitle;
    $("#tblAssetCategorie").DataTable({
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
            "url": "/AssetCategorie/GetDataTabelData",
            "type": "POST",
            "datatype": "json"
        },


        "columns": [
            {
                data: "Id", "name": "Id", render: function (data, type, row) {
                    return "<a href='#' class='fa fa-eye' onclick='Details(\"" + row.Id + "\", \"" + assetcatdet + "\");'>" + row.Id + "</a>";

                }
            },
            { "data": "Name", "name": "Name" },
            { "data": "Description", "name": "Description" },

            {
                "data": "CreatedDate",
                "name": "CreatedDate",
                "autoWidth": true,
                "render": function (data) {
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return (month.length > 1 ? month : month) + "/" + date.getDate() + "/" + date.getFullYear();
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return "<a href='#' class='btn btn-info btn-xs' onclick='AddEdit(\"" + row.Id + "\", \"" + editassetcat + "\", \"" + addassetcat + "\");'>" + edit + "</a>";

                }
            },
            {
                data: null, render: function (data, type, row) {
                    return "<a href='#' class='btn btn-danger btn-xs' onclick='Delete(\"" + row.Id + "\", \"" + delmsg + "\", \"" + yes + "\", \"" + msgassetcatdel + "\");'>" + del + "</a>";

                }
            }
        ],

        'columnDefs': [{
            'targets': [4, 5],
            'orderable': false,
        }],

        "lengthMenu": [[20, 10, 15, 25, 50, 100, 200], [20, 10, 15, 25, 50, 100, 200]]
    });

});

