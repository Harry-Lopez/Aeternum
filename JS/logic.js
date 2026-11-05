document.addEventListener("DOMContentLoaded", () => {
    // Control del Menú Móvil
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if(menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    // 1. Nuestros datos de paquetes para el Hero
    const heroData = [
        {
            title: "Crea momentos inolvidables",
            desc: "Descubre nuestros paquetes Aeternum diseñados para sorprender. Personalización y elegancia en pocos clics.",
            img: "Img/slide1.png"
        },
        {
            title: "La esencia del Totonacapan",
            desc: "Llevamos la tradición y el aroma de la vainilla a la puerta de tu hogar con empaques premium.",
            img: "Img/slide2.png"
        },
        {
            title: "Detalles corporativos únicos",
            desc: "Pregunta por nuestros lotes al por mayor para empresas ficticias. Impacto visual garantizado.",
            img: "Img/slide3.png"
        },
        {
            title: "Detalles corporativos únicos",
            desc: "Pregunta por nuestros lotes al por mayor para empresas ficticias. Impacto visual garantizado.",
            img: "Img/slide4.png"
        },
        {
            title: "Detalles corporativos únicos",
            desc: "Pregunta por nuestros lotes al por mayor para empresas ficticias. Impacto visual garantizado.",
            img: "Img/slide5.png"
        }
    ];

    let currentIndex = 0;
    const heroTrack = document.getElementById("hero-track");
    const titleEl = document.getElementById("hero-title");
    const descEl = document.getElementById("hero-desc");
    const imgEl = document.getElementById("hero-img");

    // Blindaje anti-bucle para la imagen del carrusel
    if (imgEl) {
        imgEl.onerror = function() {
            this.onerror = null; // Corta el bucle de error inmediatamente
            this.src = "Img/logo.png"; // Imagen de emergencia (asegúrese de que logo.png exista en la raíz)
        };
    }

    function nextSlide() {
        // 1. Detonar animación de salida
        heroTrack.classList.remove("active");
        heroTrack.classList.add("exit");

        // 2. Esperar a que termine la animación de salida (800ms según el CSS)
        setTimeout(() => {
            // Actualizar índice
            currentIndex = (currentIndex + 1) % heroData.length;
            
            // Cambiar los datos
            titleEl.textContent = heroData[currentIndex].title;
            descEl.textContent = heroData[currentIndex].desc;
            imgEl.src = heroData[currentIndex].img;

            // 3. Detonar animación de entrada
            heroTrack.classList.remove("exit");
            // Forzamos un reflow del DOM para que reinicie la animación CSS
            void heroTrack.offsetWidth; 
            heroTrack.classList.add("active");
        }, 800); // Mismo tiempo que fadeOutUp
    }

    function renderizarCatalogo() {
        const container = document.getElementById('catalogo-container');
        if(!container || typeof catalogoAeternum === 'undefined') return;

        // Extraer macro-categorías únicas
        const categoriasUnicas = [...new Set(catalogoAeternum.map(p => p.macro))];

        categoriasUnicas.forEach(macroCat => {
            // Filtrar productos de esta macro categoría
            const productos = catalogoAeternum.filter(p => p.macro === macroCat);
            const colorTema = productos[0].colorCat; // Hereda el color del primer ítem
            
            // Crear contenedor de sección
            const seccionHTML = document.createElement('div');
            seccionHTML.className = 'categoria-seccion';
            
            // Ensamblar las tarjetas (Inyectando HTML de forma eficiente)
            seccionHTML.innerHTML = `
                <div class="categoria-header" style="border-left: 6px solid ${colorTema};">
                    <h2 style="color: #1A3C28;">${macroCat}</h2>
                </div>
                <div class="scroll-horizontal-container">
                    ${productos.map(prod => `
                        <article class="tarjeta-producto" onclick="location.href='producto.html?id=${prod.id}'">
                            <div class="card-img-box">
                                <img src="${prod.img}" alt="${prod.nombre}" onerror="this.src='Img/logo.png'">
                            </div>
                            <div class="card-info">
                                <h3>${prod.nombre}</h3>
                                <span class="card-precio">$${prod.precio} MXN</span>
                                <p class="card-desc">${prod.desc}</p>
                                <div class="card-tag" style="background-color: ${prod.colorCat}; color: ${prod.colorCat === '#FFD700' ? '#1A3C28' : '#FFF'};">
                                    ${prod.categoria}
                                </div>
                            </div>
                        </article>
                    `).join('')}
                </div>
            `;
            container.appendChild(seccionHTML);
        });
    }

    // Iniciar el bucle cada 5.5 segundos
    setInterval(nextSlide, 5500);
    // Iniciar renderizado del catálogo
    renderizarCatalogo();
});