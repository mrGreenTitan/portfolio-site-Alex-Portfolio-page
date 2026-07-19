import { commentsData } from './card-comment.js';

function navigationMenu() {
    const headerNavigation = document.querySelector('.header-navigation');
    const burger = document.querySelector('.burger');
    const navLinks = [...document.querySelectorAll('[data-nav-link]')];

    if (!headerNavigation || !burger || navLinks.length === 0) return;

    const closeMenu = () => {
        headerNavigation.classList.remove('menu-open');
        document.body.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Open navigation menu');
    };

    burger.addEventListener('click', () => {
        const isOpen = headerNavigation.classList.toggle('menu-open');
        document.body.classList.toggle('nav-open', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
        burger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeMenu();
    });

    const sections = navLinks
        .map(link => document.querySelector(link.hash))
        .filter(Boolean);

    let ticking = false;

    const setActiveLink = () => {
        const marker = window.innerHeight * 0.35;
        let activeSection = null;

        sections.forEach(section => {
            if (section.getBoundingClientRect().top <= marker) {
                activeSection = section;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('is-active', activeSection && link.hash === `#${activeSection.id}`);
        });

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(setActiveLink);
            ticking = true;
        }
    }, { passive: true });

    setActiveLink();
}

function contactShortcuts() {
    const contact = document.querySelector('#contact');
    const buttons = document.querySelectorAll('.btn-contact, .btn-contact-about');

    if (!contact || buttons.length === 0) return;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const isFarmContactButton = button.classList.contains('btn-contact');
            if (isFarmContactButton && button.dataset.contactReady !== 'true') return;

            const delay = isFarmContactButton ? 120 : 0;
            window.setTimeout(() => {
                contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, delay);
        });
    });
}

function contactFormFeedback() {
    const form = document.querySelector('.wrap-touch-inputs');
    if (!form) return;

    const submitButton = form.querySelector('button[type="submit"]');
    const defaultLabel = submitButton ? submitButton.textContent : '';

    form.addEventListener('submit', event => {
        event.preventDefault();

        if (!submitButton) return;

        submitButton.textContent = 'SENT';
        window.setTimeout(() => {
            submitButton.textContent = defaultLabel;
        }, 1800);
    });
}

