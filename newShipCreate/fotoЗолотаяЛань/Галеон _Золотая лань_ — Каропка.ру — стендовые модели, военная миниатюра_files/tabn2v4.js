

function ref_ud(a){document.write(a);}
var isIE6 = /msie 6/.test(navigator.userAgent.toLowerCase());


var dref_w = ((typeof reformal_wdg_w != "undefined") ? reformal_wdg_w : 713) ;
var dref_h = ((typeof reformal_wdg_h != "undefined") ? reformal_wdg_h : 450) ;
var dref_mode = ((typeof reformal_wdg_mode != "undefined") ? reformal_wdg_mode : 0) ;
var dref_title = ((typeof reformal_wdg_title != "undefined") ? reformal_wdg_title : "Реформал") ;
var dref_ltitle = ((typeof reformal_wdg_ltitle != "undefined") ? reformal_wdg_ltitle : "Оставить отзыв") ;
var dref_lfont = ((typeof reformal_wdg_lfont != "undefined") ? reformal_wdg_lfont : "") ;
var dref_lsize = ((typeof reformal_wdg_lsize != "undefined") ? reformal_wdg_lsize : "12px") ;
var dref_color = ((typeof reformal_wdg_color != "undefined" && '#'!=reformal_wdg_color) ? reformal_wdg_color : "orange") ;
var dref_bcolor = ((typeof reformal_wdg_bcolor != "undefined") ? reformal_wdg_bcolor : "#FFA000") ;
var dref_tcolor = ((typeof reformal_wdg_tcolor != "undefined") ? reformal_wdg_tcolor : "#FFFFFF") ;
var dref_align = ((typeof reformal_wdg_align != "undefined" && ''!=reformal_wdg_align) ? reformal_wdg_align : "left") ;
var dref_charset = ((typeof reformal_wdg_charset != "undefined") ? reformal_wdg_charset : "") ;
var dref_waction = ((typeof reformal_wdg_waction != "undefined") ? reformal_wdg_waction : "0") ;

/* Awesome crutch */
dref_waction = isIE6 ? true : dref_waction;

var dref_vcolor = ((typeof reformal_wdg_vcolor != "undefined") ? reformal_wdg_vcolor : "#9fce54") ;
    dref_vcolor = dref_vcolor.substring(1, dref_vcolor.length);
var dref_cmline = ((typeof reformal_wdg_cmline != "undefined") ? reformal_wdg_cmline : "#E0E0E0") ;
    dref_cmline = dref_cmline.substring(1, dref_cmline.length);
var dref_glcolor = ((typeof reformal_wdg_glcolor != "undefined") ? reformal_wdg_glcolor : "#105895") ;
    dref_glcolor = dref_glcolor.substring(1, dref_glcolor.length);
var dref_tbcolor = ((typeof reformal_wdg_tbcolor != "undefined") ? reformal_wdg_tbcolor : "#FFFFFF") ;
    dref_tbcolor = dref_tbcolor.substring(1, dref_tbcolor.length);

var dref_tcolor_aw4 = (typeof reformal_wdg_tcolor_aw4 != "undefined") ? reformal_wdg_tcolor_aw4 : "#3F4543" ;
    dref_tcolor_aw4 = dref_tcolor_aw4.substring(1, dref_tcolor_aw4.length);


var dref_ext_img = (typeof reformal_wdg_bimage != "undefined" && reformal_wdg_bimage!='') ? 1 : 0 ;
var dref_ext_img_m = (dref_ext_img && reformal_wdg_bimage.substring(3, reformal_wdg_bimage).toLowerCase()=='htt') ? 1 : 0;
if (dref_ext_img_m && reformal_wdg_bimage.indexOf( 'reformal.ru/files/', 0 ) > 0) { dref_ext_img_m = 0; var v = reformal_wdg_bimage.toString().split ( '/' ); reformal_wdg_bimage = v[v.length-1]; }

var dref_ext_cms = ((typeof reformal_wdg_cms != "undefined") ? reformal_wdg_cms : 'reformal') ;

if (typeof reformal_wdg_vlink == "undefined")
        out_link = 'http://'+reformal_wdg_domain+'.reformal.ru/proj/?mod=one';
else
        out_link = ((typeof reformal_wdg_https != "undefined")?'https://':'http://')+reformal_wdg_vlink;


if (dref_waction){
        if(typeof reformal_wdg_vlink != "undefined") {
		var vlink = reformal_wdg_vlink;
    } else {
        if (!isIE6) {
            var vlink = 'http://'+reformal_wdg_domain+'.reformal.ru/proj/?mod=one';
        } else {
            var vlink = 'http://'+reformal_wdg_domain+'.reformal.ru/proj/';
        }
    }
} else {
    var vlink = 'javascript:MyOtziv.mo_show_box();'; }
	

