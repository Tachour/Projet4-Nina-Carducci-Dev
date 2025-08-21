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


document.addEventListener('DOMContentLoaded', () => {
  const LIGHTBOX_ID = 'myAwesomeLightbox'
  let currentTag = 'all'
  let currentIndex = 0
  let lastTrigger = null

  
  const getActiveTag = () =>
    document.querySelector('.tags-bar .active-tag')?.dataset.imagesToggle || 'all'

  const getAllItems = () =>
    Array.from(document.querySelectorAll('.item-column img.gallery-item'))

  const getListByTag = (tag) => {
    const all = getAllItems()
    return tag === 'all' ? all : all.filter(img => img.dataset.galleryTag === tag)
  }

  const getModalImage = () => {
    const modal = document.getElementById(LIGHTBOX_ID)
    return modal ? modal.querySelector('.lightboxImage') : null
  }

  const showAt = (i) => {
    const list = getListByTag(currentTag)
    if (!list.length) return
    currentIndex = (i % list.length + list.length) % list.length
    const mi = getModalImage()
    if (mi) mi.src = list[currentIndex].src
  }

  
  document.addEventListener('click', (e) => {
    const img = e.target.closest('img.gallery-item')
    if (!img) return

    lastTrigger = img
    currentTag = getActiveTag()
    const list = getListByTag(currentTag)
    currentIndex = Math.max(0, list.indexOf(img))

    
    setTimeout(() => {
      const mi = getModalImage()
      if (mi) mi.src = img.src
    }, 0)
  })

  
  document.addEventListener('click', (e) => {
    if (e.target.closest('.mg-prev')) {
      e.preventDefault()
      showAt(currentIndex - 1)
    }
    if (e.target.closest('.mg-next')) {
      e.preventDefault()
      showAt(currentIndex + 1)
    }
  })

  
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.tags-bar .nav-link')
    if (!btn) return
    e.preventDefault()

    document.querySelectorAll('.tags-bar .nav-link')
      .forEach(el => el.classList.remove('active', 'active-tag'))
    btn.classList.add('active', 'active-tag')

    currentTag = btn.dataset.imagesToggle || 'all'
    currentIndex = 0

    document.querySelectorAll('.item-column').forEach(col => {
      const img = col.querySelector('img.gallery-item')
      const ok = img && (currentTag === 'all' || img.dataset.galleryTag === currentTag)
      col.style.display = ok ? '' : 'none'
    })

    
    const modal = document.getElementById(LIGHTBOX_ID)
    if (modal && modal.classList.contains('show')) showAt(0)
  })

  
  document.addEventListener('hide.bs.modal', (evt) => {
    if (evt.target.id !== LIGHTBOX_ID) return
    if (document.activeElement && evt.target.contains(document.activeElement)) {
      document.activeElement.blur()
    }
  })
  document.addEventListener('hidden.bs.modal', (evt) => {
    if (evt.target.id !== LIGHTBOX_ID) return
    lastTrigger?.focus?.()
  })
})



