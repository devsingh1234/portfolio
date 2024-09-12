
var circle = document.querySelector("#circle");
var frame =  document.querySelector(".frame");
const lerp = (x, y, a) => x * (1 - a) + y * a;

window.addEventListener("mousemove" ,function(dets){

gsap.to(circle ,{
    x: dets.clientX,
    y: dets.clientY,
    duration: .3,
    ease: Expo

})

})

frame.addEventListener("mousemove" ,function(dets){

    var dims = frame.getBoundingClientRect();
     var xstart = dims.x;
     var xend = dims.x + dims.width;

     var zerone = gsap.utils.mapRange(xstart , xend , 0 ,1 , dets.clientX)
    
    //  lerp (-50 , 50 , zerone)

    gsap.to(circle, {
        scale: 6,
    })

    gsap.to(".frame span",{
        color: "#fff",
        duration: .3,
        y: "-5vw"
    })

    gsap.to(".frame span",{
        x: lerp (-50 , 50 , zerone),
        duration: .2,
    })

    gsap.to("#main",{
        backgroundColor: "#000"
    })


    gsap.to("#text",{
        textContent: "A PASSIONATE",
            duration: 0.2,
            ease: "power2.inOut",
            color: "#e8842d" 
    })
})

frame.addEventListener("mouseleave" ,function(dets){

    gsap.to("#main",{
        backgroundColor: "#e8842d"
    })

    gsap.to("#text",{
        textContent: "HEY 👋 I AM,",
            duration: 0.2,
            ease: "power2.inOut",
            color: "#000" 
    })

    gsap.to(".frame span",{
        x: 0
    })


    gsap.to(circle, {
        scale: 1,
    })

    gsap.to(".frame span",{
        color: "#000",
        duration: .3,
        y: 0  
    })

})