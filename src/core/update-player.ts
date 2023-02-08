import {playerCollisions} from './player-collisions'
import {CONFIG} from '../config'
import {camera} from './camera'
import {state} from '../state'

export function updatePlayer(deltaTime: number) {
  let damping = Math.exp(-4 * deltaTime) - 1

  if (!state.get('playerOnFloor')) {
    state.get('playerVelocity').y -= CONFIG.GRAVITY * deltaTime

    // small air resistance
    damping *= 0.1
  }

  state
    .get('playerVelocity')
    .addScaledVector(state.get('playerVelocity'), damping)

  const deltaPosition = state
    .get('playerVelocity')
    .clone()
    .multiplyScalar(deltaTime)
  state.get('playerCollider').translate(deltaPosition)

  playerCollisions()

  camera.position.copy(state.get('playerCollider').end)
}