MyOtzivCl = function() {
    var siteAdr = 'http://reformal.ru/';
    
    this.checkLink = function() {
        if (navigator.userAgent.toLowerCase().indexOf('firefox') == -1) return;
   
        var nos = document.getElementsByTagName('noscript');
        var pattern = (typeof reformal_wdg_vlink != 'undefined' ) ?
                   '<\s*a[^>]*href[^>]*(reformal.ru|' + reformal_wdg_vlink + ')[^>]*>' : 
                   '<\s*a[^>]*href[^>]*reformal.ru[^>]*>';
        var re = new RegExp(pattern, 'i');
        for(var i = 0, length = nos.length; i < length; i++) {
            if (re.test(nos[i].textContent)) return;
        }

        var link,
            links = document.getElementsByTagName("a");
        var re = new RegExp((typeof reformal_wdg_vlink != 'undefined' ) ? 'reformal.ru|' + reformal_wdg_vlink : 'reformal.ru', 'i');
        for(var i = 0, length = links.length; i < length; i++) {
            link = links[i];
            if (link.id && (link.id == 'reformal_tab' || link.id == 'reformal_logo')) continue;
            if (re.test(link.href)) return;
        }

        var i = new Image();
        i.src = 'http://log.reformal.ru/bl.php?pid=' + reformal_wdg_domain + '&url=' + window.location.href;
    }
    this.l = window.location.href;
    this.mo_get_win_width = function() {
        var myWidth = 0;
        if( typeof( window.innerWidth ) == 'number' )             myWidth = window.innerWidth;
        else if( document.documentElement && document.documentElement.clientWidth )             myWidth = document.documentElement.clientWidth;
        else if( document.body && document.body.clientWidth)             myWidth = document.body.clientWidth;
        return myWidth;
    }
	
    this.mo_get_win_height = function() {
        var myHeight = 0;
        if( typeof( window.innerHeight ) == 'number' )             myHeight = window.innerHeight;
        else if( document.documentElement && document.documentElement.clientHeight )             myHeight = document.documentElement.clientHeight;
        else if( document.body && document.body.clientHeight)             myHeight = document.body.clientHeight;
        return myHeight;
    }

    this.mo_get_scrol = function() {
        var yPos = 0;
        if (self.pageYOffset) {
            yPos = self.pageYOffset;
        } else if (document.documentElement && document.documentElement.scrollTop){
            yPos = document.documentElement.scrollTop;
        } else if (document.body) {
            yPos = document.body.scrollTop;
        }
        return yPos;
    }

    this.mo_show_box = function() {
	    if (document.getElementById("fthere").innerHTML == "") {
		    document.getElementById("fthere").innerHTML = "<iframe id=\"thrwdgfr\" src=\""+siteAdr+"wdg4.php?w="+dref_w+"&h="+dref_h+"&domain="+reformal_wdg_domain+"&bcolor="+dref_tbcolor+"&glcolor="+dref_glcolor+"&cmline="+dref_cmline+"&vcolor="+dref_vcolor+"&tcolor_aw4="+dref_tcolor_aw4+"\" width=\""+dref_w+"\" height=\""+(dref_h-75)+"\" frameborder=\"0\" scrolling=\"no\">Frame error</iframe>";
		}
        var l = this.mo_get_win_width()/2 - dref_w/2;
        var t = this.mo_get_win_height()/2 - dref_h/2 + this.mo_get_scrol();
        document.getElementById('myotziv_box').style.top  = (dref_ext_cms=='joomla') ? '35px' : t+'px';
        document.getElementById('myotziv_box').style.left = l+'px'; 
        document.getElementById('myotziv_box').style.display='block';
        try { this.checkLink(); } catch (err) {}
    }

    this.mo_hide_box = function() {
        document.getElementById('myotziv_box').style.display='none';
    }
    
    this.mo_showcss = function() {
       ref_ud("<style type=\"text/css\">");
       ref_ud(".widsnjx {margin:0 auto; position:relative;}.widsnjx fieldset {padding:0; border:none; border:0px solid #000; margin:0;}");
       ref_ud("#poxupih { width:"+(dref_w-(-40))+"px; height:auto; position:relative;z-index:1001; min-height:490px;}.poxupih_top {background:url(http://widget.reformal.ru/i/wdt/box_shadow_n.png) top left repeat-x ; padding-top:20px; margin:0 20px;}.poxupih_btm {background:url(http://widget.reformal.ru/i/wdt/box_shadow_s.png) bottom repeat-x; padding-bottom:20px;}.poxupih_1t {background:url(http://widget.reformal.ru/i/wdt/box_shadow_w.png) left repeat-y; padding-left:20px; margin:0 -20px;}.poxupih_rt {background:url(http://widget.reformal.ru/i/wdt/box_shadow_e.png) right repeat-y; padding-right:20px;}.poxupih_center {width:"+(dref_w)+"px;min-width:"+(dref_w)+"px; min-height:"+(dref_h-10)+"px; height:"+(dref_h-10)+"px; background:"+dref_bcolor+";color:"+(dref_tcolor)+";}#poxupih_tl {position:absolute;top:0;left:0;height:20px;width:20px;background:url(http://widget.reformal.ru/i/wdt/box_shadow_nw.png) 0 0 no-repeat;}#poxupih_bl {position:absolute;bottom:0;left:0;height:20px;width:20px;background:url(http://widget.reformal.ru/i/wdt/box_shadow_sw.png) 0 0 no-repeat;}#poxupih_tr {position:absolute;top:0;right:0;height:20px;width:20px;background:url(http://widget.reformal.ru/i/wdt/box_shadow_ne.png) 0 0 no-repeat;}#poxupih_br {position:absolute;bottom:0;right:0;height:20px;width:20px;background:url(http://widget.reformal.ru/i/wdt/box_shadow_se.png) 0 0 no-repeat;}");
       ref_ud('.gertuik { padding:10px 20px; font-size:18px; font-weight:bold; font-family:Arial, Helvetica, sans-serif; overflow:hidden; max-height:42px;}a.pokusijy {cursor:pointer;display:block; width:16px; height:16px; background: url(http://reformal.ru/i/wdg_data/expand.png) 100% 0px no-repeat; float:right; margin-top:3px;}');
       ref_ud('.bvnmrte {padding:0; width:100%;overflow:hidden;}.drsdtf { font-family: Tahoma, Geneva, sans-serif; padding:3px 20px; text-align:right; font-size:10px; max-height:22px;}.drsdtf a { font-weight:bold; color:#fff; text-decoration:none;}');
       ref_ud('#poxupih  a {position:relative; z-index:10;} #poxupih { width:"+(dref_w)+"px;}.poxupih_center {width:"+(dref_w)+"px; height:"+(dref_h)+"px; background-color:"+dref_bcolor+";}');
              
       ref_ud(".frby{position:fixed; left:0; top:0; z-index:5; width:22px; height:100%;}");
       ref_ud("* html .frby{position:absolute;}");
       ref_ud(".frby table{border-collapse:collapse;}");
       ref_ud(".frby td{padding:0px; vertical-align: middle;}");
       ref_ud(".frby a{display:block; background:"+(dref_ext_img_m ? 'none' :dref_color)+";}");
       ref_ud(".frby a:hover{background:"+(dref_ext_img_m ? 'none' :dref_color)+";}");
       ref_ud(".frby img{border:0;}");
         
       ref_ud(".frgtd{position:fixed; right:0px; top:0; z-index:5; width:22px; height:100%;}");
       ref_ud("* html .frgtd{position:absolute;}");
       ref_ud(".frgtd table{border-collapse:collapse;}");
       ref_ud(".frgtd td{padding:0px; vertical-align: middle;}");
       ref_ud(".frgtd a{display:block; background:"+(dref_ext_img_m ? 'none' :dref_color)+";}");
       ref_ud(".frgtd a:hover{background:"+(dref_ext_img_m ? 'none' :dref_color)+";}");
       ref_ud(".frgtd img{border:0;}");
       
       ref_ud("</style>");
    }

    this.r = typeof document.referrer === "undefined" ? "" : document.referrer;
    this.mo_showframe = function() {
        this.mo_showcss();
        
        if (!dref_mode) {
            if ('left' == dref_align) { 
	            if (!dref_ext_img)
                {
                    ref_ud("<div class=\"frby\"><table height=\"100%\"><tr><td valign=\"middle\"><a id=\"reformal_tab\" href=\""+vlink+"\""+((dref_waction)?' target=\"_blank\"':"")+"><img src=\""+siteAdr+"i/transp.gif\" alt=\"\" style=\"border: 0;\" class=\"tdsh\" /></a></td></tr></table></div>");
                }else
                {
                    ref_ud("<div class=\"frby\"><table height=\"100%\"><tr><td valign=\"middle\"><a id=\"reformal_tab\" href=\""+vlink+"\""+((dref_waction)?' target=\"_blank\"':"")+"><img src=\""+(dref_ext_img_m ?reformal_wdg_bimage : siteAdr+'files/images/buttons/'+reformal_wdg_bimage)+"\" alt=\"\" style=\"border: 0;\" class=\"tdsh\" /></a></td></tr></table></div>");
                }
            } 
            else {
                if (!dref_ext_img)
                {
                    ref_ud("<div class=\"frgtd\"><table height=\"100%\"><tr><td valign=\"middle\"><a id=\"reformal_tab\" href=\""+vlink+"\""+((dref_waction)?' target=\"_blank\"':"")+"><img src=\""+siteAdr+"i/transp.gif\" alt=\"\" style=\"border: 0;\" class=\"tdsh\" /></a></td></tr></table></div>");}else
                {
                    ref_ud("<div class=\"frgtd\"><table height=\"100%\"><tr><td valign=\"middle\"><a id=\"reformal_tab\" href=\""+vlink+"\""+((dref_waction)?' target=\"_blank\"':"")+"><img src=\""+(dref_ext_img_m ?reformal_wdg_bimage : siteAdr+'files/images/buttons/'+reformal_wdg_bimage)+"\" alt=\"\" style=\"border: 0;\" class=\"tdsh\" /></a></td></tr></table></div>");

                }
            }
        } else { 
            ref_ud("<a id=\"reformal_tab\" href=\""+vlink+"\" style=\"color:"+dref_color+"; "+(dref_lfont ? 'font-family:'+dref_lfont+';' : '')+" "+(dref_lsize ? 'font-size:'+dref_lsize+';' : '')+"\""+((dref_waction)?' target=\"_blank\"':"")+">"+dref_ltitle+"</a>");
        }
        
        ref_ud("<div style=\""+((dref_ext_cms=='joomla') ? 'position:fixed;' : 'position:absolute;')+" display: none; top: 0px; left: 0px;\" id=\"myotziv_box\"> <div class=\"widsnjx\"> <div id=\"poxupih\"> <div class=\"poxupih_top\"> <div class=\"poxupih_btm\"> <div class=\"poxupih_1t\"> <div class=\"poxupih_rt\"> <div class=\"poxupih_center\">");
        
        ref_ud('<div class="gertuik"> <a class="pokusijy" title="" onclick="MyOtziv.mo_hide_box();"></a> '+dref_title+'</div> <div class="bvnmrte" id="fthere"></div>');
        
        ref_ud('<div class="drsdtf" style="width:40%; float:right">на платформе&nbsp;<a id=\"reformal_logo\" href="http://reformal.ru" title="Reformal.ru">Reformal.ru</a></div> </div> </div> </div> </div> </div> <div id="poxupih_tl"></div> <div id="poxupih_bl"></div> <div id="poxupih_tr"></div> <div id="poxupih_br"></div> </div> </div></div>');
        var i = new Image();
        i.src = 'http://log.reformal.ru/st.php?w=tabn2m4&domain='+reformal_wdg_domain;
    }
}
var MyOtziv = new MyOtzivCl();
MyOtziv.mo_showframe();
function r_compact(s){
str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var output = "";
var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
var i = 0;
s = r_utf8encode(s);
while (i < s.length) {
chr1 = s.charCodeAt(i++);chr2 = s.charCodeAt(i++);chr3 = s.charCodeAt(i++);
enc1 = chr1 >> 2;enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);enc4 = chr3 & 63;
if (isNaN(chr2))
enc3 = enc4 = 64;
else if (isNaN(chr3))
enc4 = 64;
output = output+str.charAt(enc1)+str.charAt(enc2)+str.charAt(enc3)+str.charAt(enc4);
}
return output;
}
function r_utf8encode(s){
s = s.replace(/\r\n/g,"\n");
var utftext = "";
for (var n = 0; n < s.length; n++) {
var c = s.charCodeAt(n);
if (c < 128)
utftext += String.fromCharCode(c);
else if((c > 127) && (c < 2048))
utftext += String.fromCharCode((c >> 6) | 192) + String.fromCharCode((c & 63) | 128);
else
utftext += String.fromCharCode((c >> 12) | 224) + String.fromCharCode(((c >> 6) & 63) | 128) + String.fromCharCode((c & 63) | 128);
}
return utftext;
}
var hc = new Image;
hc.src = "http://reformal.ru/human_check/"+reformal_wdg_domain+"|"+r_compact(MyOtziv.l)+"|"+r_compact(MyOtziv.r);