document
    .querySelectorAll(".navigation a") // Отримуємо всі посилання і проходимося по них циклом
    .forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            // Для кожного навішуємо подію
            e.preventDefault(); // Запобігаємо стандартній поведінці

            const targetId = this.getAttribute("href"); // Отримуємо у кожного посилання атрибут target
            const targetElement = document.querySelector(targetId); // І знаходимо по атрибуту елементи, до яких потрібно прокручувати

            if (targetElement) {
                // Якщо елемент існує
                const elementTop = targetElement.offsetTop; // Отримуємо відстань від верхньої частини документа до верхньої межі елемента

                //Встановлюємо вiдстань до верхньої межi блоку, а також вказуємо -120 пiкселiв що б не перекривати блок блоком с навiгацiєю
                window.scrollTo({
                    top: elementTop - 120,
                    behavior: "smooth", // Вказуємо плавну прокрутку
                });
            }
        });
    });

const mobileSidebar = () => {
    let touchStartX = 0; // Оголошуємо 2 змінні для відстеження, де користувач торкнувся та відпустив екран
    let touchEndX = 0;

    const burger = document.querySelector(".mobile__swipe-invisible");
    burger.style.height = document.body.scrollHeight + "px";

    const mobileNavigation = document.querySelector(".mobile__container"); // Отримуємо потрібні елементи за допомогою id
    const mobileNavigationShadow = document.querySelector(
        ".mobile__container-shadow",
    );
    console.log(mobileNavigationShadow);
    const links = mobileNavigation.querySelectorAll("a");

    console.log(document.documentElement.scrollTop);
    burger.addEventListener("touchstart", handleTouchStart); // Створюємо події для відстеження свайпів користувача
    burger.addEventListener("touchmove", handleTouchMove);
    burger.addEventListener("touchend", handleTouchEnd);

    // Додаємо події кліку на кожне посилання навігації
    links.forEach((link) => {
        link.addEventListener("click", closeSidebar);
    });

    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX; // При натисканні на блок отримуємо глобальну координату, де користувач торкнувся сторінки
        mobileNavigation.style.top = `${document.documentElement.scrollTop}px`; // Встановлюємо висоту появи для блоку з навігацією
        mobileNavigationShadow.style.top = `${document.documentElement.scrollTop}px`; // Так само встановлюємо висоту для його заднього фону
    }

    function handleTouchMove(e) {
        touchEndX = e.changedTouches[0].screenX; // Під час руху також зчитуємо глобальні координати
    }

    function handleTouchEnd() {
        // Коли користувач завершив свайп, перевіряємо, чи рухався він вліво чи вправо
        if (touchEndX - touchStartX > 25) {
            openSidebar();
        } else if (touchEndX - touchStartX < -25) {
            closeSidebar();
        }
    }

    function openSidebar() {
        document.body.style.overflow = "hidden";
        mobileNavigation.classList.add("open"); // Додаємо клас "open", щоб показати блок навігації
        mobileNavigationShadow.classList.add("open");
    }

    function closeSidebar() {
        document.body.style.overflow = "";
        mobileNavigation.classList.remove("open"); // Видаляємо клас "open", щоб приховати блок навігації
        mobileNavigationShadow.classList.remove("open");
    }
};

mobileSidebar();
