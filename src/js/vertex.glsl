uniform float u_time;
void main (){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y * sin(u_time), position.z + cos(u_time), 1.0) ;
}