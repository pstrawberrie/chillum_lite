import $ from 'jquery';

// Document Binds
$(document).ready(function() {

  // Escape key
  $(document).on('keyup', function(e) {
    if(e.which === 27) {
      closeModals();
    }
  });

});

// Modals
function closeModals() {
  $('[data-modal]').removeClass('active');
}
$('[data-modal-opens]').on('click', function() {
  const modalName = $(this).attr('data-modal-opens');
  $(`[data-modal="${modalName}"]`).addClass('active');
})
$('a.close-modal').on('click', function() {
  closeModals();
})
