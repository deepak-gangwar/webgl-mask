precision highp float;

#define PI 3.1415926535897932384626433832795

uniform vec2 uMaskPosition;
uniform float uPlaneRatio;
uniform sampler2D uTexture;
uniform float uTime;
// uniform float uSpeed;

varying vec2 vUv;

// Function to create a rectangle
vec3 Rectangle(in vec2 size, in vec2 st, in vec2 p, in vec3 c) {
  float top = step(1. - (p.y + size.y), 1. - st.y);
  float right = step(1. - (p.x + size.x), 1. - st.x);
  float bottom = step(p.y, st.y);
  float left = step(p.x, st.x);
  return top * right * bottom * left * c;
}

// Function to create a circle
float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
}

void main() {
    // This so that uv value goes from -0.5 to 0.5
    // changes origin from bottom left to center
    vec2 uv = vUv - 0.5;
    // to make it a square
    uv.x *= uPlaneRatio;

    vec2 maskSize = vec2(0.3, 0.3);

    // Note that we're subtracting HALF of the width and height to position the rectangle at the center of the scene
    // This is like transform: translate(-50%, -50%)
    // vec2 maskPosition = vec2(-0.15, -0.15);
    vec2 maskPosition = vec2(uMaskPosition.x * uPlaneRatio - 1.05, uMaskPosition.y - 0.65);
    vec3 maskColor =  vec3(1.0);

    vec2 maskUV = vec2(
      uv.x + sin(uTime * 0.003) * sin(uv.y * 5.0) * 0.15,
      uv.y + cos(uTime * 0.003) * cos(uv.x * 10.0) * 0.15
    );

    vec3 color = vec3(0.0);
    
    // This gives a rectangular mask
    vec3 mask = Rectangle(maskSize, maskUV, maskPosition, maskColor);

    // This gives a circular mask
    // vec2 st = (uv.xy - maskPosition + 0.35);
    // vec3 mask = vec3(circle(st, 0.3));

    
    vec3 texture = texture2D(uTexture, uv * 0.5 + 0.5).rgb;

    color = texture * mask;

    gl_FragColor = vec4(color, 1.0);
}