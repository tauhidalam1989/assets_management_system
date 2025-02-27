$(document).ready(function () {
    var title = $('#restitle').data('title');
    var subdeptdet = $('#ressubdeptdet').data('subdeptdet');
    var delmsg = $('#resdelmsg').data('delmsg');
    var editsubdept = $('#reseditsubdept').data('editsubdept');
    var addsubdept = $('#resaddsubdept').data('addsubdept');
    var save = $('#ressave').data('save');
    var yes = $('#resyes').data('yes');
    var msgdel = $('#resmsgdel').data('msgdel');
    var edit = $('#resedit').data('edit');
    var del = $('#resdel').data('del');
    document.title = title;

    $("#tblSubDepartment").DataTable({
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
            "url": "/SubDepartment/GetDataTabelData",
            "type": "POST",
            "datatype": "json"
        },


        "columns": [
            {
                data: "Id", "name": "Id", render: function (data, type, row) {
                    return "<a href='#' class='fa fa-eye' onclick='Details(\"" + row.Id + "\", \"" + subdeptdet + "\");'>" + row.Id + "</a>";
                }
            },
            { "data": "Name", "name": "Name" },
            { "data": "DepartmentDisplay", "name": "DepartmentDisplay" },
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
                    return "<a href='#' class='btn btn-info btn-xs' onclick='AddEdit(\"" + row.Id + "\", \"" + editsubdept + "\", \"" + addsubdept + "\");'>" + edit + "</a>";
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return "<a href='#' class='btn btn-danger btn-xs' onclick='Delete(\"" + row.Id + "\", \"" + delmsg + "\", \"" + yes + "\", \"" + msgdel + "\");'>" + del + "</a>";
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

