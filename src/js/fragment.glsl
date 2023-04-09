uniform vec2 u_mouse;
void main (){
    gl_FragColor = vec4(0.1f, u_mouse.x, u_mouse.y, 1.0f);
}   