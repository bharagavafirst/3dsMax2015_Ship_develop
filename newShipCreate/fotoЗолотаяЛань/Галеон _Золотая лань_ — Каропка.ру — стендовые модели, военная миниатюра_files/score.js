$(function() {
  $('.js-a-movable .score-gray').live('mousemove', function(e) {
    if ($(this).hasClass('fixed') || $(this).hasClass('disabled')) return false;

    if ($.browser.opera || $.browser.msie) {
      w = e.offsetX;
    } else {
      w = (e.layerX - $(e.currentTarget).offset()['left']);
    }

    $(this).find('.score-blue').css('width', w + 'px');
    $(this).find('input').val(Math.round(w / 140 * 100));
  }).live('click', function(e) {
    if ($(this).hasClass('disabled')) return false;

    if ($.browser.opera) {
      w = e.offsetX;
    } else {
      w = (e.layerX - $(e.currentTarget).offset()['left']);
    }

    $(this).find('.score-blue').css('width', w + 'px');
    $(this).find('input').val(Math.round(w / 140 * 100));
    $(this).addClass('fixed');

    $('.scores-overlap').load('/bitrix/components/karopka/score/setscore.php', {
      data: $('#js-a-score-data').val(),
      i: $(this).find('input').attr('name'),
      v: $(this).find('input').val(),
      ajax: true
    });
  });

  $('.scores .s-hoverable a').click(function() {
    if ($(this).closest('.scores').hasClass('af-s-my'))
      $(this).closest('.scores').find('.stars')[
        ($(this).parent().hasClass('s-hoverable-visible')) ? 'show' : 'hide'
      ]();
  });
});