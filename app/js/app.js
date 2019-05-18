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
}