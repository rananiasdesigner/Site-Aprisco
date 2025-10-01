// Smooth scroll já ativado pelo CSS scroll-behavior: smooth

    // Destaque do menu conforme a seção visível
    const sections = document.querySelectorAll('main section, header#hero');
    const navLinks = document.querySelectorAll('nav a');

    function activateMenu() {
      let index = sections.length;

      while(--index && window.scrollY + 150 < sections[index].offsetTop) {}

      navLinks.forEach(link => link.classList.remove('active'));
      navLinks[index].classList.add('active');
    }

    activateMenu();
    window.addEventListener('scroll', activateMenu);

    // Fade-in das seções ao rolar
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    // Modal para galeria
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const modalClose = document.getElementById('modalClose');
    const galleryImages = document.querySelectorAll('.galeria img');

    galleryImages.forEach(img => {
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

    // Fechar modal ao clicar fora da imagem
    modal.addEventListener('click', (e) => {
      if(e.target === modal) {
        modal.classList.remove('active');
        modalImg.src = '';
        modalImg.alt = '';
      }
    });
