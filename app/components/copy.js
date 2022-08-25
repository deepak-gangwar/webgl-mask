import { ogl } from "./ogl"

import vertexShader from '../shaders/vertex.glsl'
import fragmentShader from '../shaders/fragment.glsl'

const vertex = vertexShader;
const fragment = fragmentShader;

export default class webgl {
    constructor() {
        this.bind()
        this.initRenderer()

        const renderer = new ogl.Renderer({ dpr: 2 });
        const gl = renderer.gl;
        document.body.appendChild(gl.canvas);
        gl.clearColor(1, 1, 1, 1);
    
        const camera = new ogl.Camera(gl, { fov: 45 });
        camera.position.z = 3;
    
        function resize() {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        }
        window.addEventListener('resize', resize, false);
        resize();
    
        const scene = new ogl.Transform();
    
        // const geometry = new ogl.Box(gl, { width: 1.78, height: 1, depth: 1.78 });
        const geometry = new ogl.Plane(gl, { width: 1024/400, height: 512/400 });
    
        // Init empty texture while source loading
        const texture = new ogl.Texture(gl, {
            generateMipmaps: false,
            width: 1024,
            height: 512,
        });
    
        // Create video with attributes that let it autoplay
        // Check update loop to see when video is attached to texture
        let video = document.createElement('video');
        video.src = 'laputa.mp4';
    
        // Disclaimer: video autoplay is a confusing, constantly-changing browser feature.
        // The best approach is to never assume that it will work, and therefore prepare for a fallback.
        // Tested on mac: Chrome, Safari, Firefox; android: chrome
        video.loop = true;
        video.muted = true;
        video.play();
    
        const program = new ogl.Program(gl, {
            vertex,
            fragment,
            uniforms: {
                tMap: { value: texture },
            },
            cullFace: null,
        });
        const mesh = new ogl.Mesh(gl, {
            geometry: geometry,
            program: program,
        });
        mesh.position.set(0, 0.5, -4);
        mesh.scale.set(1.5);
        mesh.setParent(scene);
    
        requestAnimationFrame(update);
        function update(t) {
            requestAnimationFrame(update);
    
            // Attach video and/or update texture when video is ready
            if (video.readyState >= video.HAVE_ENOUGH_DATA) {
                if (!texture.image) texture.image = video;
                texture.needsUpdate = true;
            }
    
            renderer.render({ scene, camera });
        }
    }

    bind() {
        []
        .forEach(fn => this[fn] = this[fn].bind(this))
    }

    initRenderer() {
        
    }
}