function congratulations() {
    const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
    };

    function shoot() {
        confetti({
            ...defaults,
            particleCount: 30,
            scalar: 1.2,
            shapes: ["circle", "square"],
            colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
        });

        confetti({
            ...defaults,
            particleCount: 60,
            scalar: 2,
            shapes: ["emoji"],
            shapeOptions: {
                emoji: {
                    value: ["🐱‍💻", "🌈", "🖖", "💎", "👩‍💻", "⚡", "🚀"],
                },
            },
        });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
}


window.addEventListener('load', function () {
    var img = document.getElementById('image');

    img.onload = function () {
        console.log('Image loaded successfully.');
        congratulations();
        assets = ["https://wind010.github.io/ctf_soundboard/assets/3.wav", "assets/wub.mp3"]
        var audio = new Audio(assets[Math.floor(Math.random() * assets.length)]);
        audio.play();
    };

    img.onerror = function () {
        console.log('Error loading image.');
        assets = ["assets/error.mp3", "assets/deny.mp3"]
        var audio = new Audio(assets[Math.floor(Math.random() * assets.length)]);
        audio.play();
    };
})


