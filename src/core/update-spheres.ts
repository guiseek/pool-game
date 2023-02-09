import {playerSphereCollision} from './player-sphere-collision'
import {spheresCollisions} from './spheres-collisions'
import {CONFIG} from '../config'
import {state} from '../state'

export function updateSpheres(deltaTime: number) {
  const spheres = state.get('spheres')

  spheres.forEach((sphere) => {
    sphere.collider.center.addScaledVector(sphere.velocity, deltaTime)

    const result = state.get('worldOctree').sphereIntersect(sphere.collider)

    if (result) {
      sphere.velocity.addScaledVector(
        result.normal,
        -result.normal.dot(sphere.velocity) * 1.5
      )
      sphere.collider.center.add(result.normal.multiplyScalar(result.depth))
    } else {
      sphere.velocity.y -= CONFIG.GRAVITY * deltaTime
    }

    const damping = Math.exp(-1.5 * deltaTime) - 1
    sphere.velocity.addScaledVector(sphere.velocity, damping)

    /**
     * @todo improve rotate
     */
    let angle = 0
    if (sphere.velocity.z > 0.1) {
      sphere.mesh.rotateZ((angle -= 10))
    } else if (sphere.velocity.x > 0.1) {
    } else if (sphere.velocity.y > 0.1) {
      sphere.mesh.rotateZ((angle += 10))
    }

    playerSphereCollision(sphere)
  })

  spheresCollisions()

  for (const sphere of spheres) {
    sphere.mesh.position.copy(sphere.collider.center)
  }
}
