// Common varyings
varying vec3 v_position;
varying vec3 v_normal;

void main() {
	gl_Position = vec4(position, 1.0);
}