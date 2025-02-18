var Details = function(id,assetlogdetail) {
    var url = "/AuditLogs/Details?id=" + id;
    $('#titleExtraBigModal').html(assetlogdetail);
    loadExtraBigModal(url);
};