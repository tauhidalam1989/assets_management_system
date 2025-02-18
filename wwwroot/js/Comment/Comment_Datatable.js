$(document).ready(function () {
    var title = $('#resourcetitle').data('title');
    var comdet = $('#resourcecomdet').data('comdet');
    var assetdet = $('#resourceassetdet').data('assetdet');
    var yes = $('#resourceyes').data('yes');
    var del = $('#resourcedel').data('del');
    var delmsg = $('#resourcedelmsg').data('delmsg');
    document.title = title;

    $("#tblComment").DataTable({
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
            "url": "/Comment/GetDataTabelData",
            "type": "POST",
            "datatype": "json"
        },


        "columns": [
            {
                data: "Id", "name": "Id", render: function (data, type, row) {
                    return "<a href='#' class='fa fa-eye' onclick='Details(\"" + row.Id + "\", \"" + comdet + "\");'>" + row.Id + "</a>";
                }
            },
            { "data": "AssetId", "name": "AssetId" },
            {
                data: "AssetName", "name": "AssetName", render: function (data, type, row) {
                    return "<a href='#' onclick='AssetDetails(\"" + row.AssetId + "\", \"" + assetdet + "\");'>" + row.AssetName + "</a>";
                }
            },
            { "data": "Message", "name": "Message" },
            { "data": "IsDeletedDisplay", "name": "IsDeletedDisplay" },
            { "data": "CreatedDate", "name": "CreatedDate" },
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
                    return "<a href='#' class='btn btn-danger btn-xs' onclick='Delete(\"" + row.Id + "\", \"" + delmsg + "\", \"" + yes + "\");'>" + del + "</a>";
                }
            }
        ],

        'columnDefs': [{
            'targets': [7],
            'orderable': false,
        }],

        "lengthMenu": [[20, 10, 15, 25, 50, 100, 200], [20, 10, 15, 25, 50, 100, 200]]
    });

});

