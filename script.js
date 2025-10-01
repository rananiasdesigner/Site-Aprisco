// Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('nav').classList.toggle('active');
});

// Page Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(lnk => lnk.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get data-page attribute
            const page = this.getAttribute('data-page');
            
            // Hide all page content
            document.querySelectorAll('.page-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected page content
            const pageContent = document.getElementById(page);
            if (pageContent) {
                pageContent.classList.add('active');
            }
            
            // Close mobile menu if open
            document.querySelector('nav').classList.remove('active');
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });

    // Carrossel principal
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    const slide = document.querySelector('.carousel-slide');
    const totalSlides = slide ? slide.children.length : 0;
    let index = 0;

    function updateSlide() {
        if (slide) {
            slide.style.transform = `translateX(-${index * 100}%)`;
        }
    }

    if (prevBtn && nextBtn && slide) {
        prevBtn.addEventListener('click', () => {
            index = (index - 1 + totalSlides) % totalSlides;
            updateSlide();
        });

        nextBtn.addEventListener('click', () => {
            index = (index + 1) % totalSlides;
            updateSlide();
        });
    }

    // Navegação das seções (exemplo para nav-links com data-section)
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const sectionId = link.dataset.section;
            if (!sectionId) return;

            // Ativa o link clicado
            navLinks.forEach(navLink => {
                navLink.classList.toggle('active', navLink === link);
            });

            // Mostra a seção associada e esconde as outras
            document.querySelectorAll('main section').forEach(section => {
                section.classList.toggle('active', section.id === sectionId);
            });

            // Controle de visibilidade do ícone WhatsApp (exemplo)
            const ministeriosSection = document.getElementById('ministerios');
            if (ministeriosSection) {
                if (sectionId === 'ministerios') {
                    ministeriosSection.classList.add('active');
                } else {
                    ministeriosSection.classList.remove('active');
                }
            }

            // Scroll suave para o topo
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    });

    // Carrossel Igreja banner
    (function() {
        const slideContainer = document.querySelector('#igreja .carousel-slide');
        if (!slideContainer) return;

        const slides = slideContainer.querySelectorAll('img');
        const prevButton = document.querySelector('#igreja .carousel-arrow.prev');
        const nextButton = document.querySelector('#igreja .carousel-arrow.next');
        const totalSlidesIgreja = slides.length;
        let currentIndex = 0;
        let autoSlideInterval;

        function updateSlidePosition() {
            slideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function goToPrevSlide() {
            currentIndex = (currentIndex - 1 + totalSlidesIgreja) % totalSlidesIgreja;
            updateSlidePosition();
            resetAutoSlide();
        }

        function goToNextSlide() {
            currentIndex = (currentIndex + 1) % totalSlidesIgreja;
            updateSlidePosition();
            resetAutoSlide();
        }

        function autoSlide() {
            autoSlideInterval = setInterval(() => {
                goToNextSlide();
            }, 5000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlide();
        }

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', goToPrevSlide);
            nextButton.addEventListener('click', goToNextSlide);
        }

        // Inicia auto slide
        autoSlide();
    })();

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Aqui você enviaria os dados para o servidor
            alert(`Obrigado por sua mensagem, ${name}! Entraremos em contato em breve.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Carrossel fotos da obra
    (function () {
        const fotosObra = [
            {
                id: 1,
                src: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/985496af-f4a2-40d6-84df-80493b4e0615.png",
                alt: "Início das obras mostrando a terraplanagem do terreno para a construção"
            },
            {
                id: 2,
                src: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/db2d48f5-fc3b-4108-bd41-27ddf4fe5cb9.png",
                alt: "Fundação da obra com estruturas metálicas e concreto armado sendo executadas"
            },
            {
                id: 3,
                src: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/744da791-9155-44d4-944f-67010b0c410a.png",
                alt: "Levantamento das paredes com tijolos e estrutura da construção em fase avançada"
            },
            {
                id: 4,
                src: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/dc25b283-2929-43b2-929f-19c33f82e7a3.png",
                alt: "Acabamentos finais com pintura e instalações elétricas sendo finalizadas"
            }
        ];

        let currentSlide = 0;
        const totalSlides = fotosObra.length;

        // Elementos DOM
        const slideImg = document.getElementById("slide-img");
        const btnPrev = document.getElementById("btn-prev");
        const btnNext = document.getElementById("btn-next");
        const miniaturasContainer = document.getElementById("miniaturas");
        const indicadoresContainer = document.getElementById("indicadores");
        const contadorDoadores = document.getElementById("contador-doadores");
        const barraProgresso = document.getElementById("barra-progresso");
        const progressoBarra = document.getElementById("progresso");

        if (!slideImg || !btnPrev || !btnNext || !miniaturasContainer || !indicadoresContainer || !contadorDoadores || !barraProgresso || !progressoBarra) {
            // Se algum elemento não existir, não inicializa o carrossel
            return;
        }

        // Função para atualizar slide
        function updateSlide(index) {
            currentSlide = index;
            const foto = fotosObra[currentSlide];
            slideImg.src = foto.src;
            slideImg.alt = foto.alt;

            // Atualiza miniaturas
            document.querySelectorAll(".miniatura-btn").forEach((btn, i) => {
                btn.classList.toggle("active", i === currentSlide);
            });

            // Atualiza indicadores
            document.querySelectorAll(".indicador").forEach((dot, i) => {
                dot.classList.toggle("active", i === currentSlide);
                dot.setAttribute("aria-selected", i === currentSlide ? "true" : "false");
                dot.setAttribute("tabindex", i === currentSlide ? "0" : "-1");
            });
        }

        // Próximo slide
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % totalSlides;
            updateSlide(nextIndex);
        }

        // Slide anterior
        function prevSlide() {
            const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlide(prevIndex);
        }

        // Criar miniaturas
        fotosObra.forEach((foto, index) => {
            const btn = document.createElement("button");
            btn.className = "miniatura-btn";
            btn.setAttribute("aria-label", `Ver foto ${index + 1}`);
            btn.type = "button";

            const img = document.createElement("img");
            img.src = foto.src;
            img.alt = `Miniatura: ${foto.alt}`;

            btn.appendChild(img);
            btn.addEventListener("click", () => updateSlide(index));
            miniaturasContainer.appendChild(btn);
        });

        // Criar indicadores
        fotosObra.forEach((_, index) => {
            const dot = document.createElement("button");
            dot.className = "indicador";
            dot.type = "button";
            dot.setAttribute("role", "tab");
            dot.setAttribute("aria-label", `Selecionar slide ${index + 1}`);
            dot.setAttribute("aria-selected", "false");
            dot.setAttribute("tabindex", "-1");
            dot.addEventListener("click", () => updateSlide(index));
            indicadoresContainer.appendChild(dot);
        });

        // Inicializa o slide
        updateSlide(0);

        // Eventos dos botões
        btnNext.addEventListener("click", nextSlide);
        btnPrev.addEventListener("click", prevSlide);

        // Contador de doadores animado
        let doadoresCount = 0;
        const doadoresMeta = 1000;
        const doadoresAtual = 510; // valor final simulado
        const duracaoAnimacao = 1500; // ms
        const frameRate = 30; // frames por segundo
        const totalFrames = Math.round((duracaoAnimacao / 1000) * frameRate);
        let frame = 0;

        function animarContador() {
            frame++;
            const progresso = frame / totalFrames;
            doadoresCount = Math.floor(progresso * doadoresAtual);
            if (doadoresCount > doadoresAtual) doadoresCount = doadoresAtual;
            contadorDoadores.textContent = doadoresCount.toLocaleString("pt-BR");

            // Atualiza barra de progresso
            const porcentagem = Math.min((doadoresCount / doadoresMeta) * 100, 100);
            progressoBarra.style.width = porcentagem + "%";
            barraProgresso.setAttribute("aria-valuenow", doadoresCount);

            if (frame < totalFrames) {
                requestAnimationFrame(animarContador);
            }
        }

        // Inicia animação após 1s
        setTimeout(() => {
            requestAnimationFrame(animarContador);
        }, 1000);
    })();
});

document.addEventListener('DOMContentLoaded', () => {
  const mainImage = document.getElementById('main-image');
  const thumbnails = document.querySelectorAll('.thumbnail');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      // Atualiza a imagem principal
      mainImage.src = thumbnail.dataset.full;
      mainImage.alt = thumbnail.alt;

      // Atualiza a classe active nas miniaturas
      thumbnails.forEach(tn => tn.classList.remove('active'));
      thumbnail.classList.add('active');
    });
  });
});