import $ from 'jquery';

/* Document Binds */
$(document).ready(function() {

  // Escape key
  $(document).on('keyup', function(e) {
    if(e.which === 27) {
      closeModals();
    }
  });

});

/* Forms */
$('form .check label').off('click').on('click', function() {
  var childBox = $(this).parent().find('input[type="checkbox"]');
  childBox.prop("checked", !childBox.prop("checked"));
})

/* Modals */
function closeModals() {
  $('[data-modal]').removeClass('active');
}
$('[data-modal-opens]').on('click', function() {
  const modalName = $(this).attr('data-modal-opens');
  $(`[data-modal="${modalName}"]`).addClass('active');
  $(`[data-modal="${modalName}"]`).find('input').first().focus();
})
$('a.close-modal').on('click', function() {
  closeModals();
})

/* Tests! */
$('#audiotest').on('click', function() {
  $('#audio').play();
})
