document.addEventListener('DOMContentLoaded', () => {
    
    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Hero Image Slider ---
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 1) {
        let currentSlide = 0;
        setInterval(() => {
            heroSlides[currentSlide].classList.remove('active');
            // Reset scale for smooth re-zoom
            heroSlides[currentSlide].style.transform = 'scale(1.05)';
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }, 5000);
    }

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if(mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if(icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // --- Active Link Highlighting (Based on current URL) ---
    // Works for both file:// and http:// protocols
    const rawPath = window.location.pathname.split('/').pop();
    const currentPath = rawPath === '' || rawPath === undefined ? 'index.html' : rawPath;
    // Also detect page by checking which nav link is already marked active in HTML
    const htmlActivePage = document.querySelector('.nav-link.active');
    const activePage = htmlActivePage ? htmlActivePage.getAttribute('href') : currentPath;

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath || link.getAttribute('href') === activePage) {
            link.classList.add('active');
        }
    });

    // --- Intersection Observer for Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translate(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-left, .fade-in-right, .feature-card, .service-card');
    animatedElements.forEach(el => {
        if(el.classList.contains('fade-in-left')) {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-50px)';
            el.style.transition = 'all 0.8s ease-out';
        } else if(el.classList.contains('fade-in-right')) {
            el.style.opacity = '0';
            el.style.transform = 'translateX(50px)';
            el.style.transition = 'all 0.8s ease-out';
        }
        observer.observe(el);
    });

    // --- Gallery Data & Logic ---
    const galleryImages = [
        "1abeff5f-018c-4019-9b8e-b056b55de9aa.jpg",
        "WhatsApp Image 2026-09-01 at 13.14.57 (1).jpeg",
        "WhatsApp Image 2026-09-01 at 13.14.57 (2).jpeg",
        "WhatsApp Image 2026-09-01 at 13.14.57.jpeg",
        "WhatsApp Image 2026-09-01 at 13.15.07 (1).jpeg",
        "WhatsApp Image 2026-09-01 at 13.15.07 (2).jpeg",
        "WhatsApp Image 2026-09-01 at 13.15.07.jpeg",
        "a5016969-7ba6-4caa-bdf1-477626337e71.jpg",
        "d65ca33d-8e15-410e-8d87-39fa35b7569e.jpg",
        "f9190da4-f486-4fc9-a890-6c5baa17ad2f.jpg"
    ];

    const galleryGrid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    if (galleryGrid) {
        // If on index.html, only show 4 images, else show all
        const isHomePage = currentPath === 'index.html' || currentPath === '' || activePage === 'index.html';
        const limit = isHomePage ? 4 : galleryImages.length;
        
        for(let i=0; i<limit; i++) {
            const img = galleryImages[i];
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="assets/images/${img}" alt="Şeref Oğlu Vinç Galeri">
                <div class="gallery-overlay"></div>
            `;
            
            item.addEventListener('click', () => {
                if(lightbox) {
                    lightbox.style.display = 'block';
                    lightboxImg.src = `assets/images/${img}`;
                }
            });
            
            galleryGrid.appendChild(item);
        }
    }

    if(closeLightbox && lightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
        
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    // --- Blog Data & Logic ---
    const blogPosts = [
        {
            title: "Mobil Vinç Nedir? Nerelerde Kullanılır?",
            excerpt: "Mobil vinçler, taşınabilirlikleri ve hızlı kurulum özellikleriyle inşaat ve sanayi sektörünün vazgeçilmez ekipmanlarındandır. Bu yazımızda mobil vinçlerin kullanım alanlarını inceliyoruz.",
            content: `
                <p>Mobil vinçler, lastik tekerlekli veya paletli bir şasi üzerine monte edilmiş, yüksek hareket kabiliyetine sahip kaldırma ve taşıma ekipmanlarıdır. Sabit vinçlere kıyasla en büyük avantajları, bir noktadan diğerine hızlı bir şekilde intikal edebilmeleri ve kurulum sürelerinin çok kısa olmasıdır.</p>
                <img src="assets/images/WhatsApp Image 2026-09-01 at 13.14.57.jpeg" alt="Mobil Vinç">
                <h3>Nerelerde Kullanılır?</h3>
                <p><strong>1. İnşaat Sektörü:</strong> Çelik konstrüksiyon montajları, çatı sistemleri kurulumu ve ağır inşaat malzemelerinin katlara taşınması.</p>
                <p><strong>2. Sanayi ve Fabrikalar:</strong> Fabrika içi makine yerleşimleri, ağır sanayi ekipmanlarının taşınması ve montajı.</p>
                <p><strong>3. Kurtarma Operasyonları:</strong> Kaza yapan araçların kurtarılması veya yoldan çekilmesi.</p>
                <p><strong>4. Altyapı Projeleri:</strong> Boru hatları, köprü inşası ve enerji nakil hatları projelerinde ağır yüklerin hassas bir şekilde konumlandırılması.</p>
                <p>Şeref Oğlu Vinç olarak, geniş mobil vinç filomuzla tüm bu alanlarda güvenilir hizmet sunuyoruz.</p>
            `,
            image: "WhatsApp Image 2026-09-01 at 13.14.57.jpeg",
            date: "1 Eylül 2026"
        },
        {
            title: "İnşaat Projelerinde Vinç Kullanımının Önemi",
            excerpt: "Büyük çaplı inşaat projelerinde zaman yönetimi ve iş güvenliği açısından vinçlerin rolü çok büyüktür. Doğru vinç seçimi projenin kaderini belirler.",
            content: `
                <p>Günümüzde inşaat sektörü, gökdelenlerden devasa sanayi tesislerine kadar uzanan geniş bir yelpazede faaliyet göstermektedir. Bu devasa yapıların yükselmesinde insan gücünün yetersiz kaldığı noktalarda vinçler devreye girer.</p>
                <img src="assets/images/a5016969-7ba6-4caa-bdf1-477626337e71.jpg" alt="İnşaat Vinç">
                <h3>İnşaatta Vinci Zorunlu Kılan Etkenler</h3>
                <p><strong>Zaman Tasarrufu:</strong> Yüzlerce işçinin günlerce sürecek malzeme taşıma işlemi, uygun bir vinçle saatler içinde tamamlanabilir.</p>
                <p><strong>İş Güvenliği:</strong> Ağır malzemelerin insan gücüyle taşınması ciddi iş kazası riskleri barındırır. Vinçler, bu riski minimize ederek güvenli bir çalışma ortamı sağlar.</p>
                <p><strong>Maliyet Optimizasyonu:</strong> İlk bakışta vinç kiralama maliyetli gibi görünse de, işçilikten ve zamandan sağlanan tasarruf projenin toplam maliyetini düşürür.</p>
                <img src="assets/images/d65ca33d-8e15-410e-8d87-39fa35b7569e.jpg" alt="Şantiye">
                <p>Projeniz için en uygun tonaj ve özellikteki vinci belirlemek için uzman ekibimizle iletişime geçebilirsiniz.</p>
            `,
            image: "a5016969-7ba6-4caa-bdf1-477626337e71.jpg",
            date: "25 Ağustos 2026"
        },
        {
            title: "Makine Taşıma ve Montajında Vinç Kullanımı",
            excerpt: "Hassas sanayi makinelerinin taşınması ve montajı ekstra dikkat gerektirir. Bu süreçte doğru ekipman seçimi ve uzman operatörlük şarttır.",
            content: `
                <p>Fabrika ve üretim tesislerinde kullanılan endüstriyel makineler genellikle çok ağır, hacimli ve aynı zamanda son derece hassas cihazlardır. Bu makinelerin nakliyesi, fabrika içine yerleştirilmesi veya montajı uzmanlık gerektiren bir süreçtir.</p>
                <img src="assets/images/WhatsApp Image 2026-09-01 at 13.15.07.jpeg" alt="Makine Taşıma">
                <h3>Makine Taşımada Dikkat Edilmesi Gerekenler</h3>
                <p><strong>Hassas Planlama:</strong> Makinenin ağırlık merkezi, taşıma noktaları ve yerleştirileceği alanın dar/geniş olması önceden hesaplanmalıdır.</p>
                <p><strong>Uygun Ekipman:</strong> Dar alanlarda çalışabilen özel vinçler (hiab vb.) ve kaydırma/yürütme sistemleri kullanılmalıdır.</p>
                <p><strong>Uzman Operatör:</strong> Yükün salınım yapmadan, milimetrik hassasiyetle yerine konulması operatörün tecrübesine bağlıdır.</p>
                <p>Şeref Oğlu Vinç olarak, en hassas makinelerinizi sıfır hata prensibiyle taşıyor ve montajına destek oluyoruz.</p>
            `,
            image: "WhatsApp Image 2026-09-01 at 13.15.07.jpeg",
            date: "18 Ağustos 2026"
        },
        {
            title: "Tonajına Göre Vinç Seçimi Nasıl Yapılır?",
            excerpt: "Projenizde kullanılacak vincin tonaj kapasitesini belirlemek, hem güvenlik hem de maliyet açısından en kritik adımdır.",
            content: `
                <p>Bir vinç kiralarken sorulan ilk soru "Yükünüz kaç ton?" olur. Ancak vinç seçiminde tek kriter yükün ağırlığı değildir. Vincin pergel (bom) uzunluğu, yükün ulaşacağı yükseklik ve çalışma alanının genişliği de en az ağırlık kadar önemlidir.</p>
                <img src="assets/images/f9190da4-f486-4fc9-a890-6c5baa17ad2f.jpg" alt="Vinç Tonaj">
                <h3>Vinç Seçim Kriterleri</h3>
                <p><strong>1. Yükün Maksimum Ağırlığı:</strong> Kaldırılacak en ağır parça belirlenmelidir.</p>
                <p><strong>2. Çalışma Yarıçapı:</strong> Vincin duracağı nokta ile yükün bırakılacağı nokta arasındaki yatay mesafe. Mesafe arttıkça vincin kaldırma kapasitesi düşer!</p>
                <p><strong>3. Kaldırma Yüksekliği:</strong> Yükün kaç metre yukarıya veya aşağıya indirileceği.</p>
                <p><strong>4. Zemin Etüdü:</strong> Vincin kurulacağı zeminin sağlamlığı (toprak, beton vb.) ve ayakların açılma mesafesi.</p>
                <p>Doğru vinç seçimi için firmamızın ücretsiz keşif hizmetinden faydalanabilirsiniz.</p>
            `,
            image: "f9190da4-f486-4fc9-a890-6c5baa17ad2f.jpg",
            date: "10 Ağustos 2026"
        },
        {
            title: "Vinç Çalışmalarında İş Güvenliği İçin Alınması Gereken Önlemler",
            excerpt: "Vinç operasyonlarında öncelik daima insan hayatı olmalıdır. İş güvenliği için alınması gereken temel önlemleri derledik.",
            content: `
                <p>Ağır yük kaldırma operasyonları doğası gereği yüksek risk barındırır. Bu nedenle vinç çalışmalarında iş güvenliği kurallarından asla taviz verilmemelidir.</p>
                <img src="assets/images/WhatsApp Image 2026-09-01 at 13.15.07 (1).jpeg" alt="İş Güvenliği">
                <h3>Temel Güvenlik Önlemleri</h3>
                <p><strong>Periyodik Bakım:</strong> Kullanılacak vincin tüm periyodik kontrollerinin (çelik halatlar, hidrolik sistemler, kancalar vb.) yapılmış olması gerekir.</p>
                <p><strong>Sertifikalı Personel:</strong> Vinci kullanacak operatörün ve yükü bağlayacak (sapan) personelin mutlaka mesleki yeterlilik belgelerine sahip olması şarttır.</p>
                <p><strong>Alan Güvenliği:</strong> Vinç çalışma sahası emniyet şeridi ile çevrilmeli ve alana görevli olmayan kişilerin girmesi engellenmelidir. Yükün altında kesinlikle durulmamalıdır.</p>
                <p><strong>Hava Şartları:</strong> Özellikle rüzgarlı havalarda, vincin rüzgar limiti aşıldığında çalışma derhal durdurulmalıdır.</p>
                <p>Şeref Oğlu Vinç olarak operasyonlarımızda "Önce Güvenlik" ilkesiyle hareket ediyoruz.</p>
            `,
            image: "WhatsApp Image 2026-09-01 at 13.15.07 (1).jpeg",
            date: "5 Ağustos 2026"
        },
        {
            title: "Vinç Kiralama Nedir? Hangi Durumlarda Vinç Kiralanır?",
            excerpt: "Kısa veya uzun vadeli projelerde vinç kiralama hizmetinin avantajları ve kullanım senaryoları nelerdir?",
            content: `
                <p>Vinç kiralama, firmaların dönemsel veya proje bazlı ağır yük kaldırma ihtiyaçlarını, yüksek sermaye bağlayıp vinç satın almak yerine profesyonel firmalardan hizmet alarak çözdüğü bir yöntemdir.</p>
                <img src="assets/images/1abeff5f-018c-4019-9b8e-b056b55de9aa.jpg" alt="Vinç Kiralama">
                <h3>Kiralama Avantajları</h3>
                <p>Vinç satın almak sadece yüksek bir yatırım maliyeti değil; aynı zamanda bakım, onarım, sigorta, operatör istihdamı ve park yeri gibi sürekli giderler yaratır. Kiralama yöntemiyle firmalar sadece işin yapıldığı süre kadar ödeme yaparak maliyetlerini optimize ederler.</p>
                <h3>Ne Zaman Kiralanır?</h3>
                <p>Kısa süreli (saatlik/günlük) eşya, makine veya prefabrik ev taşıma işlerinde. Uzun süreli (aylık/yıllık) inşaat şantiyeleri, rüzgar gülü montajları veya altyapı projelerinde.</p>
                <p>Şeref Oğlu Vinç, her bütçeye ve projeye uygun kiralama seçenekleriyle yanınızdadır.</p>
            `,
            image: "1abeff5f-018c-4019-9b8e-b056b55de9aa.jpg",
            date: "1 Ağustos 2026"
        }
    ];

    const blogGrid = document.getElementById('blog-grid');
    if (blogGrid) {
        // If on index.html, only show 3 posts, else show all
        const isBlogOrHome = activePage === 'blog.html' || currentPath === 'blog.html';
        const limit = isBlogOrHome ? blogPosts.length : 3;
        
        for(let i=0; i<limit; i++) {
            const post = blogPosts[i];
            const card = document.createElement('div');
            card.className = 'blog-card';
            card.innerHTML = `
                <div class="blog-img">
                    <img src="assets/images/${post.image}" alt="${post.title}">
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span><i class="fa-regular fa-calendar"></i> ${post.date}</span>
                    </div>
                    <h3 class="blog-title"><a href="blog-detay.html?id=${i}">${post.title}</a></h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <a href="blog-detay.html?id=${i}" class="read-more">Devamını Oku <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            `;
            blogGrid.appendChild(card);
        }
    }

    // Render Blog Detail Page
    const blogDetailContainer = document.getElementById('blog-detail-container');
    if (blogDetailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = parseInt(urlParams.get('id'));
        
        if (!isNaN(postId) && postId >= 0 && postId < blogPosts.length) {
            const post = blogPosts[postId];
            
            // Set Page Title
            const pageTitle = document.getElementById('page-title');
            if(pageTitle) pageTitle.textContent = post.title;
            document.title = `${post.title} | Şeref Oğlu Vinç`;

            blogDetailContainer.innerHTML = `
                <div class="blog-detail-content fade-in-left">
                    <a href="blog.html" class="back-link"><i class="fa-solid fa-arrow-left"></i> Blog'a Geri Dön</a>
                    <h1 style="font-family: var(--font-heading); font-size: 2.2rem; color: #111; margin-bottom: 20px; line-height: 1.3;">${post.title}</h1>
                    <div class="blog-detail-meta">
                        <span><i class="fa-regular fa-calendar"></i> ${post.date}</span>
                        <span><i class="fa-regular fa-folder"></i> Vinç Rehberi</span>
                    </div>
                    <img src="assets/images/${post.image}" alt="${post.title}" class="blog-detail-image">
                    <div class="blog-detail-body">
                        ${post.content}
                    </div>
                </div>
            `;
        } else {
            blogDetailContainer.innerHTML = `<div class="container" style="text-align:center; padding: 50px 0;"><h2>Yazı bulunamadı.</h2><a href="blog.html" class="btn btn-primary" style="margin-top:20px;">Blog'a Dön</a></div>`;
        }
    }

});
