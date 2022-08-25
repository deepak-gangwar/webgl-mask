import { Renderer, Camera, Transform, Plane, Vec3, Texture, TextureLoader, Program, Mesh } from 'ogl'

import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'

const vertex = vertexShader
const fragment = fragmentShader

export default class webgl {
    constructor() {
        this.bind()
        this.init()
        this.onResize()
      }
    
      bind() {
        ["onResize", "update"].forEach((fn) => (this[fn] = this[fn].bind(this)))
      }
    
      init() {
        this.initRenderer()
        this.initCamera()
        this.initScene()
        this.initShape()
        this.requestAnimationFrame()
      }
    
      initRenderer() {
        const canvas = document.querySelector('.webgl')
        this.renderer = new Renderer({ canvas: canvas, dpr: 1, antialias: !0 })
        this.gl = this.renderer.gl
        // document.body.appendChild(this.gl.canvas)
        this.gl.clearColor(51, 51, 76, 1)
      }
    
      initCamera() {
        this.camera = new Camera(this.gl)
        this.camera.perspective({
          aspect: this.gl.canvas.width / this.gl.canvas.height
        })
        this.camera.position.z = 1.4
      }
    
      initScene() {
        this.scene = new Transform()
      }
    
      initShape() {
        const geometry = new Plane(this.gl, {
          width: 1,
          height: 9 / 16,
          widthSegments: 10,
          heightSegments: 10
        })
        const scaling = new Vec3(10, (9 / 16) * 10, 1)
    
        // this.texture = new Texture(this.gl, { minFilter: this.gl.LINEAR })
        
        // update image value with source once loaded
        // const img = new Image()
        // img.src = "1.jpg"
        // img.onload = () => {
          //   this.texture.image = img
          // }
          
        this.texture = TextureLoader.load(this.gl, { src: "1.jpg" })

        const program = new Program(this.gl, {
          vertex: vertex,
          fragment: fragment,
          uniforms: {
            uTexture: { value: this.texture },
            uPlaneRatio: { value: scaling.x / scaling.y }
          }
        })
    
        this.mesh = new Mesh(this.gl, { geometry, program })
        this.mesh.setParent(this.scene)
      }
    
      requestAnimationFrame() {
        requestAnimationFrame(this.update)
      }
    
      update() {
        // requestAnimationFrame(this.update)
    
        // this.mesh.rotation.y -= 0.04
        // this.mesh.rotation.x += 0.03
        this.renderer.render({ scene: this.scene, camera: this.camera })
      }
    
      onResize() {
        this.screen = {
          height: window.innerHeight,
          width: window.innerWidth
        }
    
        this.renderer.setSize(this.screen.width, this.screen.height)
        this.camera.perspective({
          aspect: this.gl.canvas.width / this.gl.canvas.height
        })
      }
}