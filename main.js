const WRAPPER_QUERY = ".swiper-wrapper",
    NAV_PREV = ".icon.prev",
    NAV_NEXT = ".icon.next",
    BREAKPOINT = 768;

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

const checkHeight = () => {
    const { innerWidth: w } = window;

    return w <= BREAKPOINT;
};

const createSwiper = () => {
    swiper = new Swiper(".swiper", {
        navigation: {
            prevEl: NAV_PREV,
            nextEl: NAV_NEXT
        },
        spaceBetween: 100
    });
};

const init = () => {
    clearWrapper();
    createSlides();

    if (checkHeight()) {
        createSwiper();
    }

    window.addEventListener("resize", () => {
        if (checkHeight() && !swiperCreated) {
            createSwiper();
            swiperCreated = true;
            console.log("Created swiper");
        } else if (!checkHeight() && swiperCreated) {
            swiper.destroy(true, true);
            swiperCreated = false;
            console.log("Destroyed swiper");
        }
    });
};

init();
