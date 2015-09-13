function onWResize() {
  if (!$('.leftcol').length) $(window).unbind('resize');

  var lcParent = $('.leftcol').parent();
  $('.leftcol').width(lcParent.width() - parseInt(lcParent.css('padding-left')) - parseInt(lcParent.css('padding-right')) - lcParent.find('.rightcol').width() - 10);
}

document.admLinkPosY = 0;
setInterval(function() {
  document.admLinkPosY++;
  $('.adm-link').css('background-position', '-40px ' + document.admLinkPosY + 'px');
  if (document.admLinkPosY == 156) document.admLinkPosY = 0;
}, 24);

document.mblogsUpdating = false;

$(function() {
  $('.mblog-refresh').live('click', function() {
    if (document.mblogsUpdating == true) return false;

    document.mblogsUpdating = true;
    $(this).find('i').css('background-image', 'url(/gfx/refresh-red.gif)');

    $('.mblogs-data').load('/v2/index.php?what=mblogs&mblogajax=true', function() {
      document.mblogsUpdating = false;
      $('.mblog-refresh i').css('background-image', 'url(/gfx/refresh.gif)');
    });
  });

  $('.item_layer .fav a').live('click', function() {
    if ($(this).find('img').attr('src') == '/gfx/miniloader.gif') return false;

    $(this).find('img').attr({src: '/gfx/miniloader.gif', alt: 'Обновляем&hellip;'});
    $.ajax({
      url: $(this).attr('href'),
      success:function(data, ts, xhr) {
        var d = data.split('|');
        $('#fav_' + d[1] + ' img').attr({src: '/gfx/fav' + d[0] + '.png', tooltip: d[0] == 'add' ? 'Добавить в мои избранные работы' : 'Уже в избранных. Удалить?'});
      }
    });

    return false;
  });

  $('.bl-meta .bl-cite').live('click', function() {
    $('#bl-reply textarea').val($('#bl-reply textarea').val() + ($('#bl-reply textarea').val().length ? "\n\n" : '') + "[QUOTE]" + $(this).closest('.bl-content').find('.bl-text').text() + "[/QUOTE]\n");
    location.hash = '#bl-reply'; $('#bl-reply textarea').focus();
  });

  /** таскание фоток **/
  $('.ps-full').draggable({
    axis: 'x',
    cursor: 'crosshair',
    stop: function(event, ui) {
      var method = 'ceil';
      if (ui.originalPosition.left > ui.position.left) method = 'floor';
      var newPos = Math[method](ui.position.left / 640) * 640;

      if (newPos > 0) newPos = 0;
      if (newPos < ($(this).find('.pic').length - 1) * -640) newPos = ($(this).find('.pic').length - 1) * -640;

      $(this).animate({left: newPos + 'px'});
    }
  });

  /** Ctrl влево/вправо на фотках **/
  $('.photoselector .control .left, .photoselector .control .right').click(function() {
    var currentPos = parseInt($('.ps-full').css('left'));
    var newPos = $(this).hasClass('left') ? currentPos + 640 : currentPos - 640;

    if (newPos > 0) newPos = 0;
    if (newPos < ($('.ps-full .pic').length - 1) * -640) newPos = ($('.ps-full .pic').length - 1) * -640;

    $('.ps-full').animate({left: newPos + 'px'});
  });

  $('.photolist a').click(function() {
    var newPos = -parseInt($(this).attr('rel')) * 640;
    $('.ps-full').animate({left: newPos + 'px'}); return false;
  });

  /** Просмотр оригинала **/
  $('.photoselector .control .original').click(function() {
    var currentPhoto = parseInt($('.ps-full').css('left')) / 640;
    if (currentPhoto < 0) currentPhoto *= -1;
    $('.ps-full .pic').eq(currentPhoto).find('a').click();
  });

  /** определяем ширину topModelList-а **/
  $('#topModelList').width($('#topModelList li').length * 149);

  /** изменяем размеры линеек **/
  $(window).resize(onWResize); $(window).resize();

  /** включаем листалки **/
  $(document).keypress(function(e) {
    if (e.ctrlKey && e.keyCode == 37) $('.photoselector .control .left').click();
    if (e.ctrlKey && e.keyCode == 39) $('.photoselector .control .right').click();
  });

  /** включаем тултипы и всплывающие картинки **/
  tooltip.d(); Shadowbox.init({handleOversize:'drag'});

  /** включаем универсальные переключатели **/
  $('.switcher a').click(function() {
    if ($(this).closest('.current').length) return false;

    $(this).closest('.switcher').find('li').removeClass('current');
    $(this).closest('li').addClass('current');

    if ($(this).closest('.switcher').eq(0).attr('id').length)
      $('.' + $(this).closest('.switcher').eq(0).attr('id')).css('display', 'none');
    if ($(this).attr('rel').length)
      $('.sw_' + $(this).attr('rel')).css('display', 'block');

    $(this).closest('.switcher').trigger('onSwitcherSelect', {element: this});

    return false;
  });

  /** включаем переключатель вкладок главной страницы сайта **/
  $('#sw-main').bind('onSwitcherSelect', function(e, f) {
    var elt = $('.sw_' + $(f.element).attr('rel'));
    if (!elt.html().length) {
      elt.html('<div style="text-align: center;"><img src="/gfx/loader.gif" width="220px" height="19px" alt="Идёт загрузка, подождите&hellip;" /></div>')
        .load('/v2/index.php', {'what': $(f.element).attr('rel')});
    }
  }).find('a').eq(0).click();

  /** включаем фильтры в каталоге работ **/
  $('.catalog_filter').bind('onSwitcherSelect', function () {
    var filterQuery = getFilterQuery();
    $('.js-model-list')
      .html('<div style="padding: 100px;text-align:center"><img src="/gfx/loader.gif" width="220px" height="19px" alt="Идёт загрузка, ждите&hellip;" /></div>')
      .load('/catalog/ajax.php', {t: $('#params').val(), f: filterQuery});

    return false;
  });

  /** включаем постраничность в моделях **/
  $('.items_pager a:not(.nojs)').live('click', function() {
    var filterQuery = getFilterQuery();
    var page = $(this).attr('rel');

    $('.js-model-list')
      .html('<div style=" padding: 100px;text-align:center"><img src="/gfx/loader.gif" width="220px" height="19px" alt="Идёт загрузка, ждите&hellip;" /></div>')
      .load('/catalog/ajax.php', {p: page, t: $('#params').val(), f: filterQuery});

    return false;
  });

  /** делаем модельки перетаскиваемыми **/
  $('#topModelList').draggable({
    axis: 'x',
    cursor: 'e-resize',
    handle: '.slider',
    stop: function (event, ui) {
      if (ui.position.left > 0) {
        $(ui.helper).animate({left: '0px'});
        // jTweener.addTween(ui.helper, {transition: 'easeoutback', left: '0px'});
      }
      var W = $(ui.helper).width(); var PW = $(ui.helper).parent().width();
      if (W - PW < -ui.position.left) $(ui.helper).animate({left: -1 * parseInt(W - PW) + 'px'});
        //jTweener.addTween(ui.helper, {transition: 'easeoutback', left: -1 * parseInt(W - PW) + 'px'});
    }
  });


  checkLines();
  $('.file_list_add .add_file').live('click', function() {$(this).closest('.file').clone(true).appendTo('.file_list_add').find('span').html('<input type="file" name="model_files[]" />');});
  $('.file_list_add .del_file').live('click', function() {$(this).closest('.file').remove();});

  $('#auth_form .close').click(function() { $('#auth_form').css('display', 'none'); return false; });
  $('#authLink').click(function() { $('#auth_form').css('display', 'block'); return false; });

  $('.score_set input').change(function() {
    $(this).closest('table').find('.score_value').removeClass('current');
    $(this).closest('.score_value').addClass('current');
  });

  $('#top_move_right').click(function() { $('#topModelList li').last().prependTo($('#topModelList')); updateModelList(); return false; });
  $('#top_move_left').click(function() { $('#topModelList li').first().appendTo($('#topModelList')); updateModelList(); return false; });

  // warehouse
  $('.file_link').click(function() {
    var href = 'http://karopka.ru' + $(this).closest('td').find('a.flink').attr('href');
    var name = $(this).closest('td').find('a.flink').text();

    $('#linklist .dl').text(href);
    $('#linklist .sb').text('<a href="' + href + '">' + name + '</a>');
    $('#linklist .fr').text('[url=' + href + ']' + name + '[/url]');

    var off = $(this).offset();
    $('#linklist').css({left: off.left, top: off.top, display: 'block'}).find('textarea').eq(0).select();
  });

  $('#linklist a').click(function() {
    $('#linklist').css({display: 'none'});
  });

  $('#linklist textarea').click(function() {
    $(this).select();
  });

  $(document).keypress(function(e) { if (e.keyCode == 27) $('#linklist a').click(); });

  $('.save_file').click(function() {
    jQuery.post('/community/warehouse/description.php', {
      id: $(this).closest('td').find('input[type=hidden]').val(),
      cn: $(this).closest('td').find('textarea').val()
    }, function (data, ts) {
      alert(data);
    }, 'text/plain');
  });

  $('.file_pass').click(function() {
    var pass = prompt('Введите новый пароль для файла или оставьте поле пустым, чтобы снять пароль.');
    if (pass != null) {
      jQuery.post('/community/warehouse/password.php', {
        id: $(this).closest('tr').find('input[type=hidden]').val(),
        pw: pass
      }, function (data) {
        eval('document._x = ' + data); data=document._x;
        if (typeof data['e'] != 'undefined') alert(data.e);
        else {
          alert(data.t);
          elID = this.data.replace('id=', '').split('&')[0];
          $('#fp' + elID).removeClass('fpoff').removeClass('fpon').addClass(data.c);
        }
      }, 'text/plain');
    }
  });

  $('.file_delete').click(function() {
    var mr = Math.floor(Math.random() * 1000);
    var text = 'Вы решили удалить выбранный файл!\n\nДанное действие нельзя отменить!\n\nДля подтверждения своих намерений введите\nв текстовое поле число ' + mr + ':';
    if ($.browser.msie) text = 'Для удаления файла введите число "' + mr + '":';

    if (prompt(text) != mr) return false;
  });

  $('#cmtSub').change(function() {
    $.ajax({
      beforeSend: function() {
        $('#cmtSub').css('display', 'none');
        $('.microloader').html('<img src="/gfx/microloader.gif" alt="Идёт загрузка. Пожалуйста, подождите&hellip;" width="16px" height="16px" />').css('display', 'inline');
      },
      cache: false,
      data: {MODEL_ID: $('#cmtSub').val()},
      error: function(request, status, thrown) {
        alert('Не удалось сменить режим подписки на комментарии');
      },
      success: function(data, status, request) {
        data = $.parseJSON(data);

        $('.microloader').css('display', 'none');
        $('#cmtSub').css('display', 'inline');
        if (data && data.ok && data.ok == true) { } else {
          $('.comments input[name=SUBSCRIBE]').attr('checked', !$('.comments input[name=SUBSCRIBE]').attr('checked'));
        }
      },
      type: 'POST',
      url: '/bitrix/components/karopka/model.comments/subscribe.php'
    });
  });
});

