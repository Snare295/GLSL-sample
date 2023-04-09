uniform float u_time;
void main (){
    vec3 sinusoid = vec3(sin(u_time + position.y), sin(u_time + position.x), 0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1) + vec4(sinusoid, 1);
}