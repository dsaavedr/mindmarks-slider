const WRAPPER_QUERY = "#custom-brand-slider .swiper-wrapper",
    BUTTONS_QUERY = "#custom-brand-slider .icon",
    NAV_PREV = "#custom-brand-slider .icon.prev",
    NAV_NEXT = "#custom-brand-slider .icon.next",
    BREAKPOINT = 768,
    BUTTONS = document.querySelectorAll(BUTTONS_QUERY);

const wrapper = document.querySelector(WRAPPER_QUERY);

let swiper,
    swiperCreated = false;

const createSlide = ({ imgURL, imgAlt, title, body, back = "" }) => {
    return `
    <div class="swiper-slide ${back}">
        <div class="slide-content-wrapper">
            <img src="${imgURL}" alt="${imgAlt}">
            <div class="content">
                <div class="title">${title}</div>
                <div class="body">${body}</div>
            </div>
        </div>
    </div>
    `;
};

const createSlides = () => {
    data.forEach((el, idx) => {
        const slide = createSlide(
            idx % 2 === 0
                ? el
                : {
                      ...el,
                      back: "back"
                  }
        );

        wrapper.innerHTML += slide;
    });
};

const clearWrapper = () => {
    if (wrapper) wrapper.innerHTML = "";
};

const checkHeight = () => window.innerWidth <= BREAKPOINT;

const createSwiper = () => {
    swiper = new Swiper("#custom-brand-slider .swiper", {
        navigation: {
            prevEl: NAV_PREV,
            nextEl: NAV_NEXT
        },
        spaceBetween: 100
    });

    swiperCreated = true;
    // console.log("Created swiper");

    try {
        BUTTONS.forEach(button => button.removeEventListener("click", switchSlides));
    } catch (err) {
        console.error(err);
    }
};

const destroySwiper = () => {
    swiper.destroy(true, true);
    swiperCreated = false;
    // console.log("Destroyed swiper");
    clearWrapper();
    createSlides();

    try {
        BUTTONS.forEach(button => button.addEventListener("click", switchSlides));
    } catch (err) {
        console.error(err);
    }
};

const switchSlides = () => {
    const slides = document.querySelectorAll("#custom-brand-slider .swiper-slide");
    slides.forEach(slide => slide.classList.toggle("back"));
};

const init = () => {
    clearWrapper();
    createSlides();

    if (checkHeight()) {
        createSwiper();
    } else {
        BUTTONS.forEach(button => {
            button.addEventListener("click", switchSlides);
        });
    }

    window.addEventListener("resize", () => {
        if (checkHeight() && !swiperCreated) {
            createSwiper();
        } else if (!checkHeight() && swiperCreated) {
            destroySwiper();
        }
    });
};

init();
