$(document).ready(function () {
    var title = $('#restitle').data('title');
    var yes = $('#resourceyes').data('yes');
    var edit = $('#resourceedit').data('edit');
    var del = $('#resourcedel').data('del');
    var addrole = $('#resourceaddrole').data('addrole');
    var editrole = $('#resourceeditrole').data('editrole');
    var roledet = $('#resourceroledet').data('roledet');
    var msgdel = $('#resourcemsgdel').data('msgdel');
    var delmsg = $('#resourcedelmsg').data('delmsg');
    document.title = title;

    $("#tblManageUserRoles").DataTable({
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
            "url": "/ManageUserRoles/GetDataTabelData",
            "type": "POST",
            "datatype": "json"
        },


        "columns": [
            {
                data: "Id", "name": "Id", render: function (data, type, row) {
                    return "<a href='#' class='fa fa-eye' onclick='Details(\"" + row.Id + "\", \"" + roledet + "\");'>" + row.Id + "</a>";
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
                    return "<a href='#' class='btn btn-info btn-xs' onclick='AddEdit(\"" + row.Id + "\", \"" + editrole + "\", \"" + addrole + "\");'>" + edit + "</a>";
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return "<a href='#' class='btn btn-danger btn-xs' onclick='Delete(\"" + row.Id + "\", \"" + msgdel + "\", \"" + yes + "\", \"" + delmsg + "\");'>" + del + "</a>";
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

