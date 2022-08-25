import { Renderer, Camera, Transform, Plane, Vec2, Vec3, Texture, TextureLoader, Program, Mesh, Raycast } from 'ogl'
import { lerp } from '../utils/math'

import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'

const vertex = vertexShader
const fragment = fragmentShader

export default class Mask {
	constructor() {
		this.bind()

		this.el = document.querySelector('.webgl__wrapper')

		this.bounds = this.el.getBoundingClientRect()
		this.planeBCR = { 
            width: 1, 
            height: 1, 
            x: 0, 
            y: 0 
        }

		this.isLoaded = false

		this.maskPosition = new Vec2()
		this.mouse = new Vec2(-0.5, -0.5)

		this.now = 0
		this.settings = {
			speed: 0
		}

        this.wrapper = null
        this.media = this.el.querySelector('[data-gl-image="media"]')

		this.rAF = undefined

		this.init()
	}

	bind() {
		["mousemove", "resize", "update"]
		.forEach((fn) => (this[fn] = this[fn].bind(this)))
	}

	initRenderer() {
		const canvas = document.querySelector('.webgl')
		// This for transparent rendrer
		this.renderer = new Renderer({ canvas: canvas, dpr: 1, antialias: !0, premultiplyAlpha: !1, alpha: !0  })
		this.renderer.setSize(this.bounds.width, this.bounds.height)
		
		this.gl = this.renderer.gl
		// for clear color, divide rgb value by 255
		this.gl.clearColor(247 / 255, 245 / 255, 248 / 255, 1)
		// this.gl.clearColor(1, 1, 1, 1)
	}
	
	initScene() {
		this.scene = new Transform()
	}

	initCamera() {
		this.fov = 45
		this.camera = new Camera(this.gl, { fov: this.fov })
		this.camera.perspective({
			// aspect: this.gl.canvas.width / this.gl.canvas.height
			aspect: window.innerWidth / window.innerHeight
		})
		this.camera.position.set(0, 0, 1)
	}

	initShape() {
		this.geometry = new Plane(this.gl, { width: 1, height: 1, widthSegments: 10, heightSegments: 10 })
		// const scaling = new Vec3(10, (9 / 16) * 10, 1)

		this.texture = new Texture(this.gl, { 
			minFilter: this.gl.LINEAR,
			generateMipmaps: false,
			width: 1920,
			height: 1080 
		})

		// update image value with source once loaded
		const img = new Image()
		img.src = "reel.mp4"
		img.onload = () => {
			this.texture.image = img
		  
			if(this.media instanceof HTMLVideoElement) {
				this.media.load()
				this.media.play()
			}
		}

		// this.texture = TextureLoader.load(this.gl, { src: "1.jpg" })

		this.program = new Program(this.gl, {
			vertex,
			fragment,
			uniforms: {
				uMaskPosition: { value: new Vec2(1, 0) },
				uHit: { value: 0 },
				uTexture: { value: this.texture },
			}
		})

		this.mesh = new Mesh(this.gl, { geometry: this.geometry, program: this.program })
		
		this.updateSize()
		this.isLoaded = true
		this.mesh.setParent(this.scene)

		// Raycaster
		const updateHitUniform = ({ mesh }) => {
			this.program.uniforms.uHit.value = mesh.isHit ? 1 : 0;
		}
		this.mesh.onBeforeRender(updateHitUniform)

		this.raycast = new Raycast(this.gl)

	}

	calculateUnitSize(z) {
        const fovInRadian = (this.fov * Math.PI) / 180
        
        // basic trigonometry
        // this gives the width of plane that would cover the whole screen based on z position
        const i = 2 * Math.tan(fovInRadian / 2) * z

        return { width: i * this.camera.aspect, height: i }
    }

    updateSize() {
		this.gap = 0
        this.camUnit = this.calculateUnitSize(this.camera.position.z)
        this.planeBCR.width = this.camUnit.width - this.camUnit.width * this.gap / 100
        this.planeBCR.height = this.planeBCR.width / this.camera.aspect

        this.geometry = new Plane(this.gl, { width: this.planeBCR.width, height: this.planeBCR.height, widthSegments: 100, heightSegments: 100 })
        this.mesh.geometry = this.geometry

        this.gl.canvas.style.width = `${this.bounds.width}px`
        this.gl.canvas.style.height = `${this.bounds.height}px`
    }

	mousemove(e) {
		this.mouse.set(2.0 * (e.x / this.renderer.width) - 1.0, 2.0 * (1.0 - e.y / this.renderer.height) - 1.0)

		this.raycast.castMouse(this.camera, this.mouse)
		const hits = this.raycast.intersectMeshes(this.mesh, {
			includeUV: true
		})

		if(hits.length) {
			this.maskPosition.x = hits[0].hit.uv.x
			this.maskPosition.y = hits[0].hit.uv.y
		}
	}

	update(t) {
		requestAnimationFrame(this.update)

        this.program.uniforms.uMaskPosition.value.x = lerp(this.program.uniforms.uMaskPosition.value.x, this.maskPosition.x, 0.085)
        this.program.uniforms.uMaskPosition.value.y = lerp(this.program.uniforms.uMaskPosition.value.y, this.maskPosition.y, 0.085)

		if(this.media instanceof HTMLVideoElement) {
            if (this.media.readyState >= this.media.HAVE_ENOUGH_DATA) {
                if(!this.texture.image) {
                    this.texture.image = this.media
                }
                this.texture.needsUpdate = true
            }
        } else if (this.media instanceof HTMLImageElement) {
            if(!this.texture.image) {
                this.texture.image = this.media
                this.texture.needsUpdate = true
            }
        }

		this.renderer.render({ scene: this.scene, camera: this.camera })
		this.now = t
	}

	resize() {
		this.renderer.setSize(window.innerWidth, window.innerHeight)
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
		this.initScene()
		this.initCamera()
		this.initShape()
		this.addEventlisteners()
		this.resize()
	}
}