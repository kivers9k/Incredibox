/* 0.5.4 2021-04-23 21:06:13 */
"use strict";
var machine = {},
    user = {},
    target = "desktop",
    exclude = !1,
    showlog = !1,
    sndtype = "ogg",
    vidtype = "mp4",
    osname = "win",
    domainOnline = "https://www.incredibox.com/",
    appCN = !1,
    appSQ = !1,
    store = "",
    appTotalVersion = appCN && "windows" == osname ? 4 : 8,
    build = {
        ios: {
            id: "1093131935",
            url: "https://itunes.apple.com/app/id1093131935",
            urlRate: "itms-apps://itunes.apple.com/app/id1093131935",
            version: "0.5.4"
        },
        "ios-cn": {
            id: "1547418803",
            url: "https://itunes.apple.com/app/id1547418803",
            urlRate: "itms-apps://itunes.apple.com/app/id1547418803",
            version: "0.5.4"
        },
        and: {
            id: "",
            url: "https://play.google.com/store/apps/details?id=com.sofarsogood.incredibox",
            version: "054"
        },
        "and-cn": {
            id: "",
            url: "https://apps.appinchina.com.cn/details/com.sofarsogood.incredibox.cn",
            version: "054"
        },
        ama: {
            id: "",
            url: "https://www.amazon.fr/So-Far-Good-Incredibox/dp/B07BKZCDHT/",
            version: "054"
        },
        osx: {
            id: "1437906083",
            url: "https://itunes.apple.com/app/id1437906083",
            urlRate: "macappstore://itunes.apple.com/app/id1437906083?action=write-review",
            version: "0.5.4"
        },
        win: {
            id: "9PDJPP8SCS9K",
            url: "https://www.microsoft.com/store/apps/9PDJPP8SCS9K",
            version: "0.5.4"
        },
        default: {
            id: "",
            url: domainOnline,
            version: "9.9.9"
        },
        getInfo: function() {
            return appBrowser ? this.default : isWin ? this.win : isOSX ? this.osx : appCN && isAndroid ? this["and-cn"] : appCN && isIOS ? this["ios-cn"] : isIOS ? this.ios : isAndroid ? this.and : this.default
        }
    };

function initGlobal() {
    try {
        withAdBreak
    } catch (e) {
        window.withAdBreak = !1
    }
    try {
        adVisible
    } catch (e) {
        window.adVisible = !1
    }
}
var debugMute = notnull(getParameterByName("mute")),
    debugGame = notnull(getParameterByName("game")),
    debugScene = notnull(getParameterByName("scene"));

function nada() {}
var preventActionUsed = !1,
    preventActionDelay = .25;

function preventAction(e) {
    preventActionUsed || (preventActionUsed = !0, e(), setTimeout(function() {
        preventActionUsed = !1
    }, preventActionDelay))
}

function tryfunc(e) {
    notnull(e) && "function" === (typeof e).toLowerCase() && e()
}

function inIframe() {
    try {
        return window.self !== window.top
    } catch (e) {
        return !0
    }
}

