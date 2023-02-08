import {SphereItem, state} from '../state'

export function playerSphereCollision(sphere: SphereItem) {
  const center = state
    .get('vector1')
    .addVectors(
      state.get('playerCollider').start,
      state.get('playerCollider').end
    )
    .multiplyScalar(0.5)

  const sphere_center = sphere.collider.center

  const r = state.get('playerCollider').radius + sphere.collider.radius
  const r2 = r * r

  // approximation: player = 3 spheres

  for (const point of [
    state.get('playerCollider').start,
    state.get('playerCollider').end,
    center,
  ]) {
    const d2 = point.distanceToSquared(sphere_center)

    if (d2 < r2) {
      const normal = state
        .get('vector1')
        .subVectors(point, sphere_center)
        .normalize()
      const v1 = state
        .get('vector2')
        .copy(normal)
        .multiplyScalar(normal.dot(state.get('playerVelocity')))
      const v2 = state
        .get('vector3')
        .copy(normal)
        .multiplyScalar(normal.dot(sphere.velocity))

      state.get('playerVelocity').add(v2).sub(v1)
      sphere.velocity.add(v1).sub(v2)

      const d = (r - Math.sqrt(d2)) / 2
      sphere_center.addScaledVector(normal, -d)
    }
  }
}