function countBtnCont() {
    let headBtnContact = document.querySelector('.btn-contact');
    let spanOne = document.querySelector(`.header-content > div:nth-child(3) > span:nth-of-type(1)`);
    let spanTwo = document.querySelector(`.header-content > div:nth-child(3) > span:nth-of-type(2)`);
    if (!headBtnContact || !spanOne || !spanTwo) return;
    
    let countIndex = 0;
    headBtnContact.dataset.contactReady = 'false';
    headBtnContact.setAttribute('aria-label', 'Farm discount. Contact action unlocks at 30 percent.');
    headBtnContact.setAttribute('title', 'Farm discount to 30% first');

    let colors = [
        "#00F5FF", "#BF00FF", "#00FF7F", "#FF5F1F", "#FFF700",
        "#FF69B4", "#0CAFFF", "#FF3131", "#7FFFD4", "#FFD700"
    ];

    function getPaths() {
        let width = window.innerWidth;
        if (width < 768) {
            return [
                "path('M 30 40 Q 28 80, 31 -80')",
                "path('M 30 40 Q 28 80, 81 -80')",
                "path('M 30 40 Q 28 80, 131 -80')"
            ];
        } else {
            return [
                "path('M 30 40 Q -28 -80, -71 40')",
                "path('M 30 40 Q -28 -80, -71 -30')",
                "path('M 30 40 Q -28 -80, -21 -30')"
            ];
        }
    }

    let headImgOne = document.querySelector(`.header-content > div:nth-child(2) > .wrap-img > img:nth-of-type(1)`);
    let headImgTwo = document.querySelector(`.header-content > div:nth-child(2) > .wrap-img > img:nth-of-type(2)`);
    let headImgThree = document.querySelector(`.header-content > div:nth-child(2) > .wrap-img > img:nth-of-type(3)`);
    let headImgFour = document.querySelector(`.header-content > div:nth-child(2) > .wrap-img > img:nth-of-type(4)`);
    if (!headImgOne || !headImgTwo || !headImgThree || !headImgFour) return;
    headImgOne.classList.add('vis');

    function headImgSwap() {
        if (countIndex < 10) {
            headImgOne.classList.add('vis');
            headImgTwo.classList.remove('vis');
            headImgThree.classList.remove('vis');
            headImgFour.classList.remove('vis');
        } if (countIndex === 10) {
            headImgOne.classList.remove('vis');
            headImgTwo.classList.add('vis');
            headImgThree.classList.remove('vis');
            headImgFour.classList.remove('vis');
        } if (countIndex === 20) {
            headImgOne.classList.remove('vis');
            headImgTwo.classList.remove('vis');
            headImgThree.classList.add('vis');
            headImgFour.classList.remove('vis');
        } if (countIndex === 30) {
            headImgOne.classList.remove('vis');
            headImgTwo.classList.remove('vis');
            headImgThree.classList.remove('vis');
            headImgFour.classList.add('vis');
        }
    }

    function unlockContactButton() {
        headBtnContact.dataset.contactReady = 'true';
        headBtnContact.classList.add('is-ready');
        headBtnContact.setAttribute('aria-label', 'Contact Alex');
        headBtnContact.setAttribute('title', 'Contact action unlocked');
    }


    headBtnContact.addEventListener('click', function() {
        if (countIndex >= 30) return;
        if (spanOne.classList.contains('meter')) return;

        let paths = getPaths();
        let pathRandom = Math.floor(Math.random() * paths.length);
        let colorRandom = Math.floor(Math.random() * colors.length);

        spanOne.style.offsetPath = paths[pathRandom];
        spanOne.style.color = colors[colorRandom];
        spanOne.classList.add('meter');
        countIndex = countIndex + 1;
        spanOne.innerHTML = ('- ' + countIndex + "%");
        
        if (countIndex === 10) {
            spanTwo.classList.add('meter');
            spanTwo.style.color = colors[colorRandom];
            spanTwo.innerHTML = ('- ' + countIndex + "% 😱");
        } if (countIndex === 20) {
            spanTwo.style.color = colors[colorRandom];
            spanTwo.innerHTML = ('- ' + countIndex + "% 😎");
            spanTwo.classList.remove('meter');
            void spanTwo.offsetWidth;
            spanTwo.classList.add('meter');
        } if (countIndex === 30) {
            spanTwo.style.color = colors[colorRandom];
            spanTwo.innerHTML = ('- ' + countIndex + "% 🤠");
            spanTwo.classList.remove('meter');
            void spanTwo.offsetWidth;
            spanTwo.classList.add('meter');
            unlockContactButton();
        }

        headImgSwap();
    });

    spanOne.addEventListener('animationend', function() {
        spanOne.classList.remove('meter');
    });

    spanTwo.addEventListener('animationend', function() {
        if (countIndex < 30) {
            setTimeout(function() {
                if (countIndex < 30) {
                    spanTwo.classList.remove('meter');
                }
            }, 3000);
        }
    });
}

const logoSvg = [];
const layoutOne = [];
const layoutTwo = [];

let totalSvg = 50;
let wrapLogos = document.querySelector('.wrap-logos');

let totalLayout = 12;
let wrapLayoutOne = document.querySelector('.wrap-layout-one');
let wrapLayoutTwo = document.querySelector('.wrap-layout-two');

function addTotal(totalSvg, totalLayout) {
    for (let i = 1; i <= totalSvg; i++) {
        logoSvg.push('svg/Logo' + i + '.svg');
    }

    for (let i = 1; i <= totalLayout; i++) {
        layoutOne.push('img/row1/model' + i + '.webp');
        layoutTwo.push('img/row2/model' + i + '.webp');
    }
}

