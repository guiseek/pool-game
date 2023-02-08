import {OctreeHelper} from 'three/examples/jsm/helpers/OctreeHelper.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {
  scene,
  camera,
  renderer,
  fillLight1,
  inputHandler,
  updateSpheres,
  directionalLight,
  updatePlayer,
  teleportPlayerIfOob,
} from './core'
import {
  Mesh,
  Clock,
  Color,
  Sphere,
  Vector3,
  IcosahedronGeometry,
  MeshLambertMaterial,
} from 'three'
import './style.scss'
import {CONFIG} from './config'
import {state} from './state'

const clock = new Clock()

scene.add(fillLight1)

scene.add(directionalLight)

const container = document.querySelector<HTMLElement>('#container')

if (container) {
  container.appendChild(renderer.domElement)
}

const sphereGeometry = new IcosahedronGeometry(CONFIG.SPHERE_RADIUS, 5)
const sphereMaterial = new MeshLambertMaterial({color: 0xbbbb44})

for (let i = 0; i < CONFIG.NUM_SPHERES; i++) {
  const sphere = new Mesh(sphereGeometry, sphereMaterial)
  sphere.castShadow = true
  sphere.receiveShadow = true
  scene.add(sphere)

  state.get('spheres').push({
    mesh: sphere,
    collider: new Sphere(new Vector3(0, -100, 0), CONFIG.SPHERE_RADIUS),
    velocity: new Vector3(),
  })
}

inputHandler.init()

const loader = new GLTFLoader().setPath('./gltf/')
loader.load('collision-world2.glb', (gltf) => {
  scene.add(gltf.scene)

  state.get('worldOctree').fromGraphNode(gltf.scene)

  gltf.scene.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true

      if (child.material.map) {
        child.material.map.anisotropy = 4
      }
    }
  })

  const helper = new OctreeHelper(state.get('worldOctree'), new Color())
  helper.visible = false
  scene.add(helper)

  animate()
})

function animate() {
  const deltaTime = Math.min(0.05, clock.getDelta()) / CONFIG.STEPS_PER_FRAME

  for (let i = 0; i < CONFIG.STEPS_PER_FRAME; i++) {
    inputHandler.controls(deltaTime)

    updatePlayer(deltaTime)

    updateSpheres(deltaTime)

    teleportPlayerIfOob()
  }

  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}
