// NAVBAR 
gsap.from('.main-link', {
    duration: 1,
    opacity: 0,
    x: -100,
    stagger: 0.2
})
gsap.from('.main-link-icons > a', {
    delay: 0.5,
    duration: 1,
    opacity: 0,
    x: -100,
    stagger: 0.2
})

// LANDING PAGE
gsap.from('.landing-bowl', {
    delay: 0.6,
    duration: 1,
    opacity: 0,
    y: -100
})
gsap.from('.landing-title', {
    duration: 1,
    opacity: 0,
    x: -100,
})
gsap.from('.landing-caption > p', {
    duration: 1,
    opacity: 0,
    y: 100
})
gsap.from('.landing-card', {
    delay: 0.9,
    duration: 1,
    opacity: 0,
    x: -100,
    stagger: 0.4
})


