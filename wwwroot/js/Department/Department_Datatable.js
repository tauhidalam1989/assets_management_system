$(document).ready(function () {
    var title = $('#resourcetitle').data('title');
    var editdept = $('#resourceeditdept').data('editdept');
    var adddept = $('#resourceadddept').data('adddept');
    var edit = $('#resourceedit').data('edit');
    var yes = $('#resourceyes').data('yes');
    var del = $('#resourcedel').data('del');
    var delmsg = $('#resourcedelmsg').data('delmsg');
    var msgdel = $('#resourcemsgdel').data('msgdel');
    var deptdet = $('#resourcedeptdet').data('deptdet');
    document.title = title;

    $("#tblDepartment").DataTable({
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
            "url": "/Department/GetDataTabelData",
            "type": "POST",
            "datatype": "json"
        },


        "columns": [
            {
                data: "Id", "name": "Id", render: function (data, type, row) {
                    return "<a href='#' class='fa fa-eye' onclick='Details(\"" + row.Id + "\", \"" + deptdet + "\");'>" + row.Id + "</a>";
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
                    return "<a href='#' class='fa fa-info' onclick='AddEdit(\"" + row.Id + "\", \"" + editdept + "\", \"" + adddept + "\");'>" + edit + "</a>";
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return "<a href='#' class='btn btn-danger btn-xs' onclick='Delete(\"" + row.Id + "\", \"" + delmsg + "\", \"" + yes + "\", \"" + msgdel + "\");'>" + del + "</a>";
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

