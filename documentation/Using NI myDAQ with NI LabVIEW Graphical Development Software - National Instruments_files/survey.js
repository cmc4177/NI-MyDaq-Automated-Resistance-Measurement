$(function () {

    // NI Survey Invite stuff

    // uuid code - This is the minify version of /srm/global/neutral/uuid.js
    (function () {
        function n(a, b, c) {
            var d = b && c || 0,
                e = 0;
            b = b || [];
            a.toLowerCase().replace(/[0-9a-f]{2}/g, function (a) {
                if (e < 16) {
                    b[d + e++] = l[a]
                }
            });
            while (e < 16) {
                b[d + e++] = 0
            }
            return b
        }
        function o(a, b) {
            var c = b || 0,
                d = k;
            return d[a[c++]] + d[a[c++]] + d[a[c++]] + d[a[c++]] + "-" + d[a[c++]] + d[a[c++]] + "-" + d[a[c++]] + d[a[c++]] + "-" + d[a[c++]] + d[a[c++]] + "-" + d[a[c++]] + d[a[c++]] + d[a[c++]] + d[a[c++]] + d[a[c++]] + d[a[c++]]
        }
        function u(a, b, c) {
            var d = b && c || 0;
            var e = b || [];
            a = a || {};
            var f = a.clockseq != null ? a.clockseq : r;
            var g = a.msecs != null ? a.msecs : (new Date).getTime();
            var h = a.nsecs != null ? a.nsecs : t + 1;
            var i = g - s + (h - t) / 1e4;
            if (i < 0 && a.clockseq == null) {
                f = f + 1 & 16383
            }
            if ((i < 0 || g > s) && a.nsecs == null) {
                h = 0
            }
            if (h >= 1e4) {
                throw new Error("uuid.v1(): Can't create more than 10M uuids/sec")
            }
            s = g;
            t = h;
            r = f;
            g += 122192928e5;
            var j = ((g & 268435455) * 1e4 + h) % 4294967296;
            e[d++] = j >>> 24 & 255;
            e[d++] = j >>> 16 & 255;
            e[d++] = j >>> 8 & 255;
            e[d++] = j & 255;
            var k = g / 4294967296 * 1e4 & 268435455;
            e[d++] = k >>> 8 & 255;
            e[d++] = k & 255;
            e[d++] = k >>> 24 & 15 | 16;
            e[d++] = k >>> 16 & 255;
            e[d++] = f >>> 8 | 128;
            e[d++] = f & 255;
            var l = a.node || q;
            for (var m = 0; m < 6; m++) {
                e[d + m] = l[m]
            }
            return b ? b : o(e)
        }
        function v(a, b, c) {
            var d = b && c || 0;
            if (typeof a == "string") {
                b = a == "binary" ? new j(16) : null;
                a = null
            }
            a = a || {};
            var e = a.random || (a.rng || i)();
            e[6] = e[6] & 15 | 64;
            e[8] = e[8] & 63 | 128;
            if (b) {
                for (var f = 0; f < 16; f++) {
                    b[d + f] = e[f]
                }
            }
            return b || o(e)
        }
        var a = this;
        var b, c, d;
        var e = new Array(16);
        b = function () {
            var a, b = e,
                c = 0;
            for (var c = 0, a; c < 16; c++) {
                if ((c & 3) == 0) a = Math.random() * 4294967296;
                b[c] = a >>> ((c & 3) << 3) & 255
            }
            return b
        };
        if (a.crypto && crypto.getRandomValues) {
            var f = new Uint32Array(4);
            d = function () {
                crypto.getRandomValues(f);
                for (var a = 0; a < 16; a++) {
                    e[a] = f[a >> 2] >>> (a & 3) * 8 & 255
                }
                return e
            }
        }
        try {
            var g = require("crypto").randomBytes;
            c = g && function () {
                return g(16)
            }
        } catch (h) {}
        var i = c || d || b;
        var j = typeof Buffer == "function" ? Buffer : Array;
        var k = [];
        var l = {};
        for (var m = 0; m < 256; m++) {
            k[m] = (m + 256).toString(16).substr(1);
            l[k[m]] = m
        }
        var p = i();
        var q = [p[0] | 1, p[1], p[2], p[3], p[4], p[5]];
        var r = (p[6] << 8 | p[7]) & 16383;
        var s = 0,
            t = 0;
        var w = v;
        w.v1 = u;
        w.v4 = v;
        w.parse = n;
        w.unparse = o;
        w.BufferClass = j;
        w.mathRNG = b;
        w.nodeRNG = c;
        w.whatwgRNG = d;
        if (typeof module != "undefined") {
            module.exports = w
        } else {
            var x = a.uuid;
            w.noConflict = function () {
                a.uuid = x;
                return w
            };
            a.uuid = w
        }
    })();


    // To add the Survey invite - this is the minify version of /srm/global/neutral/ni_survey_invite.js

    function niSurveyInvite() {
        //ask cookie to see if we need the survey
        var pnxCookie = PNX.utils.Cookie,
            surveyCookieName = 'niSurvey',
            surveyCookie = getSurveyCookie();

        //if we need the survey then show the survey bar
        if (surveyCookie) {

            // Survey code, uuid.min.js must be read
            var uuidval = (uuid.v4()).toString(),
                surveyLink = "http://research.ni.com/run/ogsitewidesurvey",
                survey = [],
                $survey;

            // removing the - symbol
            uuidval = uuidval.replace(/-/g, '');
            //find the language here

            $survey = $('#nisurvey');
            $survey.fadeIn();
            // concatenating the url and unique id
            var link = $survey.find(".surveyLink").attr("href");
            //link += "/" + uuidval;
            $survey.find(".surveyLink").attr('href', link);
            $survey.find(".surveyLink").attr('target', '_blank').click(function () {
                toolbarNothanks();
            });
            $("#toolbar-nothanks").click(function (e) {
                toolbarNothanks();
                return false
            });
        } else {
            $('#nisurvey').hide();
            return false;
        }

        function getSurveyCookie() {
            var a = 0,
                b = parseInt(pnxCookie.get(surveyCookieName));
            if (b == 0) {
                a = false;
            } else {
                a = true;
            }
            return a;
        }

        function setSurveyCookie(a) {
            var b=0,dt=new Date(),o={};

            o.path = '/';
            o.domain = 'ni.com';
            dt.setTime(dt.getTime()+(45*24*60*60*1000));
            o.expires=dt.toGMTString();
            cookieExpiration = dt;
            
            
            if (a) {
                b = 1
            }
            pnxCookie.set(surveyCookieName, b, o);
            return false;
        }

        // remove the survey toolbar

        function toolbarNothanks() {
            setSurveyCookie(false);
            toolbarHide();
            showSurvey = false;
            return false;
        }

        // hide the survey toolbar

        function toolbarHide() {
            $('#nisurvey').fadeOut();
            return true;
        }
    }

    // calling all survey stuff
    niSurveyInvite();
});