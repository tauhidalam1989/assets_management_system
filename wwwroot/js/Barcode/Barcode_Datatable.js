$(document).ready(function () {
    var title = $('#resourcetitle').data('title');
    var tml = $('#resourcetml').data('tml');
    var print = $('#resourceprint').data('print');
    var assetdet = $('#resourceassetdet').data('assetdet');
    document.title = title;

    $("#tblBarcode").DataTable({
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
            "url": "/Barcode/GetDataTabelData",
            "type": "POST",
            "datatype": "json"
        },


        "columns": [
            {
                data: "Id", "name": "Id", render: function (data, type, row) {
                    return "<a href='#' class='fa fa-eye' onclick='Details(\"" + row.Id + "\", \"" + assetdet + "\");'>" + row.Id + "</a>";
                }
            },
            { "data": "AssetName", "name": "AssetName" },

            {
                data: null, render: function (data, type, row) {
                    var _BarcodeContentHTML = BarcodeContentHTML(row);
                    return _BarcodeContentHTML;
                }
            },
            {
                data: null, render: function (data, type, row) {
                    var _BarcodePrintActionHTML = BarcodePrintActionHTML(row,print,tml);
                    return _BarcodePrintActionHTML;
                }
            }
        ],

        'columnDefs': [{
            'targets': [2, 3],
            'orderable': false,
        }],

        "lengthMenu": [[10, 15, 20, 25, 50, 100, 200], [10, 15, 20, 25, 50, 100, 200]]
    });

});


var BarcodeContentHTML = function (data) {
    var html = '';
    html = '<div id="' + data.Id + '">'
        + '<img class="imgCustom300px" src="' + data.Barcode + '" alt="" /><br />'
        + '<span>' + data.AssetId + '/' + data.AssetModelNo + '/' + data.Department + '/' + data.AssignUserName + '</span>'
        + '</div>';

    return html;
}

var BarcodePrintActionHTML = function (data,print,tml) {
    var html = '';
    var _Metadata = data.AssetId + '/' + data.AssetModelNo + '/' + data.Department + '/' + data.AssignUserName;

    html = '<div>' +
        '<button class="btn btn-success" onclick="printBarcodeDiv(' + data.Id + ')">' +
        '<span class="fa fa-print"></span>'+ print +' </button>&nbsp;' +
        '<button class="btn btn-sm btn-secondary" onclick="printBarcodeDivThurmal(\'' + data.Barcode + '\', \'' + _Metadata + '\')">' +
        '<span class="">'+tml+'</span></button>' +
        '</div>';

    return html;
}


var Details = function (id,assetdet) {
    var url = "/Asset/Details?id=" + id;
    $('#titleExtraBigModal').html(assetdet);
    loadExtraBigModal(url);
};