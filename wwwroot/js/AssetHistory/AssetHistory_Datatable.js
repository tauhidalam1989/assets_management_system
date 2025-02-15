$(document).ready(function () {
    var doctitle = $('#resourcetitle').data('title');
    var asssesthistdet = $('#resourceasssesthistdet').data('asssesthistdet');
    var editassesthist = $('#resourceresourceeditassesthist').data('resourceeditassesthist');
    var addassesthist = $('#resourceaddassesthist').data('addassesthist');
    var assestdet = $('#resourceassestdet').data('assestdet');
    document.title = doctitle;

    $("#tblAssetHistory").DataTable({
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
            "url": "/AssetHistory/GetDataTabelData",
            "type": "POST",
            "datatype": "json"
        },


        "columns": [
            {
                data: "Id", "name": "Id", render: function (data, type, row) {
                    return "<a href='#' class='fa fa-eye' onclick='Details(\"" + row.Id + "\", \"" + asssesthistdet + "\");'>" + row.Id + "</a>";
                }
            },
            {
                data: "AssetId", "name": "AssetId", render: function (data, type, row) {
                    return "<a href='#' onclick='AssetDetails(\"" + row.AssetId + "\", \"" + assestdet + "\");'>" + row.AssetDisplay + "</a>";
                }
            },
            { "data": "AssignEmployeeDisplay", "name": "AssignEmployeeDisplay" },
            { "data": "Action", "name": "Action" },
            { "data": "Note", "name": "Note" },
            { "data": "CreatedDateDisplay", "name": "CreatedDateDisplay" },
        ],

        "lengthMenu": [[20, 10, 15, 25, 50, 100, 200], [20, 10, 15, 25, 50, 100, 200]]
    });

});