function callParentWindow(e, o) {
    isIframe && (notnull(window.top) && notnull(window.top.appEvent) ? window.top.appEvent(e, o) : setTimeout(function() {
        callParentWindow(e, o)
    }, 200))
}
var regexList = {
    allchar: /[*]/,
    classic: /[^A-Za-z0-9\u00C0-\u017F '-]/,
    max3letters: /[*]|(.)(?=\1\1\1)/gi,
    strict: /[^A-Za-z0-9 '-]/,
    custom: /[^A-Za-z0-9àâçèéêîôùûÀÂÇÈÉÊÎÔÙÛ '-]/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    allsafe: /[^A-Za-z0-9\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\s]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/
};

function isEmpty(e) {
    return 0 === Object.keys(e).length && e.constructor === Object
}

function countObj(e) {
    var o, t = 0;
    for (o in e) e.hasOwnProperty(o) && t++;
    return t
}

function removeDupInArray(e, o) {
    var t = [];
    for (var i of e) existInArray(t, i, o) || t.push(i);
    return t
}

function uniqueBetweenArray(e, o, t) {
    var i, n = [];
    for (i of e) existInArray(o, i, t) || n.push(i);
    for (i of o) existInArray(e, i, t) || n.push(i);
    return n
}

function existInArray(e, o, t) {
    for (var i = !notnull(t) || t, n = !1, a = 0, s = e.length; a < s; a++)
        if (i) {
            if (e[a] === o) {
                n = !0;
                break
            }
        } else if (e[a].toLowerCase() === o.toLowerCase()) {
        n = !0;
        break
    }
    return n
}

function removeInArray(e, o) {
    for (var t = 0, i = o.length; t < i; t++)
        if (o[t] === e) {
            o.splice(t, 1);
            break
        } return o
}

function removeInArrayFromProp(e, o, t) {
    for (var i = 0, n = t.length; i < n; i++)
        if (t[i][o] === e) {
            t.splice(i, 1);
            break
        } return t
}

function existInArrayFromProp(e, o, t) {
    for (var i = 0, n = t.length; i < n; i++)
        if (t[i][o] === e) return !0;
    return !1
}

function numberArray(e) {
    for (var o = 0, t = e.length; o < t; o++) e[o] = 0 | e[o];
    return e
}

function windowPopup(e, o, t, i) {
    var n = i ? screen.height / 2 - t / 2 : 0,
        a = i ? screen.width / 2 - o / 2 : 0;
    window.open(e, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + o + ",height=" + t + ",top=" + n + ",left=" + a)
}

function xhr(e, o, t, i, n) {
    var a = n || function() {};
    $.ajax({
        type: e,
        url: o,
        crossdomain: !0,
        data: t,
        success: function(e) {
            i(e, t)
        },
        error: a,
        dataType: "json"
    })
}

function assetName(e) {
    var o = "";
    switch (assetSize) {
        case "hd":
            o = nameToHD(e);
            break;
        case "mini":
            o = nameToMini(e);
            break;
        default:
            o = e
    }
    return o
}

function animeName(e) {
    var o = "";
    switch (animeSize) {
        case "hd":
            o = nameToHD(e);
            break;
        case "mini":
            o = nameToMini(e);
            break;
        default:
            o = e
    }
    return o
}

function nameToMini(e) {
    var o = e.substr(e.lastIndexOf("."));
    return e.split(o).join("-mini" + o)
}

function nameToHD(e) {
    var o = e.substr(e.lastIndexOf("."));
    return e.split(o).join("-hd" + o)
}

function loadImg(e, o) {
    var t = "object" != typeof e[0] ? [e] : e,
        i = t.length,
        n = 0;

    function a() {
        var e = t[n][0],
            o = t[n][1],
            i = new Image;
        i.onload = function() {
            $(o).css({
                "background-image": "url(" + e + ")"
            }), s()
        }, i.onerror = function() {
            var o = e.split("/"),
                t = o[o.length - 1];
            boxDialog.open("Preloading IMG " + t, "ERROR", ["Relaod", "Continue"], [gotoAppUrl, s], !0)
        }, i.src = e
    }

    function s() {
        (++n == i ? o : a)()
    }
    a()
}

function loadSnd(e, o, t, i) {
    var n = new XMLHttpRequest;
    n.open("GET", e, !0), n.responseType = "arraybuffer", n.onload = function() {
        o.decodeAudioData(n.response, function(e) {
            t(e)
        }, function(e) {
            i()
        })
    }, n.onerror = function() {
        i()
    }, n.send()
}

function gotoAppUrl(e) {
    var o = isnull(e) ? appBrowser ? "" : "index.html" : e;
    window.location.href = o
}

function openURL(e, o) {
    var t = isIframe ? window.top : window;
    appDesktop ? _electron.shell.openExternal(e) : (o = isnull(o) ? "_blank" : o, o = appMobile ? "_system" : o, trustAppMobile && isIOS ? cordova.InAppBrowser.open(e, "_system", "hidden=yes,location=no") : t.open(e, o))
}

function redirectTo(e) {
    var o = domainOnline + "url/" + e;
    if (o = appCN ? o + "-cn" : o, appMobile) switch (e) {
        case "facebook":
            o = isIOS ? "fb://page?id=182619895103489" : "fb://page/182619895103489";
            break;
        case "twitter":
            o = "https://twitter.com/incredibox_";
            break;
        case "instagram":
            o = "https://www.instagram.com/incredibox.official/";
            break;
        case "youtube":
            o = "https://www.youtube.com/c/incredibox"
    }
    saveGA("redirection", "open_url", o), openURL(o)
}

function getParameterByName(e) {
    var o = {},
        t = (window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(e, t, i) {
            o[t] = i
        }), null);
    return e in o && (t = o[e]), t
}

function getParameter() {
    return window.location.search
}

function getPageName() {
    return window.location.href.split("/").pop()
}

function getPageNameGA() {
    return -1 != window.location.href.indexOf("app.html") ? "app.html?v=" + getParameterByName("v") : "index.html"
}

function secToText(e) {
    parseInt(e % 1e3 / 100);
    var o = parseInt(e / 1e3 % 60),
        t = parseInt(e / 6e4 % 60),
        i = parseInt(e / 36e5 % 24);
    return i = i < 10 ? "0" + i : i, (t = t < 10 ? "0" + t : t) + ":" + (o = o < 10 ? "0" + o : o)
}

function getTime() {
    return (new Date).getTime()
}

function getTimeAgo(e, o) {
    e = -1 == e.indexOf("/") ? e.split("-").join("/") : e, o = -1 == o.indexOf("/") ? o.split("-").join("/") : o;
    var t = new Date(e),
        i = timeConversion(new Date(o).getTime() - t.getTime());
    return !1 === i ? getStringDate(e) : i
}

function timeConversion(e) {
    var o = (e / 1e3).toFixed(1),
        t = (e / 6e4).toFixed(1),
        i = (e / 36e5).toFixed(1),
        n = (e / 864e5).toFixed(1),
        a = "";
    if (o < 60) {
        var s = Math.round(o);
        a = s.toString() + " " + (s < 2 && notnull(STR("txt.time.tSec.one")) ? STR("txt.time.tSec.one") : STR("txt.time.tSec.other"))
    } else if (t < 60) {
        var l = Math.round(t);
        a = l.toString() + " " + (l < 2 && notnull(STR("txt.time.tMin.one")) ? STR("txt.time.tMin.one") : STR("txt.time.tMin.other"))
    } else if (i < 23) {
        var r = Math.round(i);
        a = r.toString() + " " + (r < 2 && notnull(STR("txt.time.tHou.one")) ? STR("txt.time.tHou.one") : STR("txt.time.tHou.other"))
    } else {
        if (!(n < 10)) return !1;
        var c = Math.round(n);
        a = c.toString() + " " + (c < 2 && notnull(STR("txt.time.tDay.one")) ? STR("txt.time.tDay.one") : STR("txt.time.tDay.other"))
    }
    return STR("txt.ago").split("%{date_time}").join(a)
}

function getDateNow() {
    var e = new Date,
        o = e.getDate(),
        t = e.getMonth() + 1,
        i = e.getFullYear(),
        n = e.getHours(),
        a = e.getMinutes(),
        s = e.getSeconds();
    return o = o < 10 ? String("0" + o) : String(o), t = t < 10 ? String("0" + t) : String(t), n = n < 10 ? n = String("0" + n) : String(n), a = a < 10 ? a = String("0" + a) : String(a), s = s < 10 ? s = String("0" + s) : String(s), String(i + "-" + t + "-" + o + " " + n + ":" + a + ":" + s)
}

function jsonDecode(e) {
    if (isnull(e)) return null;
    var o = e.split("\t").join("").split("\n").join("");
    return JSON.parse(o)
}

function jsonEncode(e) {
    return isnull(e) ? null : JSON.stringify(e)
}

function random(e) {
    return Math.round(Math.random() * e)
}

function decimal(e, o) {
    o = isnull(o) ? 2 : o;
    var t = Math.pow(10, o);
    return Math.round(e * t) / t
}

function numberSpaced(e) {
    var o = e.toString(),
        t = o.indexOf(".");
    return o.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, function(e, o) {
        return t < 0 || o < t ? e + " " : e
    })
}

function trim(e) {
    return isnull(e) ? "" : e = (e = (e = (e = e.split("\t").join("")).split("\n").join("")).split("\r").join("")).replace(/^\s+|\s+$|\s+(?=\s)/g, "")
}

function cleanInputText(e, o) {
    return e = (e = trim(e = ucwords(e))).replace(regexList.max3letters, ""), o.val(e), e
}

function slugify(e) {
    new RegExp("àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;".split("").join("|"), "g");
    return e.toString().toLowerCase().replace(/\s+/g, "-").replace(/&/g, "-and-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "")
}

function addMiddleBreak(e) {
    var o = e.split(" "),
        t = o.length - 1,
        i = Math.ceil(t / 2);
    return o[i] = o[i] + "<br>", o.join(" ")
}

function ucwords(e) {
    return (e = e.toLowerCase()).charAt(0).toUpperCase() + e.slice(1)
}

function uniqnum() {
    return Math.floor((new Date).valueOf() * Math.random())
}

function uniqid(e) {
    var o = e || "";

    function t() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    }
    return t() + o + t() + o + t() + o + t() + o + t()
}

function getUniqLink(e) {
    var o = notnull(e) ? e.app : app.version;
    return uniqid() + "-v" + o
}

function isnull(e) {
    return null === e || void 0 === e || "undefined" === e
}

function notnull(e) {
    return null !== e && void 0 !== e && "undefined" !== e
}

function isFunction(e) {
    return e && "[object Function]" === {}.toString.call(e)
}

function copyToClipboard(e) {
    var o = document.createElement("textarea");
    o.value = e, o.setAttribute("readonly", ""), o.style = {
        position: "absolute",
        visibility: "hidden",
        pointerEvents: "none"
    }, document.body.appendChild(o), o.select(), document.execCommand("copy"), document.body.removeChild(o)
}

function resetAnimationCSS(e) {
    e.style.animation = "none", e.offsetHeight, e.style.animation = null
}

function transitionEndEventName() {
    var e, o = document.createElement("div"),
        t = {
            transition: "transitionend",
            OTransition: "oTransitionEnd",
            MozTransition: "transitionend",
            WebkitTransition: "webkitTransitionEnd"
        };
    for (e in t)
        if (t.hasOwnProperty(e) && void 0 !== o.style[e]) return t[e];
    return null
}

function animationEndEventName() {
    var e, o = document.createElement("div"),
        t = {
            animation: "animationend",
            OAnimation: "oanimationend",
            MozAnimation: "animationend",
            WebkitAnimation: "webkitAnimationEnd"
        };
    for (e in t)
        if (t.hasOwnProperty(e) && void 0 !== o.style[e]) return t[e];
    return null
}

function listenTransition(e, o, t, i) {
    i = !!notnull(i) && i, e.off(transitionEnd).on(transitionEnd, {
        div: e,
        prop: o,
        func: t,
        log: i
    }, transitionComplete)
}

function addTransition(e, o, t, i, n) {
    n = !!notnull(n) && n, e.off(transitionEnd).addClass(o).on(transitionEnd, {
        div: e,
        prop: t,
        func: i,
        log: n
    }, transitionComplete)
}

function removeTransition(e, o, t, i, n) {
    n = !!notnull(n) && n, e.off(transitionEnd).removeClass(o).on(transitionEnd, {
        div: e,
        prop: t,
        func: i,
        log: n
    }, transitionComplete)
}

function transitionComplete(e) {
    notnull(e.data) && notnull(e.data.func) && e.originalEvent.propertyName.replace("-webkit-", "") == e.data.prop && e.data.div.attr("id") == e.target.id && (notnull(e.data.log), e.data.div.off(transitionEnd), e.data.func())
}

function getCSSMatrix(e) {
    if (!isnull(e)) {
        var o = e.css("-webkit-transform") || e.css("-moz-transform") || e.css("-ms-transform") || e.css("-o-transform") || e.css("transform");
        return isnull(o) ? [1] : o.replace(/[^0-9\-.,]/g, "").split(",")
    }
    return [1]
}

function getScale(e) {
    return getCSSMatrix(e)[0]
}

function cssAnimate(e, o) {
    e.addClass(o).one(animationEnd, function(e) {
        $(e.target).removeClass(o)
    })
}

function getEvents(e) {
    var o = $._data(e, "events"),
        t = $._data(document, "events");
    for (var i in t)
        if (t.hasOwnProperty(i))
            for (var n = t[i], a = 0; a < n.length; a++) $(e).is(n[a].selector) && (null == o && (o = {}), o.hasOwnProperty(i) || (o[i] = []), o[i].push(n[a]));
    return o
}

function stopProp(e) {
    notnull(e) && e.stopPropagation()
}
String.prototype.replaceAt = function(e, o) {
    return this.substr(0, e) + o + this.substr(e + o.length)
};
var templateW = 1024,
    templateH = 768,
    stageScale = 1,
    pictoScale = 1,
    poloScale = 1,
    popupScale = 1,
    mixlistScale = 1,
    extendVideo = !1,
    ultrawide = !1;

function getScreenSize() {
    if (screenW = document.body.offsetWidth, screenH = document.body.offsetHeight, trustAppMobile ? (screenW = screen.width, screenH = screen.height) : (screenW = document.body.offsetWidth, screenH = document.body.offsetHeight), isIOS && screenH > screenW) {
        var e = screenW;
        screenW = screenH, screenH = e
    }
}

function resizeApp() {
    getScreenSize(), trustAppMobile && isIOS && $("html").css({
        position: "relative",
        width: screenW + "px",
        height: screenH + "px"
    });
    var e, o = $("#app-incredibox"),
        t = $("#mixlist");
    $("body").hasClass("fluid") && (e = screenW * templateH / screenH, o.height(templateH), o.width(e), stageScale = screenH / templateH, o.css({
        transform: "scale(" + stageScale + ")"
    }), (ultrawide = screenW / screenH >= 1.8) && $("body").addClass("ultrawide"), checkMobile() && ($("body").addClass("mobile"), popupScale = 1.8, poloScale = 1.15, pictoScale = 1.15, mixlistScale = 1.3));
    var i = o.height(),
        n = o.width();
    if (pageApp) {
        var a = "<style type='text/css'>",
            s = $("#box-top").height(),
            l = $("#box-bottom").height(),
            r = parseInt($("#box-bottom").css("top")),
            c = i - l - s,
            u = n,
            p = getAppBound();
        a += "#lock-pause #top-resume{ height:" + s + "px; }", a += "#game { background-position: 0px " + s + "px; background-size:100% " + c + "px;}", a += "#lock-stage{ top:" + s + "px; }", a += "#box-reading-bar{ top:" + s + "px; }";
        var d, f, m = 400 * u / 1e3;
        if (m < c) d = c, f = 1e3 * c / 400;
        else {
            f = u;
            var h = s + (d = m) - r;
            if (h > 60) {
                extendVideo = !0;
                var v = h;
                r + v > i - s && (d = i - 2 * s, v = l - s), a += "#game #box-bottom.bottomSlide{ transform:translate3d(0px," + v + "px,0px);}", a += ".box-popup.mini .bac, .box-popup.mini .flex { transition: bottom .3s ease-in-out; }", a += ".box-popup.bottomSlide.mini .bac, .box-popup.bottomSlide.mini .flex { bottom: " + s + "px!important; }"
            } else d = c
        }
        $("#box-video").css({
            top: s + "px",
            width: Math.round(f) + "px",
            height: Math.round(d) + "px"
        }), $("#fade-video").css({
            top: s + "px",
            height: d + "px"
        }), $("#box-stage").css({
            transform: "scale(" + poloScale + ")",
            "transform-origin": "center bottom"
        }), $("#box-loader-polo").css({
            transform: "scale(" + poloScale + ")",
            "transform-origin": "center top"
        }), $("#stage-overflow").css({
            height: Math.floor(400 / poloScale) + "px"
        }), $("#box-picto").css({
            transform: "scale(" + pictoScale + ")"
        }), $("#mixlist .scale").css({
            transform: "scale(" + mixlistScale + ")"
        }), $("#mixlist").css("height", p.height / stageScale + p.top + "px"), $("#mixlist #poplist").css("height", Math.round(($("#mixlist").height() - parseFloat($("#mixlist #poplist").css("top"))) / mixlistScale) + "px"), a += "</style>", $(a).appendTo("head")
    }
    if (getAppSizeInfo(), appDesktop && !$("body").hasClass("fluid")) {
        var b, x = templateH + (1100 - templateH);
        $(window).resize(function() {
            getScreenSize(), b = Math.round((screenH - templateH) / 2), screenH > 1100 ? (stageScale = screenH / x, o.css({
                transform: "scale(" + stageScale + ")"
            })) : stageScale > 1 && (stageScale = 1, o.css({
                transform: "scale(" + stageScale + ")"
            })), pageApp && (t.css("height", templateH + b + "px"), resetStagePosition()), getAppSizeInfo()
        }), $(window).resize()
    }
    if (!appBrowser || appBrowserDemo || appBrowserExpo || ($(window).resize(function() {
            getScreenSize(), stageScale = (stageScale = screenH / templateH) > 1 ? 1 : stageScale, o.css({
                transform: "scale(" + stageScale + ")"
            }), pageApp && resetStagePosition()
        }), $(window).resize()), appBrowserExpo) {
        var g = stageScale;
        templateH = screenH, $(window).resize(function() {
            getScreenSize(), stageScale = screenH * g / templateH, o.css({
                transform: "scale(" + stageScale + ")"
            }), resetStagePosition()
        }), $(window).resize()
    }
    $("body").css({
        visibility: "visible"
    })
}

function getAppBound() {
    return document.getElementById("app-incredibox").getBoundingClientRect()
}

function getAppSizeInfo() {
    getAppBound()
}

function resetStagePosition() {
    if (appLoaded) {
        for (var e = 0; e < nbData; e++) listPicto[e].setPosition();
        for (e = 0; e < app.nbpolo; e++) listPolo[e].setPosition()
    }
}
var evtClick, evtPress, evtPressEnd, evtMove, screenW, screenH, appMobile = "mobile" == target,
    appDesktop = "desktop" == target,
    appBrowser = "browser" == target,
    appBrowserDemo = !1,
    appBrowserExpo = !1,
    pageExt = appMobile || appDesktop ? "html" : "php",
    isMouseDevice = checkMouseDevice(),
    isTouchDevice = checkTouchDevice(),
    isHybridDevice = isMouseDevice && isTouchDevice,
    isTouchCapable = isTouchDevice || isHybridDevice,
    isComputer = checkAppDesktop() || checkInBrowser(),
    trustAppMobile = (window.hasOwnProperty("cordova") || "object" == typeof cordova) && void 0 != window.cordova,
    trustAppDesktop = window.hasOwnProperty("_electron") || "_electron" == typeof cordova,
    isIframe = inIframe(),
    isMiniDevice = !1,
    isMobile = !1,
    isSafari = !appMobile && /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
    isOpera = !appMobile && !appDesktop && checkIsOpera(),
    isIOS = !1,
    isOSX = !1,
    isWin = !1,
    isAndroid = !1,
    isiPod = !1,
    isiPhone = !1,
    isiPhone4s = !1,
    isiPhone5 = !1,
    isiPhone6s = !1,
    isiPhoneX = !1,
    isiPad = !1,
    isiPadPro = !1,
    isiPadProBig = !1,
    isiPadMini = !1,
    forceMaj = !1,
    hasWorker = window.Worker || !1,
    hasHBI = !1,
    isRetina = !1,
    assetSize = "",
    animeSize = "",
    isAssetHD = !1,
    isAnimeHD = !1;

function checkSystem() {
    if (hasNetwork = networkState(), machine = getDeviceInfo(!0), user = getUserInfo(), "undefined" != typeof device ? (trustAppMobile = !0, isIOS = "ios" == device.platform.toLowerCase(), getScreenSize(), isAndroid = "android" == device.platform.toLowerCase(), isiPod = -1 != device.model.indexOf("iPod"), isiPhone = -1 != device.model.indexOf("iPhone"), isiPhone5 = isiPhone && -1 != device.model.indexOf("iPhone5"), isiPhone6s = isiPhone && -1 != device.model.indexOf("iPhone8,") && -1 == device.model.indexOf("iPhone8,4"), device.modelname = phoneModel.get(device.model), hasHBI = isIOS && checkHBI()) : (getScreenSize(), isOSX = "mac os x" == machine.osName, isIOS = "ios" == machine.osName, isWin = "windows" == machine.osName, isAndroid = "android" == machine.osName, isiPod = -1 != machine.deviceModel.indexOf("ipod"), isiPhone = -1 != machine.deviceModel.indexOf("iphone"), isiPhone5 = isiPhone && 5 == machine.deviceNumber), isiPhone4s = checkiPhone4s(), isiPhoneX = checkiPhoneX(), isiPad = checkiPad(), isiPadPro = checkiPadPro(), isiPadProBig = checkiPadProBig(), isiPadMini = checkiPadMini(), isRetina = checkRetina(), isMobile = checkMobile(), isMiniDevice = checkMiniDevice(), trustAppMobile && (screenW > 1024 && screenH > 768 && window.devicePixelRatio > 1 && (assetSize = "hd", animeSize = "hd"), isIOS && (isiPhone && 4 == machine.deviceNumber && (animeSize = "mini"), isiPhone && machine.deviceNumber > 5 && (assetSize = "hd"), isiPad && (assetSize = "hd"), isiPadPro && (animeSize = "hd"))), isAssetHD = "hd" == assetSize, isAnimeHD = "hd" == animeSize, "hd" != assetSize && "mini" != assetSize || $("img").each(function(e) {
            var o = $(this).attr("src");
            if ("svg" != o.split(".")[1]) {
                var t = "hd" == assetSize ? nameToHD(o) : nameToMini(o);
                $(this).attr("src", t)
            }
        }), appBrowser && (sndtype = checkAudioFormat("ogg") ? "ogg" : sndtype, vidtype = "mozilla firefox" == machine.browserName && machine.browserVersion <= 48 ? "webm" : "mp4"), setPointerEvent(), appDesktop && ($("body").addClass("appDesktop"), document.body.classList.add("appDesktop"), document.body.classList.add("noPadding")), !appBrowser || appBrowserDemo || appBrowserExpo || ($("body").addClass("appBrowser"), $("body").addClass("noPadding")), appBrowserDemo && ($("body").addClass("appBrowserDemo"), $("body").addClass("fluid")), appMobile && $("body").addClass("fluid"), isMouseDevice && !isTouchDevice && $("body").addClass("mouseEvent"), hasHBI && $("body").addClass("hasHBI"), isiPhoneX && $("body").addClass("iPhoneX"), isiPhone4s && $("body").addClass("iPhone4s"), isOpera && $("body").addClass("isOpera"), trustAppDesktop && "steam" == store && "YXJw" != btoa(_electron.app.commandLine.getSwitchValue("arg"))) throw new BoxDialog("#pop-dialog").open("Incredibox needs to run from<br>your Steam library.<br>Thanks for your support!", "&#129488;", [], !0, !0), new Error("Please connect to your Steam account")
}

function checkHBI() {
    return -1 != device.model.indexOf("iPad8,1") || -1 != device.model.indexOf("iPad8,2") || -1 != device.model.indexOf("iPad8,3") || -1 != device.model.indexOf("iPad8,4") || -1 != device.model.indexOf("iPad8,5") || -1 != device.model.indexOf("iPad8,6") || -1 != device.model.indexOf("iPad8,7") || -1 != device.model.indexOf("iPad8,8") || -1 != device.model.indexOf("iPhone10,3") || -1 != device.model.indexOf("iPhone10,6") || -1 != device.model.indexOf("iPhone11,2") || -1 != device.model.indexOf("iPhone11,4") || -1 != device.model.indexOf("iPhone11,6") || -1 != device.model.indexOf("iPhone11,8") || -1 != device.model.indexOf("iPhone12,1") || -1 != device.model.indexOf("iPhone12,3") || -1 != device.model.indexOf("iPhone12,5")
}

function getListUUID() {
    var e = [];
    e.push(machine.uuid);
    var o = storage.getAllItem();
    for (var t in o) {
        if (-1 != t.indexOf("uuid-")) "" != t.replace("uuid-", "") ? e.push(t.replace("uuid-", "")) : storage.removeItem(t)
    }
    return removeDupInArray(e, !1)
}

function functionExist() {
    "function" != typeof initAnalytics && (window.self.initAnalytics = function() {
        return !1
    }, window.self.saveGA = function() {
        return !1
    })
}

function secureIframe() {}

function checkInBrowser() {
    return document.URL.indexOf("http://") > -1 || document.URL.indexOf("https://") > -1
}

function checkOnDevice() {
    return !!navigator.userAgent.match(/(iPhone|iPod|iPad|Android)/)
}

function checkMobile() {
    return screenW <= 823 && screenH <= 504
}

function checkMiniDevice() {
    return !isComputer && (isiPhone4s || screenW <= 568 && !isRetina)
}

function checkRetina() {
    return window.devicePixelRatio > 1 || !(!window.matchMedia || !window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)").matches)
}

function checkAppDesktop() {
    return navigator.userAgent.toLowerCase().indexOf(" electron/") > -1
}

function checkIsOpera() {
    var e = navigator.userAgent.toLowerCase();
    return e.indexOf("opera") > -1 || e.indexOf("opr") > -1
}

function checkTouchDevice() {
    var e = !1;
    try {
        document.createEvent("TouchEvent"), e = !0
    } catch (e) {}
    return ("ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) && (e = !0), window.matchMedia("(pointer: coarse)").matches && (e = !0), e
}

function checkMouseDevice() {
    var e = !1;
    return window.matchMedia("(hover: hover)").matches && window.matchMedia("(pointer: fine)").matches && (e = !0), e
}

function getUUID() {
    var e;
    return trustAppMobile ? e = device.uuid : appDesktop ? e = _electron.machine.machineIdSync() : notnull(storage.getItem("tmp-uuid")) ? e = storage.getItem("tmp-uuid") : (e = "tmp-" + uniqid("-"), storage.setItem("tmp-uuid", e)), e
}

function checkAudioFormat(e) {
    e = e || "mp3";
    var o = document.createElement("audio");
    return !(!o.canPlayType || !o.canPlayType("audio/" + e + ";").replace(/no/, ""))
}

function checkSupported() {
    var e = !!window.HTMLCanvasElement,
        o = window.AudioContext || window.webkitAudioContext || !1,
        t = "string" == typeof(new XMLHttpRequest).responseType,
        i = !isnull(transitionEnd) && !isnull(animationEnd);
    return window.AudioContext = o, e ? o ? t ? i ? "ok" : "CSS3 is not supported" : "XHR is not supported" : "Audio API is not supported" : "Canvas is not supported"
}

function checkForMaj(e) {
    var o = e || function() {},
        t = setTimeout(o, 2e3),
        i = build.getInfo().version.substr(0, 5);
    hasNetwork && (appDesktop || trustAppMobile) ? xhr("GET", domainOnline + "ph2/check-maj.php?os=" + (isWin ? "win" : isOSX ? "osx" : isIOS ? "ios" : isAndroid ? "and" : "web"), {}, function(e) {
        if (clearTimeout(t), notnull(e.lastversion)) {
            var n = parseInt(e.lastversion.split(".").join("")),
                a = parseInt(i.split(".").join(""));
            a < n && (forceMaj = !0)
        }
        o()
    }, function() {
        clearTimeout(t), o()
    }) : (clearTimeout(t), o())
}

function openDialogForceMaj() {
    if (!isSafeMode() && forceMaj) {
        var e = !appDesktop;
        boxDialog.open(STR("pop.majText"), STR("pop.majTitle"), [STR("bt.update")], [function() {
            openURL(build.getInfo().url)
        }], e, !0), saveGA("popup", "force_update", build.getInfo().version + " (app version is too old)")
    }
}

function setPointerEvent() {
    isHybridDevice && !isIOS ? (evtClick = "touchstart click", evtPress = "touchstart mousedown", evtPressEnd = "touchend mouseup", evtMove = "touchmove mousemove") : isTouchDevice ? (evtClick = "touchstart", evtPress = "touchstart", evtPressEnd = "touchend", evtMove = "touchmove") : (evtClick = "click", evtPress = "mousedown", evtPressEnd = "mouseup", evtMove = "mousemove")
}

function initRightClick() {}

function networkOn() {
    hasNetwork = !0, checkForMaj(openDialogForceMaj), gaShouldTrack && !gaAlreadySet && initAnalytics(), storage.restoreAllMix()
}

function networkOff() {
    hasNetwork = !1
}

function networkState() {
    var e = !1;
    return notnull(navigator.onLine) ? e = navigator.onLine : notnull(navigator.network) && (e = !(navigator.network.connection.type == Connection.NONE)), e
}

function bugBluetoothLatency() {
    return !notnull(getParameterByName("bluetooth")) && (!!(trustAppMobile && isAndroid && contextAudio.baseLatency > .2 && window.hasOwnProperty("bluetoothle")) && (bluetoothle.initialize(function(e) {
        switch (e.status) {
            case "enabled":
                bluetoothle.disable();
                break;
            case "disabled":
                $("#fade-all").removeClass(), boxDialog.open(STR("dial.bluetoothLatencyText"), STR("dial.bluetoothLatencyTitle"), [STR("bt.ok")], [function() {
                    window.location.href = "?v=" + appNumberVersion + "&bluetooth=1"
                }])
        }
    }, {
        statusReceiver: !0
    }), !0))
}

function bugSampleRate() {
    return !1
}
window.devicePixelRatio = window.devicePixelRatio || 1, functionExist(), secureIframe();
var audioPort = "";

function checkAudioRoute() {}

function checkStateAudioContext() {
    notnull(contextAudio) && "interrupted" == contextAudio.state && (contextAudio.resume(), rebuildAudioContext())
}

function rebuildAudioContext() {
    var e = contextAudio.createBuffer(1, 1, 44100),
        o = contextAudio.createBufferSource();
    o.buffer = e, o.connect(contextAudio.destination), o.start(0), o.disconnect(), contextAudio.close(), (contextAudio = new AudioContext).onstatechange = listenStateAudioCtx()
}

function listenStateAudioCtx() {}

function initSilentMode() {}

function detectSilentMode() {}
var immersiveMode = !1;

function launchImmersiveMode() {
    trustAppMobile && isAndroid && !immersiveMode && (immersiveMode = !0, AndroidFullScreen.isSupported(function() {
        AndroidFullScreen.isImmersiveModeSupported(function() {
            AndroidFullScreen.setSystemUiVisibility(AndroidFullScreen.SYSTEM_UI_FLAG_LAYOUT_STABLE | AndroidFullScreen.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | AndroidFullScreen.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | AndroidFullScreen.SYSTEM_UI_FLAG_HIDE_NAVIGATION | AndroidFullScreen.SYSTEM_UI_FLAG_FULLSCREEN | AndroidFullScreen.SYSTEM_UI_FLAG_IMMERSIVE_STICKY, function() {}, function() {}), AndroidFullScreen.immersiveMode(function() {}, errorImmersiveMode)
        }, errorImmersiveMode)
    }, errorImmersiveMode))
}

function errorImmersiveMode(e) {}
var phoneModel = {
    model: {
        "iPhone1,1": "iPhone",
        "iPhone1,2": "iPhone 3G",
        "iPhone2,1": "iPhone 3GS",
        "iPhone3,1": "iPhone 4",
        "iPhone3,2": "iPhone 4 GSM Rev A",
        "iPhone3,3": "iPhone 4 CDMA",
        "iPhone4,1": "iPhone 4S",
        "iPhone5,1": "iPhone 5 (GSM)",
        "iPhone5,2": "iPhone 5 (GSM+CDMA)",
        "iPhone5,3": "iPhone 5C (GSM)",
        "iPhone5,4": "iPhone 5C (Global)",
        "iPhone6,1": "iPhone 5S (GSM)",
        "iPhone6,2": "iPhone 5S (Global)",
        "iPhone7,1": "iPhone 6 Plus",
        "iPhone7,2": "iPhone 6",
        "iPhone8,1": "iPhone 6s",
        "iPhone8,2": "iPhone 6s Plus",
        "iPhone8,4": "iPhone SE (GSM)",
        "iPhone9,1": "iPhone 7",
        "iPhone9,2": "iPhone 7 Plus",
        "iPhone9,3": "iPhone 7",
        "iPhone9,4": "iPhone 7 Plus",
        "iPhone10,1": "iPhone 8",
        "iPhone10,2": "iPhone 8 Plus",
        "iPhone10,3": "iPhone X Global",
        "iPhone10,4": "iPhone 8",
        "iPhone10,5": "iPhone 8 Plus",
        "iPhone10,6": "iPhone X GSM",
        "iPhone11,2": "iPhone XS",
        "iPhone11,4": "iPhone XS Max",
        "iPhone11,6": "iPhone XS Max Global",
        "iPhone11,8": "iPhone XR",
        "iPhone12,1": "iPhone 11",
        "iPhone12,3": "iPhone 11 Pro",
        "iPhone12,5": "iPhone 11 Pro Max",
        "iPod1,1": "1st Gen iPod",
        "iPod2,1": "2nd Gen iPod",
        "iPod3,1": "3rd Gen iPod",
        "iPod4,1": "4th Gen iPod",
        "iPod5,1": "5th Gen iPod",
        "iPod7,1": "6th Gen iPod",
        "iPod9,1": "7th Gen iPod",
        "iPad1,1": "iPad",
        "iPad1,2": "iPad 3G",
        "iPad2,1": "2nd Gen iPad",
        "iPad2,2": "2nd Gen iPad GSM",
        "iPad2,3": "2nd Gen iPad CDMA",
        "iPad2,4": "2nd Gen iPad New Revision",
        "iPad3,1": "3rd Gen iPad",
        "iPad3,2": "3rd Gen iPad CDMA",
        "iPad3,3": "3rd Gen iPad GSM",
        "iPad2,5": "iPad mini",
        "iPad2,6": "iPad mini GSM+LTE",
        "iPad2,7": "iPad mini CDMA+LTE",
        "iPad3,4": "4th Gen iPad",
        "iPad3,5": "4th Gen iPad GSM+LTE",
        "iPad3,6": "4th Gen iPad CDMA+LTE",
        "iPad4,1": "iPad Air (WiFi)",
        "iPad4,2": "iPad Air (GSM+CDMA)",
        "iPad4,3": "1st Gen iPad Air (China)",
        "iPad4,4": "iPad mini Retina (WiFi)",
        "iPad4,5": "iPad mini Retina (GSM+CDMA)",
        "iPad4,6": "iPad mini Retina (China)",
        "iPad4,7": "iPad mini 3 (WiFi)",
        "iPad4,8": "iPad mini 3 (GSM+CDMA)",
        "iPad4,9": "iPad Mini 3 (China)",
        "iPad5,1": "iPad mini 4 (WiFi)",
        "iPad5,2": "4th Gen iPad mini (WiFi+Cellular)",
        "iPad5,3": "iPad Air 2 (WiFi)",
        "iPad5,4": "iPad Air 2 (Cellular)",
        "iPad6,3": "iPad Pro (9.7 inch, WiFi)",
        "iPad6,4": "iPad Pro (9.7 inch, WiFi+LTE)",
        "iPad6,7": "iPad Pro (12.9 inch, WiFi)",
        "iPad6,8": "iPad Pro (12.9 inch, WiFi+LTE)",
        "iPad6,11": "iPad (2017)",
        "iPad6,12": "iPad (2017)",
        "iPad7,1": "iPad Pro 2nd Gen (WiFi)",
        "iPad7,2": "iPad Pro 2nd Gen (WiFi+Cellular)",
        "iPad7,3": "iPad Pro 10.5-inch",
        "iPad7,4": "iPad Pro 10.5-inch",
        "iPad7,5": "iPad 6th Gen (WiFi)",
        "iPad7,6": "iPad 6th Gen (WiFi+Cellular)",
        "iPad7,11": "iPad 7th Gen 10.2-inch (WiFi)",
        "iPad7,12": "iPad 7th Gen 10.2-inch (WiFi+Cellular)",
        "iPad8,1": "iPad Pro 3rd Gen (11 inch, WiFi)",
        "iPad8,2": "iPad Pro 3rd Gen (11 inch, 1TB, WiFi)",
        "iPad8,3": "iPad Pro 3rd Gen (11 inch, WiFi+Cellular)",
        "iPad8,4": "iPad Pro 3rd Gen (11 inch, 1TB, WiFi+Cellular)",
        "iPad8,5": "iPad Pro 3rd Gen (12.9 inch, WiFi)",
        "iPad8,6": "iPad Pro 3rd Gen (12.9 inch, 1TB, WiFi)",
        "iPad8,7": "iPad Pro 3rd Gen (12.9 inch, WiFi+Cellular)",
        "iPad8,8": "iPad Pro 3rd Gen (12.9 inch, 1TB, WiFi+Cellular)",
        "iPad11,1": "iPad mini 5th Gen (WiFi)",
        "iPad11,2": "iPad mini 5th Gen",
        "iPad11,3": "iPad Air 3rd Gen (WiFi)",
        "iPad11,4": "iPad Air 3rd Gen"
    },
    get: function(e) {
        var o = this.model[e];
        return isnull(o) ? e : o
    }
};

function getUserInfo() {
    return {
        guid: storage.getItem("user-guid") || "",
        djname: storage.getItem("user-djname") || "",
        lang: storage.getItem("user-lang") || ""
    }
}

function setUserInfo(e) {
    notnull(e.guid) && (user.guid = e.guid, storage.setItem("user-guid", user.guid), cloud.save("user-guid", user.guid)), notnull(e.djname) && (user.djname = e.djname, storage.setItem("user-djname", user.djname), cloud.save("user-djname", user.djname)), notnull(e.lang) && (user.lang = e.lang, storage.setItem("user-lang", user.lang), cloud.save("user-lang", user.lang)), user = getUserInfo()
}

function getDeviceInfo(e) {
    var o, t, i, n = navigator.userAgent || navigator.vendor || window.opera,
        a = n.toLowerCase(),
        s = "(?)";
    /(fban|fbios|fbav|fbbv|fbid)/.test(a) ? s = "Facebook" : /(twitter)/.test(a) && (s = "Twitter");
    var l = "(?)";
    /(windows|win16)/.test(a) ? l = "Windows" : /(android)/.test(a) ? l = "Android" : /(iphone|ipad|ipod)/.test(a) ? l = "iOS" : /(mac os x)/.test(a) ? l = "Mac OS X" : /(macppc|macintel|mac_powerpc|macintosh)/.test(a) && (l = "Mac OS");
    var r = "(?)";
    /(windows phone|windows phone)/.test(a) ? r = "Windows phone" : /(windows|win16)/.test(a) ? r = "PC" : /(android)/.test(a) ? r = "Android" : /(ipad)/.test(a) ? r = "iPad" : /(iphone)/.test(a) ? r = "iPhone" : /(ipod)/.test(a) ? r = "iPod" : /(mac)/.test(a) && (r = "Mac");
    var c = "(?)";
    trustAppMobile ? c = device.version : "Windows" == l ? /(windows 10.0|windows nt 10.0)/.test(a) ? c = "10" : /(windows 8.1|windows nt 6.3)/.test(a) ? c = "8.1" : /(windows 8|windows nt 6.2)/.test(a) ? c = "8" : /(windows 7|windows nt 6.1)/.test(a) ? c = "7" : /(windows nt 6.0)/.test(a) ? c = "Vista" : /(windows nt 5.2)/.test(a) ? c = "Server 2003" : /(windows nt 5.1|windows xp)/.test(a) ? c = "XP" : /(windows nt 5.0|windows 2000)/.test(a) ? c = "2000" : /(win 9x 4.90|windows me)/.test(a) ? c = "ME" : /(windows 98|win98)/.test(a) ? c = "98" : /(windows 95|win95|windows_95)/.test(a) ? c = "95" : /(windows nt 4.0|winnt4.0|winnt|windows nt)/.test(a) ? c = "NT 4.0" : /(windows ce)/.test(a) ? c = "CE" : /(win16)/.test(a) && (c = "3.11") : "Android" == l ? (o = "Android", t = n.toLowerCase().indexOf(o.toLowerCase()), i = parseFloat(n.slice(t + o.length, t + o.length + 6)), c = isNaN(i) ? c : i) : "iOS" == l ? (o = "OS", t = n.toLowerCase().indexOf(o.toLowerCase()), i = n.slice(t + o.length, t + o.length + 6), i = parseFloat(i.replace("_", ".")), c = isNaN(i) ? c : i) : -1 != l.indexOf("Mac OS") && (o = -1 != l.indexOf("Mac OS X") ? "Mac OS X" : "Mac OS", t = n.toLowerCase().indexOf(o.toLowerCase()), i = n.slice(t + o.length, t + o.length + 6), i = parseFloat(i.replace("_", ".")), c = isNaN(i) ? c : i);
    var u = 0;
    if ("iOS" == l && "iPhone" == r) {
        var p = window.screen.width,
            d = window.screen.height;
        u = 0, 320 == p && 480 == d && (u = 4), 320 == p && 568 == d && (u = 5), 375 == p && 667 == d && (u = 6), 414 == p && 736 == d && (u = 6), 375 == p && 812 == d && (u = 10), 414 == p && 896 == d && (u = 10)
    }
    var f = "";
    f = "mac os x" == l.toLowerCase() ? "osx" : f, f = "windows" == l.toLowerCase() ? "win" : f, f = "android" == l.toLowerCase() ? "and" : f, f = "ios" == l.toLowerCase() ? "ios" : f;
    navigator.appVersion;
    var m, h, v, b = navigator.appName,
        x = "" + parseFloat(navigator.appVersion),
        g = parseInt(navigator.appVersion, 10); - 1 != (h = n.indexOf("OPR/")) ? (b = "Opera", x = n.substring(h + 4)) : -1 != (h = n.indexOf("Opera")) ? (b = "Opera", x = n.substring(h + 6), -1 != (h = n.indexOf("Version")) && (x = n.substring(h + 8))) : -1 != (h = n.indexOf("Edge")) ? (b = "Microsoft Edge", x = n.substring(h + 5)) : -1 != (h = n.indexOf("MSIE")) ? (b = "Microsoft Internet Explorer", x = n.substring(h + 5)) : -1 != (h = n.indexOf("Trident")) ? (b = "Microsoft Internet Explorer", -1 != (h = n.indexOf("rv:")) && (x = n.substring(h + 3))) : -1 != (h = n.indexOf("CriOS")) && /iphone|ipod|ipad/i.test(n) ? (b = "Google Chrome for IOS", x = n.substring(h + 6)) : -1 != (h = n.indexOf("Chrome")) ? (b = "Google Chrome", x = n.substring(h + 7)) : -1 != (h = n.indexOf("Safari")) ? (b = "Safari", x = n.substring(h + 7), -1 != (h = n.indexOf("Version")) && (x = n.substring(h + 8))) : -1 != (h = n.indexOf("Firefox")) ? (b = "Mozilla Firefox", x = n.substring(h + 8)) : (m = n.lastIndexOf(" ") + 1) < (h = n.lastIndexOf("/")) && (b = n.substring(m, h), x = n.substring(h + 1), b.toLowerCase() == b.toUpperCase() && (b = navigator.appName)), -1 != (v = x.indexOf(";")) && (x = x.substring(0, v)), -1 != (v = x.indexOf(" ")) && (x = x.substring(0, v)), g = parseInt("" + x, 10), isNaN(g) && (x = "" + parseFloat(navigator.appVersion), g = parseInt(navigator.appVersion, 10));
    var k = getUUID(),
        $ = notnull(navigator.language) ? navigator.language : "",
        C = {
            osName: l,
            osTiny: f,
            osVersion: c.toString(),
            deviceModel: r,
            deviceNumber: u,
            browserName: b,
            browserVersion: g,
            browserFullVersion: x,
            browserAppName: navigator.appName,
            browserUserAgent: navigator.userAgent,
            language: $,
            webviewEmbed: s,
            uuid: k
        };
    if (!0 === e)
        for (var D in C) "string" == typeof C[D] && (C[D] = C[D].toLowerCase());
    return C
}

function checkiPad() {
    return !!isIOS && (trustAppMobile && notnull(device) ? -1 != device.model.toLowerCase().indexOf("ipad") : -1 != machine.deviceModel.toLowerCase().indexOf("ipad"))
}

function checkiPadPro() {
    return !!isIOS && (trustAppMobile && notnull(device) ? -1 != phoneModel.get(device.model).toLowerCase().indexOf("ipad pro") : window.devicePixelRatio > 1 && 1366 == screenW && 1024 == screenH)
}

function checkiPadProBig() {
    return !!isIOS && (trustAppMobile && notnull(device) ? -1 != phoneModel.get(device.model).toLowerCase().indexOf("ipad pro") && -1 == phoneModel.get(device.model).toLowerCase().indexOf("9.7") : window.devicePixelRatio > 1 && 1366 == screenW && 1024 == screenH)
}

function checkiPadMini() {
    return !!(isIOS && trustAppMobile && notnull(device)) && -1 != phoneModel.get(device.model).toLowerCase().indexOf("ipad mini")
}

function checkiPhoneX() {
    return !!isIOS && (trustAppMobile && notnull(device) ? -1 != phoneModel.get(device.model).toLowerCase().indexOf("iphone x") : 3 == window.devicePixelRatio && (812 == screenW && 375 == screenH || 896 == screenW && 414 == screenH))
}

function checkiPhone4s() {
    return !!isIOS && (trustAppMobile && notnull(device) ? -1 != phoneModel.get(device.model).toLowerCase().indexOf("iphone 4s") : 2 == window.devicePixelRatio && 480 == screenW && 320 == screenH)
}

function iPhone6sAndMore() {
    var e = device.model.toLowerCase().split(",")[0];
    return Number(e.slice(6, e.length)) >= 8
}

function initRulesCSS() {
    var e = "";
    e += '#sp-select .icon .img { background-image: url("' + assetName("img/switch-bt.png") + '"); }', e += '#sp-select .icon .txt { background-image: url("' + assetName("img/switch-bt.png") + '"); }', pageApp && (e += `\n\t\t\t:root {\n\t\t\t\t--colBck : ${app.colBck};\n\t\t\t\t--col0 : ${app.col0};\n\t\t\t\t--col1 : ${app.col1};\n\t\t\t\t--col2 : ${app.col2};\n\t\t\t\t--col3 : ${app.col3};\n\t\t\t\t--col4 : ${app.col4};\n\t\t\t}\n\n\t\t\t#game { \n\t\t\t\tbackground-image: url('${assetName(app.folder+"img/game-bck.jpg")}');\n\t\t\t}\n\t\t\t`);
    var o = document.head || document.getElementsByTagName("head")[0],
        t = document.createElement("style");
    o.appendChild(t), t.type = "text/css", t.appendChild(document.createTextNode(e))
}

function BoxDialog(e) {
    var o = this,
        t = $(e);

    function i(e) {
        e.preventDefault(), stopProp(e), $(e.target).addClass("active");
        var o = !0;
        void 0 !== e.data.func && (e.data.func === n && (o = !1), e.data.func()), o && n()
    }

    function n() {
        o.neverClose || o.close()
    }
    return this.$div = t, this.$bck = t.find(".bac"), this.$scale = t.find(".scale"), this.$box = t.find(".box"), this.$pop = t.find(".pop"), this.$pop.$title = t.find(".title"), this.$pop.$text = t.find(".text"), this.$pop.$content = t.find(".content"), this.opened = !1, this.neverClose = !1, this.isOpen = function() {
        return o.opened
    }, this.open = function(e, a, s, l, r, c, u) {
        o.isOpen() && (removeInArray("popup-dialog", focusHistory), deleteFocus(), o.killall()), t.on(evtPress, stopProp), o.opened = !0, o.neverClose = !isnull(c) && c, e = isnull(e) ? "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod" : e, a = isnull(a) ? "Info" : a, s = isnull(s) ? ["Close"] : s, l = isnull(l) ? [n] : l, r = !isnull(r) && r, notnull(u) && t.attr("data-name", u), t.addClass("show"), o.clean(), o.$pop.$title.html(a), o.$pop.$text.html(e);
        for (var p = 0, d = s.length; p < d; p++) {
            l[p];
            var f = s[p];
            o.$pop.$content.append('<div class="bt-mini light" id="bt-mini' + p + '"><div class="txt">' + f + '</div><div class="hitzone"></div></div>'), o.$pop.$content.find("#bt-mini" + p).off().on(evtClick, {
                func: l[p]
            }, i)
        }
        r && t.css({
            "z-index": "9999"
        }), o.fadeInBck(), o.$box.removeClass("open close").addClass("open"), createFocus("popup-dialog")
    }, this.close = function(e) {
        notnull(e) && e.preventDefault(), o.fadeOutBck(), o.$box.removeClass("open close").addClass("close").one(animationEnd, function(e) {
            $(e.target).removeClass("close"), t.removeClass("show"), t.removeAttr("data-name"), t.off(), o.clean(), o.opened = !1
        })
    }, this.killall = function() {
        removeInArray("popup-dialog", focusHistory), t.off(), t.removeAttr("data-name"), t.removeClass("show"), o.clean(), o.$box.removeClass("open close"), resetAnimationCSS(o.$box[0]), o.$bck.removeClass("animateFadeIn animateFadeOut"), resetAnimationCSS(o.$bck[0]), o.opened = !1
    }, this.fadeInBck = function(e) {
        e ? o.$bck.addClass("mini") : o.$bck.removeClass("mini"), o.$bck.addClass("animateFadeIn")
    }, this.fadeOutBck = function() {
        o.$bck.addClass("animateFadeOut").one(animationEnd, function(e) {
            $(e.target).removeClass("animateFadeIn animateFadeOut"), removeInArray("popup-dialog", focusHistory), createFocus(focusHistory[focusHistory.length - 1])
        })
    }, this.clean = function() {
        o.$pop.$content.find(".bt-mini").off(), o.$pop.$content.empty(), o.$pop.$title.empty(), o.$pop.$text.empty()
    }, this
}

function Popup(e) {
    var o, t = this,
        i = $(e),
        n = i.find(".bac"),
        a = i.find(".box"),
        s = i.find("span.icon"),
        l = i.find(".container"),
        r = i.find(".box-tab .tab").length > 0,
        c = !0,
        u = !0;

    function p() {
        c = !0, n.removeClass("animateFadeIn animateFadeOut"), t.closeComplete()
    }

    function d(e) {
        u = !0, a.removeClass("slideUp slideDown").get(0).offsetHeight, o.onBoxCloseEnd(), t.closeComplete(), tryfunc(e)
    }

    function f(e) {
        notnull(t.onCloseTab) && t.onCloseTab(), i.find(".tab.active").removeClass("active"), i.find(".pop.active").removeClass("active");
        var o = $(this),
            n = i.find(".pop#" + o.attr("id").replace("tab-", "pop-"));
        o.addClass("active"), n.addClass("active"), createFocus(n.attr("id"))
    }
    return this.$popup = i, this.$icon = s, this.objCustom = o, this.open = function(e) {
        notnull(o) && e.name == o.name || (i.hasClass("show") || i.addClass("show"), n.hasClass("animateFadeIn") || t.showBck(), a.hasClass("slideUp") ? t.hideBox(function() {
            t.open(e)
        }) : (t.custom(e), t.showBox()))
    }, this.close = function(e) {
        t.hideBck(e), t.hideBox(null, e)
    }, this.closeComplete = function() {
        c && u && (t.reinit(), tryfunc(o.onCloseComplete), o = null)
    }, this.reinit = function() {
        o.static || l.empty(), i.removeClass("show mini middle info action action-back no-action"), i.removeAttr("data-name"), n.removeClass("animateFadeIn animateFadeOut"), a.removeClass("slideUp slideDown").get(0).offsetHeight
    }, this.custom = function(e) {
        o = {
            static: e.static || !1,
            bodyclose: e.bodyclose || !1,
            bckclose: e.bckclose || !1,
            name: e.name || "no-name",
            icntype: e.icntype || "",
            bcksize: e.bcksize || "",
            content: e.content || "",
            onBoxOpenStart: e.onBoxOpenStart || nada,
            onBoxOpenEnd: e.onBoxOpenEnd || nada,
            onBoxCloseStart: e.onBoxCloseStart || nada,
            onBoxCloseEnd: e.onBoxCloseEnd || nada,
            onCloseComplete: e.onCloseComplete || nada
        }, i.removeClass("mini middle info action action-back no-action"), i.addClass(o.bcksize), i.attr("data-name", o.name), "" != o.icntype && (i.addClass(o.icntype), s.find("svg use").attr("xlink:href", "#ic-" + ("action" == o.icntype ? "close" : "action-back" == o.icntype ? "navl" : "info"))), o.static || l.html(o.content)
    }, this.refresh = function() {
        notnull(o) && notnull(o.content) && l.html(o.content)
    }, this.showBck = function() {
        c = !1, n.addClass("animateFadeIn").one(animationEnd, function() {})
    }, this.hideBck = function(e) {
        !0 === e ? p() : n.addClass("animateFadeOut").one(animationEnd, function() {
            p()
        })
    }, this.showBox = function() {
        u = !1, o.onBoxOpenStart(), r && (i.find(".box-tab .tab").first().trigger(evtClick.split(" ")[0]), deleteFocus()), a.addClass("slideUp").one(animationEnd, function() {
            o.bodyclose && $body.on(evtClick, t.clickBck), o.bckclose && n.on(evtClick, t.close), o.onBoxOpenEnd()
        })
    }, this.hideBox = function(e, i) {
        o.bodyclose && $body.off(evtClick, t.clickBck), o.bckclose && n.off(evtClick, t.close), o.onBoxCloseStart(), !0 === i ? d(e) : a.addClass("slideDown").one(animationEnd, function() {
            d(e)
        })
    }, this.clickBck = function(o) {
        if (o.preventDefault(), $(o.target).closest(e + " .box").length > 0);
        else if (r) {
            var i = notnull((o = ~o.type.indexOf("touch") ? o.originalEvent : o).targetTouches) ? o.targetTouches[0] : o;
            Math.round(i.pageY) > 100 * stageScale && t.close()
        } else t.close()
    }, this.isOpen = function() {
        return i.hasClass("show")
    }, this.getName = function() {
        return notnull(o) && notnull(o.name) ? o.name : ""
    }, r && i.find(".box-tab .tab").each(function(e) {
        $(this).on(evtClick, f)
    }), this
}

function checkIfPopupOpen() {
    notnull(boxPopup) && boxPopup.isOpen() && boxPopup.close(!0)
}

function boxInfoCustom() {
    var e = Math.floor(3 * screenW / templateW);
    e = e < 0 ? 1 : e;
    var o = boxInfo.$popup.find("#pop-tuto .slideshow");
    return o.$box = boxInfo.$popup.find("#pop-tuto .slideshow .img-box"), o.$btL = boxInfo.$popup.find("#pop-tuto .bt").first(), o.$btR = boxInfo.$popup.find("#pop-tuto .bt").last(), o.init = function() {
        var o = this,
            t = 0,
            i = 0,
            n = 0,
            a = 0,
            s = this.find(".overflow-box").width(),
            l = this.find("img").length;
        this.onPress = function(e) {
            $body.off(evtPressEnd, o.onRelease), o.$box.off(evtMove, o.onMove), (e = ~e.type.indexOf("touch") ? e.originalEvent : e).preventDefault();
            var i = notnull(e.targetTouches) ? e.targetTouches[0] : e;
            t = i.pageX, o.$box.on(evtMove, o.onMove), $body.on(evtPressEnd, o.onRelease)
        }, this.onMove = function(n) {
            n.preventDefault(), (n = ~n.type.indexOf("touch") ? n.originalEvent : n).preventDefault();
            var s = notnull(n.targetTouches) ? n.targetTouches[0] : n;
            i = -1 * Math.round(t - s.pageX), o.$box.css({
                transform: "translateX(" + (a + 1.6 * i / e) + "px)"
            })
        }, this.onRelease = function(e) {
            e.preventDefault(), $body.off(evtPressEnd, o.onRelease), o.$box.off(evtMove, o.onMove), i < -100 ? n != l - 1 ? o.slide("left") : o.slide() : i > 100 && 0 !== n ? o.slide("right") : o.slide(), t = 0, i = 0
        }, this.slide = function(e) {
            $body.off(evtPressEnd, o.onRelease), o.$box.off(evtMove, o.onMove), o.$box.addClass("slide"), "left" === e ? n++ : "right" === e && n--, a = -s * n, o.$box.css({
                transform: "translateX(" + String(a) + "px)"
            })
        }, this.clickLeft = function(e) {
            e.preventDefault(), 0 !== n && o.slide("right")
        }, this.clickRight = function(e) {
            e.preventDefault(), n != l - 1 && o.slide("left")
        }, this.reinit = function() {
            n > 0 && (t = i = n = a = 0, o.slide())
        }, o.$box.on(evtPress, o.onPress), this.$btL.on(evtClick, this.clickLeft), this.$btR.on(evtClick, this.clickRight)
    }, o.init(), o
}

function initPopupIndexApp() {
    (boxInfo = new Popup(".box-popup#pop-info")).$slide = boxInfoCustom(), boxInfo.onCloseTab = boxInfo.$slide.reinit, boxParam = new Popup(".box-popup#pop-param"), $("#pop-language .box-lang .bt-mini").on(evtClick, function(e) {
        e.preventDefault(), preventAction(function() {
            clickBtLang(e)
        })
    }), $("#pop-follow .bt.facebook").on("click", function(e) {
        e.preventDefault(), redirectTo("facebook")
    }), $("#pop-follow .bt.twitter").on("click", function(e) {
        e.preventDefault(), redirectTo("twitter")
    }), $("#pop-follow .bt.instagram").on("click", function(e) {
        e.preventDefault(), redirectTo("instagram")
    }), $("#pop-follow .bt.youtube").on("click", function(e) {
        e.preventDefault(), redirectTo("youtube")
    }), $("#pop-follow .bt.tumblr").on("click", function(e) {
        e.preventDefault(), redirectTo("tumblr")
    }), $("#pop-follow #img-shop").on("click", function(e) {
        e.preventDefault(), redirectTo("shop-all")
    }), $("#pop-credit #bt-feedback").on("click", function(e) {
        e.preventDefault(), preventAction(sendFeedback)
    }), $("#pop-credit #bt-rating").on("click", function(e) {
        e.preventDefault();
        var o = isIOS || appDesktop && isOSX ? build.getInfo().urlRate : build.getInfo().url;
        preventAction(function() {
            openURL(o)
        })
    }), $("#pop-credit #bt-faq").on("click", function(e) {
        e.preventDefault(), redirectTo("faq")
    }), $("#pop-credit #bt-privacy").on("click", function(e) {
        e.preventDefault(), showPP()
    }), appBrowserExpo && $("#pop-credit .container").append("www.incredibox.com")
}

function showPP(e) {}

function hidePP() {}

function refusePP() {}

function acceptPP(e) {}

function dialogGetApp(e) {
    notnull(e) && e.preventDefault(), appBrowserDemo ? popupGetApp() : appBrowser && isIframe ? window.top.appEvent("popupGetApp") : boxDialog.open("To access this feature you have to download the Incredibox app. Let's go? &#128273;", "&#128274; Locked", [STR("bt.sure"), STR("bt.later")], [], !0)
}

function popupGetApp(e) {
    var o = !0 === e ? "action-back" : "action",
        t = "<div class='bt bt-long' id='bt-getapp'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-download'></use></svg><div class='txt'>Get app</div></div><div class='hitzone'></div></div>",
        i = "store";
    t = isIOS ? "<div class='bt-store' id='bt-getapp'><div class='bck appstore'></div></div>" : t, i = isIOS ? "appstore" : i, t = isAndroid ? "<div class='bt-store' id='bt-getapp'><div class='bck playstore'></div></div>" : t, i = isAndroid ? "playstore" : i, boxPopup.open({
        name: "get-full-app",
        icntype: o,
        content: `\n\t\t\t<div class='title'>Feature locked</div>\n\t\t\t<div class='text'>\n\t\t\t\tWant to access all app's features?<br>\n\t\t\t\tEasy, just download Incredibox!\n\t\t\t\t${t}\n\t\t\t\t<div class='mini'>No ads, many musical style, record, share, download your mixes... and many more &#129321;</div>\n\t\t\t</div>`,
        onBoxOpenEnd: function() {
            !0 === e ? boxPopup.$icon.on(evtClick, popupRecok) : boxPopup.$icon.on(evtClick, boxPopup.close), boxPopup.$popup.find("#bt-getapp").on("click", function(e) {
                e.preventDefault(), redirectTo(i)
            })
        },
        onBoxCloseStart: function() {
            boxPopup.$icon.off(), boxPopup.$popup.find("#bt-getapp").off()
        }
    })
}

function popupInfo() {
    deleteFocus(), boxInfo.open({
        static: !0,
        bckclose: !0,
        name: "popup-info",
        onBoxOpenEnd: function() {
            createFocus("popup-info")
        },
        onBoxCloseStart: function() {
            deleteFocus(), focusHistory = []
        },
        onBoxCloseEnd: function() {
            boxInfo.$slide.reinit()
        },
        onCloseComplete: function() {
            createFocus(pageApp ? "home" : "index-select")
        }
    })
}

function popupParam() {
    deleteFocus(), boxParam.open({
        static: !0,
        bckclose: !0,
        name: "popup-param",
        onBoxOpenEnd: function() {
            createFocus("popup-param")
        },
        onBoxCloseStart: function() {
            deleteFocus(), focusHistory = []
        },
        onCloseComplete: function() {
            createFocus(pageApp ? "home" : "index-select")
        }
    })
}

function popupSwitch() {
    deleteFocus(), boxSwitch.open({
        static: !0,
        bckclose: !0,
        name: "popup-switch",
        onBoxOpenEnd: function() {
            createFocus("popup-switch")
        },
        onBoxCloseStart: function() {
            deleteFocus(), focusHistory = []
        },
        onCloseComplete: function() {
            createFocus("home")
        }
    })
}

function popupAlbum() {
    deleteFocus(), boxAlbum.open({
        static: !0,
        bckclose: !0,
        name: "popup-album",
        onBoxOpenEnd: function() {
            createFocus("popup-album")
        },
        onBoxCloseStart: function() {
            deleteFocus(), focusHistory = []
        },
        onCloseComplete: function() {
            createFocus("home")
        }
    }), saveGA("popup", "album", "open popup album")
}

function popupTutoDrag() {
    boxPopup.open({
        name: "drag-and-drop",
        icntype: "info",
        bcksize: "mini",
        bodyclose: !0,
        content: `\n\t\t\t<div class='title'>${STR("pop.dragDropTitle")}</div>\n\t\t\t<div class='text'>${STR("txt.tuto1")}</div>`,
        onBoxCloseEnd: function() {
            storage.setItem("popupTutoDrag", "viewed")
        }
    })
}

function popupDrag() {
    boxPopup.open({
        name: "drag-and-drop",
        icntype: "info",
        bcksize: "mini",
        bodyclose: !0,
        content: `\n\t\t\t<div class='title'>${STR("pop.dragDropTitle")}</div>\n\t\t\t<div class='text'>${STR("pop.dragDropText")}</div>`
    })
}

function popupShort() {
    boxPopup.open({
        name: "too-short",
        icntype: "info",
        bcksize: "mini",
        bodyclose: !0,
        content: `\n\t\t\t<div class='title'>${STR("pop.toShortTitle")}</div>\n\t\t\t<div class='text'>${STR("pop.toShortText").split("%{minimum_time}").join(app.recmintime)}</div>`
    })
}

function popupBonusPlaying() {
    boxPopup.open({
        name: "bonus-playing",
        icntype: "info",
        bcksize: "mini",
        bodyclose: !0,
        content: `\n\t\t\t<div class='title'>${STR("pop.bonusPlayingTitle")}</div>\n\t\t\t<div class='text'>${STR("pop.bonusPlayingText")}</div>`
    })
}

function popupFindPreviousBonus() {
    boxPopup.open({
        name: "find-previous-bonus",
        icntype: "info",
        bcksize: "mini",
        bodyclose: !0,
        content: `\n\t\t\t<div class='title'>${STR("pop.bonusFindPreviousTitle")}</div>\n\t\t\t<div class='text'>${STR("pop.bonusFindPreviousText")}</div>`
    })
}

function popupBonusUnlocked(e) {
    if (!modeReplay && !modeRandom || e) {
        var o = "v" + appVersion + "-popup-bonus-unlock";
        (isnull(storage.getItem(o)) || e) && (storage.setItem(o, "ok"), boxPopup.open({
            name: "bonus-unlocked",
            bcksize: "middle",
            content: function() {
                var e = `\n\t\t\t\t\t\t<div class='popimg'></div>\n\t\t\t\t\t\t<div class='title'>${STR("pop.bonusUnlockTitle")}</div>\n\t\t\t\t\t\t<div class='text'>${STR("pop.bonusUnlockText")}</div>`;
                return isMouseDevice && (e += `\n\t\t\t\t\t\t\t<div class='content'>\n\t\t\t\t\t\t\t\t<div class='bt-mini light'><div class='txt'>${STR("bt.gotit")}</div><div class='hitzone'></div></div>\n\t\t\t\t\t\t\t</div>`), e
            },
            onBoxOpenStart: function() {
                boxPopup.$popup.addClass("pop-bonus-unlock"), boxPopup.$popup.find(".pop").append("<div id='pointe'></div>"), calcPointePosX(1)
            },
            onBoxOpenEnd: function() {
                isMouseDevice ? boxPopup.$popup.find(".bt-mini").on(evtClick, function(e) {
                    e.preventDefault(), boxPopup.close()
                }) : $body.on(evtClick, boxPopup.clickBck)
            },
            onBoxCloseStart: function() {
                isMouseDevice ? boxPopup.$popup.find(".bt-mini").off() : $body.off(evtClick, boxPopup.clickBck)
            },
            onBoxCloseEnd: function() {
                boxPopup.$popup.removeClass("pop-bonus-unlock"), boxPopup.$popup.find("#pointe").remove()
            }
        }))
    }
}

function popupBonusFindNext(e) {
    if (!modeReplay && !modeRandom || e) {
        var o = "v" + appVersion + "-popup-bonus-next";
        (isnull(storage.getItem(o)) || e) && (storage.setItem(o, "ok"), isToolbarOpen && closeTool(), boxPopup.open({
            name: "find-next-bonus",
            bcksize: "middle",
            content: function() {
                var e = `\n\t\t\t\t\t\t<div class='title'>${STR("pop.bonusFindNextTitle")}</div>\n\t\t\t\t\t\t<div class='text'>${STR("pop.bonusFindNextText")}</div>`;
                return isMouseDevice && (e += `\n\t\t\t\t\t\t<div class='content'>\n\t\t\t\t\t\t\t<div class='bt-mini light'><div class='txt'>${STR("bt.gotit")}</div><div class='hitzone'></div></div>\n\t\t\t\t\t\t</div>`), e
            },
            onBoxOpenStart: function() {
                boxPopup.$popup.addClass("pop-bonus-unlock"), boxPopup.$popup.find(".pop").append("<div id='pointe'></div>"), calcPointePosX(2)
            },
            onBoxOpenEnd: function() {
                isMouseDevice ? boxPopup.$popup.find(".bt-mini").on(evtClick, function(e) {
                    e.preventDefault(), boxPopup.close()
                }) : $body.on(evtClick, boxPopup.clickBck)
            },
            onBoxCloseStart: function() {
                isMouseDevice ? boxPopup.$popup.find(".bt-mini").off() : $body.off(evtClick, boxPopup.clickBck)
            },
            onBoxCloseEnd: function() {
                boxPopup.$popup.removeClass("pop-bonus-unlock"), boxPopup.$popup.find("#pointe").remove()
            }
        }))
    }
}

function calcPointePosX(e) {
    var o = $("#bt-bonus-" + e).offset().left - $("#box-bt2").offset().left + $("#app-incredibox").offset().left,
        t = $("#pop-popup .pop").offset().left,
        i = $("body").hasClass("ultrawide") ? .8 : 1,
        n = (o - t) / stageScale / popupScale;
    n += 86 * i * stageScale / 2 - 32 * stageScale * popupScale / 2, $("#pointe").css({
        transform: "translateX(" + Math.floor(n) + "px)"
    })
}

function popupRecok() {
    checkTimeRecok = getTime(), deleteFocus();
    var e = `\n\t\t<div class='bt bt-haut retry'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-reset'></use></svg></div><div class='txt'>${STR("bt.retry")}</div><div class='hitzone'></div></div>\n\t\t<div class='bt bt-haut replay'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-eye'></use></svg></div><div class='txt'>${STR("bt.replay")}</div><div class='hitzone'></div></div>\n\t\t<div class='bt bt-haut save'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-edit'></use></svg></div><div class='txt'>${STR("bt.save")}</div><div class='hitzone'></div></div>\n\t`;
    appBrowserDemo && (e = `\n\t\t\t<div class='bt bt-haut replay'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-eye'></use></svg></div><div class='txt'>${STR("bt.replay")}</div><div class='hitzone'></div></div>\n\t\t\t<div class='bt bt-haut share'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-share'></use></svg></div><div class='txt'>${STR("bt.share")}</div><div class='hitzone'></div></div>\n\t\t\t<div class='bt bt-haut download'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-download'></use></svg></div><div class='txt'>Get MP3</div><div class='hitzone'></div></div>\n\t\t`), boxPopup.open({
        name: "record-complete",
        icntype: "action",
        content: `\n\t\t\t<div class='title'>${STR("pop.recOkTitle")}</div>\n\t\t\t<div class='content'>\n\t\t\t\t<div class='box-bt-haut'>\n\t\t\t\t\t${e}\n\t\t\t\t</div>\t\n\t\t\t</div>`,
        onBoxOpenEnd: function() {
            boxPopup.$icon.on(evtClick, boxPopup.close), boxPopup.$popup.find(".bt.replay").on(evtClick, function(e) {
                e.preventDefault(), preventAction(clickReplayMix)
            }), appBrowserDemo ? (boxPopup.$popup.find(".bt.share").on(evtClick, function(e) {
                e.preventDefault(), preventAction(function() {
                    popupGetApp(!0)
                })
            }), boxPopup.$popup.find(".bt.download").on(evtClick, function(e) {
                e.preventDefault(), preventAction(function() {
                    popupGetApp(!0)
                })
            })) : (boxPopup.$popup.find(".bt.retry").on(evtClick, function(e) {
                e.preventDefault(), preventAction(clickRetryMix)
            }), boxPopup.$popup.find(".bt.save").on(evtClick, function(e) {
                e.preventDefault(), preventAction(clickSaveMix)
            })), createFocus("popup-record-complete"), unlock()
        },
        onBoxCloseStart: function() {
            deleteFocus(), boxPopup.$icon.off(), boxPopup.$popup.find(".bt").off()
        },
        onBoxCloseEnd: function() {
            boxPopup.$icon.off(), boxPopup.$popup.find(".bt").off()
        },
        onCloseComplete: function() {
            removeInArray("popup-record-complete", focusHistory), modeReplay || createFocus("toolbar")
        }
    })
}
var checkTimeRecok = 0;

function canIclickRecok() {
    return getTime() - checkTimeRecok > 600
}

function clickRetryMix() {
    canIclickRecok() && (appBrowserDemo && withAdBreak && callAd("next", "retry-mix"), boxPopup.close(), TweenMax.delayedCall(.2, startRecordMode))
}

function clickReplayMix() {
    canIclickRecok() && (boxPopup.close(), startReplayMode(), saveGA("mix", "replay"))
}

function clickSaveMix() {
    popupForm()
}

function popupForm() {
    boxPopup.open({
        name: "save-form",
        icntype: "action-back",
        content: function() {
            var e = `\n\t\t\t<div class='title'>${STR("pop.formTitle")}</div>\n\t\t\t<div class='content'>\n\t\t\t\t<form action='javascript:clickBtValidFormMix()' method='post' target='_self' autocomplete='off'>\n\t\t\t\t\t<div class='formzone'>\n\t\t\t\t\t\t<div class='formline ic-name'><div class='icn-box'><svg class='icn-svg'><use xlink:href='#ic-user-mini'></use></svg></div><input type='text' id='input-name' placeholder='${STR("txt.inputName")}' value='${user.djname}' maxlength='26' autocorrect='off' spellcheck='false'/></div>\n\t\t\t\t\t\t<div class='formline ic-title'><div class='icn-box'><svg class='icn-svg'><use xlink:href='#ic-note-mini'></use></svg></div><input type='text' id='input-title' placeholder='${STR("txt.inputTitle")}' value='' maxlength='26' autocorrect='off' spellcheck='false'/></div>\n\t\t\t\t\t\t<div class='formline ic-dedi'><div class='icn-box'><svg class='icn-svg'><use xlink:href='#ic-like-mini'></use></svg></div><input type='text' id='input-dedi' placeholder='${STR("txt.dedicatedTo").split("%{name}").join("...")}' value='' maxlength='26' autocorrect='off' spellcheck='false'/></div>`;
            return appBrowser || (e += `<div class='formline ic-private'>\n\t\t\t\t\t\t\t<div class='icn-box'><svg class='icn-svg'><use xlink:href='#ic-view-mini'></use></svg></div>\n\t\t\t\t\t\t\t<div class='bt-onofftext active'>\n\t\t\t\t\t\t\t\t<div class='slider'></div>\n\t\t\t\t\t\t\t\t<div class='txtbox'>\n\t\t\t\t\t\t\t\t\t<div class='label'>${STR("bt.private")}</div>\n\t\t\t\t\t\t\t\t\t<div class='label'>${STR("bt.public")}</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>`), e += "</div>\n\t\t\t\t\t<div class='btzone'>\n\t\t\t\t\t\t<div class='bt valid'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-check'></use></svg></div><div class='hitzone'></div></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<input type='submit' style='visibility:hidden;position:absolute'/><div class='clear'></div>\n\t\t\t\t</form>\n\t\t\t</div>", appBrowser && !appBrowserExpo && (e += "<div style='margin-top: 25px; color:#777; font-size:14px; line-height:20px;'>These infos are public and will appear in the Incredibox's Playlist.<br>Don't use your real name, choose a nice pseudo instead &#128521;</div>"), e
        },
        onBoxOpenEnd: function() {
            if (createFocus("popup-save-form"), boxPopup.$icon.on(evtClick, popupRecok), boxPopup.$popup.find(".bt.valid").on(evtClick, function(e) {
                    e.preventDefault(), preventAction(clickBtValidFormMix)
                }), appBrowser || appDesktop || (boxPopup.$popup.find(".formline:not(.ic-private)").on(evtPress, function(e) {
                    boxPopup.$popup.find(".formline").off(evtPress), Spinner.add($(this).find(".icn-box"))
                }), boxPopup.$popup.find(".formline input").on("focus", function() {
                    boxPopup.$popup.find(".formline input").off("focus"), Spinner.reset()
                })), !appBrowser && !isSafeMode()) {
                var e = boxPopup.$popup.find(".formline.ic-private .bt-onofftext"),
                    o = boxPopup.$popup.find(".formline.ic-private svg use");
                e.on(evtClick, function(t) {
                    t.preventDefault(), e.hasClass("active") ? (e.removeClass("active"), o.attr("xlink:href", "#ic-lock-mini")) : (e.addClass("active"), o.attr("xlink:href", "#ic-view-mini"))
                })
            }
        },
        onBoxCloseStart: function() {
            removeInArray("popup-save-form", focusHistory), deleteFocus(), boxPopup.$icon.off(), boxPopup.$popup.find(".bt").off(), boxPopup.$popup.find(".bt-onofftext").off(), boxPopup.$popup.find("input").off(), appBrowser || appDesktop || (boxPopup.$popup.find(".formline").off(), boxPopup.$popup.find(".formline input").off()), appMobile && blurAll()
        }
    })
}
var translateObj, formProcessing = !1;

function clickBtValidFormMix() {
    if (boxPopup.$popup.find(".formzone .formline input").hasClass("focused")) return !1;
    if (launchImmersiveMode(), !formProcessing) {
        formProcessing = !0, lock();
        var e = appBrowserExpo || isSafeMode() || !boxPopup.$popup.find(".formzone .bt-onofftext").hasClass("active"),
            o = boxPopup.$popup.find(".formzone #input-name"),
            t = boxPopup.$popup.find(".formzone #input-title"),
            i = boxPopup.$popup.find(".formzone #input-dedi"),
            n = o.val().substr(0, 26),
            a = t.val().substr(0, 26),
            s = i.val().substr(0, 26),
            l = trim(recordMix.getXML()),
            r = getUniqLink(),
            c = getDateNow(),
            u = app.version,
            p = trustAppMobile ? device.platform.toLowerCase() : machine.osName,
            d = trustAppMobile ? device.version : machine.osVersion,
            f = trustAppMobile ? device.model : machine.deviceModel,
            m = build.getInfo().version,
            h = machine.uuid;
        machine.browserUserAgent;
        n = cleanInputText(n, o), a = cleanInputText(a, t), s = cleanInputText(s, i);
        var v = regexList.classic,
            b = n.split(" ").join(""),
            x = a.split(" ").join(""),
            g = s.split(" ").join("");
        if (v.test(b)) invalidField(o);
        else if (v.test(x)) invalidField(t);
        else if (v.test(g)) invalidField(i);
        else if ("" === b) invalidField(o);
        else if ("" === x) invalidField(t);
        else {
            deleteFocus(), boxPopup.$popup.find(".formzone input").blur();
            var k = {
                mymix: !0,
                online: !1,
                link: r,
                name: ucwords(n),
                title: ucwords(a),
                dedi: ucwords(s),
                mix: l,
                date: c,
                app: u,
                appcode: m,
                model: f,
                os: p,
                uuid: h,
                osversion: d,
                nbview: 0,
                nblike: 0,
                user: user,
                platform: target,
                lang_user: user.lang,
                lang_machine: machine.language,
                private: e ? 1 : 0
            };
            appBrowserExpo && (k.dedi = "Design Inspire");
            var $ = boxPopup.$popup.find(".bt.valid");
            Spinner.add($), recordMix.setData(k), localMixObject.saveMix(k), mixToShare = k, setUserInfo({
                djname: ucwords(n)
            }), delete XHRmemotime.mymix, saveGA("mix", "save_local"), hasNetwork ? appBrowser ? saveMixDB(k, function() {
                C($)
            }, function() {
                boxDialog.open(STR("pop.noCoServerText"), STR("pop.noCoServerTitle"), [STR("bt.ok")]), Spinner.reset(), formProcessing = !1, unlock()
            }) : saveMixDB(k, function() {
                C($)
            }) : appBrowser ? (Spinner.reset(), formProcessing = !1, unlock(), boxDialog.open(STR("pop.noNetworkText"), STR("pop.noNetworkTitle"), [STR("bt.ok")], [])) : C($)
        }
    }

    function C(e) {
        TweenMax.delayedCall(1, function() {
            Spinner.reset(), popupMixSaved()
        })
    }
}

function invalidField(e) {
    e.addClass("invalid").one(animationEnd, function(e) {
        $(e.target).removeClass("invalid")
    }), formProcessing = !1, unlock()
}

function keyboardOpen(e) {
    TweenMax.set(boxPopup.$popup, {
        scrollTo: {
            y: 0
        }
    }), boxPopup.$popup.addClass("keyboardOpen");
    var o = boxPopup.$popup.find("#input-name"),
        t = e.keyboardHeight,
        i = (screenH - t) / 2,
        n = o.height() / 2;
    boxPopup.$popup.find(".formline input").each(function() {
        var e = $(this),
            o = Math.round(e.position().top - i + n) / stageScale;
        e.focus(function(e) {
            TweenMax.to(boxPopup.$popup, .4, {
                scrollTo: {
                    y: o
                },
                ease: Quint.easeInOut
            })
        })
    }), o.focus()
}

function keyboardClose() {
    TweenMax.to(boxPopup.$popup, .5, {
        scrollTo: {
            y: 0
        },
        ease: Quint.easeInOut,
        onComplete: function() {
            boxPopup.$popup.removeClass("keyboardOpen")
        }
    })
}

function blurAll() {
    notnull(document.activeElement) && document.activeElement.blur(), isAndroid && launchImmersiveMode()
}

function listenFocus() {
    var e = !1;
    isIOS && (document.addEventListener("focusin", function() {
        e = !0
    }), document.addEventListener("focusout", function() {
        e = !1, setTimeout(function() {
            e || window.scrollTo(0, 0)
        }, 250)
    }))
}

function popupConvertMix() {
    var e = $mixlist.hasClass("show") ? "action" : "action-back";
    boxPopup.open({
        name: "convert-mix",
        icntype: e,
        content: `\n\t\t\t<div class='title'>${STR("pop.convertMixTitle")}</div>\n\t\t\t<div class='text'>${STR("pop.convertMixText")}</div>\n\t\t\t<div class='content'>\n\t\t\t\t<div id='convert-loader-box' class='progress-box'><div class='scale'><div class='progress-bar'></div></div></div>\n\t\t\t\t<a class='bt bt-long download' id='bt-save-file'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-download'></use></svg><div class='txt'>${STR("bt.saveFile")}</div></div><div class='hitzone'></div></a>\n\t\t\t\t<div class='spinner-box spin'><svg class='icn-svg col-version'><use xlink:href='#ic-loader'></use></svg></div>\n\t\t\t</div>`,
        onBoxOpenEnd: function() {
            createFocus("popup-convert-mix"), boxPopup.$icon.on(evtClick, function() {
                "action" == e ? boxPopup.close() : popupMixSaved()
            }), notnull(mixToShare) && startConvert(contextAudio, mixToShare, boxPopup.$popup.find(".content"))
        },
        onBoxCloseStart: function() {
            removeInArray("popup-convert-mix", focusHistory), removeInArray("popup-convert-mix-ready", focusHistory), deleteFocus(), boxPopup.$icon.off(), stopConvert()
        }
    })
}

function popupMixSaved() {
    formProcessing = !1, boxPopup.open({
        name: "mix-saved",
        icntype: "action",
        content: function() {
            var e = STR(appBrowser ? "pop.shareTextBrowser" : "pop.shareText");
            e = 1 == mixToShare.private ? e.split("<br>")[0] : e, appBrowserExpo && (e = "Your mix has been saved.<br>Now you can share it!");
            var o = "";
            return (trustAppMobile || appBrowserExpo) && (o += `<div class='bt bt-haut link color'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-link'></use></svg></div><div class='txt'>${STR("bt.link")}</div><div class='hitzone'></div></div>`), o += `<div class='bt bt-haut share color'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-share'></use></svg></div><div class='txt'>${STR("bt.share")}</div><div class='hitzone'></div></div>`, isComputer && (o += `<div class='bt bt-haut download color hoverLocked'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-download'></use></svg></div><div class='txt'>${STR("bt.exportFile")}</div><div class='ic-locked'><svg class='icn-svg'><use xlink:href='#ic-lock'></use></svg></div><div class='hitzone'></div></div>`), o += `<div class='bt bt-haut mixlist color hoverLocked'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-mixlist'></use></svg></div><div class='txt'>${STR("bt.myMix")}</div><div class='ic-locked'><svg class='icn-svg'><use xlink:href='#ic-lock'></use></svg></div><div class='hitzone'></div></div>`, `\n\t\t\t\t<div class='title'>${STR("pop.shareTitle")}</div>\n\t\t\t\t<div class='text'>${e}</div>\n\t\t\t\t<div class='content'>\n\t\t\t\t\t<div class='box-bt-haut'>${o}</div>\n\t\t\t\t</div>`
        },
        onBoxOpenEnd: function() {
            createFocus("popup-mix-saved"), boxPopup.$icon.on(evtClick, boxPopup.close), (trustAppMobile || appBrowserExpo) && boxPopup.$popup.find(".bt.link").on(evtClick, function(e) {
                e.preventDefault();
                var o = $(this);
                preventAction(function() {
                    clickBtCopyLink(o)
                })
            }), boxPopup.$popup.find(".bt.share").on(evtClick, function(e) {
                e.preventDefault();
                var o = $(this);
                preventAction(function() {
                    clickBtShareGlobal(o)
                })
            }), appBrowser ? boxPopup.$popup.find(".bt.mixlist").on(evtClick, dialogGetApp) : boxPopup.$popup.find(".bt.mixlist").on(evtClick, function(e) {
                e.preventDefault(), preventAction(clickBtGoToMixlist)
            }), boxPopup.$popup.find(".bt.download").on(evtClick, function(e) {
                e.preventDefault(), appBrowser ? dialogGetApp() : preventAction(function() {
                    socialSharingOk("download")
                })
            }), unlock()
        },
        onBoxCloseStart: function() {
            deleteFocus(), boxPopup.$icon.off(), boxPopup.$popup.find(".bt").off()
        },
        onCloseComplete: function() {
            onGame && createFocus("toolbar"), mixToShare = {}
        }
    })
}

function clickBtShareGlobal(e) {
    socialSharing("global", e || $(this))
}

function clickBtShareMail(e) {
    socialSharing("mail", e || $(this))
}

function clickBtShareFacebook(e) {
    socialSharing("facebook", e || $(this))
}

function clickBtShareTwitter(e) {
    socialSharing("twitter", e || $(this))
}

function clickBtShareLink(e) {
    socialSharing("link", e || $(this))
}

function clickBtCopyLink(e) {
    socialSharing("clipboard", e || $(this))
}

function clickBtGoToMixlist() {
    backToHome(function() {
        openPlaylist("mymix", !0, !0)
    })
}

function popupGlobalShare() {
    var e = $mixlist.isOpen() ? "action" : "action-back";
    boxPopup.open({
        name: "global-share",
        icntype: e,
        bcksize: isMixReplay ? "mini" : "",
        content: `\n\t\t\t<div class='title'>${STR("bt.share")}</div>\n\t\t\t<div class='content'>\n\t\t\t\t<div class='box-bt-haut'>\n\t\t\t\t\t<div class='bt bt-haut mail color'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-mail'></use></svg></div><div class='txt'>Mail</div><div class='hitzone'></div></div>\n\t\t\t\t\t<div class='bt bt-haut facebook color'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-facebook'></use></svg></div><div class='txt'>Facebook</div><div class='hitzone'></div></div>\n\t\t\t\t\t<div class='bt bt-haut twitter color'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-twitter'></use></svg></div><div class='txt'>Twitter</div><div class='hitzone'></div></div>\n\t\t\t\t\t<div class='bt bt-haut link color'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-link'></use></svg></div><div class='txt'>${STR("bt.link")}</div><div class='hitzone'></div></div>\n\t\t\t\t</div>\n\t\t\t</div>`,
        onBoxOpenEnd: function() {
            createFocus("popup-global-share"), boxPopup.$popup.find(".bt.mail").on(evtClick, function(e) {
                e.preventDefault(), preventAction(function() {
                    socialSharingOk("mail")
                })
            }), boxPopup.$popup.find(".bt.facebook").on(evtClick, function(e) {
                e.preventDefault(), preventAction(function() {
                    socialSharingOk("facebook")
                })
            }), boxPopup.$popup.find(".bt.twitter").on(evtClick, function(e) {
                e.preventDefault(), preventAction(function() {
                    socialSharingOk("twitter")
                })
            }), boxPopup.$popup.find(".bt.link").on(evtClick, function(e) {
                e.preventDefault(), preventAction(function() {
                    socialSharingOk("clipboard")
                })
            }), "action" == e ? boxPopup.$popup.find("span.icon").on(evtClick, boxPopup.close) : boxPopup.$popup.find("span.icon").on(evtClick, popupMixSaved), unlock()
        },
        onBoxCloseStart: function() {
            removeInArray("popup-global-share", focusHistory), deleteFocus(), boxPopup.$popup.find("span.icon").off(), boxPopup.$popup.find(".bt").off()
        },
        onBoxCloseEnd: function() {
            createFocus(focusHistory[focusHistory.length - 1]), Spinner.reset()
        }
    })
}

function popupEmail() {
    boxPopup.open({
        name: "email-form",
        icntype: "action-back",
        bcksize: isMixReplay ? "mini" : "",
        content: `\n\t\t\t<div class='title'>${STR("pop.formEmailTitle")}</div>\n\t\t\t<div class='content'>\n\t\t\t\t<form action='javascript:clickBtValidFormEmail()' method='post' target='_self' autocomplete='off'>\n\t\t\t\t\t<div class='formzone'>\n\t\t\t\t \t\t<div class="formline ic-name"><div class="icn-box"><svg class="icn-svg"><use xlink:href="#ic-user-mini"></use></svg></div><input type="text" id="input-name" placeholder="${STR("txt.inputEmailSender")}" value="${notnull(user.djname)?user.djname:""}" maxlength="26" autocorrect="off" spellcheck="false"/></div>\n\t\t\t\t\t\t<div class='formline ic-email'><div class='icn-box'><svg class='icn-svg'><use xlink:href='#ic-at-mini'></use></svg></div><input type='email' id='input-email' placeholder='${STR("txt.inputEmailRecipient")}' value='' maxlength='254' autocorrect='off' spellcheck='false'/></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class='btzone'>\n\t\t\t\t\t\t<div class='bt valid'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-check'></use></svg></div><div class='hitzone'></div></div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<input type='submit' style='visibility:hidden;position:absolute'/><div class='clear'></div>\n\t\t\t\t</form>\n\t\t\t</div>`,
        onBoxOpenEnd: function() {
            createFocus("popup-email-form"), boxPopup.$icon.on(evtClick, popupGlobalShare), boxPopup.$popup.find(".bt.valid").on(evtClick, function(e) {
                e.preventDefault(), preventAction(clickBtValidFormEmail)
            })
        },
        onBoxCloseStart: function() {
            removeInArray("popup-email-form", focusHistory), deleteFocus(), boxPopup.$icon.off(), blurAll()
        },
        onBoxCloseEnd: function() {
            formProcessing = !1
        }
    })
}

function clickBtValidFormEmail() {
    if (boxPopup.$popup.find(".formzone .formline input").hasClass("focused")) return !1;
    var e = domainOnline + "mix/" + mixToShare.link,
        o = mixToShare.title,
        t = mixToShare.name;
    if (!formProcessing) {
        formProcessing = !0, lock();
        var i = boxPopup.$popup.find(".formzone #input-name"),
            n = boxPopup.$popup.find(".formzone #input-email"),
            a = i.val().substr(0, 26),
            s = n.val().substr(0, 254);
        a = cleanInputText(a, i), s = trim(s);
        var l = a.split(" ").join(""),
            r = s.toLowerCase();
        if ("" == l || regexList.classic.test(l)) invalidField(i);
        else if ("" != r && regexList.email.test(r)) {
            boxPopup.$popup.find(".formzone input").blur(), blurAll();
            var c = boxPopup.$popup.find(".bt.valid");
            if (Spinner.add(c), hasNetwork) xhr("POST", domainOnline + "ph2/send-mail.php", {
                expediteur: a,
                email: s,
                type: "composition",
                djName: t,
                title: o,
                link: e,
                src: appDesktop ? "electron" : "browser"
            }, function(e) {
                "success" == e.state ? (Spinner.reset(), c.addClass("success"), TweenMax.delayedCall(.6, function() {
                    unlock(), popupGlobalShare()
                })) : (boxDialog.open(STR("pop.shareErrorText"), STR("pop.shareErrorTitle"), [STR("bt.ok")], [function() {
                    Spinner.reset()
                }]), formProcessing = !1, unlock())
            }, function(e) {
                formProcessing = !1, boxDialog.open(STR("pop.shareErrorText"), STR("pop.shareErrorTitle"), [STR("bt.ok")], [function() {
                    Spinner.reset()
                }]), unlock()
            });
            else formProcessing = !1, boxDialog.open(STR("pop.noNetworkText"), STR("pop.noNetworkTitle"), [STR("bt.ok")], [function() {
                Spinner.reset()
            }]), unlock()
        } else invalidField(n)
    }
}

function saveMixDB(e, o, t) {
    var i = t || o;
    $.ajax({
        type: "POST",
        url: domainOnline + "ph2/save-mix-db.php",
        data: e,
        dataType: "json",
        crossdomain: !0,
        success: function(t) {
            "success" == t.state ? (e.online = !0, e.link = t.link, e.id = t.id, localMixObject.saveMix(e), delete XHRmemotime.latest, o(), saveGA("mix", "save_db")) : (i(), saveGA("mix", "save_db_failed"))
        },
        error: function(e) {
            i(), saveGA("mix", "save_db_error")
        }
    })
}

function socialSharing(e, o) {
    if (lock(), deleteFocus(), Spinner.add(o), hasNetwork) !0 === mixToShare.mymix ? mixToShare.online ? socialSharingOk(e) : saveMixDB(mixToShare, function() {
        socialSharingOk(e), $(".boxline .line[data-key='mix-" + mixToShare.link + "']").removeClass("isoffline")
    }, function() {
        boxDialog.open(STR("pop.noCoServerText"), STR("pop.noCoServerTitle"), [STR("bt.ok")], []), Spinner.reset(), unlock()
    }) : socialSharingOk(e);
    else {
        var t = $mixlist.hasClass("show") ? STR("pop.noCoShareText") : STR("pop.noCoShareText") + " " + STR("pop.noCoShareText2");
        boxDialog.open(t, STR("pop.noNetworkTitle"), [STR("bt.ok")], [function() {
            Spinner.reset()
        }]), unlock()
    }
}

function socialSharingOk(e, o) {
    var t = mixToShare.name,
        i = mixToShare.title,
        n = (mixToShare.dedi, mixToShare.date, domainOnline + "mix/" + mixToShare.link),
        a = domainOnline + "img/share/visu-share-v" + app.version + "@2x.png",
        s = domainOnline + "img/share/visu-share-v" + app.version + ".png",
        l = STR("pop.shareSubject"),
        r = STR("pop.sharePresentMix").split("%{name}").join(t).split("%{title}").join(i),
        c = STR("pop.shareTextLike"),
        u = STR("pop.shareTextBeCool"),
        p = r + "\n" + n + "\n\n" + c + "\n\n---------------------------\n\nApp Store: " + build.ios.url + "\nPlay Store: " + build.and.url + "\nAmazon Store: " + build.ama.url,
        d = "#incredibox",
        f = u + " #incredibox",
        m = r + " " + u + " #incredibox";
    if (appBrowserExpo && (d += " #DesignInspire #hktdc", f += " #DesignInspire #hktdc", m += " #DesignInspire #hktdc"), "global" != e && Spinner.reset(), "download" == e) {
        if (appDesktop && hasWorker) popupConvertMix();
        else openURL("https:www.incredibox.com/file/" + mixToShare.link);
        unlock(), saveGA("mix", "export_mp3")
    } else saveGA("mix", "share", e);
    switch (e) {
        case "mail":
            trustAppMobile && window.plugins.socialsharing.shareViaEmail(p, l, null, null, null, [s], v, b), isComputer && popupEmail();
            break;
        case "facebook":
            trustAppMobile && window.plugins.socialsharing.shareViaFacebook(d, a, n, v, b), appBrowser && windowPopup("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(n), 560, 350, !0), appDesktop && openURL("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(n));
            break;
        case "twitter":
            trustAppMobile && window.plugins.socialsharing.shareViaTwitter(f, a, n, v, b), appBrowser && windowPopup("https://twitter.com/intent/tweet?text=" + encodeURIComponent(f) + "&url=" + encodeURIComponent(n) + "&hashtags=musicApp,beatbox,pumpItUp&related=incredibox_%3AThe%20Incredibox%20official%20Twitter%20account!", 560, 350, !0), appDesktop && openURL("https://twitter.com/intent/tweet?text=" + encodeURIComponent(f) + "&url=" + encodeURIComponent(n) + "&hashtags=musicApp,beatbox,pumpItUp&related=incredibox_%3AThe%20Incredibox%20official%20Twitter%20account!");
            break;
        case "clipboard":
            appDesktop ? copyToClipboardElectron(n, h) : trustAppMobile ? cordova.plugins.clipboard.copy(n, h, function() {
                boxDialog.open(STR("pop.shareErrorText"), STR("pop.shareErrorTitle"), [STR("bt.ok")], []), b()
            }) : (appBrowser || isComputer) && (copyToClipboard(n), h(n));
            break;
        case "global":
            trustAppMobile ? (window.plugins.socialsharing.share(m, l, a, n, v, b), (isiPad || isiPadPro) && (window.plugins.socialsharing.iPadPopupCoordinates = function() {
                var e = o[0].getBoundingClientRect();
                return e.left + "," + e.top + "," + e.width + "," + e.height
            })) : isComputer && (popupGlobalShare(), Spinner.reset())
    }

    function h(e) {
        if (appBrowser) {
            var o = "<div class='selectarea'>" + e.replace("https://www.", "") + "</div>";
            boxDialog.open(o + "Link copied to your clipboard!", "&#128279; Mix link", [STR("bt.ok")], [])
        } else boxDialog.open(STR("pop.shareClipboard"), STR("pop.infoTitle"), [STR("bt.ok")], []);
        v(), unlock()
    }

    function v() {
        Spinner.reset(), unlock()
    }

    function b() {
        Spinner.reset(), unlock()
    }
}

function copyToClipboardElectron(e, o) {
    _electron.clipboard.writeText(e), o()
}

function sendFeedback() {
    saveGA("share", "click_feedback");
    var e = "feedback@incredibox.com",
        o = "App feedback (" + machine.deviceModel + ")",
        t = "<br><br>----------";
    if (t += "<br>From : " + ucwords(target) + " - " + ("undefined" != typeof app ? app.name + " - v" + app.version : "index"), t += "<br>Version : " + build.getInfo().version, t += "<br>DJ Name : " + user.djname, t += "<br>Guid : " + user.guid, t += "<br>Lang : " + user.lang + " (" + currentLanguage + ")", t += "<br>Machine : " + machine.uuid + (trustAppMobile ? " - " + device.serial : ""), t += "<br>Device : " + machine.deviceModel + " - " + screen.width + "x" + screen.height + " - " + (window.devicePixelRatio || 1), t += "<br>System : " + machine.osName + " - " + machine.osVersion + (appDesktop ? " - " + _electron.os.arch() : ""), t += "<br>WV : " + machine.browserFullVersion, t += "<br>Anime - Asset  : " + (isAnimeHD ? "HD" : "LD") + " - " + (isAssetHD ? "HD" : "LD"), t += "<br>Evt : " + evtClick, t += "<br>SpRate : " + (notnull(contextAudio) ? contextAudio.sampleRate + (notnull(contextAudio.baseLatency) ? " - " + contextAudio.baseLatency : "") : ""), trustAppMobile) t += "<br>----------", t += "<br>App.device : " + device.modelname + " - " + device.manufacturer, t += "<br>App.system : " + device.platform + " - " + device.version, window.plugins.socialsharing.shareViaEmail("<br><br><br><i>" + t + "</i>", o, e, null, null, []);
    else {
        t = t.replace(/<br>/g, "\r\n");
        var i = "mailto:" + e + "?subject=" + o + "&body=" + encodeURIComponent(t);
        appDesktop ? _electron.shell.openExternal(i) : window.location.href = i
    }
}
var systemLanguage, defaultLanguage = appSQ ? "fr" : appCN ? "zh-CN" : "en-US",
    currentLanguage = defaultLanguage,
    languageListe = {
        "en-US": "English",
        fr: "Français",
        es: "Español",
        "pt-BR": "Português",
        it: "Italiano",
        de: "Deutsch",
        no: "Norsk",
        pl: "Polski",
        ru: "Русский",
        ar: "العربية",
        tr: "Türkçe",
        ko: "한국어",
        ja: "日本語",
        "zh-CN": "简体中文",
        "zh-TW": "繁體中文",
        "hi-IN": "हिंदी",
        "bn-IN": "বাংলা",
        "ta-IN": "தமிழ்",
        "te-IN": "తెలుగు",
        th: "ไทย",
        vi: "Tiếng Việt",
        id: "Indonesia",
        ms: "Melayu"
    };

function checkLanguageCode(e) {
    var o = e.toLowerCase();
    return o.indexOf("en-") > -1 ? "en-US" : o.indexOf("pt-") > -1 ? "pt-BR" : o.indexOf("fr-") > -1 ? "fr" : o.indexOf("es-") > -1 ? "es" : o.indexOf("it-") > -1 ? "it" : o.indexOf("de-") > -1 ? "de" : "zh-hant" == o || "zh-hk" == o || "zh-tw" == o ? "zh-TW" : "zh-hans" == o || "zh-cn" == o ? "zh-CN" : "en" == o ? "en-US" : "pt" == o ? "pt-BR" : "zh" == o ? "zh-CN" : "hi" == o ? "hi-IN" : "bn" == o ? "bn-IN" : "ta" == o ? "ta-IN" : "te" == o ? "te-IN" : "nb" == o || "nn" == o ? "no" : e
}

function createBtLanguage() {
    var e = "";
    for (var o in languageListe) {
        e += '<div class="bt-mini soft" id="bt-lang-' + o + '"><div class="txt">' + languageListe[o] + '</div><div class="hitzone"></div></div>'
    }
    $("#pop-language .box-lang").append(e)
}

function debugLanguage() {
    document.addEventListener("keyup", function(e) {
        var o = e.key.toLowerCase();
        if ("a" == o || "z" == o) {
            var t = Object.keys(languageListe).indexOf(currentLanguage);
            "a" == o ? t-- : "z" == o && t++;
            var i = Object.keys(languageListe);
            t > i.length - 1 && (t = 0), t < 0 && (t = i.length - 1), loadLanguage(changeDomTxt, i[t])
        }
    })
}

function changeDomTxt() {
    var e = translateObj.trad;
    if ($("#pop-info .tab#tab-tuto").html(e.bt.tuto), $("#pop-info .tuto1 .txt").html(e.txt.tuto1), $("#pop-info .tuto2 .txt").html(e.txt.tuto2), $("#pop-info .tuto3 .txt").html(e.txt.tuto3), $("#pop-info .tuto4 .txt").html(e.txt.tuto4), $("#pop-info .tuto5 .txt").html(e.txt.tuto5), $("#pop-info .tab#tab-credit").html(e.bt.credit), $("#pop-info #pop-credit #copy").html(e.txt.copyright), $("#pop-info #pop-credit #team").html("<div class='box-team'>Allan Durand<br>Romain Delambily<br>Incredible Polo</div><div class='box-team'>" + e.txt.team + "</div>"), $("#pop-info #pop-credit .title").html(e.txt.stayTuned), $("#pop-info #pop-credit #bt-feedback .txt").html(e.bt.feedback), $("#pop-info #pop-credit #bt-rating .txt").html(e.bt.rate), $("#pop-info #pop-credit #bt-privacy .txt").html(e.bt.privacy), $("#pop-info .tab#tab-follow").html(e.bt.follow), $("#pop-info #pop-follow .title#git").html(e.bt.git), $("#pop-info #pop-follow .title#shop").html(e.txt.visitShop), $("#pop-param .tab#tab-language").html(e.txt.language), $("#pop-param .tab#tab-setting").html(e.bt.param), $("#pop-param #pop-setting #param-dark .label").html(e.txt.modeDark), $("#pop-param #pop-setting #param-safe .label").html(e.txt.modeSafe), $("#pop-param #pop-setting #param-reset .label").html(e.txt.resetBonus), $("#pop-param #pop-setting #param-reset .bt-mini .txt").html(e.bt.reset), $("#pop-param #pop-setting #param-recover .label").html(e.txt.recoverAllMix), $("#pop-param #pop-setting #param-recover .bt-mini .txt").html(e.bt.recover), $("#pp-box #bt-ppaccept .txt").html(e.bt.accept), $("#pp-box #bt-pprefuse .txt").html(e.bt.refuse), pageApp) {
        if ($("#home .bt#home-bt-switch .txt").html(e.bt.version), $("#home .bt#home-bt-list .txt").html(appBrowser ? e.bt.myMix : e.bt.mixList), $("#mixlist .tab#tab-mixlist .txt").html(e.bt.myMix), $("#mixlist .tab#tab-top50 .txt").html(e.bt.top50), $("#mixlist .tab#tab-latest .txt").html(e.bt.latest), $("#mixlist .tab#tab-search .txt").html(e.bt.search), $("#mixlist #searchbox #input-search").attr("placeholder", e.txt.inputSearch), $("#mixlist #searchbox #input-search").val(""), lastSearch = "", cleanListSearch(), $("#mixlist .tab-filter #bt-name .txt").html(e.bt.djname), $("#mixlist .tab-filter #bt-title .txt").html(e.bt.mixtitle), $("#mixlist .tab-filter #bt-dedi .txt").html(e.txt.dedicatedTo.split("%{name}").join("")), $("#mixlist .tab-filter #bt-day .txt").html(e.bt.day), $("#mixlist .tab-filter #bt-week .txt").html(e.bt.week), $("#mixlist .tab-filter #bt-month .txt").html(e.bt.month), $("#mixlist .tab-filter #bt-year .txt").html(e.bt.year), $("#mixlist .scroll:not(#list-mymix) .infoListmix").html(e.txt.top50Info), totalNumberMix > 0 ? $("#mixlist #list-latest .boxinfo").html(e.txt.latestMixInfo.replace("%{mix_total}", numberSpaced(totalNumberMix)).replace("%{version_name}", app.name)) : $("#mixlist #list-latest .boxinfo").html(e.txt.latestMixInfo.split("<br>")[0]), $("#mixlist #list-day .boxinfo").html(e.txt.top50Info), $("#mixlist #list-week .boxinfo").html(e.txt.top50Info), $("#mixlist #list-month .boxinfo").html(e.txt.top50Info), $("#mixlist #list-year .boxinfo").html(e.txt.top50Info), $("#mixlist .box-info .offline .txt").html(e.txt.offline), $("#watch-info #bt-save .txt").html(e.bt.save), $("#watch-info .offline .txt").html(e.txt.offline), notnull(localMixObject)) {
            var o = 0 == localMixObject.getMixlist().length ? STR("txt.mixlistEmpty") : STR("txt.mixlistInfo");
            $("#list-mymix .boxinfo", $poplist).html(o)
        }
        $("#watch-info .date, .box-info .date").each(function() {
            if ($(this).attr("data-date")) {
                var e = $(this).attr("data-date");
                $(this).html(getStringDate(e))
            }
        }), $("#pop-album .text").html(e.txt.prezAlbum), $("#pop-album #bt-album .txt").html(e.bt.listenAlbum), $("#pop-switch .title").html(e.txt.enjoyVersion), $("#game #box-bt1 #bt-stop .txt").html(e.bt.menuRestart), $("#game #box-bt1 #bt-random .txt").html(e.bt.menuRandom), $("#game #box-bt1 #bt-record .txt").html(e.bt.menuRecord)
    } else $("#page-splash #sp-baseline").html(STR("txt.baseline")), $("#page-splash #sp-text").html(STR("txt.useHeadphones")), $("#page-splash #sp-text").html(STR("txt.selectVersion"));
    notnull(boxPopup) && boxPopup.isOpen() && boxPopup.refresh()
}

function loadLanguage(e, o) {
    var t = notnull(o) && notnull(languageListe[o]) ? o : notnull(user.lang) && "" != user.lang ? user.lang : "" != machine.language ? machine.language : defaultLanguage;
    appBrowser && (t = null != getParameterByName("lang") ? getParameterByName("lang") : defaultLanguage), t = checkLanguageCode(t), isnull(languageListe[t]) && (t = defaultLanguage);
    $("#pop-language .box-lang .bt-mini#bt-lang-" + t).addClass("active");
    notnull(translateObj) && $("body").removeClass("lang-" + currentLanguage);
    var i = new XMLHttpRequest;

    function n() {
        return setUserInfo({
            lang: defaultLanguage
        }), boxDialog.open("Impossible to load language settings. Please reload or force to quit the app then retry.", "ERROR", ["Reload"], [gotoAppUrl], !0), removeFadeAll(), saveGA("language", "load_failed", t), !1
    }
    i.addEventListener("load", function() {
        translateObj = jsonDecode(this.responseText), setUserInfo({
            lang: currentLanguage = t
        }), $("body").addClass("lang-" + currentLanguage), isnull(e) || e();
        saveGA("language", "load_success", currentLanguage)
    }, !1), i.addEventListener("error", n, !1), i.addEventListener("abort", n, !1), i.open("GET", "./lang/" + t + ".json"), i.send()
}

function clickBtLang(e) {
    var o = $(e.currentTarget),
        t = o.attr("id").replace("bt-lang-", "");
    o.hasClass("active") || ($("#pop-language .box-lang .bt-mini").removeClass("active"), o.addClass("active"), loadLanguage(changeDomTxt, t))
}

function STR(e) {
    for (var o = e.split("."), t = translateObj.trad, i = 0, n = o.length; i < n; i++) {
        var a = o[i];
        if (!(a in t)) return;
        t = t[a]
    }
    return t
}
var CloudSync = function() {
        return this.sync = nada, this.save = nada, this.remove = nada, this
    },
    LocalStorage = function() {
        var e = this;
        return this.setItem = function(e, o) {
            window.localStorage.setItem(e, o)
        }, this.getItem = function(e) {
            return window.localStorage.getItem(e)
        }, this.getAllItem = function() {
            return window.localStorage
        }, this.removeItem = function(e) {
            window.localStorage.removeItem(e)
        }, this.clear = function() {
            window.localStorage.clear()
        }, this.weight = function() {
            var e, o, t = window.localStorage,
                i = 0,
                n = "LS | --------------------------\n";
            for (o in t) i += e = 2 * (t[o].length + o.length), n += "LS | " + o.substr(0, 50) + " = " + (e / 1024).toFixed(2) + " KB\n";
            return n += "LS | Total = " + (i / 1024).toFixed(2) + " KB\n", n += "LS | --------------------------"
        }, this.restoreUUID = function() {
            if (!appBrowser) {
                var o = e.getAllItem(),
                    t = getListUUID();
                for (var i in o)
                    if (-1 != i.indexOf("mix-")) {
                        var n = jsonDecode(o[i]);
                        notnull(n.uuid) && e.setItem("uuid-" + n.uuid)
                    } var a = getListUUID();
                uniqueBetweenArray(t, a).length > 0 && storage.removeItem("restore-all-mix")
            }
        }, this.restoreAllMix = function(o, t) {
            var i = t || nada;
            !0 === o && storage.removeItem("restore-all-mix"), !appBrowser && hasNetwork && isnull(storage.getItem("restore-all-mix")) && $.ajax({
                type: "POST",
                url: domainOnline + "ph2/get-all-mix-db.php",
                data: {
                    uuid: jsonEncode(getListUUID())
                },
                dataType: "json",
                crossdomain: !0,
                success: function(o) {
                    if ("success" == o.state) {
                        var t = o.list;
                        if (t.length > 0)
                            for (var n = 0, a = t.length; n < a; n++) {
                                var s = jsonDecode(t[n]);
                                s.online = !0, s.mymix = !0, localMixObject.saveMix(s)
                            }
                        i({
                            msg: "ok",
                            nb: t.length
                        }), e.setItem("restore-all-mix", "ok"), saveGA("mix", "get_all_db")
                    } else i({
                        msg: "bug"
                    }), saveGA("mix", "get_all_db_failed")
                },
                error: function(e) {
                    i({
                        msg: "error"
                    }), saveGA("mix", "get_all_db_error")
                }
            })
        }, this.init = function() {
            e.restoreUUID(), e.restoreAllMix()
        }, this
    },
    LocalMixObject = function() {
        var e = this;
        this.saveMix = function(e, o, t) {
            var i = !!notnull(o) && o,
                n = !notnull(t) || t;
            if (notnull(e)) {
                var a = -1 == e.link.indexOf("mix-") ? "mix-" + e.link : e.link;
                a = i ? a.replace("mix-", "fav-") : a;
                var s = jsonEncode(e);
                return storage.setItem(a, s), n && cloud.save(a, s), !0
            }
            return !1
        }, this.deleteMix = function(e) {
            return !!notnull(storage.getItem(e)) && (storage.removeItem(e), cloud.remove(e), !0)
        }, this.deleteMixById = function(o) {
            var t, i = e.getAllMix(!0),
                n = e.getAllMix(!0, !0);
            for (t in i) i[t].id == o && (e.deleteMix("mix-" + i[t].link), e.deleteMix("fav-" + i[t].link));
            for (t in n) n[t].id == o && (e.deleteMix("fav-" + n[t].link), e.deleteMix("mix-" + n[t].link))
        }, this.getMix = function(e) {
            return !!notnull(storage.getItem(e)) && jsonDecode(storage.getItem(e))
        }, this.getAllMix = function(e, o) {
            var t = !!notnull(e) && e,
                i = !!notnull(o) && o,
                n = [],
                a = storage.getAllItem(),
                s = i ? "fav-" : "mix-";
            for (var l in a) - 1 != l.indexOf(s) && (t && -1 == l.indexOf("v" + app.version) && -1 == l.indexOf("-IOSV" + app.version) || n.push(jsonDecode(a[l])));
            return n
        }, this.getMixlist = function() {
            var o = e.getAllMix(!0, !1);
            return e.sortArrayMix(o)
        }, this.getFavlist = function() {
            var o = e.getAllMix(!0, !0);
            return e.sortArrayMix(o)
        }, this.sortArrayMix = function(e, o) {
            return e.sort(function(e, o) {
                return o.date > e.date ? 1 : o.date < e.date ? -1 : 0
            }), !0 === o && (e = e.reverse()), e
        }, this.getLastMix = function() {
            var o = e.getAllMix(!1),
                t = o.length;
            return t > 0 ? o[t - 1] : null
        }, this.getLastDjName = function() {
            var o = e.getLastMix();
            return notnull(o) ? o.name : ""
        }, this.deleteAllMix = function() {
            var e = storage.getAllItem();
            for (var o in e) - 1 == o.indexOf("mix-") && -1 == o.indexOf("fav-") || storage.removeItem(o)
        }, this.getStatMixOnline = function(o) {
            for (var t = e.getMixlist(), i = t.length, n = [], a = 0; a < i; a++) {
                var s = t[a];
                s.online && notnull(s.id) && n.push(parseInt(s.id))
            }
            n.length > 0 ? xhr("POST", domainOnline + "ph2/get-stat-mix.php", {
                tabid: jsonEncode(n)
            }, function(t) {
                if ("success" == t.state) {
                    XHRmemotime.mymix = new Date;
                    for (var i = t.list, a = [], s = 0, l = i.length; s < l; s++) {
                        var r = jsonDecode(i[s]);
                        a.push(parseInt(r.id));
                        var c = e.getMix("mix-" + r.link);
                        c.id = r.id, c.newnbview = r.nbview, c.newnblike = r.nblike, e.saveMix(c)
                    }
                    if (a.length < n.length) {
                        var u = uniqueBetweenArray(a, n);
                        for (var p of u) e.deleteMixById(p)
                    }
                    void 0 !== o && o()
                }
            }, function(e) {}) : void 0 !== o && o()
        }, this.getStatFavOnline = function(o) {
            for (var t = e.getFavlist(), i = t.length, n = [], a = 0; a < i; a++) {
                var s = t[a];
                s.mymix && !s.online || !notnull(s.id) || n.push(parseInt(s.id))
            }
            n.length > 0 ? xhr("POST", domainOnline + "ph2/get-stat-mix.php", {
                tabid: jsonEncode(n)
            }, function(t) {
                if ("success" == t.state) {
                    XHRmemotime.myfav = new Date;
                    for (var i = t.list, a = [], s = 0, l = i.length; s < l; s++) {
                        var r = jsonDecode(i[s]);
                        a.push(parseInt(r.id));
                        var c = e.getMix("fav-" + r.link);
                        c.id = r.id, c.nbview = r.nbview, c.nblike = r.nblike, e.saveMix(c, !0)
                    }
                    if (a.length < n.length) {
                        var u = uniqueBetweenArray(a, n);
                        for (var p of u) e.deleteMixById(p)
                    }
                    void 0 !== o && o()
                }
            }, function(e) {}) : void 0 !== o && o()
        }
    },
    PoloObject = function(e, o, t, i, n, a) {
        this.sound = new SoundObject(t, "polo" + e);
        var s = this,
            l = $("#polo" + e, o).css({
                left: n + 20 + "px",
                top: a + "px"
            }),
            r = $('<div class="zone"><div class="loader"><div class="bar"></div></div></div>'),
            c = $(".loader", r),
            u = $(".bar", r),
            p = !1;
        $boxLoaderPolo.append(r), r.css({
            left: n + 20 + "px"
        });
        var d, f, m, h, v, b, x, g, k, C, D, y, w, P, S, T, A, B, F, M, L, E, I, R, O, H, N = e,
            j = i,
            W = "",
            z = "normal",
            G = !1,
            V = spritePolo,
            U = Ie,
            _ = .5,
            X = .3,
            Y = 0,
            q = !1,
            Q = "hd" == animeSize ? 2 : "mini" == animeSize ? .6 : 1,
            Z = "hd" == animeSize ? 2 : 1,
            K = 400 * Z,
            J = 40 * Z,
            ee = 60 * Z,
            oe = l.find(".ctrl");
        this.$btcMute = l.find(".icon-game-bt-mute"), this.$btcSolo = l.find(".icon-game-bt-solo"), this.$btcStop = l.find(".icon-game-bt-delete"), this.posX = n * Z, this.posY = K, this.pictoHoverId = null, this.reinit = function() {
            ae(), s.draw(), q = !1, s.pictoHoverId = null, v = b = x = g = k = C = D = 0, W = y = w = P = S = T = null, A = B = F = M = L = E = I = R = !1
        }, this.setPosition = function() {
            d = o.offset().left, f = o.offset().top, h = $incredibox.offset().top + ($incredibox.outerHeight() - 252) * stageScale, m = {
                px: l.offset().left,
                py: l.offset().top,
                width: l.outerWidth() * stageScale * poloScale,
                height: l.outerHeight() * stageScale * poloScale
            }
        }, this.getId = function() {
            return N
        }, this.getPicto = function() {
            return y
        }, this.getAssetId = function() {
            return w
        }, this.getMoment = function() {
            return k
        }, this.getLoop = function() {
            return C
        }, this.getEnabled = function() {
            return B
        }, this.getBusy = function() {
            return F
        }, this.getHover = function() {
            return q
        }, this.getMode = function() {
            return z
        }, this.getDeleting = function() {
            return L
        }, this.getPlaying = function() {
            return M
        }, this.getDiv = function() {
            return l
        }, this.getMute = function() {
            return E
        }, this.getHide = function() {
            return R
        }, this.getSolo = function() {
            return I
        }, this.setSolo = function(e) {
            (I = e) ? s.$btcSolo.addClass("light"): s.$btcSolo.removeClass("light")
        }, this.setLoop = function(e) {
            C = e
        }, this.setMoment = function(e) {
            k = e
        }, this.setPlaying = function(e) {
            M = e
        }, this.habiller = function(e, o, t, i, n) {
            s.checkState(), y = e, w = e.getId(), k = o, P = t.imgData, T = t.headHeight, S = t.imgSprite, W = t.color, D = P.length, F = !0, u.css({
                "background-color": "#" + W
            }), G ? s.mode("waiting") : (A = !0, TweenMax.delayedCall(i, function() {
                s.rebond(n)
            })), recordMix.xmlAction("append", s)
        }, this.checkState = function() {
            L && (G || (TweenMax.killTweensOf(s), s.remonte(0, !0, !1)))
        }, this.deshabiller = function(e, o) {
            A && (A = !1, TweenMax.killTweensOf(s.rebond), TweenMax.killTweensOf(s.rebond2)), L = !0, F = !1, y.desactiver(), y.checkusedTouchStart();
            s.posY;
            var t = o ? 0 : .3;
            TweenMax.to(s, t, {
                posY: K,
                ease: Quint.easeIn,
                onComplete: s.remonte,
                onCompleteParams: [0, !0, o],
                delay: e,
                overwrite: !0
            }), this.hideLoader(), recordMix.xmlAction("remove", s)
        }, this.baisser = function(e, o) {
            this.posY = K
        }, this.remonte = function(e, o, t) {
            if (G = !0, !0 === o) {
                var i = !modeReplay && !modeRandom && !modeWatch;
                y.reactiver(i), s.reinit(), majListPoloDrop()
            }
            s.mode("normal");
            var n = J + Math.round(Math.random() * ee),
                a = (s.posY, t ? 0 : .4),
                l = t ? 0 : e;
            TweenMax.to(s, a, {
                posY: n,
                ease: Back.easeOut,
                delay: l,
                onComplete: function() {
                    G = !1
                },
                overwrite: !0
            })
        }, this.rebond = function(e) {
            var o = s.posY - 20,
                t = M ? "anime" : "waiting",
                i = e ? 0 : .1;
            t = s.getMute() ? "mute" : t, s.mode(t), TweenMax.to(s, i, {
                posY: o,
                ease: Quint.easeOut,
                onComplete: s.rebond2,
                onCompleteParams: [e],
                overwrite: !0
            }), A = !1
        }, this.rebond2 = function(e) {
            var o = s.posY + 20,
                t = e ? 0 : .2;
            TweenMax.to(s, t, {
                posY: o,
                ease: Back.easeOut,
                overwrite: !0
            })
        }, this.showLoader = function() {
            p = !0, c.addClass("show"), u.css({
                "animation-duration": decimal(getRemainingTime() / 1e3, 2) + "s"
            }), u.addClass("progress")
        }, this.hideLoader = function() {
            p && (p = !1, c.removeClass("show"), u.removeClass("progress"))
        }, this.hideYourself = function() {
            (M || F) && (R = !0, Y = E ? 1 - X : Y, s.mode("hide"))
        }, this.stopHidingYourself = function() {
            (M || F) && s.mode("unhide")
        }, this.stopHidingYourselfComplete = function() {
            R = !1, E ? s.mode("mute") : M ? s.mode("anime") : s.mode("waiting")
        };
        var te = 0,
            ie = [],
            ne = [
                [0, 1, 2, 2, 1, 0],
                [0, 3, 4, 5, 6, 7, 8, 0],
                [0, 3, 4, 4, 3, 0],
                [0, 1, 2, 2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 1, 2, 2, 2, 2, 0],
                [0, 1, 2, 2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 2, 2, 9, 9, 9, 9, 2, 2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
                [0, 1, 2, 2, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 2, 2, 2, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 1, 2, 2, 10, 10, 10, 10, 10, 2, 2, 0]
            ];

        function ae() {
            var e = random(7) + 2;
            TweenMax.delayedCall(e, se)
        }

        function se() {
            O = getTime();
            var e = random(ne.length - 1);
            ie = ne[e], H = ie.length, te = H / (36 * H), s.mode("cligne")
        }
        var le = appDesktop ? 420 : 400,
            re = 164 * Z,
            ce = le * Z,
            ue = 164 * Q,
            pe = le * Q,
            de = 164 * Z,
            fe = 380 * Z,
            me = 164 * Q,
            he = 380 * Q,
            ve = 40,
            be = 492,
            xe = 0,
            ge = 97 * Z,
            ke = 164 * Z,
            $e = ve * Z,
            Ce = 164 * Q,
            De = ve * Q,
            ye = 450 * Q,
            we = 16 * Q,
            Pe = 16 * Z,
            Se = 7 * Z,
            Te = 54,
            Ae = 110,
            Be = 95,
            Fe = 110;

        function Me() {
            j.globalAlpha = 1, j.drawImage(V, 0, 0, ue, pe, s.posX, s.posY, re, ce)
        }

        function Le(e, o) {
            e *= Q, o *= Q, j.drawImage(V, e, o, Ce, De, s.posX, s.posY + ge, ke, $e)
        }

        function Ee() {
            j.globalAlpha = 1 - _, j.drawImage(V, ue, 0, ue, pe, s.posX, s.posY, re, ce)
        }

        function Ie() {
            Me(), Le(be, xe), Ee()
        }

        function Re() {
            j.globalAlpha = 1, j.drawImage(S, 0, 0, me, he, s.posX, s.posY, de, fe)
        }

        function Oe() {
            Re(), j.globalAlpha = 1 - X, j.drawImage(S, 2 * me, 0, me, he, s.posX, s.posY, de, fe)
        }

        function He() {
            Re(), Y = 1, j.globalAlpha = Y, j.drawImage(S, 2 * me, 0, me, he, s.posX, s.posY, de, fe)
        }

        function Ne() {
            Re();
            var e = E ? 1 - X : 0;
            Y = Y <= e ? e : decimal(Y - .1, 2), j.globalAlpha = Y, j.drawImage(S, 2 * me, 0, me, he, s.posX, s.posY, de, fe), Y <= e && s.stopHidingYourselfComplete()
        }

        function je() {
            A ? Ie() : (s.anime(), j.globalAlpha = 1, j.drawImage(S, me, 0, me, he, s.posX, s.posY, de, fe), j.drawImage(S, v, Math.ceil(b) + 1, me, Math.floor(T * Q) - 1, s.posX + x, Math.ceil(s.posY + g) + 1, de, Math.floor(T * Z) - 1))
        }

        function We() {
            var e = timenow - O,
                o = Math.floor(e * te);
            o = o > H - 1 ? H - 1 : o, Me(), Le(be, ie[o] * ve), Ee(), o >= H - 1 && s.mode("normal")
        }

        function ze() {
            if (L) je();
            else {
                Me();
                var e = s.getPupPos(Te, Ae),
                    o = s.getPupPos(Be, Fe);
                j.drawImage(V, 0, ye, we, we, e[0], e[1], Pe, Pe), j.drawImage(V, 0, ye, we, we, o[0], o[1], Pe, Pe), mouseY < f + s.posY + 50 ? Le(328, 120) : mouseY >= f + s.posY + 50 && mouseY < f + s.posY + 100 ? Le(328, 80) : mouseY >= f + s.posY + 180 ? Le(328, 40) : Le(328, 0)
            }
        }

        function Ge() {
            ze(), Ee()
        }

        function Ve() {
            ze()
        }
        this.mode = function(e) {
            if (e != z) switch (TweenMax.killTweensOf(se), z = e) {
                case "normal":
                    U = Ie, ae();
                    break;
                case "cligne":
                    U = We;
                    break;
                case "regarde":
                    U = Ge;
                    break;
                case "hover":
                    U = Ve;
                    break;
                case "waiting":
                    U = Re;
                    break;
                case "anime":
                    U = je;
                    break;
                case "mute":
                    U = Oe;
                    break;
                case "hide":
                    U = He;
                    break;
                case "unhide":
                    U = Ne
            }
        }, this.draw = function() {
            U()
        }, this.updateLoader = function() {}, this.anime = function() {
            var e = frame;
            boucleA && D == frameTotal && (e += frameHalf), v = P[e = e >= D - 1 ? D - 1 : e][0] * Q, b = P[e][1] * Q, x = P[e][2] * Z, g = P[e][3] * Z
        }, this.getPupPos = function(e, o) {
            var t = (mouseY - f) / stageScale,
                i = (mouseX - d) / stageScale / poloScale - e - this.posX / Z,
                n = t / poloScale - o - this.posY / Z,
                a = Math.atan2(n, i);
            return [Se * Math.cos(a) + (s.posX + e * Z), Se * Math.sin(a) + (s.posY + o * Z)]
        };
        var Ue = 0,
            _e = 0,
            Xe = isTouchCapable ? 60 * stageScale : 20,
            Ye = 0,
            qe = isTouchCapable ? 60 * stageScale : 20;

        function Qe(e) {
            notnull(e) && e.preventDefault(), I ? (1 == getTotalSolo() ? stopSoloPolo() : s.mute(), I = !1) : s.switchMute(), E || I || stopOtherSolo()
        }

        function Ze(e) {
            notnull(e) && e.preventDefault(), clickPolo(s)
        }

        function Ke(e) {
            notnull(e) && e.preventDefault(), I ? (I = !1, unmuteAll(s)) : (I = !0, muteAll(s))
        }
        this.activerClick = function() {
            B = !0, l.on(evtPress, s.touchStart), s.activerCtrl()
        }, this.desactiverClick = function() {
            B = !1, TweenMax.killTweensOf(s.touchLong), l.off(evtPress, s.touchStart), l.off(evtMove, s.touchMove), l.off(evtPressEnd, s.touchEnd), s.desactiverCtrl()
        }, this.touchStart = function(e) {
            e.preventDefault(), !1;
            var o = notnull((e = ~e.type.indexOf("touch") ? e.originalEvent : e).targetTouches) ? e.targetTouches[0] : e;
            Ue = _e = o.pageX, Ye = o.pageY, TweenMax.delayedCall(.25, s.touchLong, [e]), l.off(evtPress, s.touchStart), l.on(evtMove, s.touchMove), l.on(evtPressEnd, s.touchEnd)
        }, this.touchMove = function(e) {
            e.preventDefault();
            var o = notnull((e = ~e.type.indexOf("touch") ? e.originalEvent : e).targetTouches) ? e.targetTouches[0] : e;
            _e = o.pageX, o.pageY > Ye + qe && Math.abs(_e - Ue) < Xe && (TweenMax.killTweensOf(s.touchLong), clickPolo(s))
        }, this.touchLong = function(e) {
            e.preventDefault(), TweenMax.killTweensOf(s.touchLong), I = !0, soloPolo(), s.$btcSolo.addClass("light")
        }, this.touchEnd = function(e) {
            e.preventDefault(), !0, TweenMax.killTweensOf(s.touchLong), l.off(evtMove, s.touchMove), l.off(evtPressEnd, s.touchEnd), l.on(evtPress, s.touchStart), I ? (1 == getTotalSolo() ? stopSoloPolo() : s.mute(), I = !1, s.$btcSolo.removeClass("light")) : s.switchMute()
        }, this.activerCtrl = function() {
            isMouseDevice && !isTouchDevice && (oe.addClass("visible").on(evtPress, stopProp), s.$btcMute.on(evtClick, Qe), s.$btcSolo.on(evtClick, Ke), s.$btcStop.on(evtClick, Ze))
        }, this.desactiverCtrl = function() {
            isMouseDevice && !isTouchDevice && (oe.removeClass("visible").off(), s.$btcMute.off().removeClass("light"), s.$btcSolo.off().removeClass("light"), s.$btcStop.off().removeClass("light"))
        }, this.playSound = function() {
            M = !0, this.sound.play(), C++
        }, this.stopSound = function(e) {
            M = !1, this.sound.stop(e)
        }, this.mute = function() {
            E = !0, R || (s.mode("mute"), s.$btcMute.addClass("light")), s.sound.mute(), recordMix.xmlAction("mute", s)
        }, this.unmute = function() {
            E = !1, R || (M ? this.mode("anime") : this.mode("waiting"), s.$btcMute.removeClass("light")), this.sound.unmute(), recordMix.xmlAction("unmute", s)
        }, this.switchMute = function() {
            E ? s.unmute() : s.mute()
        }, this.hitTest = function(e, o) {
            var t = e / stageScale,
                i = o / stageScale;
            return t > m.px && t < m.px + m.width && i > m.py && i < h
        }, this.hitTestPicto = function(e) {
            if (!F && !L) {
                var o = e.getBound();
                return s.hitTest(Math.round(o.px * stageScale), Math.round(o.py * stageScale))
            }
            return !1
        }, this.rollover = function() {
            q || (q = !0, s.mode("hover"))
        }, this.rollout = function(e) {
            !!notnull(e) && e ? (q = !1, s.mode("normal")) : q && (q = !1, s.mode("regarde"))
        }, this.setPosition(), this.reinit()
    },
    PictoObject = function(e, o) {
        var t, i, n, a = this,
            s = e,
            l = $("#picto" + s, o),
            r = $(".scale", l),
            c = !1,
            u = l.innerWidth(),
            p = 0,
            d = isMobile ? 1.1 : 1.2,
            f = 0,
            m = {
                px: 0,
                py: 0
            };
        this.getDiv = function() {
            return l
        }, this.getId = function() {
            return s
        }, this.getColor = function() {}, this.use = !1, this.polo = null, this.init = function(e, o) {
            f = -s * u, l.css({
                top: o + "px",
                left: e + "px"
            }), r.css({
                "background-position": String(f) + "px 0px"
            }), a.setPosition()
        }, this.setPosition = function() {
            l.parent().offset().top, l.parent().offset().left, i = l.offset().left, n = l.offset().top
        }, this.getBound = function() {
            return m
        }, this.activer = function() {
            a.desactiver(), l.on(evtPress, a.touchStart)
        }, this.desactiver = function() {
            l.off(), notnull(t) && (t.off(evtMove, a.touchMove), t.off(evtPressEnd, a.touchEnd), t.off(evtPressEnd, a.usedTouchEnd))
        }, this.touchStart = function(e) {
            e.preventDefault(), c || (isMouseDevice && !isTouchDevice && $(".polo").addClass("noPointerEvents"), c = !0, l.off(), (t = ~e.type.indexOf("touch") ? l : $body).on(evtMove, a.touchMove), t.on(evtPressEnd, a.touchEnd), l.removeClass("flashme"), l.addClass("drag"), a.touchMove(e), pictoOnDrag(a))
        }, this.touchMove = function(e) {
            e.preventDefault();
            var o = notnull((e = ~e.type.indexOf("touch") ? e.originalEvent : e).targetTouches) ? e.targetTouches[0] : e;
            a.bouger(o.pageX, o.pageY), e.preventDefault(), pictoOnMove(a)
        }, this.touchEnd = function(e) {
            e.preventDefault(), isMouseDevice && !isTouchDevice && $(".polo").removeClass("noPointerEvents"), a.stopDrag(), pictoOnDrop(a)
        }, this.stopDrag = function() {
            c = !1, t.off(evtMove, a.touchMove), t.off(evtPressEnd, a.touchEnd), l.removeClass("drag")
        }, this.bouger = function(e, o) {
            m = {
                px: e,
                py: o
            };
            var t = (e - i) / stageScale,
                a = (o - n) / stageScale;
            t -= u / 2 * pictoScale, a -= u / d * pictoScale, t /= pictoScale, a /= pictoScale, l.css({
                transform: "translate3d(" + t + "px, " + a + "px, 0px)"
            })
        }, this.replacer = function() {
            c && a.stopDrag(), l.addClass("replacer").one(animationEnd, a.replacerFini)
        }, this.absorber = function(e) {
            l.css({
                transform: "translate3d(0px, 0px, 0px)"
            }), r.css({
                "background-position": String(f) + "px -68px"
            }), l.removeClass("replacer"), l.addClass("griser"), a.use = !0, a.polo = e, l.off().on(evtPress, a.usedTouchStart)
        }, this.reactiver = function(e) {
            var o = !!notnull(e) && e;
            r.css({
                "background-position": String(f) + "px 0px"
            }), l.removeClass("griser"), !o || modeRandom || modeReplay ? a.replacerFini() : l.addClass("flashme").one(animationEnd, function(e) {
                $(e.target).removeClass("flashme"), a.replacerFini()
            })
        }, this.replacerFini = function() {
            l.removeClass("replacer"), l.css({
                transform: "translate3d(0px ,0px, 0px)"
            }), a.use = !1, a.activer()
        }, this.usedTouchStart = function(e) {
            e.preventDefault(), p = getTime(), showPoloInArray([a.polo.getId()]), t.on(evtPressEnd, a.usedTouchEnd)
        }, this.usedTouchEnd = function(e) {
            e.preventDefault(), t.off(evtPressEnd, a.usedTouchEnd), stopShowingPoloInArray(p), p = 0
        }, this.checkusedTouchStart = function() {
            0 != p && a.usedTouchEnd()
        }
    },
    BonusObject = function(e, o, t, i) {
        var n, a = this,
            s = o,
            l = e + 1,
            r = $("#bt-bonus-" + l),
            c = r.find(".quarter"),
            u = $(".circle", r),
            p = $("#box-video .video#video" + l),
            d = $("#box-video .video#video" + l + " video")[0],
            f = !1,
            m = !1,
            h = !1,
            v = new SoundObject(t, "bonus" + l),
            b = new SoundObject(t, "aspire" + l),
            x = new SoundObject(t, "expire" + l),
            g = i.snd,
            k = i.aspire,
            C = i.expire,
            D = numberArray(s.code.split(",")),
            y = D.length,
            w = [],
            P = 0,
            S = 0;
        this.tabSVG = w, this.video = d, this.found = !1, this.unlock = !1, a.cntCode = 0, this.init = function() {
            var e = storage.getItem("v" + appVersion + "-bonus-complete") || 0;
            a.getId() <= e && a.unlockme();
            for (var o = 0; o < y; o++) {
                var t = {
                    obj: $(".svg.q" + (o + 1), c),
                    col: $(".svg.q" + (o + 1) + " svg", c).css("fill")
                };
                w.push(t)
            }
            a.modeTouch()
        }, this.reinit = function() {
            a.hideLoader(), r.removeClass("inprogress found bounce"), c.find(".svg").removeClass("directshow show hide"), a.found = !1, a.inprogress = !1, a.cntCode = 0, a.modeTouch()
        }, this.modeTouch = function() {
            r.off().on(evtPress, a.touchStart)
        }, this.modeClick = function() {
            r.off().on("click", a.launchVideo)
        }, this.unlockme = function() {
            r.addClass("unlock"), this.unlock = !0
        }, this.getId = function() {
            return l - 1
        }, this.getCode = function() {
            return D
        };
        var T = $('<div class="zone"><div class="loader"><div class="bar"></div></div></div>'),
            A = $(".loader", T),
            B = $(".bar", T),
            F = !1;
        $boxLoaderBonus.append(T), this.showLoader = function() {
            F = !0, A.addClass("show"), B.css({
                "animation-duration": decimal(getRemainingTimeBeforeBonus() / 1e3, 2) + "s"
            }), B.addClass("progress")
        }, this.hideLoader = function() {
            F && (F = !1, A.removeClass("show"), B.removeClass("progress"))
        };
        var M = new ClockObject("canvas-bt-bonus-" + l);
        M.init(43, 43, 1, 35, 16), this.playAspiration = function(e) {
            e = notnull(e) ? e : 0, b.prepare(k, 0), b.play(e, !0), h = !0
        }, this.stopAspiration = function() {
            h && (b.stop(), h = !1)
        }, this.playExpiration = function() {
            x.prepare(C, 1), x.play(0, !0)
        }, this.stopExpiration = function() {
            x.stop()
        }, this.hasCode = function(e) {
            return -1 != D.indexOf(e)
        }, this.checkCode = function(e, o) {
            var t = D.indexOf(e);
            t > -1 && (o ? a.showQuarter(t) : a.hideQuarter(t))
        }, this.showQuarter = function(e) {
            a.cntCode++;
            var o = w[e].obj,
                t = w[e].col;
            a.cntCode == y && a.unlock && a.hasBeenFound(), 1 == a.cntCode && (a.inprogress = !0, r.addClass("inprogress")), u.addClass("show").one(animationEnd, function(e) {
                $(e.target).removeClass("show")
            }), u.css({
                "border-color": t
            }), o.removeClass("hide").addClass("directshow show")
        }, this.hideQuarter = function(e) {
            var o = w[e].obj;
            a.unlock ? o.addClass("hide").one(animationEnd, function(e) {
                $(e.target).removeClass("directshow show hide")
            }) : o.removeClass("directshow show hide"), a.cntCode == y && (cancelClickBtBonus(), this.notFoundAnymore()), a.cntCode--, a.cntCode < 0 && (a.cntCode = 0), 0 == a.cntCode && (a.inprogress = !1, r.removeClass("inprogress"))
        }, this.hideClock = function() {
            M.stop(!0)
        }, this.render = function(e) {
            M.render()
        }, this.hasBeenFound = function() {
            modeReplay || (r.addClass("found bounce"), popupBonusUnlocked()), a.modeClick(), a.found = !0
        }, this.notFoundAnymore = function() {
            modeReplay || r.removeClass("found bounce"), a.found = !1, a.hideClock(), a.hideLoader(), a.modeTouch()
        }, this.touchStart = function(e) {
            e.preventDefault(), a.unlock ? bonusPlaying || ((n = ~e.type.indexOf("touch") ? r : $body).on(evtPressEnd, a.touchEnd), P = getTime(), showPoloAndPictoInCombo(l)) : popupFindPreviousBonus()
        }, this.touchEnd = function(e) {
            e.preventDefault(), n.off(evtPressEnd, a.touchEnd), stopShowingPoloInArray(P)
        }, this.launchVideo = function() {
            if (!bonusWaiting && !bonusPlaying) {
                var e = !app.bonusloopA || boucleA;
                !modeWatch && getRemainingTime() < 500 && e || (m = !0, a.modeTouch(), a.showLoader(), recordMix.xmlAction("bonus", a), clickBtBonus(l), r.removeClass("bounce"), u.addClass("showCircle").one(animationEnd, function(e) {
                    $(e.target).removeClass("showCircle")
                }), a.prepareVideo(1))
            }
        }, this.prepareVideo = function(e) {
            0,
            S = app.looptime * (e - 1) / 1e3,
            d.currentTime = S
        }, this.videoPlaying = function() {}, this.videoEnded = function() {}, this.loopAtFirstFrame = function() {
            0,
            d.currentTime = S
        }, this.checkCurrentTime = function() {}, this.play = function() {
            d.play(), m = !1, f = !0, h = !1, d.currentTime = S, r.addClass("playing"), a.hideLoader(), M.start(loopDuration * app.nbloopbonus, !1), v.prepare(g), v.play(S), p.addClass("show")
        }, this.stop = function(e) {
            r.removeClass("playing"), loopOn && a.found && a.modeClick(), f && (v.stop(), M.stop(!0)), a.stopAspiration(), m = !1, f = !1, p.removeClass("show")
        }, this.pause = function() {
            m && d.pause(), f && (d.pause(), v.pause()), h && b.pause(), M.pause()
        }, this.resume = function() {
            m && d.play(), f && (d.play(), v.unpause()), h && b.unpause(), M.resume()
        }, this.init()
    },
    SoundObject = function(e, o) {
        var t, i, n, a, s, l = this,
            r = e,
            c = null,
            u = null,
            p = null,
            d = !1,
            f = !1,
            m = isIOS,
            h = !1,
            v = !1,
            b = m ? 0 : 1e-4,
            x = debugMute ? b : 1;
        this.getMute = function() {
            return d
        }, this.getDuration = function() {
            return null != u ? u.duration : 0
        }, this.getCurrentTime = function() {
            return null != c && null != c.context ? c.context.currentTime : 0
        }, this.setSilence = function() {
            x = b, v = !0
        }, this.setVolume = function(e) {
            m ? t.gain.value = e : t.gain.setValueAtTime(e, r.currentTime)
        }, this.onComplete = function(e) {
            c.onended = e, p = e
        }, this.prepare = function(e, o) {
            u = e, (c = (r = contextAudio).createBufferSource()).buffer = u, u.duration, t = r.createGain();
            var i = 0 == o || d || v ? b : x;
            l.setVolume(i), c.connect(t), t.connect(r.destination)
        }, this.play = function(e, o) {
            h = !0, i = getTime(), a = (a = (a = decimal(e, 3) || 0) > l.getDuration() ? decimal(l.getDuration(), 2) - .01 : a) < 0 ? 0 : a, c.start(0, a), !0 !== o || d || v || l.fadeIn()
        }, this.stop = function(e) {
            !0 === e || null === c || !h || v || d ? l.stopSource() : l.fadeOut(!0)
        }, this.stopSource = function() {
            clearInterval(s), null != c && h && (isIOS && iosVersionNumber < 103 ? c.noteOff(0) : c.stop(0), c.onended = null), c = null, t = null, f || (d = !1, i = 0, n = 0, a = 0, p = null, h = !1)
        }, this.fadeOut = function(e) {
            var o = !0 === e;
            m ? (clearInterval(s), s = setInterval(function() {
                var e = decimal(t.gain.value - .15, 1);
                e = e <= b ? b : e, t.gain.value = e, e <= b && (clearInterval(s), o && l.stopSource())
            }, 10)) : (t.gain.setValueAtTime(t.gain.value, r.currentTime), t.gain.exponentialRampToValueAtTime(b, r.currentTime + .025), o && (c.stop(r.currentTime + .025), c.onended = l.stopSource))
        }, this.fadeIn = function() {
            m ? (clearInterval(s), s = setInterval(function() {
                var e = decimal(t.gain.value + .15, 1);
                e = e >= x ? x : e, t.gain.value = e, e >= x && clearInterval(s)
            }, 10)) : (t.gain.setValueAtTime(t.gain.value, r.currentTime), t.gain.exponentialRampToValueAtTime(x, r.currentTime + .025))
        }, this.mute = function() {
            null == c || v || l.fadeOut(), d = !0
        }, this.unmute = function() {
            null == c || v || l.fadeIn(), d = !1
        }, this.pause = function() {
            f = !0, n = getTime(), l.stop()
        }, this.unpause = function() {
            if (f = !1, this.prepare(u, 0), null != c && (notnull(p) && (c.onended = p), h)) {
                var e = n - i;
                e = e < 0 ? 0 : e, l.play(a + e / 1e3, !0)
            }
        }
    },
    ClockObject = function(e) {
        var o, t, i, n, a, s, l, r, c, u, p, d = $("#" + e)[0].getContext("2d"),
            f = 2 * Math.PI,
            m = Math.PI / 2,
            h = !1,
            v = !1,
            b = 0;
        this.start = function(e, o) {
            l = isDarkMode() ? "#CCCCCC" : "#5A5A5A", d.strokeStyle = l, h = !0, v = !1, p = o, u = 100 / e, c = getTime()
        }, this.stop = function(e) {
            h = !1, e ? d.clearRect(t - a - s / 2, i - a - s / 2, 2 * a + s, 2 * a + s) : (v = !0, o = p ? 0 : 1)
        }, this.pause = function() {
            b = getTime()
        }, this.resume = function() {
            var e = getTime() - b;
            c += e
        }, this.render = function() {
            if (h || v) {
                if (h) {
                    var e = getTime() - c;
                    r = e * u / 100
                } else v && (r += .2 * (o - r));
                r < .001 && (r = .001), r > .999 && (r = .999);
                var n = p ? -m : f * r - m,
                    l = p ? f * r - m : -m;
                d.clearRect(t - a - s / 2, i - a - s / 2, 2 * a + s, 2 * a + s), d.beginPath(), d.arc(t, i, a, n, l, !1), d.stroke(), v && (.001 != r && .999 != r || (v = !1, d.clearRect(t - a - s / 2, i - a - s / 2, 2 * a + s, 2 * a + s)))
            }
        };
        this.checkAtEnd = function() {
            !0
        }, this.init = function(e, o, r, c, u, p) {
            t = void 0 == e ? 0 : e, i = void 0 == o ? 0 : o, n = void 0 == r ? 1 : r, a = void 0 == c ? 18 : c, s = void 0 == u ? 6 : u, l = void 0 == p ? "#FFFFFF" : p, d.lineWidth = s, d.strokeStyle = l, d.globalAlpha = n
        }
    },
    ReadingBar = function(e, o, t) {
        var i, n = this,
            a = $(e),
            s = $("#reading-buffer", a),
            l = $cntRecord.find("#t-spent"),
            r = $cntRecord.find("#t-duration"),
            c = "00:00",
            u = !1,
            p = 0,
            d = "record",
            f = secToText(app.looptime * app.recmaxloop),
            m = 0,
            h = 0;
        this.minLoop = o, this.maxLoop = t, this.maxTime = 0, this.cntLoop = 0, this.bonusList = [], this.isFinished = function() {
            return this.cntLoop == this.maxLoop
        }, this.isLastLoop = function() {
            return this.cntLoop + 1 == this.maxLoop
        }, this.open = function(e, o) {
            return d = e, n.createRecordBlock(o), n.cntLoop = 0, n.maxTime = "record" == d ? f : secToText(n.maxLoop * app.looptime), s.css({
                transform: "scaleX(0)"
            }), c = "00:00", l.text(c), r.text(" / " + n.maxTime), m = 0, h = 100 / readingBar.maxLoop, a.addClass("open"), $cntRecord.addClass("fadeIn"), n
        }, this.close = function() {
            return removeTransition(a, "open", "transform", function() {
                s.removeClass("progress"), $("#reading-marker").empty(), $("#reading-marker-bonus").empty(), n.bonusList = []
            }), $cntRecord.removeClass("fadeIn cssdelay"), n
        }, this.start = function() {
            return u = !0, n.cntLoop = 0, p = 0, "record" == d ? recordMix.start() : replayMix.start(), n.render(), m = Math.floor(p + i) / n.maxLoop, s.css({
                transform: "scaleX(" + m / 100 + ")",
                "animation-duration": decimal(n.maxLoop * app.looptime / 1e3, 2) + "s"
            }), s.addClass("progress"), n
        }, this.stop = function() {
            return u = !1, "record" == d ? recordMix.stop() : replayMix.stop(), n
        }, this.froze = function() {
            s.addClass("froze")
        }, this.seek = function(e) {
            n.cntLoop = e, s.removeClass("progress"), resetAnimationCSS(s[0]), s.css({
                transform: "scaleX(" + h * n.cntLoop / 100 + ")"
            }), n.render()
        }, this.unfroze = function() {
            s.css({
                transform: "scaleX(" + h * n.cntLoop / 100 + ")",
                "animation-duration": decimal((n.maxLoop - n.cntLoop) * app.looptime / 1e3, 2) + "s"
            }), s.removeClass("froze").addClass("progress")
        }, this.openBig = function() {
            a.addClass("seeking")
        }, this.openNormal = function() {
            a.removeClass("seeking")
        }, this.loop = function() {
            return n.cntLoop++, p += i, n.isFinished() ? "record" == d ? stopRecordMode() : stopReplayMode() : "record" == d ? recordMix.loop() : replayMix.loop(), n
        }, this.render = function() {
            if (u) {
                i = pctMetronome;
                var e = secToText(getTimeSpent() + loopDuration * n.cntLoop);
                c != e && (c = e, l.text(c))
            }
        }, this.createRecordBlock = function(e) {
            var o = "record" == d ? "#D20A0A" : isMiniPlayer ? "#2C86FE" : "#36B460",
                t = "record" == d ? decimal(n.minLoop / n.maxLoop, 2) : 0;
            if ($("#reading-block", a).css({
                    transform: "scale(" + t + ", 1)"
                }), $($cntRecord).css({
                    color: o
                }), s.css({
                    "background-color": o
                }), !0 === e) {
                var i = "",
                    l = parseFloat($incredibox.css("width")) / n.maxLoop,
                    r = 0;
                for (r = 0; r < n.maxLoop; r++) {
                    i += "<div class='marker' style='left:" + l * r + "px'></div>"
                }
                for ($("#reading-marker").html(i), i = "", "", r = 0; r < n.bonusList.length; r++) {
                    i += "<div class='marker' style='left:" + l * n.bonusList[r].loopIndex + "px; width:" + l + "px'></div>"
                }
                $("#reading-marker-bonus").html(i)
            }
        }, this.createRecordBlock()
    },
    RenderRAF = function(e, o) {
        var t, i, n = e || -1,
            a = o || function() {},
            s = !1;

        function l() {
            if (s) return !1;
            t = requestAnimationFrame(l), a()
        }
        this.start = function(e) {
            s = !1, 0, 1e3 / (n = e || n), i = Date.now(), i, l()
        }, this.stop = function() {
            s = !0, cancelAnimationFrame(t)
        }
    },
    Spinner = {
        $bt: null,
        $svg: null,
        xlink: "",
        add: function(e) {
            notnull(e) && (this.$bt = e, this.$svg = this.$bt.find("svg use"), this.$svg.length > 0 && (this.xlink = this.$svg.attr("xlink:href"), this.$svg.attr("xlink:href", "#ic-loader")), this.$bt.addClass("spin"))
        },
        reset: function() {
            notnull(this.$bt) && this.$bt.removeClass("spin"), notnull(this.$svg) && this.$svg.length > 0 && this.$svg.attr("xlink:href", this.xlink), this.$bt = null, this.$svg = null, this.xlink = ""
        }
    };

function CanvasObj(e) {
    var o, t = this;
    return this.id = e, this.div = document.getElementById(e), this.context = this.div.getContext("2d"), this.width = this.div.offsetWidth, this.height = this.div.offsetHeight, this.saveImage = function() {
        o = t.context.getImageData(0, 0, t.width, t.height)
    }, this.showImage = function() {
        t.clear(), t.context.putImageData(o, 0, 0)
    }, this.clear = function() {
        t.context.clearRect(0, 0, t.width, t.height)
    }, this
}

function estimateSpeed() {}
var $focused, $visibleScroll, focusList = [],
    focusPos = -1,
    focusHistory = [];

function initFocusEvent() {
    appBrowserExpo || (document.addEventListener("keydown", keyDown, !1), $(document).on(evtPress, removeFocus))
}

function killFocusEvent() {
    appBrowserExpo || (document.removeEventListener("keydown", keyDown, !1), $(document).off(evtPress, removeFocus))
}

function keyDown(e) {
    var o = e.key.toLowerCase();
    e.shiftKey && 9 == e.keyCode || (9 == e.keyCode && e.preventDefault(), 27 == e.keyCode && e.preventDefault(), 38 == e.keyCode && e.preventDefault(), 40 == e.keyCode && e.preventDefault(), $("input").is(":focus") || (13 == e.keyCode && e.preventDefault(), 37 == e.keyCode && e.preventDefault(), 39 == e.keyCode && e.preventDefault()), hitKey(o))
}

function nextFocus() {
    if (focusPos++, "playlist-boxline" == focusHistory[focusHistory.length - 1]) {
        focusPos = focusPos > focusList.length - 1 ? focusList.length - 1 : focusPos;
        var e = $visibleScroll.find(".line.focused").index();
        e > 0 && $visibleScroll[0].scroll({
            top: 116 * e,
            left: 0,
            behavior: "smooth"
        })
    } else focusPos = focusPos > focusList.length - 1 ? 0 : focusPos;
    addFocus()
}

function prevFocus() {
    if (focusPos--, "playlist-boxline" == focusHistory[focusHistory.length - 1]) {
        focusPos = focusPos < 0 ? 0 : focusPos;
        var e = $visibleScroll.find(".line.focused").index();
        e > 0 && $visibleScroll[0].scroll({
            top: 116 * e - 232,
            left: 0,
            behavior: "smooth"
        })
    } else focusPos = focusPos < 0 ? focusList.length - 1 : focusPos;
    addFocus()
}

function addFocus(e) {
    notnull($focused) && ($focused.removeClass("focused"), $focused = null), notnull(e) && (focusPos = e), focusList.length > 0 && ($focused = focusList[focusPos].toFocus).addClass("focused")
}

function removeFocus() {
    notnull($focused) && ($focused.removeClass("focused"), $focused = null, focusPos = -1)
}

function enterFocus() {
    notnull($focused) && (notnull(focusList[focusPos].onEnter) ? focusList[focusPos].onEnter() : notnull(focusList[focusPos].toClick) ? focusList[focusPos].toClick.trigger(evtClick.split(" ")[0]) : focusList[focusPos].toFocus.trigger(evtClick.split(" ")[0]))
}

function deleteFocus() {
    if ("popup-menu-exit" == focusHistory[focusHistory.length - 1]) return !1;
    notnull($focused) && ($focused.removeClass("focused"), $focused = null), focusList = [], focusPos = -1
}

function hitKey(e) {
    switch (e) {
        case "tab":
            $("input").is(":focus") && blurAll(), nextFocus();
            break;
        case "enter":
            if (isnull($focused) && "pop-safe-code" == focusHistory[focusHistory.length - 1]) return focusList[10].toFocus.trigger(evtClick.split(" ")[0]), !1;
            $("input").hasClass("focused") && $("input").is(":focus") && (blurAll(), nextFocus()), enterFocus();
            break;
        case "escape":
            if ($("input").is(":focus")) return blurAll(), !1;
            if (appDesktop) return removeFocus(), boxMenu.isOpen() ? (boxMenu.close(), !1) : (popupMenuExit(), !1);
            if (notnull($focused)) return removeFocus(), !1;
            if (pageApp && pause) return !1;
            if (boxDialog.isOpen()) return !1;
            if (pageApp && $lockAll.hasClass("show")) return !1;
            if ("pop-safe-code" == focusHistory[focusHistory.length - 1]) return boxPopup.close(), !1;
            if ("popup-album" == focusHistory[focusHistory.length - 1]) return boxAlbum.close(), !1;
            if ("popup-switch" == focusHistory[focusHistory.length - 1]) return boxSwitch.close(), !1;
            if (boxInfo.isOpen()) return "popup-info" == focusHistory[focusHistory.length - 1] ? boxInfo.close() : createFocus("popup-info", 0), !1;
            if (boxParam.isOpen()) return "popup-param" == focusHistory[focusHistory.length - 1] ? boxParam.close() : createFocus("popup-param", 0), !1;
            if (pageApp && boxPopup.isOpen()) return boxPopup.$popup.hasClass("action") || boxPopup.$popup.hasClass("action-back") ? boxPopup.$popup.find("span.icon").trigger(evtClick.split(" ")[0]) : boxPopup.close(), !1;
            if (pageApp && $mixlist.isOpen()) {
                if ("playlist-line-open" == focusHistory[focusHistory.length - 1]) return $lineOpened.trigger(evtPress.split(" ")[0]).trigger(evtPressEnd.split(" ")[0]), !1;
                if ("playlist-boxline" == focusHistory[focusHistory.length - 1]) return createFocus("popup-playlist", 0), !1;
                if ("playlist-boxfilter" == focusHistory[focusHistory.length - 1]) return createFocus("popup-playlist", 0), !1;
                if ("popup-playlist" == focusHistory[focusHistory.length - 1]) return closePlaylist(), !1
            }
            break;
        case " ":
            !(pageApp && onGame && loopOn) || $lockAll.hasClass("show") || void 0 !== boxMenu && boxMenu.isOpen() || $btClock.trigger(evtClick.split(" ")[0]);
            break;
        case "arrowright":
            $("input").is(":focus") || nextFocus();
            break;
        case "arrowleft":
            $("input").is(":focus") || prevFocus();
            break;
        case "arrowdown":
            $("input").is(":focus") || nextFocus();
            break;
        case "arrowup":
            $("input").is(":focus") || prevFocus();
            break;
        case "1":
            "pop-safe-code" == focusHistory[focusHistory.length - 1] && focusList[0].toFocus.trigger(evtClick.split(" ")[0]);
            break;
        case "2":
            "pop-safe-code" == focusHistory[focusHistory.length - 1] && focusList[1].toFocus.trigger(evtClick.split(" ")[0]);
            break;
        case "3":
            "pop-safe-code" == focusHistory[focusHistory.length - 1] && focusList[2].toFocus.trigger(evtClick.split(" ")[0]);
            break;
        case "4":
            "pop-safe-code" == focusHistory[focusHistory.length - 1] && focusList[3].toFocus.trigger(evtClick.split(" ")[0]);
            break;
        case "5":
            "pop-safe-code" == focusHistory[focusHistory.length - 1] && focusList[4].toFocus.trigger(evtClick.split(" ")[0]);
            break;
        case "6":
            "pop-safe-code" == focusHistory[focusHistory.length - 1] && focusList[5].toFocus.trigger(evtClick.split(" ")[0]);
            break;
        case "7":
            "pop-safe-code" == focusHistory[focusHistory.length - 1] && focusList[6].toFocus.trigger(evtClick.split(" ")[0]);
            break;
        case "8":
            "pop-safe-code" == focusHistory[focusHistory.length - 1] && focusList[7].toFocus.trigger(evtClick.split(" ")[0]);
            break;
        case "9":
            "pop-safe-code" == focusHistory[focusHistory.length - 1] && focusList[8].toFocus.trigger(evtClick.split(" ")[0]);
            break;
        case "0":
            "pop-safe-code" == focusHistory[focusHistory.length - 1] && focusList[9].toFocus.trigger(evtClick.split(" ")[0]);
            break;
        case "backspace":
            "pop-safe-code" == focusHistory[focusHistory.length - 1] && boxPopup.$popup.find(".text").text("_ _ _ _")
    }
}

function createFocus(e, o, t) {
    if (appDesktop && boxMenu.isOpen() && "popup-menu-exit" != e) return removeInArray("popup-menu-exit", focusHistory), focusHistory.push(e), focusHistory.push("popup-menu-exit"), !1;
    if (boxDialog.isOpen() && "popup-dialog" != e) return removeInArray("popup-dialog", focusHistory), focusHistory.push(e), focusHistory.push("popup-dialog"), !1;
    if (deleteFocus(), appDesktop && "popup-menu-exit" == e && (boxMenu.$popup.find(".bt-mini").each(function(e) {
            focusList.push({
                toFocus: $(this)
            })
        }), focusList.push({
            toFocus: boxMenu.$popup.find("span.icon")
        })), pageApp && "home" == e && ($homeBtAlbum.length > 0 && focusList.push({
            toFocus: $homeBtAlbum.find(".bck"),
            toClick: $homeBtAlbum
        }), focusList.push({
            toFocus: $homeBtInfo.find(".bck"),
            toClick: $homeBtInfo
        }), focusList.push({
            toFocus: $homeBtParam.find(".bck"),
            toClick: $homeBtParam
        }), focusList.push({
            toFocus: $homeBtSwitch.find(".bck"),
            toClick: $homeBtSwitch
        }), focusList.push({
            toFocus: $homeBtPlay.find(".bck"),
            onEnter: function() {
                $homeBtPlay.trigger("click")
            }
        }), focusList.push({
            toFocus: $homeBtList.find(".bck"),
            onEnter: function() {
                $homeBtList.trigger("click")
            }
        })), "popup-album" == e && focusList.push({
            toFocus: $("#bt-album")
        }), "popup-info" == e && $("#pop-info .box-tab .tab").each(function(e) {
            focusList.push({
                toFocus: $(this)
            })
        }), "pop-tuto" == e && $("#pop-info #pop-tuto .bt").each(function(e) {
            focusList.push({
                toFocus: $(this).find(".bck"),
                toClick: $(this)
            })
        }), "pop-credit" == e && $("#pop-info #pop-credit .bt-mini").each(function(e) {
            focusList.push({
                toFocus: $(this)
            })
        }), "pop-follow" == e && ($("#pop-info #pop-follow .bt").each(function(e) {
            focusList.push({
                toFocus: $(this).find(".bck"),
                toClick: $(this)
            })
        }), focusList.push({
            toFocus: $("#pop-info #pop-follow #img-shop")
        })), "popup-param" == e && $("#pop-param .box-tab .tab").each(function(e) {
            focusList.push({
                toFocus: $(this)
            })
        }), "pop-language" == e && $("#pop-param #pop-language .bt-mini").each(function(e) {
            focusList.push({
                toFocus: $(this)
            })
        }), "pop-setting" == e && $("#pop-param #pop-setting .bt-mini").each(function(e) {
            focusList.push({
                toFocus: $(this)
            })
        }), "pop-safe-code" == e && (boxPopup.$popup.find(".bt-mini").each(function(e) {
            focusList.push({
                toFocus: $(this)
            })
        }), focusList.push({
            toFocus: boxPopup.$popup.find("span.icon")
        })), "index-select" == e && ($("#sp-select .icon:not(.open)").each(function(e) {
            focusList.push({
                toFocus: $(this).find(".img"),
                toClick: $(this)
            })
        }), focusList.push({
            toFocus: $("#home-bt-info").find(".bck"),
            toClick: $("#home-bt-info")
        }), focusList.push({
            toFocus: $("#home-bt-param").find(".bck"),
            toClick: $("#home-bt-param")
        })), "popup-switch" == e && $("#sp-select .icon:not(.open)").each(function(e) {
            focusList.push({
                toFocus: $(this).find(".img"),
                toClick: $(this)
            })
        }), "toolbar" == e && (focusList.push({
            toFocus: $btTool.find(".bck"),
            toClick: $btTool
        }), focusList.push({
            toFocus: $btClock
        })), "toolbar-open" == e && $("#game #box-bt1 .bt").each(function(e) {
            focusList.push({
                toFocus: $(this).find(".bck"),
                toClick: $(this)
            })
        }), "game-paused" == e && ("visible" == $lockPause.css("visibility") ? focusList.push({
            toFocus: $lockPause.find("#bt-resume"),
            toClick: $lockPause
        }) : focusList.push({
            toFocus: $btClock
        })), "mode-replay" == e && (focusList.push({
            toFocus: $btTool.find(".bck"),
            toClick: $btTool
        }), focusList.push({
            toFocus: $btClock
        }), "visible" === $btSave.css("visibility") ? focusList.push({
            toFocus: $btSave.find(".bck"),
            toClick: $btSave
        }) : $btLike.is(":visible") && focusList.push({
            toFocus: $btLike.find(".bck"),
            toClick: $btLike
        })), "popup-record-complete" == e && (boxPopup.$popup.find(".box-bt-haut .bt").each(function(e) {
            focusList.push({
                toFocus: $(this).find(".bck"),
                toClick: $(this)
            })
        }), focusList.push({
            toFocus: boxPopup.$popup.find("span.icon")
        })), "popup-save-form" == e && (boxPopup.$popup.find(".formzone .formline input").each(function(e) {
            var o = $(this);
            focusList.push({
                toFocus: o,
                onEnter: function() {
                    var e = o.val().length;
                    o.focus(), o[0].setSelectionRange(e, e)
                }
            })
        }), focusList.push({
            toFocus: boxPopup.$popup.find(".bt-onofftext")
        }), focusList.push({
            toFocus: boxPopup.$popup.find(".bt.valid").find(".bck"),
            toClick: boxPopup.$popup.find(".bt.valid")
        }), focusList.push({
            toFocus: boxPopup.$popup.find("span.icon")
        })), "popup-mix-saved" == e && (boxPopup.$popup.find(".box-bt-haut .bt").each(function(e) {
            focusList.push({
                toFocus: $(this).find(".bck"),
                toClick: $(this)
            })
        }), focusList.push({
            toFocus: boxPopup.$popup.find("span.icon")
        })), "popup-global-share" == e && (boxPopup.$popup.find(".box-bt-haut .bt").each(function(e) {
            focusList.push({
                toFocus: $(this).find(".bck"),
                toClick: $(this)
            })
        }), focusList.push({
            toFocus: boxPopup.$popup.find("span.icon")
        })), "popup-email-form" == e && (boxPopup.$popup.find(".formzone .formline input").each(function(e) {
            var o = $(this);
            focusList.push({
                toFocus: o,
                onEnter: function() {
                    var e = o.val().length;
                    o.focus(), o[0].setSelectionRange(e, e)
                }
            })
        }), focusList.push({
            toFocus: boxPopup.$popup.find(".bt.valid").find(".bck"),
            toClick: boxPopup.$popup.find(".bt.valid")
        }), focusList.push({
            toFocus: boxPopup.$popup.find("span.icon")
        })), "popup-convert-mix" == e && focusList.push({
            toFocus: boxPopup.$popup.find("span.icon")
        }), "popup-convert-mix-ready" == e) {
        var i = boxPopup.$popup.find("#bt-save-file");
        focusList.push({
            toFocus: i.find(".bck"),
            onEnter: function() {
                i[0].click()
            }
        }), focusList.push({
            toFocus: boxPopup.$popup.find("span.icon")
        })
    }
    if ("popup-dialog" == e && $("#pop-dialog .bt-mini").each(function(e) {
            focusList.push({
                toFocus: $(this)
            })
        }), "popup-playlist" == e && $("#mixlist .tabbox .tab").each(function(e) {
            focusList.push({
                toFocus: $(this)
            })
        }), "playlist-boxfilter" == e) {
        var n = $("#mixlist .boxfilter:visible");
        n.find(".bt-mini").each(function(e) {
            focusList.push({
                toFocus: $(this)
            })
        }), "searchbox" === n.attr("id") && (focusList.push({
            toFocus: n.find(".formline input"),
            onEnter: function() {
                n.find(".formline input").focus()
            }
        }), focusList.push({
            toFocus: n.find(".bt.search").find(".bck"),
            toClick: n.find(".bt.search")
        }))
    }
    "playlist-boxline" == e && ($visibleScroll = $("#mixlist .scroll:visible")).find(".line").each(function(e) {
        var o = $(this);
        focusList.push({
            toFocus: o,
            onEnter: function() {
                o.trigger(evtPress.split(" ")[0]).trigger(evtPressEnd.split(" ")[0])
            }
        })
    }), "playlist-line-open" == e && $lineOpened.find(".box-action .bt").each(function(e) {
        focusList.push({
            toFocus: $(this).find(".bck"),
            toClick: $(this)
        })
    });
    var a = [];
    for (var s in focusList) isVisible(focusList[s]) && a.push(focusList[s]);
    focusList = a, e != focusHistory[focusHistory.length - 1] && focusHistory.push(e), focusHistory.length > 5 && focusHistory.shift(), notnull(o) && addFocus(o), notnull(t) && (focusPos = t)
}

function isVisible(e) {
    if (notnull(e)) {
        var o = notnull(e.toClick) ? e.toClick : e.toFocus;
        return "hidden" != o.css("visibility") && "none" != o.css("display")
    }
    return !1
}

function initParam() {
    isHdefMode() && ($("body").addClass("hdefmode"), $("#pop-setting #param-hdef .bt-mini").addClass("active")), isDarkMode() && ($("body").addClass("darkmode"), $("#pop-setting #param-dark .bt-mini").addClass("active")), isSafeMode() && ($("body").addClass("safemode"), $("#pop-setting #param-safe .bt-mini").addClass("active")), $("#pop-setting #param-hdef .bt-mini").on(evtClick, clickbtParamHdef).parent().find(".ic-info").on(evtClick, clickbtParamHdefInfo), $("#pop-setting #param-dark .bt-mini").on(evtClick, clickbtParamDark), $("#pop-setting #param-safe .bt-mini").on(evtClick, clickbtParamSafe).parent().find(".ic-info").on(evtClick, clickbtParamSafeInfo), $("#pop-setting #param-reset .bt-mini").on(evtClick, clickbtParamReset).parent().find(".ic-info").on(evtClick, clickbtParamResetInfo), $("#pop-setting #param-recover .bt-mini").on(evtClick, clickbtParamRecover).parent().find(".ic-info").on(evtClick, clickbtParamRecoverInfo)
}

function isHdefMode() {
    return !(null == storage.getItem("param-hdef"))
}

function isDarkMode() {
    return !(null == storage.getItem("param-dark"))
}

function isSafeMode() {
    return !(null == storage.getItem("param-safe"))
}

function clickbtParamHdef(e) {
    e.preventDefault(), isHdefMode() ? (storage.removeItem("param-hdef"), $("#pop-setting #param-hdef .bt-mini").removeClass("active")) : (storage.setItem("param-hdef"), $("#pop-setting #param-hdef .bt-mini").addClass("active")), $("#fade-all").addClass("black"), addTransition($("#fade-all"), "fadeIn", "opacity", function() {
        location.reload()
    })
}

function clickbtParamHdefInfo(e) {
    e.preventDefault();
    var o = isHdefMode() ? STR("bt.exitModeHD") : STR("bt.enterModeHD");
    boxDialog.open(o, "", [STR("bt.gotit")], [])
}

function clickbtParamDark(e) {
    e.preventDefault(), isDarkMode() ? (storage.removeItem("param-dark"), $body.removeClass("darkmode"), $("#pop-setting #param-dark .bt-mini").removeClass("active")) : (storage.setItem("param-dark"), $body.addClass("darkmode"), $("#pop-setting #param-dark .bt-mini").addClass("active"))
}
var paramsafecode = "";

function clickbtParamSafe(e) {
    e.preventDefault(), deleteFocus(), popupCode()
}

function turnOnSafeMode(e) {
    storage.setItem("param-safe", e), $body.addClass("safemode"), $("#pop-setting #param-safe .bt-mini").addClass("active")
}

function turnOffSafeMode() {
    storage.removeItem("param-safe"), $body.removeClass("safemode"), $("#pop-setting #param-safe .bt-mini").removeClass("active")
}

function popupCode() {
    boxPopup.open({
        name: "safe-code",
        icntype: "action",
        content: function() {
            return `<div class='title'>${isSafeMode()?STR("txt.codeEnter"):STR("txt.codeChoose")}</div>\n\t\t\t\t<div class='text'>_ _ _ _</div>\n\t\t\t\t<div class='content'>\n\t\t\t\t\t<div class='bt-mini bt-number soft'><div class='txt'>1</div><div class='hitzone'></div></div>\n\t\t\t\t\t<div class='bt-mini bt-number soft'><div class='txt'>2</div><div class='hitzone'></div></div>\n\t\t\t\t\t<div class='bt-mini bt-number soft'><div class='txt'>3</div><div class='hitzone'></div></div>\n\t\t\t\t\t<div class='bt-mini bt-number soft'><div class='txt'>4</div><div class='hitzone'></div></div>\n\t\t\t\t\t<div class='bt-mini bt-number soft'><div class='txt'>5</div><div class='hitzone'></div></div><br>\n\t\t\t\t\t<div class='bt-mini bt-number soft'><div class='txt'>6</div><div class='hitzone'></div></div>\n\t\t\t\t\t<div class='bt-mini bt-number soft'><div class='txt'>7</div><div class='hitzone'></div></div>\n\t\t\t\t\t<div class='bt-mini bt-number soft'><div class='txt'>8</div><div class='hitzone'></div></div>\n\t\t\t\t\t<div class='bt-mini bt-number soft'><div class='txt'>9</div><div class='hitzone'></div></div>\n\t\t\t\t\t<div class='bt-mini bt-number soft'><div class='txt'>0</div><div class='hitzone'></div></div><br>\n\t\t\t\t\t<br>\n\t\t\t\t\t<div class='bt-mini light' id='bt-valid-code'><div class='txt'>${STR("bt.ok")}</div><div class='hitzone'></div></div>\n\t\t\t\t</div>`
        },
        onBoxOpenEnd: function() {
            createFocus("pop-safe-code"), isSafeMode(), paramsafecode = "", boxPopup.$icon.on(evtClick, boxPopup.close), boxPopup.$popup.find(".bt-number").on(evtClick, function(e) {
                e.preventDefault();
                var o = boxPopup.$popup.find(".text"),
                    t = o.text(),
                    i = t.indexOf("_");
                i > -1 && o.text(t.replaceAt(i, $(this).text())), isSafeMode() && ("15092009" != (paramsafecode += $(this).text()) && o.text().replace(/ /g, "") != storage.getItem("param-safe") || (turnOffSafeMode(), boxPopup.close())), $(this).hasClass("ontouch") && $(this).removeClass("ontouch").get(0).offsetHeight, $(this).addClass("ontouch").one(animationEnd, function(e) {
                    $(e.target).removeClass("ontouch")
                })
            }), boxPopup.$popup.find("#bt-valid-code").on(evtClick, function(e) {
                var o = boxPopup.$popup.find(".text").text().replace(/ /g, ""); - 1 == o.indexOf("_") ? isSafeMode() ? o == storage.getItem("param-safe") ? (turnOffSafeMode(), boxPopup.close()) : boxPopup.$popup.find(".text").addClass("shake").one(animationEnd, function(e) {
                    paramsafecode = "", $(e.target).text("_ _ _ _").removeClass("shake")
                }) : (turnOnSafeMode(o.replace(/ /g, "")), boxPopup.close()) : boxPopup.$popup.find(".text").addClass("shake").one(animationEnd, function(e) {
                    $(e.target).removeClass("shake")
                })
            })
        },
        onBoxCloseStart: function() {
            removeInArray("pop-safe-code", focusHistory), deleteFocus(), boxPopup.$icon.off(), boxPopup.$popup.find(".bt-mini").off()
        },
        onCloseComplete: function() {
            createFocus(focusHistory[focusHistory.length - 1])
        }
    })
}

function clickbtParamSafeInfo(e) {
    e.preventDefault(), boxDialog.open(STR("pop.paramSafeInfoText"), "", [STR("bt.gotit")], [])
}

function clickbtParamReset(e) {
    e.preventDefault(), storage.removeItem("popup-bonus-next"), storage.removeItem("popup-bonus-unlock");
    for (var o = 1; o <= appTotalVersion; o++) storage.removeItem("v" + o + "-popup-bonus-next"), storage.removeItem("v" + o + "-popup-bonus-unlock"), storage.removeItem("v" + o + "-bonus-complete");
    addTransition($("#fade-all"), "fadeIn", "opacity", function() {
        window.location.href = void 0 !== appNumberVersion ? "?v=" + appNumberVersion : ""
    })
}

function clickbtParamResetInfo(e) {
    e.preventDefault(), boxDialog.open(STR("pop.paramResetInfoText"), "", [STR("bt.gotit")], [])
}

function unlockAllBonus() {
    for (var e = 1; e <= appTotalVersion; e++) storage.setItem("v" + e + "-popup-bonus-next", "ok"), storage.setItem("v" + e + "-popup-bonus-unlock", "ok"), storage.setItem("v" + e + "-bonus-complete", "2");
    addTransition($("#fade-all"), "fadeIn", "opacity", function() {
        window.location.href = void 0 !== appNumberVersion ? "?v=" + appNumberVersion : ""
    })
}

function clickbtParamRecover(e) {
    e.preventDefault(), hasNetwork ? storage.restoreAllMix(!0, function(o) {
        "ok" == o.msg ? boxDialog.open(STR("pop.paramRecoverOkText").replace("%{nb_mix}", o.nb), "", [STR("bt.ok")], []) : boxDialog.open(STR("pop.noCoServerText"), STR("pop.noCoServerTitle"), [STR("bt.ok")], []), $(e.currentTarget).addClass("disable")
    }) : boxDialog.open(STR("pop.noNetworkText"), STR("pop.noNetworkTitle"), [STR("bt.ok")], [])
}

function clickbtParamRecoverInfo(e) {
    e.preventDefault(), boxDialog.open(STR("pop.paramRecoverInfoText"), "", [STR("bt.gotit")], [])
}
var gaShouldTrack = !1,
    gaAlreadySet = !1;

function initAnalytics() {
    if (!appBrowser && !appBrowserDemo && (gaShouldTrack = !0, hasNetwork)) {
        ga("create", "UA-155281781-1", {
            storage: "none",
            clientId: machine.uuid
        }), ga(function(e) {});
        var e = "incredibox-" + machine.osTiny;
        e = appCN && isAndroid ? e + "-cn" : e, e = appSQ ? e + "-sq" : e, ga("set", {
            checkProtocolTask: function() {},
            appName: e,
            page: getPageNameGA()
        }), ga("send", "pageview"), gaAlreadySet = !0
    }
}

function saveGA(e, o, t) {
    !appBrowser && hasNetwork && trustAppMobile && (gaAlreadySet ? (t = t || "", ga("send", "event", {
        eventCategory: e,
        eventAction: o,
        eventLabel: t
    })) : initAnalytics())
}

function listenWindowError() {
    window.onerror = function(e, o, t) {
        var i = "Error: " + e + " Script: " + o + " Line: " + t;
        !appBrowser && hasNetwork && gaAlreadySet && ga("send", "exception", {
            exDescription: i,
            exFatal: !1
        })
    }
}
var iosVersion, iosVersionNumber, pageApp = !0,
    mixlink = getParameterByName("mix"),
    isMixReplay = null !== mixlink,
    isMiniPlayer = getParameterByName("mini"),
    mixCreatedWithFlash = null !== mixlink && (-1 == mixlink.toLowerCase().indexOf("ios") && 13 == mixlink.split("-")[0].length),
    appNumberVersion = isMixReplay ? mixlink.slice(-1) : getParameterByName("v"),
    appVersion = isnull(appNumberVersion) || isNaN(appNumberVersion) || 1 != appNumberVersion.length ? 4 : appNumberVersion;
appVersion = isMixReplay && -1 == mixlink.indexOf("-") && 13 == mixlink.length ? 2 : appVersion;
var transitionEnd, animationEnd, $body, $incredibox, $bckGlobal, $lockAll, $lockPause, $lockStage, $fadeAll, $watchInfo, $mixlist, $poplist, $tabMixlist, $tabLatest, $tabSearch, $tabTop50, $home, $homeVersion, $homeTitre, $homeLoadbox, $homeLoadbar, $homeBtPlay, $homeBtList, $homeBtSwitch, $homeBtInfo, $homeBtParam, $homeBtAlbum, $homeBck, $gameTouch, $boxVideo, $fadeVideo, $boxTop, $boxBtBonus, $boxBottom, $boxPicto, $boxLoaderBonus, $boxLoaderPolo, $btTool, $boxBt, $btBack, $btHome, $btLatest, $btSave, $btLike, $btHelp, $btSwitch, $btStop, $btRecord, $btRandom, $btClock, $cntRecord, boxDialog, boxMenu, boxPopup, boxInfo, boxParam, boxSwitch, boxAlbum, contextCanvas, contextAudio, clock, mainCanvas, tabBuffer, tabAnime, nbSound, nbSoundBonus, nbSoundTotal, nbSoundLoaded, nbBonus, nbBonusLoaded, nbAnime, nbAnimeLoaded, nbData, nbDataLoaded, nbImage, nbImageLoaded, spritePolo, spritePicto, cntTotalAsset, nbTotalAsset, tabToLoad, cntLoad, hasNetwork = !1,
    storage = new LocalStorage,
    cloud = new CloudSync,
    localMixObject = new LocalMixObject,
    desiredSampleRate = 44100,
    appLoaded = !1,
    appViewed = !1,
    modeWatch = !1,
    isBackToHome = !1,
    onGame = !1,
    autoPlayEnabled = !1,
    delayassist = 500;

function appBrowserReady() {
    notnull(getParameterByName("expo")) ? ($("body").addClass("fluid expo"), appBrowserExpo = !0) : notnull(getParameterByName("demo")) && ($("body").addClass("fluid appBrowserDemo"), appBrowserDemo = !0), onDeviceReady()
}

function onDeviceReady() {
    if ((appDesktop || appMobile) && document.body.classList.remove("black"), appDesktop && document.body.classList.add("darkback"), appBrowser && document.getElementById("fade-all").classList.add("white"), initGlobal(), checkSystem(), window.initAnalytics && initAnalytics(), resizeApp(), initRightClick(), initSilentMode(), listenFocus(), initParam(), trustAppMobile)
        if (window.open = cordova.InAppBrowser.open, document.addEventListener("pause", onPause, !1), document.addEventListener("resume", onResume, !1), isIOS) {
            var e = (iosVersion = device.version).split(".");
            iosVersionNumber = Number(e[0] + "" + e[1]), desiredSampleRate = iPhone6sAndMore() ? 48e3 : desiredSampleRate
        } else isAndroid && (launchImmersiveMode(), window.addEventListener("native.keyboardshow", keyboardOpen), window.addEventListener("native.keyboardhide", keyboardClose), document.addEventListener("backbutton", function(e) {
            e.preventDefault(), clickAndroidBackButton()
        }, !1));
    isMixReplay && ($("body").addClass("miniPlayer"), isIframe || tryToLoadMix());
    var o = trustAppMobile ? document : window;
    o.addEventListener("online", networkOn, !1), o.addEventListener("offline", networkOff, !1), transitionEnd = transitionEndEventName(), animationEnd = animationEndEventName(), $(document).ready(function() {
        isIframe && appBrowser && !appBrowserExpo ? callParentWindow("appIsReady") : documentReady()
    })
}

function documentReady() {
    debugScene && ($("#fade-all").css({
        visibility: "hidden"
    }), $("#home").css({
        visibility: "hidden"
    })), $("body").addClass("v" + appVersion), appBrowserExpo || initFocusEvent(), isAnimeHD && $("#cnvGame").attr("width", "2048").attr("height", "800"), appDesktop && (boxMenu = new Popup(".box-popup#pop-menu-exit")), boxDialog = new BoxDialog("#pop-dialog"), "ok" === checkSupported() ? (contextCanvas = $("#cnvGame")[0].getContext("2d"), (contextAudio = new AudioContext).onstatechange = listenStateAudioCtx(), createBtLanguage(), loadLanguage(function() {
        bugBluetoothLatency() || bugSampleRate() || (checkAudioRoute(), loadAppFile(function() {
            initRulesCSS();
            var e = $("body").hasClass("fluid") ? "" : "big-",
                o = appBrowserExpo ? "home-titre-expo.png" : "home-titre.png",
                t = assetName("asset-v" + appVersion + "/splash/" + e + "homescreen.jpg"),
                i = assetName("asset-v" + appVersion + "/img/home-version.png"),
                n = assetName("asset-v" + appVersion + "/img/" + o);
            loadImg([
                [t = appBrowserExpo ? t.replace(".jpg", "-expo.jpg") : t, "#img-bck"],
                [i, "#img-version"],
                [n, "#img-titre"]
            ], function() {
                initJqueryVar(), changeDomTxt(), appBrowser || isIframe || (initMixlist(), checkLikeNotification());
                var e = isMixReplay ? displayHomeReplay : showHome;
                $homeBck.addClass("animate").one(animationEnd, function() {
                    $homeBck.removeClass("animate")
                }), removeTransition($fadeAll, "fadeIn", "opacity", e)
            })
        }))
    }, null, removeFadeAll)) : (boxDialog.open(checkSupported(), "ERROR", [], [], !0), removeFadeAll())
}

function clickAndroidBackButton() {
    onGame ? pause ? pauseGame() : (modeRandom && stopRandomMode(), loopOn ? stopAllStage() : (boxDialog.isOpen() && boxDialog.close(), boxPopup.$popup.isOpen() && boxPopup.close(), backToHome())) : gotoAppUrl("index.html?back=1")
}

function loadAppFile(e) {
    $.getScript("./asset-v" + appVersion + "/app.js").done(e).fail(function(e, o, t) {
        boxDialog.open("App file not found. Please reload or force to quit the app then retry.", "ERROR", ["Reload"], [gotoAppUrl], !0), removeFadeAll()
    })
}

function removeFadeAll() {
    ($fadeAll = isnull($fadeAll) ? $("#fade-all") : $fadeAll).hasClass("fadeIn") && $fadeAll.removeClass("fadeIn")
}

function initJqueryVar() {
    $body = $("body"), $incredibox = $("#app-incredibox"), $bckGlobal = $("#bck-global"), $lockAll = $("#lock-all").on(evtPress, stopProp), $lockPause = $("#lock-pause").on(evtClick, function(e) {
        e.preventDefault(), preventAction(clickBtClock)
    }), $lockStage = $("#lock-stage"), $fadeAll = $("#fade-all"), ($mixlist = $("#mixlist")).$pop = $("#poplist"), $mixlist.$bck = $("#mixlist .bac"), $mixlist.isOpen = function() {
        return $mixlist.hasClass("show")
    }, ($tabMixlist = $("#tab-mixlist").on(evtClick, clickBtTabMixlist)).$btMymix = $("#mixlistbox .tab-filter #bt-mymix").on(evtClick, clickBtFilterMymix), $tabMixlist.$btMyfav = $("#mixlistbox .tab-filter #bt-myfav").on(evtClick, clickBtFilterMyfav), $tabLatest = $("#tab-latest").on(evtClick, clickBtTabLatest), ($tabTop50 = $("#tab-top50").on(evtClick, clickBtTabTop50)).$btDay = $("#top50box .tab-filter #bt-day").on(evtClick, clickBtFilter), $tabTop50.$btWeek = $("#top50box .tab-filter #bt-week").on(evtClick, clickBtFilter), $tabTop50.$btMonth = $("#top50box .tab-filter #bt-month").on(evtClick, clickBtFilter), $tabTop50.$btYear = $("#top50box .tab-filter #bt-year").on(evtClick, clickBtFilter), ($tabSearch = $("#tab-search").on(evtClick, clickBtTabSearch)).$btName = $("#searchbox .tab-filter #bt-name").on(evtClick, clickBtFilterSearch), $tabSearch.$btTitle = $("#searchbox .tab-filter #bt-title").on(evtClick, clickBtFilterSearch), $tabSearch.$btDedi = $("#searchbox .tab-filter #bt-dedi").on(evtClick, clickBtFilterSearch), $tabSearch.$btSearch = $("#searchbox form #bt-search").on(evtClick, clickBtSearch), $home = $("#home"), $homeBck = $("#home #img-bck"), $homeVersion = $("#home #img-version"), $homeTitre = $("#home #img-titre"), $homeLoadbox = $("#home #load-box"), $homeLoadbar = $("#home #load-box #load-bar"), $homeBtPlay = $("#home #home-bt-play"), $homeBtList = $("#home #home-bt-list"), $homeBtSwitch = $("#home #home-bt-switch"), $homeBtInfo = $("#home #home-bt-info"), $homeBtParam = $("#home #home-bt-param"), $homeBtAlbum = $("#home #home-bt-album"), $gameTouch = $("#game-touch"), $boxBt = $("#box-bt"), $btBack = $("#bt-back"), ($btTool = $("#bt-tool")).$bck = $("#bt-tool .bck"), $btTool.$svg = $btTool.$bck.find("svg use"), $btTool.bounce = function() {
        this.addClass("animateBounce").one(animationEnd, function(e) {
            $(e.target).removeClass("animateBounce")
        })
    }, $btStop = $("#bt-stop"), $btRandom = $("#bt-random"), $btRecord = $("#bt-record"), $btHome = $("#bt-home"), $btHelp = $("#bt-help"), $btSwitch = $("#bt-switch"), $btClock = $("#bt-clock"), $cntRecord = $("#cnt-record"), $btSave = $("#bt-save"), $btLike = $("#bt-like"), $boxVideo = $("#box-video"), $fadeVideo = $("#fade-video"), $boxTop = $("#box-top"), $boxBtBonus = $("#box-bt-bonus"), $boxBottom = $("#box-bottom"), $boxPicto = $("#box-picto"), $boxLoaderBonus = $("#box-loader-bonus"), $boxLoaderPolo = $("#box-loader-polo"), ($watchInfo = $("#watch-info")).$title = $("#watch-info .title"), $watchInfo.$name = $("#watch-info .name"), $watchInfo.$dedi = $("#watch-info .dedi"), $watchInfo.$date = $("#watch-info .date"), boxPopup = new Popup(".box-popup#pop-popup"), boxSwitch = new Popup(".box-popup#pop-switch"), $(".box-popup#pop-switch #icon" + appVersion).addClass("open"), $(".box-popup#pop-switch .icon").on(evtClick, function(e) {
        e.preventDefault();
        var o = $(this).attr("id").split("icon").join(""),
            t = "app." + pageExt + "?v=" + o;
        t += withAdBreak ? "&a=1" : "", t += null != getParameterByName("lang") ? "&lang=" + getParameterByName("lang") : "", appBrowserDemo ? o != appVersion && dialogGetApp() : appBrowser && parseInt(o) > 4 ? dialogGetApp() : o != appVersion && (lock(), focusHistory = [], deleteFocus(), $(".box-popup#pop-switch #icon" + appVersion).addClass("close"), $(this).addClass("open clicked").one(animationEnd, function() {
            addTransition($fadeAll, "fadeIn", "opacity", function() {
                appBrowser && isIframe && !withAdBreak ? window.top.appEvent("switchVerison", {
                    id: o
                }) : withAdBreak && adVisible || gotoAppUrl(t)
            })
        }))
    }), (boxAlbum = new Popup(".box-popup#pop-album")).$popup.find("#img-album").on("click", function(e) {
        e.preventDefault(), redirectTo("album")
    }), boxAlbum.$popup.find("#bt-album").on("click", function(e) {
        e.preventDefault(), redirectTo("album")
    }), initPopupIndexApp()
}

function preparerArray() {
    frameTotal = app.totalframe, frameHalf = frameTotal / 2, tabBuffer = {}, tabAnime = [], nbSound = app.animearray.length, nbSoundBonus = app.bonusarray.length, nbSoundTotal = 2 * nbSound + nbSoundBonus + 1, nbSoundLoaded = 0, nbBonus = app.bonusarray.length, nbBonusLoaded = 0, nbAnime = app.animearray.length, nbAnimeLoaded = 0, nbData = app.animearray.length, nbDataLoaded = 0, nbImage = 0, nbImageLoaded = 0, spritePolo = null, spritePicto = null, cntTotalAsset = 0, nbTotalAsset = nbSoundTotal + nbBonus + nbAnime + nbData + 2, tabToLoad = [], cntLoad = 0;
    var e = 0,
        o = "";
    for (tabBuffer.sound = [], e = 0; e < nbSound; e++) tabBuffer.sound.push({
        sndA: 0,
        sndB: 0
    }), tabAnime.push({
        imgSprite: null,
        ratio: null,
        width: null,
        height: null,
        headWidth: null,
        headHeight: null,
        totalFrames: null,
        imgData: null,
        color: app.animearray[e].color
    });
    for (tabBuffer.bonus = [], e = 0; e < nbSoundBonus; e++) tabBuffer.bonus.push({
        snd: 0,
        aspire: 0,
        expire: 0
    }), createMetaBonus(e);
    for (tabBuffer.metro = [{
            snd: 0
        }], tabToLoad = [{
            func: loadImage,
            params: [animeName(app.spritepolo), "spritePolo"]
        }, {
            func: loadImage,
            params: [app.spritepicto, "spritePicto"]
        }], isMixReplay && appVersion > 4 && tabToLoad.pop(), e = 0; e < nbSound; e++) app.animearray[e].uniqsnd ? (tabToLoad.push({
        func: loadSound,
        params: ["sound", app.animearray[e].soundA, e, "sndA", !0]
    }), nbTotalAsset--) : (tabToLoad.push({
        func: loadSound,
        params: ["sound", app.animearray[e].soundA, e, "sndA"]
    }), tabToLoad.push({
        func: loadSound,
        params: ["sound", app.animearray[e].soundB, e, "sndB"]
    }));
    for (e = 0; e < nbSoundBonus; e++) tabToLoad.push({
        func: loadSound,
        params: ["bonus", app.bonusarray[e].sound, e, "snd"]
    }), tabToLoad.push({
        func: loadSound,
        params: ["bonus", app.bonusarray[e].aspire, e, "aspire"]
    }), notnull(app.bonusarray[e].expire) && tabToLoad.push({
        func: loadSound,
        params: ["bonus", app.bonusarray[e].expire, e, "expire"]
    }), o = animeName(app.bonusarray[e].src), tabToLoad.push({
        func: loadVideoBonus,
        params: [o, e]
    });
    for (e = 0; e < nbAnime; e++) o = app.animearray[e].animeData, tabToLoad.push({
        func: loadAnimeData,
        params: [o, e]
    }), o = animeName(app.animearray[e].anime), tabToLoad.push({
        func: loadAnime,
        params: [o, e]
    });
    checkTabToLoad()
}

function checkTabToLoad() {
    updatePreload(), cntLoad < tabToLoad.length && (tabToLoad[cntLoad].func(tabToLoad[cntLoad].params), cntLoad++)
}

function errorTabToLoad(e) {
    boxDialog.open('Error loading asset<br><i>"' + e.split("./").join("") + '"</i>', "LOADING BUG", ["Reload"], [gotoAppUrl], !0), removeFadeAll()
}

function updatePreload() {
    cntTotalAsset++;
    var e = Math.round(cntTotalAsset / nbTotalAsset * 100);
    e = e > 100 ? 100 : e, $homeLoadbar.css({
        width: String(e) + "%"
    }), cntTotalAsset == nbTotalAsset && (createGame(), hideHomeLoadbar())
}

function loadImage(e) {
    var o = e[0],
        t = e[1];
    nbImage++;
    var i = "./" + app.folder + "img/" + o,
        n = new Image;
    n.onload = function() {
        window[t] = this, checkTabToLoad()
    }, n.onerror = function() {
        errorTabToLoad(i)
    }, n.src = i
}

function loadSound(e) {
    var o = e[0],
        t = e[1],
        i = e[2],
        n = e[3],
        a = !isnull(e[4]) && e[4],
        s = "./" + app.folder + "sound/" + sndtype + "/" + t + "." + sndtype;
    t.indexOf("metronome") > -1 && (s = "./" + app.folder + "sound/-metronome.wav");
    var l = new XMLHttpRequest;
    l.open("GET", s, !0), l.responseType = "arraybuffer", l.onload = function() {
        contextAudio.decodeAudioData(l.response, function(e) {
            tabBuffer[o][i][n] = e, a && (tabBuffer[o][i].sndB = e), checkTabToLoad()
        }, function(e) {
            boxDialog.open('Error decoding asset "' + s + '"', "AUDIO BUG", ["Reload"], [gotoAppUrl], !0)
        })
    }, l.onerror = function() {
        errorTabToLoad(s)
    }, l.send()
}

function loadAnimeData(e) {
    var o = e[0],
        t = e[1],
        i = "./" + app.folder + "anime/" + o,
        n = new XMLHttpRequest;
    n.open("GET", i, !0), n.responseType = "json", n.onload = function() {
        for (var e = n.response, o = e.arrayFrame, i = o.length, a = [], s = 0; s < i; s++) {
            var l = o[s].prop.split(",");
            a.push([parseInt(l[0]), parseInt(l[1]), parseInt(l[2]), parseInt(l[3])])
        }
        tabAnime[t].imgData = a, tabAnime[t].headHeight = e.headHeight, checkTabToLoad()
    }, n.onerror = function() {
        errorTabToLoad(i)
    }, n.send()
}

function loadAnime(e) {
    var o = e[0],
        t = e[1],
        i = "./" + app.folder + "anime/" + o,
        n = new Image;
    n.onload = function() {
        tabAnime[t].imgSprite = n, checkTabToLoad()
    }, n.onerror = function() {
        errorTabToLoad(i)
    }, n.src = i
}

function loadVideoBonus(o) {
    var t = o[0],
        i = "./" + app.folder + "video/" + t.replace("mp4", vidtype),
        n = o[1] + 1,
        a = document.createElement("video");
    if (a.type = "video/" + vidtype, a.setAttribute("playsinline", "playsinline"), a.setAttribute("webkit-playsinline", "webkit-playsinline"), a.setAttribute("muted", "muted"), $boxVideo.append("<div class='video' id='video" + n + "'></div>"), $boxVideo.find(".video#video" + n).append(a), trustAppMobile && isIOS || appBrowserDemo) a.addEventListener("canplaythrough", function() {
        checkTabToLoad()
    }, !1), a.addEventListener("error", function(e) {
        $boxVideo.find(".video#video" + n).css({
            "background-image": "url(./" + app.folder + "video/v" + app.version + "-b" + n + "-bck.jpg)"
        }), checkTabToLoad()
    }), a.src = i, a.load();
    else {
        var s = new XMLHttpRequest;
        s.onload = function() {
            a.src = window.URL.createObjectURL(this.response), checkTabToLoad()
        }, s.onerror = function() {
            alert("Error " + e.target.status + " occurred while receiving the document")
        }, s.open("GET", i), s.responseType = "blob", s.send()
    }
}

function createMetaBonus(e) {
    var o = e + 1,
        t = `\n\t\t<div class="bt-bonus" id="bt-bonus-${o}">\n\t\t\t<div class="circle"></div>\n\t\t\t<div class="quarter">\n\t\t\t\t<div class="svg q0"><svg x="0px" y="0px" width="86px" height="86px" viewBox="0 0 86 86"><path d="M83.88,29.72A42.83,42.83,0,1,0,86,43,43,43,0,0,0,83.88,29.72ZM43,58.64A15.69,15.69,0,0,1,27.36,43,15.64,15.64,0,1,1,52.18,55.64,15.52,15.52,0,0,1,43,58.64Z"/></svg></div>\n\t\t\t\t<div class="svg q1"><svg x="0px" y="0px" width="86px" height="86px" viewBox="0 0 86 86"><path d="M57.87,38.17l26-8.45A43,43,0,0,0,43,0V27.36A15.65,15.65,0,0,1,57.87,38.17Z"/></svg></div>\n\t\t\t\t<div class="svg q2"><svg x="0px" y="0px" width="86px" height="86px" viewBox="0 0 86 86"><path d="M83.88,29.72l-26,8.45a15.58,15.58,0,0,1-5.69,17.47L68.25,77.75a42.83,42.83,0,0,0,15.63-48Z"/></svg></div>\n\t\t\t\t<div class="svg q3"><svg x="0px" y="0px" width="86px" height="86px" viewBox="0 0 86 86"><path d="M52.18,55.64a15.55,15.55,0,0,1-18.36,0L17.75,77.75a42.77,42.77,0,0,0,50.5,0Z"/></svg></div>\n\t\t\t\t<div class="svg q4"><svg x="0px" y="0px" width="86px" height="86px" viewBox="0 0 86 86"><path d="M27.36,43a15.71,15.71,0,0,1,.77-4.83l-26-8.45a42.88,42.88,0,0,0,15.64,48L33.82,55.64A15.61,15.61,0,0,1,27.36,43Z"/></svg></div>\n\t\t\t\t<div class="svg q5"><svg x="0px" y="0px" width="86px" height="86px" viewBox="0 0 86 86"><path d="M43,27.36V0A43,43,0,0,0,2.11,29.72l26,8.45A15.65,15.65,0,0,1,43,27.36Z"/></svg></div>\n\t\t\t</div>\n\t\t\t<canvas id="canvas-bt-bonus-${o}" width="86" height="86"></canvas>\n\t\t\t<div class="icon">\n\t\t\t\t<div class="icn-bck"></div>\n\t\t\t\t<svg class="icn-svg"><use xlink:href="#ic-lock"></use></svg></div><div class="hitzone">\n\t\t\t</div>\n\t\t</div>`;
    $boxBtBonus.append(t)
}
trustAppMobile ? document.addEventListener("deviceready", onDeviceReady, !1) : appBrowser ? document.addEventListener("DOMContentLoaded", appBrowserReady, !1) : document.addEventListener("DOMContentLoaded", onDeviceReady, !1);
var loopDuration, nbLoopBonus, nbPoloMax, mixToWatchLoaded = !1,
    displayHomeReplayWaiting = !1;

function tryToLoadMix() {
    var e = mixCreatedWithFlash ? "get-mix-flash-db.php" : "get-mix-db.php";
    xhr("POST", domainOnline + "ph2/" + e, {
        link: mixlink
    }, function(e) {
        mixToWatch = "success" === e.state ? jsonDecode(e.mix) : null, mixToWatchLoaded = !0, displayHomeReplayWaiting && displayHomeReplay()
    }, function(e) {
        mixToWatchLoaded = !0
    })
}

function prepareMixReplay(e) {
    mixToWatchLoaded = !0, mixToWatch = e
}

function displayHomeReplay() {
    if (mixToWatchLoaded) {
        var e = "<div><span class='bold'>Mix not found</span><br><span class='mini'>Sorry dude, wa can't find this mix for now</span></div>";
        "" != mixToWatch.dedi && (e = "Dedicated to " + mixToWatch.dedi, $("#home #home-dedicated").html(e), $("#home #home-dedicated").addClass("animate")), $fadeAll.removeClass("fadeIn"), isnull(mixToWatch) || (parseXmlAndCheckAssets(), TweenMax.delayedCall(1, showHomeLoadbar))
    } else displayHomeReplayWaiting = !0
}

function showHome() {
    unlock(), $fadeAll.removeClass("fadeIn"), $homeTitre.addClass("animate"), $homeVersion.addClass("animate"), appViewed || (appViewed = !0, TweenMax.delayedCall(1, function() {
        appLoaded ? showBtHome() : showHomeLoadbar()
    }), $homeBtSwitch.on(evtClick, function(e) {
        e.preventDefault(), preventAction(popupSwitch)
    }).addClass("animate"), $homeBtAlbum.on(evtClick, function(e) {
        e.preventDefault(), preventAction(popupAlbum)
    }).addClass("animate"), $homeBtInfo.on(evtClick, function(e) {
        e.preventDefault(), preventAction(popupInfo)
    }).addClass("animate"), $homeBtParam.on(evtClick, function(e) {
        e.preventDefault(), preventAction(popupParam)
    }).addClass("animate"))
}

function showHomeLoadbar() {
    $homeLoadbox.addClass("animate"), preparerArray()
}

function hideHomeLoadbar() {
    $homeLoadbox.removeClass("animate"), (isMixReplay ? showBtPlayListen : showBtHome)(!0)
}

function showBtPlayListen() {
    $homeBtPlay.click(function() {
        clickForAutoPlay(), clickBtWatch(mixToWatch), callParentWindow("replayStart", mixToWatch)
    }), $homeBtPlay.addClass("animate");
    var e = 0;
    $body.on(evtPress, function(o) {
        e = window.top.scrollY
    }), $body.on(evtPressEnd, function(o) {
        window.top.scrollY == e && loopOn && clickBtClock()
    }), $lockPause.off(), $lockPause.html('<div id="bt-play-pause" class="bt"><div class="bck"><div class="bckimg"></div></div><div class="hitzone"></div></div>')
}

function showBtHome(e) {
    e && 0 == focusHistory.length && createFocus("home"), $homeBtPlay.click(function() {
        clickForAutoPlay(), preventAction(clickHomeBtPlay)
    }), $homeBtPlay.addClass("animate"), $homeBtList.click(function() {
        clickForAutoPlay(), appBrowser && isIframe ? dialogGetApp() : preventAction(clickHomeBtPlaylist)
    }), $homeBtList.addClass("animate"), debugGame && $homeBtPlay.click()
}

function clickHomeBtPlaylist() {
    deleteFocus(), appBrowser ? dialogGetApp() : (lock(), Spinner.add($homeBtList), TweenMax.delayedCall(.5, function() {
        unlock(), openPlaylist()
    }))
}

function clickHomeBtPlay() {
    appBrowserDemo && withAdBreak && callAd("start", "new-game"), deleteFocus(), addTransition($fadeAll, "fadeIn", "opacity", hideHome)
}

function clickForAutoPlay() {
    if (!autoPlayEnabled) {
        autoPlayEnabled = !0, "resume" in contextAudio && contextAudio.resume();
        var e, o = 0,
            t = new SoundObject(contextAudio);
        for (t.setSilence(), t.prepare(tabBuffer.sound[0].sndA), t.play(), o = 0; o < app.bonusarray.length; o++)(e = $("#box-video .video#video" + (o + 1) + " video")[0]).play();
        TweenMax.delayedCall(.5, function() {
            for (t.stop(), o = 0; o < app.bonusarray.length; o++)(e = $("#box-video .video#video" + (o + 1) + " video")[0]).pause(), e.currentTime = 0
        })
    }
}

function hideHome() {
    lock(), detectSilentMode(), isBackToHome = !1, onGame = !0, $home.hide(), document.body.classList.remove("darkback"), renderRAF.start(), modeWatch ? (gotoModeWatch(), poloAllVisible || afficherAllPolo(!0)) : (showDiv($boxBtBonus), showDiv($boxPicto), showDiv($boxLoaderBonus), showDiv($boxLoaderPolo), baisserAllPolo()), setTimeout(function() {
        removeTransition($fadeAll, "fadeIn", "opacity", lancerApp)
    }, 50)
}

function backToHome(e) {
    deleteFocus();
    var o = e || nada;
    lock(), isBackToHome = !0, pictoForceOnDrop(), addTransition($fadeAll, "fadeIn", "opacity", function() {
        hideGame(), o()
    }), appBrowser || isIframe || checkLikeNotification(!0)
}

function hideGame() {
    document.body.classList.add("darkback"), onGame = !1, stopAllStage(), renderRAF.stop(), closeTool(), checkIfPopupOpen(), $home.show(), removeTransition($fadeAll, "fadeIn", "opacity", showHome), modeWatch ? (backtoModeWatch(), createFocus(focusHistory[focusHistory.length - 1])) : (focusHistory = [], createFocus("home"))
}

function lancerApp() {
    $fadeAll.removeClass("fadeIn"), modeWatch ? startReplayMode() : (unlock(), afficherAllPolo(), createFocus("toolbar"), isnull(storage.getItem("popupTutoDrag")) && setTimeout(popupTutoDrag, 600)), saveGA("game", "launch")
}
var listPolo, listPicto, playBar, readingBar, randomMix, recordMix, replayMix, listBonus = [],
    listPoloDrop = [],
    listPoloToRemove = [],
    listPoloToSolo = [],
    tabFirstSound = [],
    tabPoloOnStage = [],
    tabPoloBusy = [],
    poloAllVisible = !1,
    nbPoloToAnime = 0,
    pictoDrag = null,
    modeRandom = !1,
    modeRecord = !1,
    modeReplay = !1,
    waitForRecording = !1,
    mouseX = 0,
    mouseY = 0;

function createGame() {
    appLoaded = !0, app.recminloop = showlog || appBrowserDemo ? 0 : app.recminloop, loopDuration = app.looptime, nbLoopBonus = app.nbloopbonus, nbPoloMax = app.nbpolo, stepAnimation = frameHalf / loopDuration, stepPercent = 100 / loopDuration, tabBuffer.metro[0].snd = contextAudio.createBuffer(2, app.looptime / 1e3 * 44100, 44100), (sndMetronome = new SoundObject(contextAudio, "metronome")).setSilence(), (clock = new ClockObject("cnv-clock")).init(76, 76, 1, 68, 16), renderRAF = new RenderRAF(-1, renderLoop), mainCanvas = new CanvasObj("cnvGame"), isMixReplay ? ((recordMix = function() {}).xmlAction = function() {}, randomMix = function() {}) : (randomMix = new RandomMix, recordMix = new RecordMix), replayMix = new ReplayMix, readingBar = new ReadingBar("#reading-bar", app.recminloop, app.recmaxloop), listPolo = creerBoxPolo(), majListPoloDrop(), listPicto = creerBoxPicto(), listBonus = creerBoxBonus(), enableBtGame()
}

function creerBoxPicto() {
    var e = [],
        o = isMobile ? 0 : 56;
    o = isiPhone4s ? 45 : o;
    for (var t = Math.ceil((344 - 2 * o - Math.ceil(68 / 1.5)) / 9), i = o, n = 47, a = 0; a < nbSound; a++) {
        isMiniPlayer && appVersion > 4 && (spritePicto = {
            src: ""
        }, i = -9999, n = -9999), $boxPicto.append('<div class="picto" id="picto' + a + '"><div class="scale"><div class="hitzone"></div></div></div>'), $boxPicto.find("#picto" + a + " .scale").css({
            "background-image": "url(" + assetName(spritePicto.src) + ")"
        });
        var s = new PictoObject(a, $boxPicto);
        s.init(i, n), s.activer(), e.push(s), i += 68 + t, 9 == a && (i = 1024 - (i + 68) + 68 + t, n = 136)
    }
    return e
}

function creerBoxPolo() {
    var e = [],
        o = isMobile ? 0 : 15;
    o = isiPhone4s ? 22 : o;
    for (var t = 0; t < nbPoloMax; t++) {
        $("#box-polo").append('<div class="polo" id="polo' + t + '"><div class="ctrl"><div class="cbt icon-game-bt-mute"><svg class="icn-svg"><use xlink:href="#ic-mute"></use></svg></div><div class="cbt icon-game-bt-solo"><svg class="icn-svg"><use xlink:href="#ic-solo"></use></svg></div><div class="cbt icon-game-bt-delete"><svg class="icn-svg"><use xlink:href="#ic-close"></use></svg></div></div></div>');
        var i = new PoloObject(t, $("#box-stage"), contextAudio, contextCanvas, Math.round(o + (1024 - 2 * o - 164) / (nbPoloMax - 1) * t), 80);
        e.push(i)
    }
    return e
}

function creerBoxBonus() {
    for (var e = [], o = 0; o < nbBonus; o++) {
        for (var t = app.bonusarray[o], i = t.code.split(","), n = $("#bt-bonus-" + (o + 1)), a = 0, s = i.length; a < s; a++) {
            var l = app.animearray[i[a] - 1].color;
            $(".svg.q" + (a + 1) + " svg", n).css({
                fill: "#" + l
            })
        }
        var r = new BonusObject(o, t, contextAudio, tabBuffer.bonus[o]);
        e.push(r)
    }
    return e
}
var isToolbarOpen = !1,
    isToolbarMove = !1;

function clickStage(e) {
    e.preventDefault(), clickTool()
}

function enableBtGame() {
    $btBack.on(evtClick, function(e) {
        e.preventDefault(), isToolbarMove || preventAction(clickTool)
    }), $btStop.on(evtClick, function(e) {
        e.preventDefault(), !isToolbarMove && loopOn && preventAction(clickBtStop)
    }), $btRandom.on(evtClick, function(e) {
        e.preventDefault(), isToolbarMove || preventAction(clickBtRandom)
    }), $btRecord.on(evtClick, function(e) {
        e.preventDefault(), isToolbarMove || preventAction(clickBtRecord)
    }), $btHome.on(evtClick, function(e) {
        e.preventDefault(), isToolbarMove || preventAction(clickBtHome)
    }), $btHelp.on(evtClick, function(e) {
        e.preventDefault(), isToolbarMove || preventAction(clickBtHelp)
    }), $btSwitch.on(evtClick, function(e) {
        e.preventDefault(), isToolbarMove || preventAction(clickBtSwitch)
    }), enableBtTool()
}

function enableBtTool() {
    $btTool.on(evtClick, function(e) {
        e.preventDefault(), isToolbarMove || preventAction(clickTool)
    })
}

function clickTool() {
    isToolbarMove = !0, (isToolbarOpen ? closeTool : openTool)()
}

function openTool() {
    deleteFocus(), $gameTouch.on(evtPress, clickStage), addTransition($boxBt, "open", "transform", endToolMove, !0), isToolbarOpen = !0
}

function closeTool() {
    deleteFocus(), $gameTouch.off(), removeTransition($boxBt, "open", "transform", endToolMove), isToolbarOpen = !1
}

function endToolMove() {
    isToolbarMove = !1, onGame && createFocus(isToolbarOpen ? "toolbar-open" : "toolbar")
}

function clickBtStop() {
    stopAllStage()
}

function clickBtHome() {
    backToHome()
}

function clickBtRandom() {
    startRandomMode()
}

function clickBtRecord() {
    startRecordMode()
}

function clickBtHelp() {
    backToHome(popupInfo)
}

function clickBtSwitch() {
    backToHome(popupSwitch)
}

function baisserAllPolo() {
    poloAllVisible = !1;
    for (var e = 0; e < nbPoloMax; e++) {
        listPolo[e].baisser()
    }
}

function afficherAllPolo(e) {
    poloAllVisible = !0;
    for (var o = 0; o < nbPoloMax; o++) {
        listPolo[o].remonte(.03 * o, !1, e)
    }
}

function habillerPolo(e, o, t, i) {
    t = isnull(t) ? 0 : t;
    var n = e,
        a = o,
        s = a.getId(),
        l = tabAnime[s];
    n.habiller(a, cntBoucle, l, t, i), loopOn ? (n.showLoader(), n.activerClick()) : waitingFirstLoop || (modeReplay || modeWatch ? TweenMax.delayedCall(0, afterWaiting) : TweenMax.delayedCall(delayassist / 1e3, afterWaiting), waitingFirstLoop = !0)
}

function afterWaiting() {
    enableClickFirstPolos(), startLoop(), waitingFirstLoop = !1, waitForRecording && startRecording(), enableBtClock()
}

function enableClickFirstPolos() {
    for (var e = 0; e < nbPoloMax; e++) {
        var o = listPolo[e];
        o.getBusy() && o.activerClick()
    }
}

function clickPolo(e) {
    if (!bonusPlaying && !modeRandom) {
        var o = e;
        o.desactiverClick(), getRemainingTime() < delayassist ? listPoloToRemove.push(o) : removePolo(o);
        var t = getListPoloBusy().length;
        0 !== t && t != listPoloToRemove.length || stopLoop()
    }
}

function mutePolo(e) {
    e.mute()
}

function unmutePolo(e) {
    e.unmute()
}

function soloPolo() {
    for (var e = getListPoloBusy(), o = e.length, t = 0; t < o; t++) {
        var i = e[t];
        i.getSolo() ? i.unmute() : i.mute()
    }
}

function muteAll(e) {
    for (var o = getListPoloBusy(), t = o.length, i = 0; i < t; i++) {
        var n = o[i];
        n.getId() != e.getId() ? (n.setSolo(!1), n.mute()) : (n.setSolo(!0), n.unmute())
    }
}

function unmuteAll(e) {
    for (var o = getListPoloBusy(), t = o.length, i = 0; i < t; i++) {
        var n = o[i];
        n.setSolo(!1), listPoloToSolo.push(n)
    }
    getRemainingTime() > delayassist && checkPoloToSolo()
}

function checkPoloToSolo() {
    for (var e = 0, o = listPoloToSolo.length; e < o; e++) {
        listPoloToSolo[e].unmute()
    }
    listPoloToSolo = []
}

function getTotalSolo() {
    for (var e = getListPoloBusy(), o = e.length, t = 0, i = 0; i < o; i++) {
        e[i].getSolo() && t++
    }
    return t
}

function getTotalMute() {
    for (var e = getListPoloBusy(), o = e.length, t = 0, i = 0; i < o; i++) {
        e[i].getMute() && t++
    }
    return t
}

function stopSoloPolo() {
    for (var e = getListPoloBusy(), o = e.length, t = 0; t < o; t++) {
        var i = e[t];
        listPoloToSolo.push(i)
    }
    getRemainingTime() > delayassist && checkPoloToSolo()
}

function stopOtherSolo() {
    for (var e = getListPoloBusy(), o = e.length, t = 0; t < o; t++) {
        e[t].setSolo(!1)
    }
}

function removePolo(e, o, t) {
    checkerCodeBonus(e.getPicto(), !1), 1 == getTotalSolo() && e.getSolo() && (e.setSolo(!1), stopSoloPolo()), e.deshabiller(o, bonusPlaying), e.desactiverClick(), e.stopSound(t);
    var i = getListPoloBusy();
    if (1 == i.length) {
        var n = i[0];
        n.getSolo() && isMouseDevice && !isTouchDevice && n.setSolo(!1)
    }
}

function checkPoloToRemove(e) {
    for (var o = listPoloToRemove.length, t = bonusPlaying ? .01 : .03, i = 0; i < o; i++) removePolo(listPoloToRemove[i], i * t, e);
    listPoloToRemove = []
}
var tabPictoOnDrag = [];

function pictoOnDrag(e) {
    tabPictoOnDrag.push(e.getId()), poloWatchPicto(e);
    for (var o = 0, t = listPoloDrop.length; o < t; o++) "hover" != listPoloDrop[o].getMode() && listPoloDrop[o].mode("regarde")
}

function pictoOnMove(e) {
    poloWatchPicto(e), checkPictoHoverPolo(e)
}

function poloWatchPicto(e) {
    e.getId() === tabPictoOnDrag[0] && (mouseX = e.getBound().px, mouseY = e.getBound().py)
}

function checkPictoHoverPolo(e) {
    for (var o = 0, t = listPoloDrop.length; o < t; o++) {
        var i = listPoloDrop[o];
        i.hitTestPicto(e) ? (i.rollover(), i.pictoHoverId = e.getId()) : i.pictoHoverId == e.getId() && (i.rollout(), i.pictoHoverId = null)
    }
}

function poloStopHover() {
    for (var e = 0, o = listPoloDrop.length; e < o; e++) listPoloDrop[e].rollout(!0)
}

function poloForceDraw() {
    for (var e = 0; e < nbPoloMax; e++) {
        listPolo[e].draw()
    }
}

function pictoOnDrop(e, o) {
    var t = 0,
        i = !!notnull(o) && o,
        n = listPoloDrop.length,
        a = !1;
    if (i || isBackToHome) e.getDiv().removeClass("drag");
    else
        for (t = 0; t < n; t++)
            if (!a) {
                var s = listPoloDrop[t];
                s.hitTestPicto(e) && (a = !0, pictoTouchePolo(s, e))
            } if (a ? (majListPoloDrop(), n = listPoloDrop.length) : e.replacer(), majListPictoOnDrag(e.getId()), 0 == tabPictoOnDrag.length)
        for (t = 0; t < n; t++) listPoloDrop[t].rollout(!0)
}

function pictoForceOnDrop() {
    if (tabPictoOnDrag.length > 0)
        for (var e = 0, o = tabPictoOnDrag.length; e < o; e++) pictoOnDrop(listPicto[tabPictoOnDrag[0]], !0)
}

function majListPictoOnDrag(e) {
    var o = tabPictoOnDrag.indexOf(e);
    o > -1 && tabPictoOnDrag.splice(o, 1)
}

function pictoTouchePolo(e, o, t, i) {
    o.absorber(e), checkerCodeBonus(o, !0), habillerPolo(e, o, t, i), getTotalSolo() > 0 && e.mute()
}

function majListPoloDrop() {
    listPoloDrop = [];
    for (var e = 0; e < nbPoloMax; e++) {
        var o = listPolo[e];
        o.getBusy() || listPoloDrop.push(o)
    }
}
var btClockClickedAt = 0;

function clickBtClock() {
    getTime() - btClockClickedAt > 350 && (pauseGame(), btClockClickedAt = getTime())
}

function enableBtClock() {
    $btClock.off().on(evtClick, function(e) {
        e.preventDefault(), preventAction(clickBtClock)
    }).addClass("enable")
}

function disableBtClock() {
    $btClock.off().removeClass("enable")
}
var curBonus = null;

function clickBtBonus(e) {
    bonusWaiting = !0, curBonus = listBonus[(bonusQueue = e) - 1];
    app.bonusloopA;
    checkSndAspiration(!0);
    var o = decimal(getRemainingTimeBeforeBonus() / 1e3, 2),
        t = o - .5;
    t = t < .5 ? 0 : t, TweenMax.delayedCall(t, showBlackLayerAtStart)
}

function cancelClickBtBonus() {
    bonusWaiting && stopBonusVideo(!1)
}

function showBlackLayerAtStart() {
    $fadeVideo.addClass("animateFadeIn"), modeReplay || modeRandom || (hideDiv($boxPicto, !0), hideDiv($boxLoaderPolo, !0))
}

function waitForSlideUp() {
    var e = getRemainingTime(!1),
        o = Number((e / 1e3).toFixed(1)) - .3;
    TweenMax.delayedCall(o, videoSlideUp)
}

function launchBonusVideo() {
    $fadeVideo.removeClass(), pictoForceOnDrop(), videoSlideDown(), curBonus.play(), bonusWaiting = !1, bonusPlaying = !0
}

function stopBonusVideo(e, o) {
    killTransitionBonus(), o ? reinitBonusVideo(o) : bonusWaiting ? reinitBonusVideo() : bonusPlaying && (e ? ($fadeVideo.addClass("animateFadeIn").one(animationEnd, reinitBonusVideo), videoSlideUp()) : reinitBonusVideo())
}

function killTransitionBonus() {
    TweenMax.killTweensOf(showBlackLayerAtStart), TweenMax.killTweensOf(videoSlideUp)
}

function reinitBonusVideo(e) {
    e = "boolean" == typeof e && e, $fadeVideo.removeClass(), !1 === e && (bonusPlaying && $fadeVideo.addClass("animateFadeOut").one(animationEnd, function(e) {
        $fadeVideo.removeClass()
    }), modeReplay || modeRandom || isMixReplay || (showDiv($boxPicto, !0), showDiv($boxLoaderPolo, !0))), notnull(curBonus) && curBonus.stop(e), reinitBonusVars()
}

function reinitBonusVars() {
    bonusWaiting = !1, bonusPlaying = !1, bonusQueue = 0, cntBoucleBonus = 0, curBonus = null
}

function checkerCodeBonus(e, o) {
    for (var t = e.getId() + 1, i = 0; i < nbBonus; i++) {
        listBonus[i].checkCode(t, o)
    }
}

function videoSlideDown() {
    extendVideo && ($boxBottom.addClass("bottomSlide"), boxPopup.$popup.addClass("bottomSlide"))
}

function videoSlideUp(e) {
    extendVideo && (!0 === e ? $boxBottom.removeClass("bottomSlide").one(transitionEnd, function() {
        $fadeVideo.addClass("animateFadeOut").one(animationEnd, function(e) {
            $fadeVideo.removeClass()
        })
    }) : $boxBottom.removeClass("bottomSlide"), boxPopup.$popup.removeClass("bottomSlide"))
}

function checkUnlockNextBonus() {
    if (!modeReplay && !modeRandom) {
        var e = curBonus.getId(),
            o = "v" + appVersion + "-bonus-complete";
        if (e >= (storage.getItem(o) || 0) && e < nbBonus - 1) {
            var t = e + 1;
            storage.setItem(o, t), listBonus[t].unlockme(), popupBonusFindNext()
        }
    }
}

function showDiv(e, o, t) {
    o ? addTransition(e, "fade", "opacity", t) : e.removeClass("fade"), e.removeClass("hide")
}

function hideDiv(e, o, t) {
    o ? addTransition(e, "fade", "opacity", t) : e.removeClass("fade"), e.addClass("hide")
}
var timenow, timespent, renderRAF, sndMetronome, sndTest, loopOn = !1,
    waitingFirstLoop = !1,
    bonusPlaying = !1,
    bonusWaiting = !1,
    shouldImmediatePlayBonus = !1,
    bonusQueue = 0,
    pause = !1,
    leaveApp = !1,
    boucleA = !0,
    cntBoucle = 0,
    cntBoucleBonus = 0,
    timeremain = 0,
    pctMetronome = 0,
    pctMetronomeBoucleA = 0,
    frame = 0,
    frameTotal = 0,
    frameHalf = 0,
    framePart2 = 0,
    stepAnimation = 0,
    stepPercent = 0,
    currentSndPart = 0,
    startboucle = 0,
    pausedAt = 0;

function loopFinished() {
    checkPoloToRemove(), checkPoloToSolo(), modeRandom && randomMix.loop(), modeReplay && (replayMix.waitForReloop && cntBoucleBonus == nbLoopBonus && (replayMix.waitForReloop = !1, replayMix.reloop = !0), readingBar.loop()), loopOn && startLoop(), modeRecord && readingBar.loop()
}

function startLoop() {
    bonusPlaying && cntBoucleBonus == nbLoopBonus && app.bonusendloopA && !boucleA && (boucleA = !0), 0 == cntBoucle && keepAppAwake(), startboucle = getTime(), loopOn = !0, frame = 0, boucleA ? (framePart2 = 0, currentSndPart = 0) : (framePart2 = frameHalf, currentSndPart = 1), clock.start(loopDuration, boucleA), clock.checkAtEnd(), sndMetronome.prepare(tabBuffer.metro[0].snd), modeReplay && readingBar.isLastLoop() ? sndMetronome.onComplete(readingBar.loop) : sndMetronome.onComplete(loopFinished), (bonusWaiting || bonusPlaying) && playBonus(), bonusPlaying || playSounds(), checkSndAspiration(), sndMetronome.play(), cntBoucle++, boucleA = !boucleA
}

function checkSndAspiration(e) {
    bonusWaiting && (e ? (boucleA || !app.bonusloopA) && getRemainingTime() > 600 && curBonus.playAspiration(decimal(getTimeSpent() / 1e3, 2)) : boucleA || curBonus.playAspiration(0))
}

function stopLoop() {
    loopOn = !1, boucleA = !0, cntBoucle = 0, currentSndPart = 0, clock.stop(), stopBonusVideo(!0), checkPoloToRemove(bonusPlaying), sndMetronome.stop(), disableBtClock(), modeRecord && stopRecordMode(), modeReplay && stopReplayMode(), stopKeepingAppAwake()
}

function playBonus() {
    var e = !app.bonusloopA || boucleA;
    modeReplay && (e = !!replayMix.waitForReloop || e), e && !bonusPlaying && (launchBonusVideo(), hidePoloLoader()), bonusPlaying && (++cntBoucleBonus == nbLoopBonus && waitForSlideUp(), cntBoucleBonus > nbLoopBonus && (checkUnlockNextBonus(), stopBonusVideo()))
}

function playSounds() {
    for (var e = 0; e < nbPoloMax; e++) {
        var o = listPolo[e];
        o.getBusy() && (o.waitOneLoop ? (o.showLoader(), o.waitOneLoop = !1) : playSoundPolo(o))
    }
}

function playSoundPolo(e) {
    var o = e,
        t = 0 == currentSndPart ? "sndA" : "sndB";
    o.sound.prepare(tabBuffer.sound[o.getAssetId()][t]), o.hideLoader(), o.getMute() || o.getHide() || o.mode("anime"), o.playSound()
}

function pauseAudioSource() {
    if (!bonusPlaying)
        for (var e = 0; e < nbPoloMax; e++) {
            var o = listPolo[e];
            o.getPlaying() && o.sound.pause()
        }
    sndMetronome.pause()
}

function unpauseAudioSource() {
    if (!bonusPlaying)
        for (var e = 0; e < nbPoloMax; e++) {
            var o = listPolo[e];
            o.getPlaying() && o.sound.unpause()
        }
    sndMetronome.unpause()
}

function renderLoop() {
    if (timenow = getTime(), timespent = getTimeSpent(), timeremain = getTimeRemain(), pctMetronome = timespent * stepPercent, pctMetronomeBoucleA = app.bonusloopA ? decimal(100 - (pctMetronomeBoucleA = getRemainingTime(!boucleA) * stepPercent) / 2, 2) : pctMetronome, frame = Math.floor(timespent * stepAnimation), clock.render(), readingBar.render(), isnull(curBonus) || bonusPlaying && curBonus.render(), !bonusPlaying) {
        isAnimeHD ? contextCanvas.clearRect(0, 0, 2048, 800) : contextCanvas.clearRect(0, 0, 1024, 400);
        for (var e = 0; e < nbPoloMax; e++) listPolo[e].draw()
    }
}

function stopAllStage() {
    pictoForceOnDrop();
    for (var e = getListPoloBusy(), o = 0, t = e.length; o < t; o++) {
        var i = e[o];
        listPoloToRemove.push(i)
    }
    var n = 0;
    for (t = listBonus.length; n < t; n++) {
        listBonus[n].reinit()
    }
    stopLoop()
}

function pauseGame() {
    if (pause) {
        removeInArray("game-paused", focusHistory), createFocus(focusHistory[focusHistory.length - 1]), pause = !1;
        var e = getTime() - pausedAt;
        startboucle += e, $body.removeClass("pause"), isComputer && isToolbarOpen && $body.removeClass("toolBarOpened"), froze ? controlTimeoutComplete() : (clock.resume(), TweenMax.resumeAll(), isnull(curBonus) || curBonus.resume(), unpauseAudioSource(), renderRAF.start())
    } else pause = !0, pausedAt = getTime(), $body.addClass("pause"), isComputer && isToolbarOpen && $body.addClass("toolBarOpened"), froze ? clearTimeout(controlTimeout) : (clock.pause(), renderRAF.stop(), TweenMax.pauseAll(), pictoForceOnDrop(), poloForceDraw(), pauseAudioSource(), isnull(curBonus) || curBonus.pause()), createFocus("game-paused")
}

function onPause() {
    leaveApp = !0, lock(), $body.addClass("pause"), notnull(renderRAF) && renderRAF.stop(), TweenMax.killTweensOf(onResumeComplete), onGame && (TweenMax.pauseAll(), loopOn && !pause && (pausedAt = getTime(), clock.pause(), pauseAudioSource(), notnull(curBonus) && curBonus.pause()))
}

function onResume() {
    leaveApp = !1, notnull(renderRAF) && renderRAF.stop(), TweenMax.killTweensOf(onResumeComplete), TweenMax.delayedCall(1, onResumeComplete)
}

function onResumeComplete() {
    checkStateAudioContext(), pause || $body.removeClass("pause"), isAndroid && (isAnimeHD ? $("#cnvGame").attr("width", "2049").attr("width", "2048") : $("#cnvGame").attr("width", "1025").attr("width", "1024")), onGame && (pictoForceOnDrop(), poloForceDraw(), loopOn && !pause && (startboucle += getTime() - pausedAt, clock.resume(), unpauseAudioSource(), TweenMax.resumeAll(), notnull(curBonus) && curBonus.resume()), pause || renderRAF.start()), unlock()
}

function hidePoloLoader() {
    for (var e = getListPoloBusy(), o = 0, t = e.length; o < t; o++) e[o].hideLoader()
}
var froze = !1;

function frozeScene() {
    pause || froze || (froze = !0, loopOn = !1, sndMetronome.stop(), immediateKillAllPolo(), replayMix.stop(), readingBar.froze(), renderRAF.stop(), isIOS || (mainCanvas.saveImage(), mainCanvas.showImage()), notnull(curBonus) && (bonusWaiting ? stopBonusVideo(!1, !0) : bonusPlaying && (killTransitionBonus(), curBonus.pause())))
}

function unfrozeScene(e) {
    !pause && froze && (froze = !1, bonusPlaying && (stopBonusVideo(!1, !0), extendVideo ? ($fadeVideo.addClass("show"), videoSlideUp(!0)) : $fadeVideo.addClass("animateFadeOut").one(animationEnd, function(e) {
        $fadeVideo.removeClass()
    })), replayMix.loop(e), renderRAF.start(), readingBar.unfroze(), shouldImmediatePlayBonus && (shouldImmediatePlayBonus = !1, replayMix.waitForReloop = !0, startLoop()), isIOS || mainCanvas.showImage())
}

function immediateKillAllPolo() {
    for (var e = getListPoloBusy(), o = 0, t = e.length; o < t; o++) checkerCodeBonus(e[o].getPicto(), !1), e[o].stopSound(!0), e[o].deshabiller(0, !0), e[o].desactiverClick()
}

function immediatePlayBonus(e, o) {
    shouldImmediatePlayBonus = !0, bonusWaiting = !0, (curBonus = listBonus[bonusQueue = e]).prepareVideo(o), cntBoucleBonus = o - 1
}

function showPoloAndPictoInCombo(e) {
    for (var o = getListPoloBusy(), t = listBonus[e - 1], i = [], n = 0, a = o.length; n < a; n++) {
        var s = o[n].getPicto().getId();
        t.hasCode(s + 1) && i.push(o[n].getId())
    }
    showPoloInArray(i), showPictoInCombo(e)
}

function showPoloFromPicto(e) {
    showPoloInArray(e)
}

function showPoloInArray(e) {
    TweenMax.killTweensOf(stopShowPoloInArray);
    var o = getListPoloBusy();
    if (o.length > 1)
        for (var t = 0, i = o.length; t < i; t++) {
            var n = o[t];
            existInArray(e, n.getId()) ? n.getHide() && n.stopHidingYourself() : n.hideYourself()
        }
}

function stopShowingPoloInArray(e) {
    var o = getListPoloHidden(),
        t = e || 0,
        i = decimal((getTime() - t) / 1e3, 2) < 1 ? 1 : .1;
    TweenMax.delayedCall(i, stopShowPoloInArray, [o])
}

function stopShowPoloInArray(e) {
    for (var o = 0, t = e.length; o < t; o++) e[o].stopHidingYourself();
    stopShowPictoInCombo()
}

function showPictoInCombo(e) {
    stopShowPictoInCombo();
    for (var o = listBonus[e - 1].getCode(), t = o.length, i = 0, n = listPicto.length; i < n; i++)
        for (var a = listPicto[i], s = 0; s < t; s++) existInArray(o, a.getId() + 1) || a.getDiv().addClass("hideYourself")
}

function stopShowPictoInCombo() {
    for (var e = 0, o = listPicto.length; e < o; e++) listPicto[e].getDiv().removeClass("hideYourself")
}

function getStringDate(e, o) {
    e = -1 == e.indexOf("/") ? e.split("-").join("/") : e;
    var t = new Date(e);
    if (o) {
        var i = t.getHours(),
            n = t.getMinutes(),
            a = t.getSeconds();
        return i = i < 10 ? i = String("0" + i) : String(i), n = n < 10 ? n = String("0" + n) : String(n), a = a < 10 ? a = String("0" + a) : String(a), String(i + ":" + n + ":" + a)
    }
    var s = t.getDate(),
        l = t.getMonth(),
        r = t.getFullYear(),
        c = s + " " + STR("txt.months")[l] + " " + r;
    return "zh-cn" != currentLanguage.toLowerCase() && "zh-tw" != currentLanguage.toLowerCase() || (c = r + " 年 " + (l + 1) + " 月 " + s + " 日"), c
}

function getTimeSpent(e) {
    return loopOn || e ? timenow - startboucle : 0
}

function getTimeRemain() {
    return loopDuration - getTimeSpent()
}

function getRemainingTime(e) {
    return (e = void 0 !== e && e) ? 2 * loopDuration - (getTime() - startboucle) : loopDuration - (getTime() - startboucle)
}

function getRemainingTimeBeforeBonus() {
    return getRemainingTime(!!app.bonusloopA && !boucleA)
}

function getRandomObject(e) {
    var o = Math.floor(Math.random() * e.length);
    return e.splice(o, 1)[0]
}

function isStageFull() {
    return getListPoloBusy().length == nbPoloMax
}

function isAllPoloWaiting() {
    return 0 === getListPoloBusy().length
}

function getListPoloBusy() {
    for (var e = [], o = 0; o < nbPoloMax; o++) {
        var t = listPolo[o];
        t.getBusy() && e.push(t)
    }
    return e
}

function getListPoloUnmute() {
    for (var e = [], o = getListPoloBusy(), t = 0, i = o.length; t < i; t++) {
        var n = o[t];
        n.getMute() || e.push(n)
    }
    return e
}

function getListPoloFree() {
    for (var e = [], o = 0; o < nbPoloMax; o++) {
        var t = listPolo[o];
        t.getBusy() || e.push(t)
    }
    return e
}

function getListPictoBusy() {
    for (var e = [], o = 0; o < nbSound; o++) {
        var t = listPicto[o];
        t.use && e.push(t)
    }
    return e
}

function getListPictoFree() {
    for (var e = [], o = 0; o < nbSound; o++) {
        var t = listPicto[o];
        t.use || e.push(t)
    }
    return e
}

function getListPoloHidden() {
    for (var e = [], o = getListPoloBusy(), t = 0, i = o.length; t < i; t++) {
        var n = o[t];
        n.getHide() && e.push(n)
    }
    return e
}

function lock() {
    $lockAll.addClass("show"), pictoForceOnDrop()
}

function unlock() {
    $lockAll.removeClass("show")
}

function keepAppAwake() {
    trustAppMobile && notnull(window.plugins.insomnia) && window.plugins.insomnia.keepAwake(function() {}, function() {})
}

function stopKeepingAppAwake() {
    trustAppMobile && notnull(window.plugins.insomnia) && window.plugins.insomnia.allowSleepAgain(function() {}, function() {})
}
var onlineList = {},
    mixToWatch = null,
    mixToShare = null,
    XHRmemotime = {},
    listByDay = [],
    listByWeek = [],
    listByMonth = [],
    listByYear = [],
    listLatest = [],
    listSearch = [],
    lastFilter = "",
    scrollPosY = 0,
    $lineOpened = null,
    lineClicked = null,
    showLastMix = !1,
    totalNumberMix = 0,
    cntClickWatch = 0,
    showLikeNotif = !1;

function initMixlist() {
    $poplist = $mixlist.$pop, $mixlist.$bck.fadeIn = fadeInBck, $mixlist.$bck.fadeOut = fadeOutBck, $("#list-search .spinner-box", $poplist).hide()
}

function checkLikeNotification(e) {
    if (!isSafeMode()) {
        e && delete XHRmemotime.mymix;
        hasNetwork && moreThanSecond(5, !1, "mymix") && localMixObject.getStatMixOnline(function() {
            for (var e = localMixObject.getMixlist(), o = 0, t = e.length; o < t; o++)
                if (parseInt(e[o].newnblike) > parseInt(e[o].nblike)) {
                    addLikeNotif();
                    break
                }
        })
    }
}

function addLikeNotif() {
    showLikeNotif || (showLikeNotif = !0, $("#home-bt-list").addClass("addnotif"), $("#tab-mixlist").addClass("addnotif"), $("#bt-mymix").addClass("addnotif"))
}

function removeLikeNotif() {
    showLikeNotif && (showLikeNotif = !1, $("#home-bt-list").removeClass("addnotif"), $("#tab-mixlist").removeClass("addnotif"), $("#bt-mymix").removeClass("addnotif"))
}

function fadeInBck(e) {
    e ? this.addClass("mini") : this.removeClass("mini"), this.addClass("animateFadeIn")
}

function fadeOutBck() {
    this.addClass("animateFadeOut").one(animationEnd, function(e) {
        $(e.target).removeClass("animateFadeIn animateFadeOut")
    })
}

function isTabOpen(e) {
    return $poplist.find(".tab.active").attr("id") == e
}

function openPlaylist(e, o, t) {
    lock(), showLastMix = !0 === t, "mymix" == e || !hasNetwork || isSafeMode() ? ("mymix" == e && delete XHRmemotime.mymix, openTabMixlist()) : "top50" == e ? openTabTop50() : openTabLatest(), $mixlist.addClass("show"), $mixlist.$bck.fadeIn(), !0 === o ? enableMixlist() : $poplist.addClass("open").one(animationEnd, enableMixlist), saveGA("popup", "open_playlist")
}

function enableMixlist() {
    unlock(), createFocus("popup-playlist"), Spinner.reset(), $poplist.addClass("opened"), $poplist.removeClass("open"), $mixlist.$bck.on(evtClick, clickPlaylistBck), isiPhone4s || isSafeMode() || loadTop50(!1)
}

function clickPlaylistBck(e) {
    e.preventDefault();
    var o = notnull((e = ~e.type.indexOf("touch") ? e.originalEvent : e).targetTouches) ? e.targetTouches[0] : e;
    Math.round(o.pageY) > 100 * stageScale && closePlaylist()
}

function closePlaylist() {
    focusHistory = [], deleteFocus(), $mixlist.$bck.off(), lock(), $mixlist.$bck.fadeOut(), $poplist.removeClass("opened"), $poplist.addClass("close").one(animationEnd, hideMixlist)
}

function hideMixlist() {
    closeLine($lineOpened), unactiveFilter(), $poplist.removeClass("open close"), $mixlist.removeClass("show"), $(".tab", $poplist).removeClass("active"), blurAll(), unlock(), createFocus("home")
}

function clickBtMore(e) {
    var o = $(e),
        t = null !== $lineOpened ? $lineOpened.index() : -1;
    toggleLine($lineOpened), t != o.index() && toggleLine(o)
}

function toggleLine(e) {
    null !== e && (e.hasClass("animateOpen") ? (e.removeClass("animateOpen").addClass("animateClose").one(animationEnd, function() {
        e.removeClass("animateClose")
    }), $lineOpened = null, removeInArray("playlist-line-open", focusHistory), createFocus("playlist-boxline", null, e.index())) : (e.removeClass("animateClose").addClass("animateOpen"), $lineOpened = e, createFocus("playlist-line-open")))
}

function closeLine(e) {
    null !== e && (e.removeClass("animateOpen").removeClass("animateClose"), $lineOpened = null)
}

function clickBtShare(e) {
    e.preventDefault();
    var o = $(this),
        t = o.parent().parent().attr("data-key").replace("mix-", "");
    notnull(mixToShare = searchMixInCurrentList(t)) ? socialSharing("global", o) : boxDialog.open(STR("pop.notFoundText"), STR("pop.notFoundTitle"), [STR("bt.ok")], [function() {
        Spinner.reset()
    }])
}

function clickBtLink(e) {
    e.preventDefault();
    var o = $(this),
        t = o.parent().parent().attr("data-key").replace("mix-", "");
    notnull(mixToShare = searchMixInCurrentList(t)) ? socialSharing("clipboard", o) : boxDialog.open(STR("pop.notFoundText"), STR("pop.notFoundTitle"), [STR("bt.ok")], [function() {
        Spinner.reset()
    }])
}

function clickBtFav(e) {
    e.preventDefault();
    var o = $(this).parent().parent(),
        t = o.attr("data-key"),
        i = t.replace("mix-", ""),
        n = t.replace("mix-", "fav-"),
        a = searchMixInCurrentList(i);
    notnull(a) && (isMixInFav(a) ? ($(".boxline .isfavoris[data-key='" + t + "']").removeClass("isfavoris"), localMixObject.deleteMix(n)) : (o.addClass("isfavoris"), localMixObject.saveMix(a, !0)), fillPoplistMyfav())
}

function searchMixInCurrentList(e) {
    var o, t = getActiveTab(),
        i = e.replace("mix-", "");
    switch (t) {
        case "latest":
            o = getMixInArray(i, listLatest, "link");
            break;
        case "top50":
            switch (lastFilter) {
                case "day":
                    o = getMixInArray(i, listByDay, "link");
                    break;
                case "week":
                    o = getMixInArray(i, listByWeek, "link");
                    break;
                case "month":
                    o = getMixInArray(i, listByMonth, "link");
                    break;
                case "year":
                    o = getMixInArray(i, listByYear, "link")
            }
            break;
        case "mixlist":
            switch (lastFilter) {
                case "mymix":
                    o = getMixInArray(i, localMixObject.getMixlist(), "link");
                    break;
                case "myfav":
                    o = getMixInArray(i, localMixObject.getFavlist(), "link")
            }
            break;
        case "search":
            o = getMixInArray(i, listSearch, "link")
    }
    return o
}

function clickBtDelete(e) {
    e.preventDefault();
    var o = $(this),
        t = o.parent().parent(),
        i = searchMixInCurrentList(t.attr("data-key").replace("mix-", ""));
    Spinner.add(o), i.online ? hasNetwork ? boxDialog.open(STR("pop.deleteText"), STR("pop.deleteTitle"), [STR("bt.yes"), STR("bt.no")], [function() {
        deleteMixConfirm(o, t, i)
    }, function() {
        unlock(), Spinner.reset()
    }]) : boxDialog.open(STR("pop.noNetworkText"), STR("pop.noNetworkTitle"), [STR("bt.ok")], [function() {
        unlock(), Spinner.reset()
    }]) : boxDialog.open(STR("pop.deleteText"), STR("pop.deleteTitle"), [STR("bt.yes"), STR("bt.no")], [function() {
        deleteMixConfirm(o, t, i)
    }, function() {
        unlock(), Spinner.reset()
    }])
}

function deleteMixConfirm(e, o, t) {
    if (localMixObject.deleteMix("mix-" + t.link)) {
        localMixObject.deleteMix("fav-" + t.link), $("#list-mymix .boxline .line[data-key='mix-" + t.link + "']").remove(), $("#list-myfav .boxline .line[data-key='mix-" + t.link + "']").remove();
        var i = localMixObject.getMixlist().length;
        i <= 5 && $("#list-mymix", $poplist).scrollTop(0), 0 == i && $("#list-mymix .boxinfo", $poplist).html(STR("txt.mixlistEmpty")), unlock(), createFocus("playlist-boxline")
    } else boxDialog.open(STR("pop.deleteBugText"), STR("pop.notFoundTitle"), [STR("bt.ok")], [function() {
        unlock()
    }]);
    Spinner.reset(), t.online && $.ajax({
        type: "POST",
        url: domainOnline + "ph2/delete-mix-db.php",
        data: {
            uuid: jsonEncode(getListUUID()),
            mixid: t.id,
            mixlink: t.link
        },
        dataType: "json",
        crossdomain: !0,
        success: function(e) {
            "success" == e.state ? saveGA("mix", "delete_db", t.link) : saveGA("mix", "delete_db_failed", t.link)
        },
        error: function(e) {
            saveGA("mix", "delete_db_error", t.link)
        }
    })
}

function clickBtDownload(e) {
    e.preventDefault();
    var o = $(this),
        t = o.parent().parent().attr("data-key").replace("mix-", "");
    notnull(mixToShare = searchMixInCurrentList(t)) ? appDesktop ? socialSharingOk("download") : hasNetwork ? socialSharing("download", o) : boxDialog.open(STR("pop.noNetworkText"), STR("pop.noNetworkTitle"), [STR("bt.ok")]) : boxDialog.open(STR("pop.notFoundText"), STR("pop.notFoundTitle"), [STR("bt.ok")], [function() {
        Spinner.reset()
    }])
}

function clickBtRecover(e) {
    e.preventDefault();
    var o = $(this);
    boxDialog.open(STR("pop.recoverMixText"), STR("pop.recoverMixTitle"), [STR("bt.yes"), STR("bt.no")], [function() {
        recoverMixConfirm(o)
    }, function() {
        unlock()
    }])
}

function recoverMixConfirm(e) {
    var o = e,
        t = o.parent().parent(),
        i = searchMixInCurrentList(t.attr("data-key").replace("mix-", ""));
    if (notnull(i) && (i.mymix = !0, i.online = !0, localMixObject.saveMix(i))) {
        delete XHRmemotime.mymix, t.removeClass("isrecover").addClass("ismymix"), cssAnimate(t.find(".boxstat.mymix .bck"), "popIn"), o.off(), closeLine($lineOpened);
        var n = t.find(".box-action"),
            a = n.find(".bt").length;
        n.removeClass("_" + a + "buttons"), n.addClass("_" + (a - 1) + "buttons"), o.remove()
    }
}

function closeAllTab() {
    $(".tab", $poplist).removeClass("active"), $("#top50box", $poplist).css({
        display: "none"
    }), $("#searchbox", $poplist).css({
        display: "none"
    }), $("#mixlistbox", $poplist).css({
        display: "none"
    }), $(".scrollbox .scroll", $poplist).css({
        display: "none"
    }), unactiveFilter()
}

function clickBtFilter(e) {
    notnull(e) && e.preventDefault(), activeFilter($(this).attr("id").split("-")[1])
}

function activeFilter(e) {
    lastFilter != e && ("" !== lastFilter && unactiveFilter(), lastFilter = e, $("#bt-" + lastFilter, $poplist).addClass("active"), $("#list-" + lastFilter, $poplist).css({
        display: "block"
    }).scrollTop(0)), createFocus("playlist-boxline")
}

function unactiveFilter() {
    closeLine($lineOpened), $("#bt-" + lastFilter, $poplist).removeClass("active"), $("#list-" + lastFilter, $poplist).scrollTop(0).css({
        display: "none"
    }), lastFilter = ""
}

function getActiveTab() {
    var e = $poplist.find(".tab.active").attr("id");
    if (notnull(e)) return e.replace("tab-", "")
}

function clickBtFilterMymix(e) {
    notnull(e) && e.preventDefault(), closeLine($lineOpened), activeFilter("mymix"), getMymixList()
}

function clickBtFilterMyfav(e) {
    notnull(e) && e.preventDefault(), closeLine($lineOpened), activeFilter("myfav"), getMyfavList()
}

function clickBtTabMixlist(e) {
    e.preventDefault(), openTabMixlist()
}

function openTabMixlist(e) {
    notnull(e) && e.preventDefault(), blurAll();
    var o = $("#tab-mixlist", $poplist);
    o.hasClass("active") ? $("#list-" + lastFilter, $poplist).scrollTop(0) : (closeAllTab(), clickBtFilterMymix(), getMyfavList(), o.addClass("active"), $("#mixlistbox", $poplist).css({
        display: "block"
    })), isSafeMode() ? createFocus("playlist-boxline") : createFocus("playlist-boxfilter")
}

function getMymixList() {
    localMixObject.getMixlist().length > 0 ? (fillPoplistMymix(), hasNetwork ? (moreThanSecond(2, !1, "mymix") ? (showSpinMixlist(), localMixObject.getStatMixOnline(updateStatsMix)) : showLikeNotif ? setTimeout(updateStatsMix, 750) : updateStatsMix(!0), $("#list-mymix .boxinfo", $poplist).html(STR("txt.mixlistInfo").replace("%{date_time}", 2))) : $("#list-mymix .boxinfo", $poplist).html(STR("txt.mixlistNoCo"))) : $("#list-mymix .boxinfo", $poplist).html(STR("txt.mixlistEmpty")), $("#list-mymix .spinner-box", $poplist).hide()
}

function updateStatsMix(e) {
    for (var o = localMixObject.getMixlist(), t = 0, i = o.length; t < i; t++) notnull(o[t].newnblike) && notnull(o[t].newnbview) && (o[t].nblike == o[t].newnblike && o[t].nbview == o[t].newnbview || (refreshStatsAnim($("#list-mymix .boxline .line[data-key='mix-" + o[t].link + "']"), o[t], e), o[t].nblike = o[t].newnblike, o[t].nbview = o[t].newnbview, localMixObject.saveMix(o[t]))), delete o[t].newnblike, delete o[t].newnbview;
    removeLikeNotif(), hideSpinMixlist()
}

function refreshStatsAnim(e, o, t) {
    var i = !!notnull(t) && t,
        n = e.find(".stat .boxstat.liked .txt"),
        a = e.find(".stat .boxstat.liked .bck"),
        s = e.find(".stat .boxstat.viewed .txt"),
        l = e.find(".stat .boxstat.viewed .bck"),
        r = parseInt(o.nblike),
        c = parseInt(o.newnblike),
        u = c > r ? 1 : -1,
        p = Math.abs(c - r),
        d = 0,
        f = 250,
        m = 1 == p;
    if (i) n.text(numberSpaced(o.newnblike)), s.text(numberSpaced(o.newnbview));
    else {
        s.text(numberSpaced(o.newnbview)), cssAnimate(l, "statBounceEnd");
        for (var h = 0; h < p; h++) {
            if (0 == h && cssAnimate(a, "statBounce"), m) {
                setTimeout(function() {
                    a.removeClass("statBounce"), cssAnimate(a, "statBounceEnd"), n.text(numberSpaced(c))
                }, d);
                break
            }
            setTimeout(function() {
                r += u, n.text(numberSpaced(r))
            }, d), d += f = (f -= 10) <= 10 ? 10 : f, (h == p - 2 || h >= 50) && (m = !0)
        }
    }
}

function fillPoplistMymix() {
    var e = localMixObject.getMixlist();
    if (unbindLine("#list-mymix"), e.length > 0) {
        var o = generateHtml("#list-mymix", e, generateLineMix, "mymix");
        if ($("#list-mymix .boxline", $poplist).html(o[0]), $("#list-mymix .boxinfo", $poplist).html(STR("txt.mixlistInfo").replace("%{date_time}", "5")), bindLine("#list-mymix"), showLastMix) {
            showLastMix = !1;
            var t = $("#list-mymix .boxline .box-info", $poplist).first();
            t.addClass("bckFlash"), TweenMax.delayedCall(.2, function() {
                t.removeClass("bckFlash"), createFocus("playlist-boxline")
            })
        }
    } else $("#list-mymix .boxline", $poplist).empty(), $("#list-mymix .boxinfo", $poplist).html(STR("txt.mixlistEmpty"));
    $("#list-mymix .spinner-box", $poplist).hide()
}

function getMyfavList() {
    $("#list-myfav .spinner-box", $poplist).show();
    var e = !1;
    localMixObject.getFavlist().length > 0 && (e = !0, hasNetwork && moreThanSecond(15, !1, "myfav") && (e = !1, localMixObject.getStatFavOnline(fillPoplistMyfav))), e && fillPoplistMyfav(), $("#list-myfav .spinner-box", $poplist).hide()
}

function fillPoplistMyfav() {
    var e = localMixObject.getFavlist();
    if (unbindLine("#list-myfav"), e.length > 0) {
        var o = generateHtml("#list-myfav", e, generateLineMix, "myfav");
        $("#list-myfav .boxline", $poplist).html(o[0]), bindLine("#list-myfav")
    } else $("#list-myfav .boxline", $poplist).empty()
}

function showSpinMixlist() {
    $tabMixlist.addClass("spin"), $tabMixlist.find("svg use").attr("xlink:href", "#ic-loader-mini")
}

function hideSpinMixlist() {
    $tabMixlist.removeClass("spin"), $tabMixlist.find("svg use").attr("xlink:href", "#ic-mixlist-mini")
}

function clickBtTabTop50(e) {
    e.preventDefault(), openTabTop50()
}

function openTabTop50() {
    blurAll();
    var e = $("#tab-top50", $poplist);
    e.hasClass("active") ? $("#list-" + lastFilter, $poplist).scrollTop(0) : (closeLine($lineOpened), closeAllTab(), loadTop50(), activeFilter("day"), e.addClass("active"), $("#top50box", $poplist).css({
        display: "block"
    })), createFocus("playlist-boxfilter")
}

function fillPoplistTop50(e) {
    clearPoplistTop50();
    var o = generateHtml("#list-day", onlineList.listDay, generateLineTop50);
    $("#list-day .boxline", $poplist).html(o[0]), listByDay = o[1], bindLine("#list-day"), $("#list-day .boxinfo", $poplist).html(STR("txt.top50Info")), o = generateHtml("#list-week", onlineList.listWeek, generateLineTop50), $("#list-week .boxline", $poplist).html(o[0]), listByWeek = o[1], bindLine("#list-week"), $("#list-week .boxinfo", $poplist).html(STR("txt.top50Info")), o = generateHtml("#list-month", onlineList.listMonth, generateLineTop50), $("#list-month .boxline", $poplist).html(o[0]), listByMonth = o[1], bindLine("#list-month"), $("#list-month .boxinfo", $poplist).html(STR("txt.top50Info")), o = generateHtml("#list-year", onlineList.listYear, generateLineTop50), $("#list-year .boxline", $poplist).html(o[0]), listByYear = o[1], bindLine("#list-year"), $("#list-year .boxinfo", $poplist).html(STR("txt.top50Info")), hideSpinTop50()
}

function clearPoplistTop50() {
    unbindLine("#list-day"), listByDay = [], unbindLine("#list-week"), listByWeek = [], unbindLine("#list-month"), listByMonth = [], unbindLine("#list-year"), listByYear = []
}

function showSpinTop50() {
    $("#list-day .spinner-box", $poplist).show(), $("#list-week .spinner-box", $poplist).show(), $("#list-month .spinner-box", $poplist).show(), $("#list-year .spinner-box", $poplist).show(), $tabTop50.addClass("spin"), $tabTop50.find("svg use").attr("xlink:href", "#ic-loader-mini")
}

function hideSpinTop50() {
    $("#list-day .spinner-box", $poplist).hide(), $("#list-week .spinner-box", $poplist).hide(), $("#list-month .spinner-box", $poplist).hide(), $("#list-year .spinner-box", $poplist).hide(), $tabTop50.removeClass("spin"), $tabTop50.find("svg use").attr("xlink:href", "#ic-trophy-mini")
}

function clickBtTabLatest(e) {
    e.preventDefault(), openTabLatest()
}

function openTabLatest() {
    blurAll();
    var e = $("#tab-latest", $poplist);
    e.hasClass("active") ? (createFocus("playlist-boxline"), $("#list-latest", $poplist).scrollTop(0)) : (closeLine($lineOpened), closeAllTab(), loadLatest(), e.addClass("active"), $("#list-latest", $poplist).css({
        display: "block"
    }).scrollTop(0))
}

function reinitLatestList() {
    listLatest.length > 0 && (listLatest = [], $("#list-latest .boxline", $poplist).empty(), delete XHRmemotime.latest)
}

function loadLatest() {
    hasNetwork ? moreThanSecond(1, !1, "latest") ? (showSpinLatest(), unbindLine("#list-latest"), xhr("GET", domainOnline + "ph2/get-mix-list.php?v=" + app.version + "&r=latest", {}, function(e) {
        if ("success" === e.state) {
            XHRmemotime.latest = new Date;
            var o = [],
                t = e.list.length - 1;
            for (var i in e.list) o[t] = jsonDecode(e.list[i]), o[t].dateQuery = e.now, o[t].mymix = !1, t--;
            totalNumberMix = e.total, listLatest = o, fillPoplistLatest()
        }
        hideSpinLatest()
    }, function() {
        hideSpinLatest()
    })) : onlineList.loaded && fillPoplistLatest() : (boxDialog.open(STR("pop.noNetworkText"), STR("pop.noNetworkTitle"), [STR("bt.ok")]), hideSpinLatest())
}

function fillPoplistLatest() {
    unbindLine("#list-latest");
    var e = generateHtml("#list-latest", listLatest, generateLineMix, "latest");
    $("#list-latest .boxline", $poplist).html(e[0]), totalNumberMix > 0 ? $("#list-latest .boxinfo", $poplist).html(STR("txt.latestMixInfo").replace("%{mix_total}", numberSpaced(totalNumberMix)).replace("%{version_name}", app.name)) : $("#list-latest .boxinfo", $poplist).html(STR("txt.latestMixInfo").split("<br>")[0]), bindLine("#list-latest")
}

function showSpinLatest() {
    $("#list-latest .spinner-box", $poplist).show(), $tabLatest.addClass("spin"), $tabLatest.find("svg use").attr("xlink:href", "#ic-loader-mini")
}

function hideSpinLatest() {
    $("#list-latest .spinner-box", $poplist).hide(), $tabLatest.removeClass("spin"), $tabLatest.find("svg use").attr("xlink:href", "#ic-live-mini")
}
var searchInProgress = !1,
    lastFilterSearch = "",
    lastSearch = "";

function clickBtTabSearch(e) {
    e.preventDefault(), openTabSearch()
}

function openTabSearch() {
    blurAll();
    var e = $("#tab-search", $poplist);
    e.hasClass("active") ? $("#list-search", $poplist).scrollTop(0) : (closeLine($lineOpened), closeAllTab(), "" == lastFilterSearch && activeFilterSearch("name"), e.addClass("active"), $("#list-search", $poplist).css({
        display: "block"
    }).scrollTop(0), $("#searchbox", $poplist).css({
        display: "block"
    })), createFocus("playlist-boxfilter")
}

function clickBtFilterSearch(e) {
    if ($poplist.find("form #input-search").hasClass("focused")) return !1;
    notnull(e) && e.preventDefault();
    var o = $(this).attr("id").split("-")[1],
        t = lastFilterSearch;
    $poplist.find("form #input-search").val().split(" ").join("");
    activeFilterSearch(o), o != t && (lastSearch = "", clickBtSearch())
}

function activeFilterSearch(e) {
    lastFilterSearch != e && ("" !== lastFilterSearch && unactiveFilterSearch(), lastFilterSearch = e, $("#bt-" + lastFilterSearch, $poplist).addClass("active"), $("#list-" + lastFilterSearch, $poplist).css({
        display: "block"
    }).scrollTop(0), createFocus("playlist-boxline"))
}

function unactiveFilterSearch() {
    closeLine($lineOpened), $("#bt-" + lastFilterSearch, $poplist).removeClass("active"), $("#list-" + lastFilterSearch, $poplist).scrollTop(0).css({
        display: "none"
    }), lastFilterSearch = ""
}

function clickBtSearch(e) {
    if (notnull(e) && e.preventDefault(), hasNetwork) {
        if (!searchInProgress) {
            var o = $poplist.find("form #input-search"),
                t = o.val().substr(0, 26),
                i = (t = cleanInputText(t, o)).split(" ").join(""),
                n = regexList.classic;
            "" === i ? (lastSearch = "", cleanListSearch()) : n.test(i) ? invalidField(o) : lastSearch != t.toLowerCase() && (lastSearch = t.toLowerCase(), showSpinSearch(), Spinner.add($tabSearch.$btSearch), blurAll(), ajaxSearchMix(t))
        }
    } else boxDialog.open(STR("pop.noNetworkText"), STR("pop.noNetworkTitle"), [STR("bt.ok")])
}

function ajaxSearchMix(e) {
    var o = "search-mix.php?v=" + app.version + "&uuid=" + encodeURIComponent(jsonEncode(getListUUID())) + "&str=" + encodeURIComponent(e) + "&f=" + encodeURIComponent(lastFilterSearch);

    function t() {
        hideSpinSearch(), Spinner.reset(), searchInProgress = !1
    }
    $("#list-search .spinner-box", $poplist).show(), searchInProgress = !0, cleanListSearch(), $.ajax({
        type: "GET",
        url: domainOnline + "ph2/" + o,
        data: {},
        dataType: "json",
        crossdomain: !0,
        success: function(e) {
            if ("success" == e.state) {
                if (0 == e.count);
                else {
                    var o = [];
                    for (var i in e.list) {
                        var n = jsonDecode(e.list[i]);
                        n.dateQuery = e.now, o.push(n)
                    }
                    listSearch = o, unbindLine("#list-search");
                    var a = generateHtml("#list-search", o, generateLineMix, "search");
                    $("#list-search .boxline", $poplist).html(a[0]), bindLine("#list-search")
                }
                var s = e.count <= 1 && notnull(STR("txt.result.one")) ? STR("txt.result.one") : STR("txt.result.other");
                $("#list-search .boxinfo", $poplist).html(s.replace("%{count}", e.count))
            } else boxDialog.open(STR("pop.noCoServerText"), STR("pop.noCoServerTitle"), [STR("bt.ok")]);
            t()
        },
        error: function(e) {
            boxDialog.open(STR("pop.noCoServerText"), STR("pop.noCoServerTitle"), [STR("bt.ok")]), t()
        }
    })
}

function cleanListSearch() {
    unbindLine("#list-search"), $("#list-search .boxline", $poplist).empty(), $("#list-search .boxinfo", $poplist).empty(), listSearch = []
}

function showSpinSearch() {
    $("#list-search .spinner-box", $poplist).show(), $tabSearch.addClass("spin"), $tabSearch.find("svg use").attr("xlink:href", "#ic-loader-mini")
}

function hideSpinSearch() {
    $("#list-search .spinner-box", $poplist).hide(), $tabSearch.removeClass("spin"), $tabSearch.find("svg use").attr("xlink:href", "#ic-search-mini")
}

function generateHtml(e, o, t, i) {
    for (var n = "", a = [], s = 0, l = o.length; s < l; s++) {
        var r = o[s];
        a.push(r), n += t(r, s, i)
    }
    return [n, a]
}

function generateLineMix(e, o, t) {
    var i = e || {},
        n = o + 1 || 0,
        a = t || "",
        s = "",
        l = "top50" === a,
        r = "top50" === a || "latest" === a || "search" === a,
        c = "latest" === a || "search" === a,
        u = "mymix" === a && !i.online,
        p = "mymix" === a && "1" == i.private,
        d = "mymix" === a,
        f = "mymix" === a,
        m = trustAppMobile,
        h = ("mymix" === a || "search" === a) && isMixInTop50(i),
        v = ("mymix" === a || "search" === a) && isMixInLatest(i),
        b = "mymix" === a,
        x = "myfav" === a || isMixInFav(i),
        g = "mymix" != a && sameMixInLocal(i),
        k = "search" === a && !g && i.mymix,
        $ = notnull(i.datedb) ? i.datedb : i.date,
        C = "line";
    C += u ? " isoffline" : "", C += p ? " isprivate" : "", C += x ? " isfavoris" : "", C += g ? " ismymix" : "", C += k ? " isrecover" : "", C += h ? " istop50" : "", C += v ? " islatest" : "";
    var D = 3;
    D = m ? D += 1 : D, D = f ? D += 1 : D, D = d ? D += 1 : D;
    D = k ? D += 1 : D;
    return s += "<div data-key='mix-" + i.link + "' " + (b ? "data-mymix='true' " : "") + "class='" + C + "'>", s += "<div class='box-info" + (r ? " country" : "") + (l ? " rating" : "") + "'>", s += l ? "\t<div class='stars'></div>" : "", s += "<div class='num'>" + n + "</div>", s += r ? "<div class='box-flag'><div class='flag flag-" + i.country + "'></div></div>" : "", s += "<span class='name'>" + i.name + "</span>", s += "<span class='title'>" + i.title + "</span>", s += "<span class='date' data-date='" + $ + "'>" + (c ? getTimeAgo($, i.dateQuery) : getStringDate($)) + "</span>", s += "<div class='stat'>", s += "<div class='boxstat private'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-lock-mini'></use></svg></div></div>", s += "<div class='boxstat myfav'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-rate-mini'></use></svg></div></div>", s += "<div class='boxstat mymix'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-user-mini'></use></svg></div></div>", s += "<div class='boxstat recover'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-recover-mini'></use></svg></div></div>", s += "<div class='boxstat top50'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-trophy-mini'></use></svg></div></div>", s += "<div class='boxstat latest'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-live-mini'></use></svg></div></div>", s += "<div class='boxstat liked'><div class='txt'>" + numberSpaced(i.nblike) + "</div><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-like-mini'></use></svg></div></div>", s += "<div class='boxstat viewed'><div class='txt'>" + numberSpaced(i.nbview) + "</div><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-view-mini'></use></svg></div></div>", s += "<div class='boxstat offline'><div class='txt'>" + STR("txt.offline") + "</div><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-nocloud-mini'></use></svg></div></div>", s += "</div>", s += "</div>", s += "<div class='box-action'>", s += k ? "<div class='bt recover'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-downcloud'></use></svg></div><div class='hitzone'></div></div>" : "", s += "<div class='bt watch color'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-eye'></use></svg></div><div class='hitzone'></div></div>", s += "<div class='bt share color'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-share'></use></svg></div><div class='hitzone'></div></div>", s += m ? "<div class='bt link color'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-link'></use></svg></div><div class='hitzone'></div></div>" : "", s += "<div class='bt fav color'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-rate'></use></svg></div><div class='hitzone'></div></div>", s += f ? "<div class='bt download'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-download'></use></svg></div><div class='hitzone'></div></div>" : "", s += d ? "<div class='bt delete'><div class='bck'><svg class='icn-svg'><use xlink:href='#ic-trash'></use></svg></div><div class='hitzone'></div></div>" : "", s += "</div>", s += "</div>"
}

function generateLineTop50(e, o) {
    return generateLineMix(e, o, "top50")
}

function sameMixInLocal(e) {
    return checkMixInArray(e.id, localMixObject.getMixlist())
}

function isMixInFav(e) {
    return existInArrayFromProp(e.link, "link", localMixObject.getFavlist())
}

function isMixInTop50(e) {
    return !(e.mymix && !e.online) && (!!checkMixInArray(e.id, listByDay) || (!!checkMixInArray(e.id, listByWeek) || (!!checkMixInArray(e.id, listByMonth) || !!checkMixInArray(e.id, listByYear))))
}

function isMixInLatest(e) {
    return !(e.mymix && !e.online) && checkMixInArray(e.id, listLatest)
}

function checkMixInArray(e, o, t) {
    for (var i in t = t || "id", o)
        if (e == o[i][t]) return !0;
    return !1
}

function getMixInArray(e, o, t) {
    for (var i in t = t || "id", o)
        if (e == o[i][t]) return o[i]
}

function bindLine(e) {
    var o = $poplist.find(e);
    $(".line", o).on(evtPress, clickLineStart), $(".line", o).on(evtPressEnd, clickLineEnd), $(".box-action", o).on(evtPressEnd, stopProp), $(".bt.watch", o).on(evtClick, clickBtWatch), $(".bt.share", o).on(evtClick, clickBtShare), $(".bt.link", o).on(evtClick, clickBtLink), $(".bt.fav", o).on(evtClick, clickBtFav), $(".bt.recover", o).on(evtClick, clickBtRecover), $(".bt.delete", o).on(evtClick, clickBtDelete), $(".bt.download", o).on(evtClick, clickBtDownload), $mixlist.isOpen() && o.is(":visible") && createFocus("playlist-boxline")
}

function unbindLine(e) {
    if (notnull($poplist)) {
        var o = $poplist.find(e);
        $(".line", o).off(), $(".box-action", o).off(), $(".bt", o).off(), $(".boxline", o).empty()
    }
}

function clickLineStart(e) {
    var o = $(e.currentTarget).parent().parent();
    scrollPosY = o.scrollTop(), lineClicked = $(e.currentTarget)
}

function clickLineEnd(e) {
    e.preventDefault(), $(e.currentTarget).parent().parent().scrollTop() == scrollPosY && lineClicked.attr("data-key") == $(e.currentTarget).attr("data-key") && clickBtMore(e.currentTarget), lineClicked = null
}

function getMixInTab(e) {
    var o = $("#mixlist #poplist .tab.active").attr("id").split("tab-").join(""),
        t = null;
    if ("search" == o) t = listSearch[e];
    else if ("latest" == o) t = listLatest[e];
    else if ("top50" == o) switch (lastFilter) {
        case "day":
            t = listByDay[e];
            break;
        case "week":
            t = listByWeek[e];
            break;
        case "month":
            t = listByMonth[e];
            break;
        case "year":
            t = listByYear[e]
    }
    return t
}

function moreThanSecond(e, o, t) {
    if (isnull(XHRmemotime[t])) return !o || e;
    var i = 60 * e,
        n = new Date,
        a = XHRmemotime[t].getTime() - n.getTime(),
        s = Math.round(Math.abs(a / 1e3));
    return !0 === o ? secToText(1e3 * (i - s)) : s >= i
}
var countCheckLoaded = 0;

function loadTop50(e) {
    var o = !notnull(e) || e;
    !0 !== onlineList.loaded || moreThanSecond(10, !1, "top50") ? hasNetwork ? (showSpinTop50(), unbindLine("#list-top50"), clearPoplistTop50(), xhr("GET", domainOnline + "ph2/top-50-v" + app.version + ".php", {}, function(e) {
        if (TweenMax.killTweensOf(checkIfTop50Loaded), "success" == e.state) {
            XHRmemotime.top50 = new Date, (onlineList = e).loaded = !0;
            STR("bt.day"), STR("bt.week"), STR("bt.month"), STR("bt.year");
            for (var o in onlineList)
                if (o.indexOf("list") > -1) {
                    for (var t in onlineList[o]) onlineList[o][t] = jsonDecode(onlineList[o][t]), onlineList[o][t].mymix = !1, 0;
                    0
                } fillPoplistTop50()
        }
    }), TweenMax.delayedCall(4, checkIfTop50Loaded)) : o && !isTabOpen("tab-mixlist") && (boxDialog.open(STR("pop.noNetworkText"), STR("pop.noNetworkTitle"), [STR("bt.ok")]), hideSpinTop50()) : onlineList.loaded && fillPoplistTop50()
}

function checkIfTop50Loaded() {
    countCheckLoaded++, !0 !== onlineList.loaded && countCheckLoaded < 6 ? (countCheckLoaded++, loadTop50()) : countCheckLoaded = 0
}

function startRandomMode() {
    modeRandom = !0, lock(), closeTool(), hideDiv($boxBtBonus), hideDiv($boxLoaderBonus), hideDiv($boxPicto, !0), hideDiv($boxLoaderPolo, !0), $btTool.off().on(evtClick, function(e) {
        e.preventDefault(), preventAction(stopRandomMode)
    }), $btTool.bounce(), $boxTop.addClass("random"), $btTool.$svg.attr("xlink:href", "#ic-random"), $boxBottom.addClass("random"), $btClock.addClass("random"), $bckGlobal.addClass("random fadeIn"), $lockStage.addClass("show"), TweenMax.delayedCall(.4, lancerRandomMode)
}

function showTextRandom() {
    $watchInfo.$title.html(STR("txt.randomTitle")), $watchInfo.$name.html(STR("txt.randomText")), $watchInfo.addClass("random fadeIn")
}

function lancerRandomMode() {
    showTextRandom(), randomMix.start(loopOn), unlock(), saveGA("game", "random")
}

function stopRandomMode() {
    modeRandom = !1, randomMix.stop(), $btTool.off(), $btTool.bounce(), enableBtTool(), $bckGlobal.removeClass("random fadeIn"), $boxTop.removeClass("random"), $btTool.$svg.attr("xlink:href", "#ic-burger"), $boxBottom.removeClass("random"), $btClock.removeClass("random"), $watchInfo.removeClass("fadeIn"), TweenMax.delayedCall(.4, afterStopRandom)
}

function afterStopRandom() {
    showDiv($boxBtBonus, !0), showDiv($boxLoaderBonus, !0), bonusPlaying || (showDiv($boxPicto, !0), showDiv($boxLoaderPolo, !0)), $watchInfo.removeClass("random"), $lockStage.removeClass("show")
}
var RandomMix = function(e) {
    var o = this;
    this.start = function() {
        o.loop(), o.checkIfPoloMuted()
    }, this.stop = function() {}, this.checkIfPoloMuted = function() {
        for (var e = getListPoloBusy(), o = 0, t = e.length; o < t; o++) {
            var i = e[o];
            i.getMute() && i.unmute()
        }
    }, this.loop = function() {
        var o, t = getListPoloFree(),
            i = getListPoloBusy(),
            n = getListPictoFree(),
            a = getListPictoBusy(),
            s = t.length,
            l = i.length,
            r = (n.length, a.length, 0),
            c = random(6),
            u = random(5),
            p = random(2),
            d = random(5) < 4 ? 2 : 1,
            f = !1,
            m = 0,
            h = "ajouter";
        if (h = p > c ? "rien" : h, h = u > c || 0 === s ? "enlever" : h, h = !loopOn || l <= 1 ? "ajouter" : h, d = !loopOn || l <= 1 ? 1 : d, h = e ? "ajouter" : h, h = e && 0 === s ? "rien" : h, bonusPlaying || bonusWaiting) h = "bonus", cntBoucleBonus == nbLoopBonus && (f = !0, h = "enlever");
        else
            for (r = 0; r < nbBonus; r++) {
                var v = listBonus[r];
                if (v.found) {
                    h = "bonus", v.launchVideo();
                    break
                }
            }
        if ("ajouter" == h) {
            m = Math.round((random(s - 1) + 1) / d);
            var b = [];
            for (r = 0; r < m; r++) o = getRandomObject(t), b.push(o.getId());
            for (b.sort(), r = 0; r < m; r++) {
                pictoTouchePolo(o = listPolo[b[r]], getRandomObject(n), .03 * r), majListPoloDrop()
            }
        } else if ("enlever" == h)
            for (m = Math.round((random(l - 2) + 1) / d), m = f && l - m > 4 ? l - 4 : m, r = 0; r < m; r++)((o = getRandomObject(i)).getLoop() > 2 || f) && removePolo(o, 0);
        if (h != v) {
            l = (i = getListPoloBusy()).length;
            var x = 0;
            for (r = 0; r < l; r++) {
                var g = i[r];
                g.getLoop() > 7 && ++x < l && removePolo(g, 0)
            }
        }
    }
};

function startRecordMode() {
    bonusPlaying ? TweenMax.delayedCall(.25, popupBonusPlaying) : (lock(), modeRecord = !0, waitForRecording = !1, recordMix.init(), readingBar.maxLoop = app.recmaxloop, readingBar.open("record"), closeTool(), $btTool.off().on(evtClick, function(e) {
        e.preventDefault(), preventAction(stopRecordMode)
    }), $btTool.bounce(), $boxTop.addClass("record"), $btTool.$svg.attr("xlink:href", "#ic-live"), loopOn ? lancerRecordMode() : TweenMax.delayedCall(.4, lancerRecordMode))
}

function lancerRecordMode() {
    loopOn ? startRecording() : (waitForRecording = !0, popupDrag()), unlock()
}

function startRecording() {
    waitForRecording = !1, readingBar.start(), saveGA("mix", "start_recording")
}

function stopRecordMode() {
    modeRecord = !1, readingBar.stop(), readingBar.close(), $boxTop.removeClass("record"), $btTool.$svg.attr("xlink:href", "#ic-burger"), $btTool.off(), $btTool.bounce(), enableBtTool(), readingBar.cntLoop < readingBar.minLoop && !waitForRecording && TweenMax.delayedCall(.25, popupShort), readingBar.cntLoop >= readingBar.minLoop && !waitForRecording && (lock(), pictoForceOnDrop(), stopAllStage(), popupRecok())
}
var controlTimeout, RecordMix = function() {
    var e, o, t, i, n, a = this,
        s = decimal(loopDuration / 1e3, 2);
    this.init = function() {
        e = "", o = "", t = !1, i = 0, n = {}
    }, this.setData = function(e) {
        n = e
    }, this.getData = function() {
        return n
    }, this.getXML = function() {
        return e
    }, this.start = function() {
        a.init(), t = !0, a.xmlOpen()
    }, this.loop = function() {
        a.xmlCloseAction(), a.xmlCloseLoop(), i++, a.xmlOpenLoop(), a.xmlOpenAction()
    }, this.stop = function(e) {
        t = !1, a.xmlClose()
    }, this.xmlOpen = function() {
        e = "<mix version='" + build.getInfo().version + "' control='true'>\n", a.xmlOpenLoop(), a.xmlOpenAction()
    }, this.xmlClose = function() {
        a.xmlCloseAction(), a.xmlCloseLoop(), e += "</mix>\n"
    }, this.xmlOpenLoop = function() {
        if (o = "\t<loop boucleA='" + !boucleA + "' count='" + i + "'>\n", o += "\t\t<stage>\n", bonusPlaying) o += "\t\t\t<bonus id='" + (bonusQueue - 1) + "' playing='true' cntBoucle='" + cntBoucleBonus + "' />\n";
        else {
            bonusWaiting && i > 0 && (o += "\t\t\t<bonus id='" + (bonusQueue - 1) + "' waiting='true'/>\n");
            for (var e = 0; e < nbPoloMax; e++) {
                var t = listPolo[e];
                if (t.getBusy()) {
                    var n = "";
                    n = t.getPlaying() || 0 !== t.getMoment() || 0 !== t.getLoop() ? "\t\t\t<polo id='" + t.getId() + "' picto='" + t.getPicto().getId() + "' mute='" + t.getMute() + "' playing='" + t.getPlaying() + "'/>\n" : "\t\t\t<polo id='" + t.getId() + "' picto='" + t.getPicto().getId() + "' mute='" + t.getMute() + "' playing='true'/>\n", o += n
                }
            }
        }
        o += "\t\t</stage>\n"
    }, this.xmlCloseLoop = function() {
        e += o += "\t</loop>\n"
    }, this.xmlOpenAction = function() {
        o += "\t\t<action>\n", 0 === i && bonusWaiting && recordMix.xmlAction("bonus", listBonus[bonusQueue - 1], !0)
    }, this.xmlCloseAction = function() {
        o += "\t\t</action>\n"
    }, this.xmlAction = function(e, i, n) {
        if (t) {
            n = void 0 !== n && n;
            var a = decimal(getTimeSpent(!0) / 1e3, 2),
                l = "";
            "bonus" == e ? l += n ? "\t\t\t<user type='" + e + "' bonus='" + i.getId() + "' when='0.1'/>\n" : "\t\t\t<user type='" + e + "' bonus='" + i.getId() + "' when='" + a + "'/>\n" : (a = a > s - delayassist / 1e3 ? s : a, l += "\t\t\t<user type='" + e + "' polo='" + i.getId() + "' picto='" + i.getPicto().getId() + "' when='" + a + "'/>\n"), o += l
        }
    }
};

function startReplayMode() {
    modeWatch ? startWatchMode() : (modeReplay = !0, lock(), closeTool(), $btTool.off().on(evtClick, function(e) {
        e.preventDefault(), preventAction(stopReplayMode)
    }), $btTool.bounce(), hideDiv($boxBtBonus, !0), hideDiv($boxPicto, !0), hideDiv($boxLoaderPolo, !0), hideDiv($boxLoaderBonus, !0), $boxTop.addClass("replay"), $btTool.$svg.attr("xlink:href", "#ic-close"), $btSave.addClass("visible"), $btSave.on(evtClick, function(e) {
        e.preventDefault(), preventAction(function() {
            Spinner.add($btSave), stopReplayMode(!0)
        })
    }), $lockStage.addClass("show"), TweenMax.delayedCall(.4, lancerReplayMode))
}

function lancerReplayMode() {
    modeWatch || ($watchInfo.addClass("replay fadeIn"), $btTool.$svg.attr("xlink:href", "#ic-close"), $watchInfo.$title.html(STR("txt.replayTitle")), $watchInfo.$name.html(STR("txt.replayText")));
    var e = modeWatch ? mixToWatch.mix : recordMix.getXML();
    replayMix = new ReplayMix(e), readingBar.maxLoop = replayMix.getTotalLoop(), readingBar.bonusList = replayMix.getBonusList(), readingBar.open("play", replayMix.control).start(), TweenMax.delayedCall(.2, function() {
        createFocus("mode-replay"), unlock()
    })
}

function stopReplayMode(e) {
    removeInArray("mode-replay", focusHistory), deleteFocus(), froze || (desactivateControl(), $btTool.off(), modeWatch ? stopWatchMode() : (appBrowserDemo && withAdBreak && callAd("next", "replay-mix-complete"), modeReplay = !1, readingBar.stop().close(), stopAllStage(), $btTool.bounce(), $boxTop.removeClass("replay"), $btTool.$svg.attr("xlink:href", "#ic-burger"), $watchInfo.removeClass("fadeIn"), TweenMax.delayedCall(.4, afterStopReplay), !0 === e ? (Spinner.reset(), appBrowserDemo ? popupGetApp(!0) : popupForm()) : popupRecok()), enableBtTool())
}

function afterStopReplay() {
    showDiv($boxBtBonus, !0), showDiv($boxLoaderBonus, !0), showDiv($boxPicto, !0), showDiv($boxLoaderPolo, !0), $lockStage.removeClass("show"), $watchInfo.removeClass("replay"), $btTool.$svg.attr("xlink:href", "#ic-burger"), $btSave.removeClass("visible")
}

function gotoModeWatch() {
    $boxTop.addClass("replay"), $btTool.$svg.attr("xlink:href", "#ic-close"), $watchInfo.addClass("fadeIn notransition showstat replay"), hideDiv($boxBtBonus), hideDiv($boxPicto), hideDiv($boxLoaderPolo), hideDiv($boxLoaderBonus), $mixlist.hide()
}

function backtoModeWatch() {
    modeWatch = !1, $boxTop.removeClass("replay"), $btTool.$svg.attr("xlink:href", "#ic-burger"), $watchInfo.removeClass("fadeIn notransition showstat replay"), $btLike.hide(), $mixlist.show()
}

function startWatchMode() {
    modeReplay = !0, $lockStage.addClass("show"), $btTool.off().on(evtClick, function(e) {
        e.preventDefault(), preventAction(stopReplayMode)
    }), lancerReplayMode(), saveGA("mix", "watch")
}

function stopWatchMode() {
    modeReplay = !1, readingBar.stop().close(), isMixReplay ? (stopAllStage(), backToHome()) : ($lockStage.removeClass("show"), !appCN || isIOS ? backToHome() : ++cntClickWatch >= 3 ? (cntClickWatch = 0, backToHome(function() {
        showAdThenContinue(null, "after 3 replay")
    })) : backToHome())
}

function clickBtWatch(e) {
    void 0 !== e.type && e.preventDefault();
    var o, t = void 0 === e.type ? e : null,
        i = isnull(t);
    if (i && (t = searchMixInCurrentList((o = $(this).parent().parent()).attr("data-key").replace("mix-", ""))), isnull(t)) boxDialog.open(STR("pop.notFoundText"), STR("pop.notFoundTitle"), [STR("bt.ok")]);
    else {
        if (modeWatch = !0, mixToWatch = t, $watchInfo.$title.html(t.title), $watchInfo.$name.html(STR("txt.createdBy").split("%{name}").join(t.name)), $watchInfo.$dedi.html("" === t.dedi ? "" : STR("txt.dedicatedTo").split("%{name}").join(t.dedi)), $watchInfo.$date.html(getStringDate(t.date)), $watchInfo.$date.attr("data-date", t.date), $watchInfo.find("#info-right").removeClass(), $watchInfo.find(".stat").empty(), i) {
            $watchInfo.find(".stat").html(o.find(".stat").html());
            var n = "";
            n += o.hasClass("ismymix") ? " ismymix" : "", n += o.hasClass("isfavoris") ? " isfavoris" : "", n += o.hasClass("istop50") ? " istop50" : "", n += o.hasClass("islatest") ? " islatest" : "", $watchInfo.find("#info-right").addClass(n)
        } else {
            var a = "";
            a += "<div class='boxstat liked'><div class='txt'>" + numberSpaced(t.nblike) + "</div><div class='bck'></div></div>", a += "<div class='boxstat viewed'><div class='txt'>" + numberSpaced(t.nbview) + "</div><div class='bck'></div></div>", $watchInfo.find(".stat").html(a)
        }!0 === mixToWatch.mymix ? $btLike.hide() : ($btLike.removeClass("liked already disabled"), $btLike.off(), $btLike.on(evtClick, clickBtLikeMix), $btLike.show(), t.liked && $btLike.addClass("liked"), isMiniPlayer || countView()), clickHomeBtPlay()
    }
}

function clickBtLikeMix(e) {
    if (e.preventDefault(), $btLike.hasClass("disabled")) return !1;
    hasNetwork ? ($btLike.addClass("disabled"), Spinner.add($btLike), TweenMax.delayedCall(.5, function() {
        !0 === mixToWatch.liked ? ($btLike.removeClass("liked"), TweenMax.delayedCall(.5, function() {
            $btLike.removeClass("disabled")
        }), countLike("nbunlike")) : ($btLike.addClass("liked"), TweenMax.delayedCall(.5, function() {
            $btLike.removeClass("disabled")
        }), countLike("nblike"))
    })) : boxDialog.open(STR("pop.noNetworkVotedText"), STR("pop.noNetworkTitle"), [STR("bt.ok")])
}

function countLike(e) {
    var o = trustAppMobile ? device.uuid : "unknown";
    xhr("POST", domainOnline + "ph2/" + (mixCreatedWithFlash ? "save-stat-mix-flash.php" : "save-stat-mix.php"), {
        uuid: o,
        id: mixToWatch.id,
        link: mixToWatch.link,
        row: e
    }, function(e) {
        if ("success" == e.state) switch (e.info) {
            case "like ok":
                mixToWatch.liked = !0, mixToWatch.nblike++;
                break;
            case "unlike ok":
                delete mixToWatch.liked, mixToWatch.nblike--, mixToWatch.nblike = mixToWatch.nblike < 0 ? 0 : mixToWatch.nblike;
                break;
            case "already liked":
                boxDialog.open(STR("pop.alreadyVotedText"), STR("pop.alreadyVotedTitle"), [STR("bt.ok")]), $btLike.addClass("already liked"), mixToWatch.liked = !0
        }
        Spinner.reset(), $watchInfo.$like = $watchInfo.find(".stat .liked"), cssAnimate($watchInfo.$like.find(".bck"), "popIn"), $watchInfo.$like.find(".txt").text(numberSpaced(mixToWatch.nblike)), isMixReplay || $lineOpened.find(".stat .liked .txt").text(numberSpaced(mixToWatch.nblike))
    }, function(e) {})
}

function countView() {
    var e = trustAppMobile ? device.uuid : "unknown";
    hasNetwork && xhr("POST", domainOnline + "ph2/" + (mixCreatedWithFlash ? "save-stat-mix-flash.php" : "save-stat-mix.php"), {
        uuid: e,
        link: mixToWatch.link,
        row: "nbview"
    }, function(e) {
        "success" == e.state && (mixToWatch.viewed = !0)
    })
}
var controlBoucle = 0,
    controlIsBuzy = !1;

function activateControl() {
    $lockStage.on(evtPress, listenControlPress)
}

function listenControlPress(e) {
    e.preventDefault(), controlIsBuzy || (clearTimeout(controlTimeout), $lockStage.off(evtMove).on(evtMove, moveControlHead), $body.off(evtPressEnd).on(evtPressEnd, listenControlRelease), readingBar.openBig(), moveControlHead(e), frozeScene())
}

function listenControlRelease(e) {
    e.preventDefault(), clearTimeout(controlTimeout), $lockStage.off(evtMove), $body.off(evtPressEnd), readingBar.openNormal(), controlTimeout = setTimeout(controlTimeoutComplete, 400)
}

function controlTimeoutComplete() {
    controlIsBuzy = !0, unfrozeScene(controlBoucle = readingBar.cntLoop), setTimeout(function() {
        controlIsBuzy = !1
    }, 200)
}

function moveControlHead(e) {
    e = notnull((e = ~e.type.indexOf("touch") ? e.originalEvent : e).targetTouches) ? e.targetTouches[0] : e;
    var o = $incredibox[0].offsetLeft,
        t = e.pageX - o,
        i = Math.floor(readingBar.maxLoop * t / (screenW - 2 * o));
    i = (i = i < 0 ? 0 : i) > readingBar.maxLoop - 1 ? readingBar.maxLoop - 1 : i, readingBar.seek(i)
}

function desactivateControl() {
    $lockStage.off(), $body.off(evtPressEnd), controlBoucle = 0, clearTimeout(controlTimeout)
}
var ReplayMix = function(e) {
    var o, t, i, n, a, s, l, r, c = this;

    function u() {
        var e, o = getListPoloBusy(),
            t = getListPoloUnmute();
        if (t.length > 1)
            for (e in o) o[e].setSolo(!1);
        else if (1 == o.length) o[0].setSolo(!1);
        else if (o.length > 1 && 1 == t.length) {
            for (e in o) o[e].setSolo(!1);
            t[0].setSolo(!0)
        }
    }
    this.control = !1, this.reloop = !1, this.waitForReloop = !1, this.init = function() {
        if (o = $.parseXML(e), t = $(o), i = t.find("mix"), n = "flash" === i.attr("version"), a = appBrowserDemo || "true" === i.attr("control") && !isiPhone4s && !appBrowser, s = i.children().length, l = decimal(loopDuration / 1e3, 2), r = 0, a) {
            var c = [];
            t.find("user[type=bonus]").each(function() {
                c.push(parseInt($(this).attr("bonus")))
            }), (c = removeDupInArray(c)).length <= app.bonusarray.length ? activateControl() : a = !1
        }
        this.control = a, this.reloop = !1, this.waitForReloop = !1
    }, this.getTotalLoop = function() {
        return s
    }, this.start = function() {
        c.loop()
    }, this.stop = function() {
        TweenMax.killTweensOf(c.appendPolo), TweenMax.killTweensOf(c.removePolo), TweenMax.killTweensOf(c.mutePolo), TweenMax.killTweensOf(c.unmutePolo), TweenMax.killTweensOf(c.launchBonus), TweenMax.killTweensOf(c.soloPolo), this.control = !1, c.reloop = !1, c.waitForReloop = !1
    }, this.loop = function(e) {
        if (notnull(e) && (r = e, c.reloop = !0), r == s) stopReplayMode();
        else {
            var o = t.find('loop[count="' + r + '"]');
            if (0 === r || c.reloop) {
                boucleA = "true" == o.attr("boucleA");
                var i = o.find("stage"),
                    a = 0;
                if ($(i).children().each(function(e) {
                        var o = this.tagName;
                        if ("polo" == o) {
                            var t = Number($(this).attr("id")),
                                i = Number($(this).attr("picto")),
                                n = "true" == $(this).attr("mute"),
                                s = -1 == t ? listPolo[e] : listPolo[t],
                                l = listPicto[i],
                                u = c.reloop ? 0 : .03,
                                p = !!c.reloop;
                            c.appendPolo(s, l, a * u, p), "false" == $(this).attr("playing") && (s.waitOneLoop = !0), n && c.mutePolo(s), a++
                        }
                        if (r > 0 && "bonus" == o) {
                            var d = Number($(this).attr("id")),
                                f = "true" === $(this).attr("playing"),
                                m = "true" === $(this).attr("waiting"),
                                h = Number($(this).attr("cntBoucle"));
                            m ? TweenMax.delayedCall(.1, c.launchBonus, [d]) : f && c.launchBonus(d, h, !0)
                        }
                    }), n) {
                    var u = getListPoloUnmute();
                    1 == u.length && getListPoloBusy().length > 1 && u[0].setSolo(!0)
                }
                c.reloop = !1
            }
            var p = o.find("action");
            $(p).children().each(function() {
                if ("user" == this.tagName) {
                    var e = $(this).attr("type"),
                        o = decimal(Number($(this).attr("when")), 2);
                    if (o = o > l ? l : o, "bonus" == e) {
                        var t = Number($(this).attr("bonus"));
                        t = n ? t - 1 : t, o = 0 === o ? .1 : o, o = waitingFirstLoop && o < delayassist / 1e3 ? o + delayassist / 1e3 : o, TweenMax.delayedCall(o, c.launchBonus, [t])
                    } else {
                        var i = Number($(this).attr("polo")),
                            a = Number($(this).attr("picto")),
                            s = -1 == i ? {
                                fromFlash: !0
                            } : listPolo[i],
                            r = listPicto[a];
                        "append" == e ? TweenMax.delayedCall(o, c.appendPolo, [s, r]) : "remove" == e ? TweenMax.delayedCall(o, c.removePolo, [s, r]) : "mute" == e ? TweenMax.delayedCall(o, c.mutePolo, [s, r]) : "unmute" == e && TweenMax.delayedCall(o, c.unmutePolo, [s, r]), n && "solo" == e && TweenMax.delayedCall(o, c.soloPolo, [r])
                    }
                }
            }), r++
        }
    }, this.getBonusList = function() {
        var e = [];
        return $(t).find("bonus[playing='true']").each(function() {
            e.push({
                id: parseInt($(this).attr("id")),
                loopIndex: parseInt($(this).parent().parent().attr("count"))
            })
        }), e
    }, this.appendPolo = function(e, o, t, i) {
        !0 === e.fromFlash && (e = getListPoloFree()[0]), pictoTouchePolo(e, o, t, i), majListPoloDrop()
    }, this.removePolo = function(e, o) {
        !0 === e.fromFlash && (e = o.polo), e.getBusy() && clickPolo(e)
    }, this.mutePolo = function(e, o) {
        !0 === e.fromFlash && (e = o.polo), e.getBusy() && (mutePolo(e), n && u())
    }, this.unmutePolo = function(e, o) {
        !0 === e.fromFlash && (e = o.polo), e.getBusy() && (unmutePolo(e), n && u())
    }, this.launchBonus = function(e, o, t) {
        notnull(listBonus[e]) && (t ? immediatePlayBonus(e, o) : listBonus[e].launchVideo())
    }, this.soloPolo = function(e) {
        if (n) {
            var o = e.polo;
            if (o.getBusy())
                if (o.getSolo()) o.setSolo(!1), stopSoloPolo();
                else {
                    for (var t = getListPoloBusy(), i = 0, a = t.length; i < a; i++) t[i].setSolo(!1);
                    o.setSolo(!0), soloPolo()
                }
        }
    }, notnull(e) && this.init()
};

function convertFlashXml(e) {
    var o = $.parseXML(e),
        t = $(o).find("compo"),
        i = (t.children().length, "true" === t.attr("boucle")),
        n = '<mix version="flash">\n';
    return t.children().each(function(e) {
        var o = '\t<loop boucleA="' + i + '" count="' + e + '">\n',
            t = "\t\t<stage>\n",
            a = "\t\t<action>\n";
        $(this).children().each(function(o) {
            var i = $(this),
                n = i.find("polo"),
                s = i.attr("type"),
                l = n.attr("picto"),
                r = "0" === n.attr("vol"),
                c = n.attr("nbBoucle") > 0,
                u = i.find("moment").attr("seconde"),
                p = "";
            if (u = decimal(Number(u), 2).toString(), s = "" != (p = (s = "mute" === (s = "mute" !== (s = "supprimer" === (s = "ajouter" === s ? "append" : s) ? "remove" : s) || r ? s : "mute") && r ? "unmute" : s).indexOf("bonus") > -1 ? s.split("bonus").join("") : p) ? "bonus" : s, l = Number(l.split("picto").join("")), 2 == Number(appVersion)) switch (l) {
                case 0:
                    l = 5;
                    break;
                case 1:
                    l = 6;
                    break;
                case 2:
                    l = 7;
                    break;
                case 3:
                    l = 8;
                    break;
                case 4:
                    l = 9;
                    break;
                case 5:
                    l = 0;
                    break;
                case 6:
                    l = 1;
                    break;
                case 7:
                    l = 2;
                    break;
                case 8:
                    l = 3;
                    break;
                case 9:
                    l = 4
            }
            if (0 == e && "0" === u) {
                t += '\t\t\t<polo id="-1" picto="' + l + '" mute="' + r + '" playing="' + c + '" />\n'
            } else {
                var d = '\t\t\t<user type="' + s + '" polo="-1" picto="' + l + '" when="' + u + '" />\n';
                a += d = "bonus" === s ? '\t\t\t<user type="' + s + '" bonus="' + p + '" when="' + u + '" />\n' : d
            }
        }), o += (t += "\t\t</stage>\n") + (a += "\t\t</action>\n"), n += o += "\t</loop>\n", i = !i
    }), trim(n += "</mix>")
}

function parseXmlAndCheckAssets() {
    var e = mixToWatch.mix,
        o = $.parseXML(e),
        t = $(o),
        i = t.find("mix"),
        n = !1;
    t.find("compo").length > 0 && (n = !0, e = convertFlashXml(mixToWatch.mix), mixToWatch.mix = e, o = $.parseXML(e), i = (t = $(o)).find("mix"));
    var a = [],
        s = [],
        l = [];

    function r(e) {
        if ("bonus" === e.attr("type")) {
            var o = Number(e.attr("bonus"));
            existInArray(s, o = n ? o - 1 : o) || s.push(o)
        } else {
            var t = Number(e.attr("picto"));
            existInArray(a, t) || a.push(t)
        }
    }
    i.children().each(function(e) {
        0 === e && $(this).find("stage").each(function(e) {
            $(this).children().each(function(e) {
                r($(this))
            })
        }), $(this).find("action").each(function(e) {
            $(this).children().each(function(e) {
                r($(this))
            })
        })
    }), a = a.sort(function(e, o) {
        return e - o
    }), s = s.sort(function(e, o) {
        return e - o
    });
    for (var c = app.animearray[a[0]], u = 0, p = app.animearray.length; u < p; u++) existInArray(a, u) || (app.animearray[u] = c);
    for (u = 0, p = s.length; u < p; u++) l.push(app.bonusarray[s[u]])
}