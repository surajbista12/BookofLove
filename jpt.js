var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'),
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning');

let timeRunning = 3000;
let timeAutoNext = 7000;

nextBtn.onclick = function() {
    showSlider('next');
}

prevBtn.onclick = function() {
    showSlider('prev');
}

let runTimeOut;

let runNextAuto = setTimeout(() => {
    nextBtn.click();
}, timeAutoNext);

// Function to reset the time animation for the progress bar
function resetTimeAnimation() {
    runningTime.style.animation = 'none';
    runningTime.offsetHeight; // trigger reflow
    runningTime.style.animation = null;
    runningTime.style.animation = 'runningTime 7s linear 1 forwards';
}

// Function to display the next or previous slide
function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item');
    let activeItem = list.querySelector('.item.active'); // Get currently active item

    if (type === 'next') {
        // Move the first item to the end
        list.appendChild(sliderItemsDom[0]);
        activeItem.classList.remove('active');
        sliderItemsDom[1].classList.add('active');
        carousel.classList.add('next');
    } else {
        // Move the last item to the beginning
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        activeItem.classList.remove('active');
        sliderItemsDom[sliderItemsDom.length - 2].classList.add('active');
        carousel.classList.add('prev');
    }

    clearTimeout(runTimeOut);

    runTimeOut = setTimeout(() => {
        carousel.classList.remove('next');
        carousel.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);

    resetTimeAnimation(); // Reset the running time animation
}

// Start the initial animation
resetTimeAnimation();
