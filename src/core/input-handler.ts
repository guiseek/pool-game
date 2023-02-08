import {throwBall} from './actions/throw-ball'
import {camera} from './camera'
import {state} from '../state'
import {renderer} from './renderer'

export const inputHandler = {
  init() {
    onkeydown = (e) => {
      state.patch('keyStates', {[e.code]: true})
    }
    onkeyup = (e) => {
      state.patch('keyStates', {[e.code]: false})
    }

    onmousedown = () => {
      document.body.requestPointerLock()
      state.set('mouseTime', performance.now())
      // mouseTime = performance.now()
    }

    onmouseup = () => {
      if (document.pointerLockElement !== null) throwBall()
    }

    onmousemove = (e) => {
      if (document.pointerLockElement === document.body) {
        camera.rotation.y -= e.movementX / 500
        camera.rotation.x -= e.movementY / 500
      }
    }

    onresize = () => {
      camera.aspect = innerWidth / innerHeight
      camera.updateProjectionMatrix()

      renderer.setSize(innerWidth, innerHeight)
    }
  },
  getForwardVector() {
    camera.getWorldDirection(state.get('playerDirection'))
    state.get('playerDirection').y = 0
    state.get('playerDirection').normalize()

    return state.get('playerDirection')
  },
  getSideVector() {
    camera.getWorldDirection(state.get('playerDirection'))
    state.get('playerDirection').y = 0
    state.get('playerDirection').normalize()
    state.get('playerDirection').cross(camera.up)

    return state.get('playerDirection')
  },
  controls(deltaTime: number) {
    // gives a bit of air control
    const speedDelta = deltaTime * (state.get('playerOnFloor') ? 25 : 8)
    const keyStates = state.get('keyStates')
    if (keyStates['KeyW']) {
      state
        .get('playerVelocity')
        .add(this.getForwardVector().multiplyScalar(speedDelta))
    }

    if (keyStates['KeyS']) {
      state
        .get('playerVelocity')
        .add(this.getForwardVector().multiplyScalar(-speedDelta))
    }

    if (keyStates['KeyA']) {
      state
        .get('playerVelocity')
        .add(this.getSideVector().multiplyScalar(-speedDelta))
    }

    if (keyStates['KeyD']) {
      state
        .get('playerVelocity')
        .add(this.getSideVector().multiplyScalar(speedDelta))
    }

    if (state.get('playerOnFloor')) {
      if (keyStates['Space']) {
        state.get('playerVelocity').y = 15
      }
    }
  },
}
