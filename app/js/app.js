const parallax4 = document.querySelector('.parallax-4');
const parallax3 = document.querySelector('.parallax-3');
const parallax2 = document.querySelector('.parallax-2');
const parallax1 = document.querySelector('.parallax-1');
const parallax0 = document.querySelector('.parallax-0');

window.onload = function () {
    const sections = document.querySelectorAll('section');
    let delay = 0;

    for (const section of sections) {
        window.setTimeout(function () {
            section.style.display = "block";
            section.style.transform = "translateY(0)";
            section.style.opacity = 1;
        }, delay);

        delay += 300;
    }

    // Parallax effects
    redrawParallax();
    window.addEventListener('scroll', (e) => {
       redrawParallax();
    });
};

function redrawParallax() {
    // Get the height of the FUN div
    const divHeight = document.getElementById('fun').getBoundingClientRect()['height'];
    const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
    const screen = window.innerHeight;
    const body = document.body.getBoundingClientRect()['height'];
    const bodyWithoutDiv = body - divHeight;
    const value = Math.max(-1 * (bodyWithoutDiv - (scrolled + screen)), 0);
    console.log("Scrolled inside div: ", value);

    // Move the elements by some scale
    parallax4.style.bottom = value * 0.25 + "px";
    parallax3.style.bottom = value * 0.2 + "px";
    parallax2.style.bottom = value * 0.15 + "px";
    parallax1.style.bottom = value * 0.1 + "px";
    parallax0.style.bottom = value * 0.1 + "px";
}