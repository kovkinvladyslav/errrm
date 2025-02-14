let jumpCount = 0; 
let stardropClicked = false; 


function jumpStardrop() {
    let jumpHeight = jumpCount % 3 === 2 ? -25 : -15; 
    let jumpDuration = 0.6 + Math.random() * 0.3; 

    gsap.to("#stardrop", {
        y: jumpHeight,
        repeat: 1,
        yoyo: true,
        duration: jumpDuration,
        ease: "power1.inOut",
        onComplete: () => {
            jumpCount++;
            if (!stardropClicked) {
                jumpStardrop();
            }
        }
    });

    if (jumpCount % 3 === 2) {
        gsap.to("#stardrop", {
            rotationY: "+=180", 
            duration: jumpDuration,
            ease: "power1.inOut"
        });
    }
}

jumpStardrop();

function generateStars() {
    let starContainer = document.getElementById("star-container");
    starContainer.innerHTML = "";

    for (let i = 0; i < 50; i++) {
        let star = document.createElement("div");
        star.className = "star";
        starContainer.appendChild(star);

        let randomX = Math.random() * (window.innerWidth - 20);
        let randomY = Math.random() * (window.innerHeight - 20);
        let randomSize = Math.random() * 10 + 10; 
        let randomDuration = Math.random() * 3 + 2;
        let delay = Math.random() * 2;

        gsap.set(star, {
            x: randomX,
            y: randomY,
            width: randomSize,
            height: randomSize,
            opacity: 0
        });

        gsap.to(star, {
            opacity: 1,
            duration: randomDuration,
            repeat: -1,
            yoyo: true,
            delay: delay,
            ease: "power1.inOut"
        });

        gsap.to(star, {
            x: randomX + Math.random() * 40 - 20,
            y: randomY + Math.random() * 40 - 20,
            duration: randomDuration,
            repeat: -1,
            yoyo: true,
            delay: delay,
            ease: "sine.inOut"
        });
    }
}

document.getElementById("stardrop").addEventListener("click", function(event) {
    if (stardropClicked) return;
    stardropClicked = true;

    let explosionVideo = document.getElementById("explosion-video");
    let valentineContainer = document.getElementById("valentine-container");
    let stardropText = document.getElementById("stardrop-text");
    let bgMusic = document.getElementById("bg-music");
    bgMusic.play();
    
    explosionVideo.style.opacity = "1"; 
    explosionVideo.currentTime = 0;
    explosionVideo.play();

    gsap.to(explosionVideo, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.to(explosionVideo, { opacity: 0, delay: 1.5, duration: 0.8, ease: "power2.out" });

    gsap.to("#stardrop", { 
        rotationY: 2160, 
        scale: 1.8, 
        duration: 2, 
        ease: "power3.inOut",
        onComplete: function() {
            gsap.to("#stardrop", { opacity: 0, scale: 2, duration: 0.5, ease: "expo.inOut" });

            setTimeout(() => {
                explosionVideo.style.opacity = "1"; 
                explosionVideo.currentTime = 0;
                explosionVideo.play();
                gsap.to(explosionVideo, { opacity: 1, duration: 0.3, ease: "power2.out" });
                gsap.to(explosionVideo, { opacity: 0, delay: 1.5, duration: 0.8, ease: "power2.out" });
            }, 300);

            valentineContainer.style.zIndex = "1000"; 
            valentineContainer.style.pointerEvents = "auto"; 

            gsap.to(valentineContainer, { opacity: 1, duration: 1, ease: "power2.inOut" });

            gsap.to(stardropText, { opacity: 0, duration: 0.5, ease: "power2.out" }); 
        }
    });
});


document.getElementById("yes-button").addEventListener("click", function() {
    let valentineContainer = document.getElementById("valentine-container");
    let secondScreen = document.getElementById("second-screen");

    gsap.to(valentineContainer, { opacity: 0, duration: 0.5, ease: "power2.inOut", onComplete: function() {
        valentineContainer.style.display = "none";
    }});

    secondScreen.style.display = "flex"; 

    gsap.to(window, { scrollTo: { y: "#second-screen", autoKill: false }, duration: 1.5, ease: "power2.inOut" });

    gsap.to("#second-screen", { opacity: 1, duration: 1, delay: 0.5, ease: "power2.inOut" });

    generateStars(); 
});