function showSvgLine(masSvg, masLayoutOne, masLayoutTwo) {
    for (let j = 0; j < masSvg.length; j++) {
        let div = document.createElement('div');
        div.className = 'logo';
        let img = document.createElement('img');
        img.src = masSvg[j];
        img.alt = '';
        img.decoding = 'async';

        div.appendChild(img);
        wrapLogos.appendChild(div);
    }

    for (let k = 0; k < masLayoutOne.length; k++) {
        let div = document.createElement('div');
        div.className = 'layout';
        let img = document.createElement('img');
        img.src = masLayoutOne[k];
        img.alt = 'Portfolio layout preview';
        img.decoding = 'async';

        div.appendChild(img);
        wrapLayoutOne.appendChild(div);
    }

    for (let k = 0; k < masLayoutTwo.length; k++) {
        let div = document.createElement('div');
        div.className = 'layout';
        let img = document.createElement('img');
        img.src = masLayoutTwo[k];
        img.alt = 'Portfolio layout preview';
        img.decoding = 'async';

        div.appendChild(img);
        wrapLayoutTwo.appendChild(div);
    }
}

function about() {
    const h1 = document.querySelector('.wrap-about h1');
    if (!h1) return;

    const aboutP = document.querySelector('.wrap-about p');
    aboutP.classList.add('no-vis');

    const aboutFlyImg = document.querySelectorAll('.wrap-about img');
    aboutFlyImg.forEach(img => img.classList.add('no-vis'));
    
    // Кэшируем высоту экрана, чтобы не дергать её постоянно
    // Но обновляем при ресайзе (повороте телефона)
    let windowHeight = window.innerHeight;
    window.addEventListener('resize', () => {
        windowHeight = window.innerHeight;
    });

    window.addEventListener('scroll', () => {
        // Используем requestAnimationFrame для плавности на 120Гц экранах
        requestAnimationFrame(() => {
            const rect = h1.getBoundingClientRect();
            
            const startPoint = windowHeight;
            const endPoint = windowHeight * 0.4;

            let progress = (startPoint - rect.top) / (startPoint - endPoint);
            progress = Math.max(0, Math.min(1, progress));

            h1.style.setProperty('--fill-opacity', progress);

            if (progress > 0) {
                if (aboutFlyImg[0].classList.contains('no-vis')) {
                    aboutFlyImg.forEach(img => img.classList.remove('no-vis'));
                    aboutP.classList.remove('no-vis');
                    setTimeout(() => {
                        aboutFlyImg.forEach(img => img.classList.add('up'));
                        if(aboutFlyImg[1]) {
                            aboutFlyImg[1].classList.add('rot');
                        }
                    }, 2500);
                }
            }
        });
    });
}

function services() {
    const h1 = document.querySelector('.wrap-serv-cont h1');
    const infLines = document.querySelectorAll('.wrap-serv-inf > div'); 
    
    if (!h1 && infLines.length === 0) return;

    let windowHeight = window.innerHeight;
    window.addEventListener('resize', () => {
        windowHeight = window.innerHeight;
    });

    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            const applyAnimation = (el, type = 'opacity') => {
                const rect = el.getBoundingClientRect();
                const startPoint = windowHeight * 0.9; 
                const endPoint = windowHeight * 0.3; // Чуть выше, чтобы анимация успела закончиться

                let progress = (startPoint - rect.top) / (startPoint - endPoint);
                progress = Math.max(0, Math.min(1, progress));

                if (type === 'fill') {
                    el.style.setProperty('--fill-opacity', progress);
                    el.style.transform = `translateY(${(1 - progress) * 30}px)`;
                } else {
                    // Анимация самой линии
                    el.style.opacity = progress;
                    el.style.transform = `translateY(${(1 - progress) * 20}px)`;

                    // Анимация плашки внутри numberBlock (первого div)
                    const numberBlock = el.querySelector('div:nth-of-type(1)');
                    if (numberBlock) {
                        // Передаем прогресс в CSS переменную
                        numberBlock.style.setProperty('--reveal-progress', progress);
                    }
                }
            };

            if (h1) applyAnimation(h1, 'fill');
            infLines.forEach(line => applyAnimation(line));
        });
    });
}

