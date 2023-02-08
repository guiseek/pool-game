import {Capsule} from 'three/examples/jsm/math/Capsule.js'
import {Octree} from 'three/examples/jsm/math/Octree.js'
import {Mesh, Sphere, Vector3} from 'three'
import {useState} from './hooks'

export interface SphereItem {
  mesh: Mesh
  collider: Sphere
  velocity: Vector3
}

interface State {
  spheres: SphereItem[]
  playerCollider: Capsule
  worldOctree: Octree
  sphereIdx: number
  keyStates: Record<string, boolean>
  playerDirection: Vector3
  playerVelocity: Vector3
  vector1: Vector3
  vector2: Vector3
  vector3: Vector3
  playerOnFloor: boolean
  mouseTime: number
}

const state = useState<State>({
  spheres: [],
  sphereIdx: 0,
  playerVelocity: new Vector3(),
  playerDirection: new Vector3(),
  playerCollider: new Capsule(
    new Vector3(0, 0.35, 0),
    new Vector3(0, 1, 0),
    0.35
  ),
  worldOctree: new Octree(),
  vector1: new Vector3(),
  vector2: new Vector3(),
  vector3: new Vector3(),
  playerOnFloor: false,
  keyStates: {},
  mouseTime: 0,
})

export {state}
