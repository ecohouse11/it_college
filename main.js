// === 1. ЛОГІКА ВИПАДАЮЧОГО МЕНЮ (ПО КЛІКУ) ===
const menuBtn = document.querySelector('.menu-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');

if (menuBtn && dropdownMenu) {
    // Відкриваємо/закриваємо меню по кліку на кнопку
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Зупиняємо подію, щоб вона відразу не закривала меню
        dropdownMenu.classList.toggle('active');
    });

    // Закриваємо меню, якщо клікнули в будь-якому іншому місці сайту
    document.addEventListener('click', (e) => {
        if (!dropdownMenu.contains(e.target) && e.target !== menuBtn) {
            dropdownMenu.classList.remove('active');
        }
    });
}


// === 2. ЛОГІКА СЛАЙДЕРА (ДЛЯ ГОЛОВНОЇ СТОРІНКИ) ===
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.slider-dots');

// Перевіряємо, чи є слайдер на цій сторінці (щоб не було помилок на інших сторінках)
if (track && slides.length > 0 && prevBtn && nextBtn && dotsContainer) {
    let currentIndex = 0;

    // Автоматично створюємо крапки під кількість слайдів
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => updateSlider(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // Функція оновлення позиції слайдера
    function updateSlider(index) {
        currentIndex = index;
        
        // Зміщуємо стрічку зі слайдами вліво
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Оновлюємо активну крапку
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    // Кнопка "Вперед"
    nextBtn.addEventListener('click', () => {
        let index = currentIndex + 1;
        if (index >= slides.length) index = 0; // На початок
        updateSlider(index);
    });

    // Кнопка "Назад"
    prevBtn.addEventListener('click', () => {
        let index = currentIndex - 1;
        if (index < 0) index = slides.length - 1; // В кінець
        updateSlider(index);
    });
}

// === 3. ЛОГІКА МОДАЛЬНОГО ВІКНА ДЛЯ КОНСУЛЬТАЦІЇ ===
const modal = document.getElementById('consultation-modal');
const openModalBtns = document.querySelectorAll('.btn-consult'); // Знаходить всі такі кнопки на сторінці
const closeModalBtn = document.querySelector('.modal-close-btn');
const modalForm = document.querySelector('.modal-form');

if (modal && openModalBtns.length > 0 && closeModalBtn) {
    
    // Перебираємо всі кнопки "Отримати консультацію" та вішаємо клік
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('modal-active');
            document.body.style.overflow = 'hidden'; // Забороняємо гортати сайт під модалкою
        });
    });

    // Закриття вікна при кліку на хрестик
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('modal-active');
        document.body.style.overflow = ''; // Повертаємо прокрутку сайту
    });

    // Закриття вікна при кліку на сіру зону навколо форми
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('modal-active');
            document.body.style.overflow = '';
        }
    });

    // Обробка відправки форми (імітація)
    if (modalForm) {
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Тут можна зчитати дані, якщо знадобиться
            const name = document.getElementById('user-name').value;
            const phone = document.getElementById('user-phone').value;
            const method = document.querySelector('input[name="contact-method"]:checked').value;
            
            alert(`Дякуємо, ${name}! Ми зв'яжемося з Вами за номером ${phone}.`);
            
            // Закриваємо вікно та очищуємо форму
            modalForm.reset();
            modal.classList.remove('modal-active');
            document.body.style.overflow = '';
        });
    }
}