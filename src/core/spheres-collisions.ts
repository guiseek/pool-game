import {state} from '../state'

export function spheresCollisions() {
  const spheres = state.get('spheres')

  for (let i = 0, length = spheres.length; i < length; i++) {
    const s1 = spheres[i]

    for (let j = i + 1; j < length; j++) {
      const s2 = spheres[j]

      const d2 = s1.collider.center.distanceToSquared(s2.collider.center)
      const r = s1.collider.radius + s2.collider.radius
      const r2 = r * r

      if (d2 < r2) {
        const normal = state
          .get('vector1')
          .subVectors(s1.collider.center, s2.collider.center)
          .normalize()

        const v1 = state
          .get('vector2')
          .copy(normal)
          .multiplyScalar(normal.dot(s1.velocity))

        const v2 = state
          .get('vector3')
          .copy(normal)
          .multiplyScalar(normal.dot(s2.velocity))

        s1.velocity.add(v2).sub(v1)
        s2.velocity.add(v1).sub(v2)

        const d = (r - Math.sqrt(d2)) / 2

        s1.collider.center.addScaledVector(normal, d)
        s2.collider.center.addScaledVector(normal, -d)
      }
    }
  }
}
