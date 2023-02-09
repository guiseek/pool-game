import {state} from '../state'

export function playerCollisions() {
  const result = state
    .get('worldOctree')
    .capsuleIntersect(state.get('playerCollider'))

  state.set('playerOnFloor', false)

  if (result) {
    state.set('playerOnFloor', result.normal.y > 0)

    if (!state.get('playerOnFloor')) {
      state
        .get('playerVelocity')
        .addScaledVector(
          result.normal,
          -result.normal.dot(state.get('playerVelocity'))
        )
    }

    state
      .get('playerCollider')
      .translate(result.normal.multiplyScalar(result.depth))
  }
}
