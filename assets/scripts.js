$(document).ready(function() {
    $('.gallery').mauGallery({
        columns: {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3
        },
        lightBox: true,
        lightboxId: 'myAwesomeLightbox',
        showTags: true,
        tagsPosition: 'top'
    });
});

$('.tags-bar').on('click', '.nav-link', function (e) {
  e.preventDefault();
$('.tags-bar .nav-link').removeClass('active active-tag');
$(this).addClass('active active-tag');
const activeTag = $(this).data('imagesToggle') || 'all';
if (activeTag === 'all') {
    $('.item-column').show();
  } else {
    $('.item-column').each(function () {
      const imgTag = $(this).children('img').data('gallery-tag');
      $(this).toggle(imgTag === activeTag);
    });
  }
});