function projects() {
    // Находим главный заголовок секции проектов
    const projH1 = document.querySelector('section.projects > div > h1');
    // Находим остальные линии/блоки, если они есть в этой секции
    const infLines = document.querySelectorAll('.wrap-serv-inf > div'); 
    
    if (!projH1 && infLines.length === 0) return;

    let windowHeight = window.innerHeight;
    window.addEventListener('resize', () => {
        windowHeight = window.innerHeight;
    });

    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            const applyAnimation = (el, type = 'opacity') => {
                if (!el) return;

                const rect = el.getBoundingClientRect();
                
                // Настройки точек появления
                const startPoint = windowHeight * 0.9; // Появляется внизу
                const endPoint = windowHeight * 0.3;   // Заканчивает появление к верху

                // Расчет прогресса
                let progress = (startPoint - rect.top) / (startPoint - endPoint);
                progress = Math.max(0, Math.min(1, progress));

                if (type === 'fill') {
                    // Управляет прозрачностью белого текста в ::after
                    el.style.setProperty('--fill-opacity', progress);
                    // Эффект подъема на 30px
                    el.style.transform = `translateY(${(1 - progress) * 30}px)`;
                } else {
                    // Для обычных линий (если используются в секции)
                    el.style.opacity = progress;
                    el.style.transform = `translateY(${(1 - progress) * 20}px)`;
                }
            };

            // Применяем к заголовку эффект 'fill'
            if (projH1) applyAnimation(projH1, 'fill');
            
            // Применяем к остальным элементам (если есть)
            infLines.forEach(line => applyAnimation(line));
        });
    });

    function bindProjectTapeControls(scroller) {
        if (!scroller || scroller.dataset.tapeReady === 'true') return;

        scroller.dataset.tapeReady = 'true';
        scroller.setAttribute('tabindex', '0');
        scroller.setAttribute('aria-label', 'Project image carousel');

        let isDragging = false;
        let startX = 0;
        let startScrollLeft = 0;

        scroller.addEventListener('pointerdown', event => {
            if (event.pointerType === 'touch') return;

            isDragging = true;
            startX = event.clientX;
            startScrollLeft = scroller.scrollLeft;
            scroller.classList.add('active');
            scroller.setPointerCapture(event.pointerId);
        });

        scroller.addEventListener('pointermove', event => {
            if (!isDragging) return;

            event.preventDefault();
            scroller.scrollLeft = startScrollLeft - (event.clientX - startX);
        });

        const stopDragging = event => {
            if (!isDragging) return;

            isDragging = false;
            scroller.classList.remove('active');

            if (scroller.hasPointerCapture(event.pointerId)) {
                scroller.releasePointerCapture(event.pointerId);
            }
        };

        scroller.addEventListener('pointerup', stopDragging);
        scroller.addEventListener('pointercancel', stopDragging);
        scroller.addEventListener('pointerleave', stopDragging);

        scroller.addEventListener('keydown', event => {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

            event.preventDefault();
            const direction = event.key === 'ArrowRight' ? 1 : -1;
            scroller.scrollBy({
                left: direction * scroller.clientWidth * 0.78,
                behavior: 'smooth',
            });
        });
    }

    function lowerScreenWidth() {
        const windowWidth = window.innerWidth;
        // Находим элементы один раз в начале функции, чтобы они были доступны везде
        const elements = document.querySelectorAll('.card-bottom');

        if (windowWidth < 1152) {
            elements.forEach((block, blockIdx) => {
                // Если уже применили изменения — пропускаем, чтобы не перезагружать картинки зря
                if (block.classList.contains('wrap-lower-screen')) {
                    bindProjectTapeControls(block);
                    return;
                }

                let wrapImgOne = block.querySelector('.wrap-img-one');
                let wrapImgTwo = block.querySelector('.wrap-img-two');

                // 1. Сохраняем старый HTML ПЕРЕД тем как его менять
                if (!block.dataset.oldHtml) {
                    block.dataset.oldHtml = wrapImgOne.innerHTML;
                }

                // 2. Скрываем второй блок
                if (wrapImgTwo) wrapImgTwo.style.display = 'none';

                // 3. Меняем классы
                block.classList.add('wrap-lower-screen');
                bindProjectTapeControls(block);
                wrapImgOne.classList.add('lower-screen');

                // 4. Генерируем новый контент (твоя логика с картинками)
                let htmlContent = '';
                for (let i = 1; i <= 3; i++) {
                    const globalImgNum = (blockIdx * 3) + i;
                    const src = `img/row1/model${globalImgNum}.webp`;
                    htmlContent += `<div class="wrap-img"><img src="${src}" alt="Project preview ${globalImgNum}" loading="lazy" decoding="async"></div>`;
                }
                wrapImgOne.innerHTML = htmlContent;
            });
        } else {
            // ЭКРАН БОЛЬШЕ 1152пх — ВОЗВРАЩАЕМ ВСЁ НАЗАД
            elements.forEach((block) => {
                if (block.classList.contains('wrap-lower-screen')) {
                    block.classList.remove('wrap-lower-screen');

                    let wrapImgOne = block.querySelector('.wrap-img-one');
                    let wrapImgTwo = block.querySelector('.wrap-img-two');

                    // Показываем скрытый блок обратно
                    if (wrapImgTwo) wrapImgTwo.style.display = '';

                    // Убираем класс
                    wrapImgOne.classList.remove('lower-screen');

                    // Восстанавливаем старый HTML из памяти
                    if (block.dataset.oldHtml) {
                        wrapImgOne.innerHTML = block.dataset.oldHtml;
                    }
                }
            });
        }
    }

    // Запуск при загрузке
    lowerScreenWidth();

    // Запуск при ресайзе (с оптимизацией или без)
    window.addEventListener('resize', lowerScreenWidth);
}

