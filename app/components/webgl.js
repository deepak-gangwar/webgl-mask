import { Renderer, Camera, Transform, Plane, Vec2, Vec3, Texture, TextureLoader, Program, Mesh } from 'ogl'

import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'

const vertex = vertexShader
const fragment = fragmentShader

export default class webgl {
	constructor() {
		this.bind()

		this.maskPosition = new Vec2(1, 0)
		this.mouse = new Vec2(-0.5, -0.5)

		this.settings = {
			speed: 0
		}

		this.rAF = undefined

		this.init()
	}

	bind() {
		["resize", "update"].forEach((fn) => (this[fn] = this[fn].bind(this)))
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


	update() {
		requestAnimationFrame(this.update)
		this.renderer.render({ scene: this.scene, camera: this.camera })
	}

	resize() {
		this.screen = {
			height: window.innerHeight,
			width: window.innerWidth
		}

		this.renderer.setSize(this.screen.width, this.screen.height)
		this.camera.perspective({
			aspect: this.gl.canvas.width / this.gl.canvas.height
		})
	}

	requestAnimationFrame() {
		this.rAF = requestAnimationFrame(this.update)
	}

	cancelAnimationFrame() {
		cancelAnimationFrame(this.rAF)
	}

	addEventlisteners() {
		window.addEventListener('resize', this.resize, false)
	}

	removeEventlisteners() {
		window.removeEventListener('resize', this.resize, false)
	}

	destroy() {
		this.removeEventListeners()
	}

	init() {
		this.initRenderer()
		this.initCamera()
		this.initScene()
		this.initShape()
		this.resize()
		this.update()
	}
}