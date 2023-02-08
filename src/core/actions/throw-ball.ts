import {state} from '../../state'
import {camera} from '../camera'

export function throwBall() {
  const spheres = state.get('spheres')
  const sphereIdx = state.get('sphereIdx')
  const playerCollider = state.get('playerCollider')

  const sphere = spheres[sphereIdx]

  camera.getWorldDirection(state.get('playerDirection'))

  sphere.collider.center
    .copy(playerCollider.end)
    .addScaledVector(state.get('playerDirection'), playerCollider.radius * 1.5)

  // throw the ball with more force if we hold the button longer, and if we move forward

  const impulse =
    15 +
    100 * (1 - Math.exp((state.get('mouseTime') - performance.now()) * 0.001))

  sphere.velocity.copy(state.get('playerDirection')).multiplyScalar(impulse)
  sphere.velocity.addScaledVector(state.get('playerVelocity'), 2)

  // sphereIdx = (sphereIdx + 1) % spheres.length
  state.set('sphereIdx', (sphereIdx + 1) % spheres.length)
}
