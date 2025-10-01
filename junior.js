const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const modalClose = document.getElementById('modalClose');
    const images = document.querySelectorAll('.galeria img, #lideres .foto-lider');

    images.forEach(img => {
      img.addEventListener('click', () => {
        modal.classList.add('active');
        modalImg.src = img.src;
        modalImg.alt = img.alt;
      });
    });

    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
      modalImg.src = '';
      modalImg.alt = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        modalImg.src = '';
        modalImg.alt = '';
      }
    });

    // Optional: close modal on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        modalImg.src = '';
        modalImg.alt = '';
      }
    });
