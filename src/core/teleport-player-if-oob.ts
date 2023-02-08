import {state} from '../state'
import {camera} from './camera'

export function teleportPlayerIfOob() {
  const playerCollider = state.get('playerCollider')
  if (camera.position.y <= -25) {
    playerCollider.start.set(0, 0.35, 0)
    playerCollider.end.set(0, 1, 0)
    playerCollider.radius = 0.35
    camera.position.copy(playerCollider.end)
    camera.rotation.set(0, 0, 0)
  }
}
