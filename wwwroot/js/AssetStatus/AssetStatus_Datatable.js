$(document).ready(function () {
    var doctitle = $('#resourceTitle').data('title-msg');
    document.title = doctitle;   
    var assetstatusdet = $('#resourceassetstatusdet').data('assetstatusdet-msg');
    var editassetstatus = $('#resourceeditassetstatus').data('editassetstatus-msg');
    var addassetstatus = $('#resourceaddassetstatus').data('addassetstatus-msg');
    var edit = $('#resourceedit').data('edit-msg');
    var del = $('#resourcedel').data('del-msg');
    var yes = $('#resourceyes').data('yes-msg');
    var delmsg = $('#resourcemsgdel').data('msgdel-msg');
    var assetstatusselete = $('#resourceassetstatusselete').data('assetstatusselete-msg');
    $("#tblAssetStatus").DataTable({
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
            "url": "/AssetStatus/GetDataTabelData",
            "type": "POST",
            "datatype": "json"
        },


        "columns": [
            {
                data: "Id", "name": "Id", render: function (data, type, row) {
                    return "<a href='#' class='fa fa-eye' onclick='Details(\"" + row.Id + "\", \"" + assetstatusdet + "\");'>" + row.Id + "</a>";
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
                    return "<a href='#' class='btn btn-info btn-xs' onclick='AddEdit(\"" + row.Id + "\", \"" + editassetstatus + "\", \"" + addassetstatus + "\");'>" + edit + "</a>";
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return "<a href='#' class='btn btn-danger btn-xs' onclick='Delete(\"" + row.Id + "\", \"" + delmsg + "\", \"" + yes + "\", \"" + assetstatusselete + "\");'>" + del + "</a>";
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

