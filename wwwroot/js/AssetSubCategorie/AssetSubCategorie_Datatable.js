$(document).ready(function () {
    var doctitle = $('#resourceTitle').data('title-msg');
    var assetsubcatdet = $('#resourceassestsubcat').data('asset-subcat-msg');
    var editassetsubcat = $('#resourceEditassetsubcat').data('editassetsubcat-msg');
    var addassetsubcat = $('#resourceAddassetsubcat').data('addassetsubcat-msg');
    var edit = $('#resourceEdit').data('edit-msg');
    var del = $('#resourceDel').data('del-msg');
    var delmsg = $('#resourceDelMsg').data('delete-msg');
    var yes = $('#resourceYesMsg').data('yes-msg');
    var msgassetsubcatdel = $('#resourceAssetSubCatDel').data('assetsubcatdel-msg');
    document.title = doctitle;
    $("#tblAssetSubCategorie").DataTable({
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
            "url": "/AssetSubCategorie/GetDataTabelData",
            "type": "POST",
            "datatype": "json"
        },


        "columns": [
            {
                data: "Id", "name": "Id", render: function (data, type, row) {
                    return "<a href='#' class='fa fa-eye' onclick='Details(\"" + row.Id + "\", \"" + assetsubcatdet + "\");'>" + row.Id + "</a>";
                }
            },
            { "data": "Name", "name": "Name" },
            { "data": "AssetCategorieDisplay", "name": "AssetCategorieDisplay" },
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
                    return "<a href='#' class='btn btn-info btn-xs' onclick='AddEdit(\"" + row.Id + "\", \"" + editassetsubcat + "\", \"" + addassetsubcat + "\");'>" + edit + "</a>";
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return "<a href='#' class='btn btn-danger btn-xs' onclick='Delete(\"" + row.Id + "\", \"" + delmsg + "\", \"" + yes + "\", \"" + msgassetsubcatdel + "\");'>" + del + "</a>";
                }
            }
        ],

        'columnDefs': [{
            'targets': [5, 6],
            'orderable': false,
        }],

        "lengthMenu": [[20, 10, 15, 25, 50, 100, 200], [20, 10, 15, 25, 50, 100, 200]]
    });

});

