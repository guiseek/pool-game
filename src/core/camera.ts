import {PerspectiveCamera} from 'three'

const camera = new PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 1000)
camera.rotation.order = 'YXZ'

export {camera}
