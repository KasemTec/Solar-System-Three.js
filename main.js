import * as THREE from 'three';
import {OrbitControls}  from "three/examples/jsm/controls/OrbitControls";

/**
 * import All Img Texture
 */

import starsTexture from './src/img/stars.jpg';
import sunTexture from './src/img/sun.jpg';
import mercuryTexture from '/src/img/mercury.jpg';
import venusTexture from './src/img/venus.jpg';
import earthTexture from './src/img/earth.jpg';
import marsTexture from './src/img/mars.jpg';
import jupiterTexture from './src/img/jupiter.jpg';
import saturnTexture from './src/img/saturn.jpg';
import saturnRing from './src/img/saturn ring.png';
import uranusTexture from './src/img/uranus.jpg';
import uranusRing from '/src/img/uranus ring.png';
import neptuneTexture from '/src/img/neptune.jpg';
import plutoTexture from './src/img/pluto.jpg'
/*import {func} from "three/addons/nodes/code/FunctionNode";
import meshBasicNodeMaterial from "three/addons/nodes/materials/MeshBasicNodeMaterial";*/


const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera =  new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture

]);

const textureLoader = new THREE.TextureLoader();

// Create Meh of The Sun

const sunGeo =  new THREE.SphereGeometry(16,30,30);
const sunMat = new  THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
    }
);
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);
/*
// Create Mesh of Mercury
const mercuryGeo = new THREE.SphereGeometry(3.2, 30, 30);
/!*const mercuryMat = new THREE.MeshStandardMaterial({
    map:textureLoader.load(mercuryTexture)
});*!/

const mercuryMat = new THREE.MeshBasicMaterial({
    map:textureLoader.load(mercuryTexture)
});
const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
const mercuryObj = new THREE.Object3D();
mercuryObj.add(mercury);
scene.add(mercuryObj);
//sun.add(mercury);
mercury.position.x = 28;*/



function createPlanet(size, texture, position, ring) {
    const planetGeo = new THREE.SphereGeometry(size,30, 30);
/*    const planetMat = new THREE.MeshStandardMaterial({
        map:textureLoader.load(texture)
    });*/

    const planetMat = new THREE.MeshBasicMaterial({
        map: textureLoader.load(texture)
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    const planetObj = new THREE.Object3D();
    planetObj.add(planet);
    if (ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32
        );

        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide,
        });

        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        planetObj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(planetObj);
    planet.position.x = position;
    return{mesh:planet, obj: planetObj}
}

const mercury = createPlanet(3.2, mercuryTexture, 28);
const venus = createPlanet(5.8, venusTexture, 44);
const earth = createPlanet(6, earthTexture, 62);
const mars = createPlanet(4, marsTexture, 78);
const jupiter = createPlanet(12, jupiterTexture, 100);
const saturn = createPlanet(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRing
});
const uranus = createPlanet(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRing
});
const neptune = createPlanet(7, neptuneTexture, 200);
const pluto = createPlanet(2.8, plutoTexture, 216);

const pointLight = new THREE.PointLight(0xFFFFFF, 5, 500 );
pointLight.position.set(0,0,0);
scene.add(pointLight);

function animate(){

    //Self-rotation
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.008);

    //Around-sun-rotation
    mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.015);
    earth.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.obj.rotateY(0.0001);
    pluto.obj.rotateY(0.00007);


    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