function clients() {
    const wrapSliderClients = document.querySelector('.wrap-clients-slider');

    let dataIndex = 0;

    for(let i = 0; i < 3; i++){
        let div = document.createElement('div');
        div.className = 'comments'
        wrapSliderClients.appendChild(div);
    }

    let allComments = wrapSliderClients.querySelectorAll('.comments');

    allComments.forEach((comments, index) => {
        if(index % 2 === 0){
            comments.dataset.direction = 'right';
        }else{
            comments.dataset.direction = 'left';
        }

        for(let k = 0; k < 4; k++){
            if(dataIndex >= commentsData.length){
                dataIndex = 0;
            }

            if(dataIndex < commentsData.length){
                let currentData = commentsData[dataIndex];

                let divComment = document.createElement('div');
                divComment.className = 'comment';

                let avatar = document.createElement('div');
                avatar.className = 'avatar';
                let img = document.createElement('img');
                img.src = currentData.avatar;
                img.alt = currentData.name;

                avatar.appendChild(img);

                let info = document.createElement('div');
                info.className = 'info';
                info.innerHTML = `
                    <p>${currentData.text}</p>
                    <span>${currentData.name}</span>
                `;

                divComment.append(avatar, info);
                comments.appendChild(divComment);
                dataIndex++;
            }
        }
    });

    function clientSlider() {
        if(allComments.length === 0) return; 

        let windowHeight = window.innerHeight;
        let windowWidth = window.innerWidth;

        window.addEventListener('resize', () => {
            windowHeight = window.innerHeight;
            windowWidth = window.innerWidth;
        });

        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                allComments.forEach((comments) => {
                    let rect = comments.getBoundingClientRect();
                    
                    if (rect.top < windowHeight && rect.bottom > 0){
                        let progress = (windowHeight - rect.top) / (windowHeight + rect.height);
                        progress = Math.max(0, Math.min(1, progress));

                        const speed = 0.5;

                        const maxMove = (comments.offsetWidth - windowWidth) * speed;

                        const direction = comments.dataset.direction;
                        let currentX;

                        if(direction === 'right'){
                            currentX = -maxMove + (progress * maxMove);
                        }else{
                            currentX = -(progress * maxMove);
                        }
                        comments.style.transform = `translateX(${currentX}px)`;
                    }
                });
            });
        });
        window.dispatchEvent(new Event('scroll'));
    }

   clientSlider();
}

navigationMenu();
contactShortcuts();
contactFormFeedback();
countBtnCont();

addTotal(totalSvg, totalLayout);

showSvgLine(logoSvg, layoutOne, layoutTwo);
showSvgLine(logoSvg, layoutOne, layoutTwo);

about();
services();
projects();
clients();