function updateModelList() {
  $('#topModelList li').css('display', 'block'); var w = $('#topModelList').width();
  $('#topModelList li').css('display', 'none');
  $('#topModelList li').slice(0, Math.floor(w / 140)).css('display', 'block');
}

function checkLines() {
  if ($('.file_list_add .file').length == 1) {
    $('.file_list_add .del_file').attr('disabled', true);
  } else {
    $('.file_list_add .del_file').attr('disabled', false);
  }
}

function getFilterQuery() {
  var filterList = $('.catalog_filter .current a'), filterQuery = [];
  for (var i = 0; i < filterList.length; i++) filterQuery.push(filterList.eq(i).attr('rel'));

  filterQuery.sort(function(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;

    return 0;
  });

  return filterQuery.join(',');
}

var tooltip = {
    options: {
        attr_name: "tooltip",
        blank_text: "(откроется в новом окне)",
        newline_entity: "~",
        max_width: 300,
        delay: 100,
        skip_tags: ["link", "style"]
    },
    t: document.createElement("DIV"),
    c: null,
    g: false,
    canvas: null,
    m: function (e) {
        if (tooltip.g) {
            var x = window.event ? event.clientX + (tooltip.canvas.scrollLeft || document.body.scrollLeft) : e.pageX;
            var y = window.event ? event.clientY + (tooltip.canvas.scrollTop || document.body.scrollTop) : e.pageY;
            tooltip.a(x, y)
        }
    },
    d: function () {
        tooltip.canvas = document.getElementsByTagName(document.compatMode && document.compatMode == "CSS1Compat" ? "HTML" : "BODY")[0];
        tooltip.t.setAttribute("id", "tooltip");
        document.body.appendChild(tooltip.t);
        if (tooltip.options.max_width) tooltip.t.style.maxWidth = tooltip.options.max_width + "px";
        var a = document.all && !window.opera ? document.all : document.getElementsByTagName("*");
        var l = a.length;
        for (var i = 0; i < l; i++) {
            if (!a[i] || tooltip.options.skip_tags.in_array(a[i].tagName.toLowerCase()) || a[i].className == 'smiles') continue;
            var b = a[i].getAttribute("title");
            if (b && typeof b != "string") b = "";
            var c = a[i].getAttribute("alt");
            var d = a[i].getAttribute("target") && a[i].getAttribute("target") == "_blank" && tooltip.options.blank_text;
            if (b || d) {
                a[i].setAttribute(tooltip.options.attr_name, d ? (b ? b + " " + tooltip.options.blank_text : tooltip.options.blank_text) : b);
                if (a[i].getAttribute(tooltip.options.attr_name)) {
                    a[i].removeAttribute("title");
                    if (c && a[i].complete) a[i].removeAttribute("alt");
                    tooltip.l(a[i], "mouseover", tooltip.s);
                    tooltip.l(a[i], "mouseout", tooltip.h)
                }
            } else if (c && a[i].complete) {
                a[i].setAttribute(tooltip.options.attr_name, c);
                if (a[i].getAttribute(tooltip.options.attr_name)) {
                    a[i].removeAttribute("alt");
                    tooltip.l(a[i], "mouseover", tooltip.s);
                    tooltip.l(a[i], "mouseout", tooltip.h)
                }
            }
            if (!a[i].getAttribute(tooltip.options.attr_name) && d) {}
        }
        document.onmousemove = tooltip.m;
        window.onscroll = tooltip.h;
        tooltip.a(-99, -99)
    },
    _: function (s) {
        s = s.replace(/\&/g, "&amp;");
        s = s.replace(/\</g, "&lt;");
        s = s.replace(/\>/g, "&gt;");
        return s
    },
    s: function (e) {
        if (typeof tooltip == "undefined") return;
        var d = window.event ? window.event.srcElement : e.target;
        if (!d.getAttribute(tooltip.options.attr_name)) return;
        var s = d.getAttribute(tooltip.options.attr_name);
        if (tooltip.options.newline_entity) {
            var s = tooltip._(s);
            s = s.replace(eval("/" + tooltip._(tooltip.options.newline_entity) + "/g"), "<br />");
            tooltip.t.innerHTML = s
        } else {
            if (tooltip.t.firstChild) tooltip.t.removeChild(tooltip.t.firstChild);
            tooltip.t.appendChild(document.createTextNode(s))
        }
        tooltip.c = setTimeout(function () {
            tooltip.t.style.visibility = 'visible'
        }, tooltip.options.delay);
        tooltip.g = true
    },
    h: function (e) {
        if (typeof tooltip == "undefined") return;
        tooltip.t.style.visibility = "hidden";
        if (!tooltip.options.newline_entity && tooltip.t.firstChild) tooltip.t.removeChild(tooltip.t.firstChild);
        clearTimeout(tooltip.c);
        tooltip.g = false;
        tooltip.a(-99, -99)
    },
    l: function (o, e, a) {
        if (o.addEventListener) o.addEventListener(e, a, false);
        else if (o.attachEvent) o.attachEvent("on" + e, a);
        else return null
    },
    a: function (x, y) {
        var a = tooltip.canvas.clientWidth ? tooltip.canvas.clientWidth + (tooltip.canvas.scrollLeft || document.body.scrollLeft) : window.innerWidth + window.pageXOffset;
        var b = window.innerHeight ? window.innerHeight + window.pageYOffset : tooltip.canvas.clientHeight + (tooltip.canvas.scrollTop || document.body.scrollTop);
        if (document.all && document.all.item && !window.opera) tooltip.t.style.width = tooltip.options.max_width && tooltip.t.offsetWidth > tooltip.options.max_width ? tooltip.options.max_width + "px" : "auto";
        var c = tooltip.t.offsetWidth;
        var d = tooltip.t.offsetHeight;
        tooltip.t.style.left = x + 8 + "px";
        tooltip.t.style.top = y + 8 + "px";
        if (x + c > a) tooltip.t.style.left = a - c + "px";
        if (y + d > b) tooltip.t.style.top = b - d + "px"
    }
};

Array.prototype.in_array = function(value){
  var l = this.length;
  for (var i = 0; i < l; i++) if (this[i] === value) return true;
  return false;
};