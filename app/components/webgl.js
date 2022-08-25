import { Renderer, Camera, Transform, Plane, Vec2, Vec3, Texture, TextureLoader, Program, Mesh, Raycast } from 'ogl'
import { lerp } from '../utils/math'

import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'

const vertex = vertexShader
const fragment = fragmentShader

export default class webgl {
	constructor() {
		this.bind()

		this.maskPosition = new Vec2()
		this.mouse = new Vec2(-0.5, -0.5)

		// this.maskPosition = {
		// 	x: 0,
		// 	y: 0
		// }

		this.settings = {
			speed: 0
		}

		this.rAF = undefined

		this.init()
	}

	bind() {
		["mousemove", "resize", "update"].forEach((fn) => (this[fn] = this[fn].bind(this)))
	}

	initRenderer() {
		const canvas = document.querySelector('.webgl')
		this.renderer = new Renderer({ canvas: canvas, dpr: 1, antialias: !0 })
		this.gl = this.renderer.gl
		this.gl.clearColor(51, 51, 76, 1)
		this.el = canvas
	}

	initCamera() {
		this.camera = new Camera(this.gl)
		this.camera.perspective({
			aspect: this.gl.canvas.width / this.gl.canvas.height
		})
		this.camera.position.z = 0.8
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

		this.program = new Program(this.gl, {
			vertex: vertex,
			fragment: fragment,
			uniforms: {
				uMaskPosition: { value: new Vec2(1, 0) },
				uHit: { value: 0 },
				uTexture: { value: this.texture },
				uPlaneRatio: { value: scaling.x / scaling.y },
				// uSpeed: { value: this.settings.speed }
			}
		})

		this.mesh = new Mesh(this.gl, { geometry, program: this.program })
		this.mesh.setParent(this.scene)

		const updateHitUniform = ({ mesh }) => {
			this.program.uniforms.uHit.value = mesh.isHit ? 1 : 0;
		}
		this.mesh.onBeforeRender(updateHitUniform)

		this.raycast = new Raycast(this.gl)

	}

	mousemove(e) {
		this.mouse.set(2.0 * (e.x / this.renderer.width) - 1.0, 2.0 * (1.0 - e.y / this.renderer.height) - 1.0);

		this.raycast.castMouse(this.camera, this.mouse)
		const hits = this.raycast.intersectMeshes(this.mesh, {
			includeUV: true
		})
		// if(hits.length) console.log(hits[0].hit.uv)

		if(hits.length) {
			this.maskPosition.x = hits[0].hit.uv.x
			this.maskPosition.y = hits[0].hit.uv.y
		}
	}

	// mousemove(e) {
	// 	this.formatPosition({
	// 		x: (e.clientX - this.BCR.left) / this.BCR.width,
	// 		y: (e.clientY - this.BCR.top) / this.BCR.height,
	// 		obj: this.mouse
	// 	})
	// 	this.formatPosition({
	// 		x: (e.clientX - this.BCR.left) / this.BCR.width,
	// 		y: (e.clientY - this.BCR.top) / this.BCR.height,
	// 		obj: this.maskPosition
	// 	})
	// 	console.log(this.BCR.left)
	// }

	// formatPosition(pos) {
	// 	pos.obj.x = pos.x
	// 	pos.obj.y = pos.y
	// }

	update(t) {
		requestAnimationFrame(this.update)

		// this.settings.speed = (this.maskPosition.x - this.program.uniforms.uMaskPosition.value.x) / (t - this.now)

		// if (this.settings.speed > 0.01) {
		// 	this.settings.speed = 0.01
		// }
		// if (this.settings.speed < -0.01) {
		// 	this.settings.speed = -0.01
		// }

		this.program.uniforms.uMaskPosition.value.x = lerp(this.program.uniforms.uMaskPosition.value.x, this.maskPosition.x, 0.095)
		this.program.uniforms.uMaskPosition.value.y = lerp(this.program.uniforms.uMaskPosition.value.y, this.maskPosition.y, 0.095)

		// if (!isNaN(this.settings.speed)) {
		// 	this.program.uniforms.uSpeed.value = lerp(this.program.uniforms.uSpeed.value, this.settings.speed, 0.2)
		// }

		if (!this.texture.image) {
			this.texture.image = this.media
			this.texture.needsUpdate = true
		}

		this.renderer.render({ scene: this.scene, camera: this.camera })
		this.new = t
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
		this.update()

		window.addEventListener('mousemove', this.mousemove, false)
		window.addEventListener('resize', this.resize, false)
	}

	removeEventlisteners() {
		window.removeEventListener('mousemove', this.mousemove, false)
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
		this.addEventlisteners()
		this.resize()
	}
}