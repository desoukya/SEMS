Template.adminPanel.onRendered(function() {
  $('.ui.selectable.card').hover(function() {
    // Hover in then activate color
    $(this).addClass('green');
  }, function() {
    // Hover out then remove color
    $(this).removeClass('green');
  });
});
