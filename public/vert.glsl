uniform float uTime;
uniform float uActive;
varying vec3 vNormal;

void main()
{
    vNormal = normalize(normalMatrix * normal);

    vec3 transformed = position;
    transformed += normal;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}