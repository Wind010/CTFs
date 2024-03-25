function run() {
    //threejs - demo - https://threejs.org/examples/?q=particles#webgl_points_billboards
    //var container = document.createElement('div');
    //document.body.appendChild(container);

    var container = document.getElementsByTagName('body')[0]

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000)
    camera.position.z = 1000; // Pull this back to 2000 to see what is actually going on

    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x41ac17, 0.0020);  // color of fog - objects are all white
    var geometry = new THREE.Geometry();

    for (i = 0; i < 20000; i++) // Total objects within each particle object
    { //-1000 is for centering on screen, span would be -1000 to 1000
        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2000 - 1000;
        vertex.y = Math.random() * 2000 - 1000;
        vertex.z = Math.random() * 2000 - 1000;
        geometry.vertices.push(vertex);
    }

    for (i = 0; i < getRandomNumber(1, 10); i++) {
        var material = new THREE.PointsMaterial({ size: getRandomNumber() });
        var particles = new THREE.Points(geometry, material);
        particles.rotation.x = getRandomNumber();
        particles.rotation.y = getRandomNumber();
        particles.rotation.z = getRandomNumber();
        scene.add(particles);
    }

    ////////////////////////////////////////////////////////////////

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    renderer.render(scene, camera);
    render();

    function render() {
        camera.position.z = generateSmoothNumber() // Zoom in and out via sine wave logic.
        requestAnimationFrame(render);
        for (i = 0; i < scene.children.length; i++) {
            var object = scene.children[i];
            if (object instanceof THREE.Points) {
                object.rotation.y += .0033;
            }
        }
        renderer.render(scene, camera);
    }
}

function getRandomNumber(min=1, max=10) {
    // Generate a random decimal number between 0 and 1
    var randomNumber = Math.random();

    // Scale the random number to be between min and max
    var scaledNumber = Math.floor(randomNumber * (max - min + 1)) + min;

    return scaledNumber;
}


function generateSmoothNumber(min= 100, max=2500) {
    // Get the current timestamp in milliseconds
    const timestamp = new Date().getTime();

    // Calculate a value between 0 and 1 based on sine function
    const value = Math.sin(timestamp / 10000); // Adjust the divisor to control the smoothness

    // Map the value from the range [-1, 1] to the range [min, max]
    const smoothNumber = value * (max - min) / 2 + (max + min) / 2;

    return smoothNumber;
}


window.addEventListener('load', function () {
    //run();
});

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    if (typeof camera === 'undefined') {
        return;
    }
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}