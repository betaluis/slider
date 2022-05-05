
const slider = document.querySelector('.reviews');
const buttons = document.querySelectorAll('.button');
const reviews = [...document.querySelectorAll('.review')];
const indicators = [...document.querySelectorAll('.indicator')];

// console.log(slider, buttons, reviews, indicators);

let isMoving;
let currentIndex = 1;

const showActiveIndicator = () => {
    indicators.forEach(ind => ind.classList.remove('active'));

    let activeIndicator;
    if (currentIndex === 0 || currentIndex === reviews.length - 2) {
        activeIndicator = indicators.length - 1;
    }
    if (currentIndex === 1 || currentIndex === reviews.length - 1) {
        activeIndicator = 0;
    }
    else {
        activeIndicator = currentIndex - 1; 
    }
    indicators[activeIndicator].classList.add('active');
}

const moveSlider = () => {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    showActiveIndicator();
}

const handleButtonClick = e => {
    if (isMoving) return;
    isMoving = true;

    e.currentTarget.id === 'next' ?
        currentIndex++ :
        currentIndex --;

    moveSlider();
}

const handleIndicatorClick = e => {
    if (isMoving) return;
    isMoving = true;
    
    currentIndex = indicators.indexOf(e.target) + 1;

    moveSlider();
}


buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
})

indicators.forEach(ind => {
    ind.addEventListener('click', handleIndicatorClick);
})

slider.addEventListener('transitionend', () => {
    isMoving = false;
    
    if (currentIndex === 0) {
        currentIndex = reviews.length -2;
        slider.style.transitionDuration = '1ms';
        return moveSlider();
    }
    if (currentIndex === reviews.length - 1) {
        currentIndex = 1;
        slider.style.transitionDuration = '1ms';
        return moveSlider();
    }
    slider.style.transitionDuration = '300ms';
})