import {
  sRGBEncoding,
  VSMShadowMap,
  WebGLRenderer,
  ACESFilmicToneMapping,
} from 'three'

const renderer = new WebGLRenderer({antialias: true})
renderer.setPixelRatio(devicePixelRatio)
renderer.setSize(innerWidth, innerHeight)

renderer.shadowMap.enabled = true
renderer.shadowMap.type = VSMShadowMap
renderer.outputEncoding = sRGBEncoding
renderer.toneMapping = ACESFilmicToneMapping

export {renderer}
