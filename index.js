////////////////////
//     Easing     //
////////////////////

function lerp(a, b, t)
{
    return a + (b - a) * t;
}

function ease(t)
{
    return (t * t) * (3 - 2 * t);
}

function easeInOut(t) {
    return t < 0.5
        ? 2 * t * t
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function easeInExpo(t) {
    return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
}

const panelColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--panel')
    .trim();
const lineColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--line')
    .trim();


////////////////////
//     Scroll     //
////////////////////

const parallaxFactor = -0.5

window.addEventListener('scroll', function ()
{
    window.requestAnimationFrame(function ()
    {
        const scrollY = window.scrollY;
        const maxScroll = window.innerHeight;

        ////////////////////////
        //     Background     //
        ////////////////////////

        const backgroundProgress = Math.min(scrollY / maxScroll, 1);
        const bg = document.getElementById('background');
        if (bg)
        {
            //Blur
            const backgroundBlurAmount = backgroundProgress * 35;
            bg.style.filter = `blur(${backgroundBlurAmount}px)`;

            //Parallax
            const parallax = scrollY * parallaxFactor; // Ajusta el factor
            //bg.style.transform = `translateY(${parallax}px)`;
        }

        ////////////////////
        //     HEADER     //
        ////////////////////

        const header = document.getElementsByTagName('header')[0];
        const headerProgress = Math.min(scrollY / maxScroll * 4, 1);

        if (header)
        {
            //Blur
            const headerBlurAmount = headerProgress * 10;

            header.style.backdropFilter = `blur(${headerBlurAmount}px)`;
            header.style.background =
                `color-mix(in srgb, transparent ${100 - headerProgress * 100}%, ${panelColor})`;
            header.style.borderBottom =
                `0.5px solid color-mix(in srgb, transparent ${100 - headerProgress * 100}%, ${lineColor})`;
        }
    });
});