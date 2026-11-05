document.addEventListener("DOMContentLoaded", () => {
    // Control del Menú Móvil
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if(menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // ////////////////////////////////////////////////////////
    //           Datos de paquetes para el Hero
    // ////////////////////////////////////////////////////////
    // 1. Datos de paquetes para el Hero con Títulos Bicolores
    const heroData = [
        {
            // Rojo Hibisco + Verde Oscuro (Producto Principal)
            titleHTML: '<span style="color: #FF4500;">Ediciones Especiales</span> <span style="color: #1A3C28;">Aeternum</span>',
            desc: "Descubre nuestros cofres y cajas de diseño con tus superhéroes y temas favoritos. El empaque principal de nuestra marca.",
            img: "Img/slide1.png"
        },
        {
            // Naranja Atardecer + Verde Oscuro (Accesorios Personales)
            titleHTML: '<span style="color: #FFA500;">Accesorios</span> <span style="color: #1A3C28;">y Estilo Personal</span>',
            desc: "Lleva la elegancia contigo: collares, pulseras tejidas, lentes sunset y espejos con acabados artesanales únicos.",
            img: "Img/slide2.png"
        },
        {
            // Verde Oscuro + Naranja Atardecer (Papelería Eco)
            titleHTML: '<span style="color: #1A3C28;">Papelería Eco</span> <span style="color: #FFA500;">& Detalles</span>',
            desc: "Organiza tus ideas en nuestras libretas ecológicas, complementadas con sets de lapiceros, pines y stickers premium.",
            img: "Img/slide3.png"
        },
        {
            // Amarillo Dorado + Rojo Hibisco (Geek & Coleccionables)
            titleHTML: '<span style="color: #D9A000;">Zona Geek</span> <span style="color: #FF4500;">& Coleccionables</span>',
            desc: "Encuentra la réplica perfecta: artículos de videojuegos, agarraderas de celular ergonómicas y llaveros metálicos de colección.",
            img: "Img/slide4.png"
        },
        {
            // Naranja Atardecer + Verde Oscuro (Filosofía)
            titleHTML: '<span style="color: #FFA500;">Conoce Nuestra</span> <span style="color: #1A3C28;">Filosofía</span>',
            desc: "Piezas hechas con dedicación, combinando creatividad, materiales de calidad y la magia de Papantla en cada envío.",
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
            this.src = "Img/logo2.png"; // Imagen de emergencia (asegúrese de que logo2.png exista en la raíz)
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
            // LÍNEA NUEVA:
            titleEl.innerHTML = heroData[currentIndex].titleHTML;
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
                                <img src="${prod.img}" alt="${prod.nombre}" onerror="this.src='Img/logo2.png'">
                            </div>
                            <div class="card-info">
                                <h3>${prod.nombre}</h3>
                                <span class="card-precio">$${prod.precio} MXN</span>
                                <p class="card-desc">${prod.desc}</p>
                                
                                <!-- Contenedor inferior: Etiqueta + Botón -->
                                <div class="card-footer-flex">
                                    <button class="btn-comprar">Comprar</button>
                                    <div class="card-tag" style="background-color: ${prod.colorCat}; color: ${prod.colorCat === '#FFD700' ? '#1A3C28' : '#FFF'};">
                                        ${prod.categoria}
                                    </div>
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
    setInterval(nextSlide, 10000);
    // Iniciar renderizado del catálogo
    renderizarCatalogo();
});