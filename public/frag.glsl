uniform float uTime;
uniform float uHover;
varying vec3 vNormal;

void main()
{
    vec3 normalColor = normalize(vNormal) * 0.5 + 0.5;
    vec3 base = mix(vec3(0.10, 0.45, 0.95), vec3(1.0, 0.25, 0.65), uHover);
    float pulse = 0.7 + 0.3 * sin(uTime * 3.0 + 0.1 * 18.0);
    vec3 color = mix(base, normalColor, 0.35) * pulse;
    gl_FragColor = vec4(color, 1.0);
}