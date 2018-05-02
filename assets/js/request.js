function getBugpage() {
    var page = $.getUrlVar('page');
    var pagecount = $.getUrlVar('pagecount');

    $.ajax({
        //提交数据的类型 POST GET
        type: "GET",
        //提交的网址
        url: "http://192.168.1.102:8855/debug/BugPageGet",
        //提交的数据
        data: {page: page, pagecount: pagecount},
        async: false,
        //返回数据的格式
        datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
        //成功返回之后调用的函数
        success: function (data) {
            var jsondata = $.parseJSON(data);
            if (jsondata.code == 200000) {
                var list = jsondata.list;

                for (var i = 0; i < list.length; i++) {
                    $("#tables").append("<tr>" +
                        "<td  class='table-id'>" + list[i].debugID + "</td>" +
                        "<td  class='table-title'>" + list[i].debugBround + "</td>" +
                        "<td  class='table-type'>" + list[i].debugModel + "</td>" +
                        "<td  class='table-set'>" + list[i].debugOS + "</td>" +
                        "<td  class='table-set'>" + list[i].debugOSVersion + "</td>" +
                        "<td  class='table-set'>" + list[i].debugTime + "</td>" +
                        "<td  class='table-set'>" + list[i].appVersionName + "</td>" +
                        "<td  class='table-set'>" + list[i].appVersionCode + "</td>" +
                        "<td> <div class='am-btn-toolbar'> <div class='am-btn-group am-btn-group-xs'><a class='am-btn am-btn-default am-btn-xs am-hide-sm-only' onclick='getBug(" + list[i].debugID + ")'><spanclass='am-icon-copy'></span> 详细 </a></div></div></td>" +
                        "</tr>");
                }
                if (page == jsondata.pagetotal) {
                    if (page == 1) {
                        $("#pageUl").append("<li><a href='bug-list.html?page=1&pagecount=20'>home</a></li>" +
                            "<li class='am-disabled'><a>«</a></li>" +
                            "<li class='am-active am-disabled'><a href='#'>" + (parseInt(page) + parseInt(0)) + "</a></li>" +
                            "<li class='am-disabled'><a>»</a></li>" +
                            "<li class='am-disabled'><a>end</a></li>");
                    } else {
                        $("#pageUl").append("<li><a href='bug-list.html?page=1&pagecount=20'>home</a></li>" +
                            "<li><a href='bug-list.html?page=" + (parseInt(page) - parseInt(1)) + "&pagecount=20'>«</a></li>" +
                            "<li class='am-active am-disabled'><a href='#'>" + (parseInt(page) + parseInt(0)) + "</a></li>" +
                            "<li class='am-disabled'><a>»</a></li>" +
                            "<li class='am-disabled'><a>end</a></li>");
                    }
                } else if (page == 1) {
                    var str = "<li><a href='bug-list.html?page=1&pagecount=20'>home</a></li>" +
                        "<li class='am-disabled'><a>«</a></li>" +
                        "<li class='am-active am-disabled'><a href='#'>" + (parseInt(page) + parseInt(0)) + "</a></li>";

                    for (var i = 0; i < jsondata.pagetotal - page; i++) {
                        if (i < 4)
                            str += "<li><a href='bug-list.html?page=" + (parseInt(page) + parseInt(i + 1)) + "&pagecount=20'>" + (parseInt(page) + parseInt(i + 1)) + "</a></li>";
                    }
                    str += "<li><a href='bug-list.html?page=" + (parseInt(page) + parseInt(1)) + "&pagecount=20'>»</a></li>" +
                        "<li><a href='bug-list.html?page=" + parseInt(jsondata.pagetotal) + "&pagecount=20'>end</a></li>";


                    $("#pageUl").append(str);
                } else if (page > 0) {
                    var str = "<li><a href='bug-list.html?page=1&pagecount=20'>home</a></li>" +
                        "<li><a href='bug-list.html?page=" + (parseInt(page) - parseInt(1)) + "&pagecount=20'>«</a></li>" +
                        "<li class='am-active am-disabled'><a href='#'>" + (parseInt(page) + parseInt(0)) + "</a></li>";

                    for (var i = 0; i < jsondata.pagetotal - page; i++) {
                        if (i < 4)
                            str += "<li><a href='bug-list.html?page=" + (parseInt(page) + parseInt(i + 1)) + "&pagecount=20'>" + (parseInt(page) + parseInt(i + 1)) + "</a></li>";
                    }
                    str += "<li><a href='bug-list.html?page=" + (parseInt(page) + parseInt(1)) + "&pagecount=20'>»</a></li>" +
                        "<li><a href='bug-list.html?page=" + parseInt(jsondata.pagetotal) + "&pagecount=20'>end</a></li>";
                    $("#pageUl").append(str);
                }

            } else {
                alert(jsondata.msg);
                return;
            }
        },
        //调用出错执行的函数
        error: function () {
            //请求出错处理
            showError();
            return;
        }
    });

}

function getBug(debugID) {

    window.location.href = 'bug.html?debugID=' + debugID;

}


function getParams() {
    var debugID = $.getUrlVar('debugID');

    $.ajax({
        //提交数据的类型 POST GET
        type: "GET",
        //提交的网址
        url: "http://192.168.1.102:8855/debug/BugGet",
        //提交的数据
        data: {debugID: debugID},
        async: false,
        //返回数据的格式
        datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
        //成功返回之后调用的函数
        success: function (data) {
            var jsondata = $.parseJSON(data);
            if (jsondata.code == 200000) {
                var debugData = jsondata.data;

                $('#debugID').html(debugData.debugID);
                $('#debugBround').html(debugData.debugBround);
                $('#debugModel').html(debugData.debugModel);
                $('#debugOS').html(debugData.debugOS);
                $('#debugOSVersion').html(debugData.debugOSVersion);
                $('#debugLon').html(debugData.debugLon);
                $('#debugLat').html(debugData.debugLat);
                $('#debugTime').html(debugData.debugTime);
                $('#appPackage').html(debugData.appPackage);
                $('#appVersionName').html(debugData.appVersionName);
                $('#appVersionCode').html(debugData.appVersionCode);
                $('#appInstallTime').html(debugData.appInstallTime);
                $('#appUpdateTime').html(debugData.appUpdateTime);
                $('#phoneType').html(debugData.phoneType);
                $('#debugSource').html(debugData.debugSource);

            } else {
                alert(jsondata.msg);
                return;
            }
        },
        //调用出错执行的函数
        error: function () {
            //请求出错处理
            showError();
            return;
        }
    });

}

$.extend({
    getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});