var Details = function (id,userinfobrowdet) {
    var url = "/UserInfoFromBrowser/Details?id=" + id;
    $('#titleExtraBigModal').html(userinfobrowdet);
    loadExtraBigModal(url);
};

