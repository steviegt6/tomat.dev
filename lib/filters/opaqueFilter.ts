import { defaultVertex, Filter } from "@pixi/core";

const fragment = `
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

uniform float bgR;
uniform float bgG;
uniform float bgB;
uniform float alpha;

void main()
{
    vec4 color = texture2D(uSampler, vTextureCoord.xy);

    if (color.a == 0.0) {
        //color.rgb = vec3(bgR / 255.0, bgG / 255.0, bgB / 255.0);
        //color.rgb *= (color.a = alpha);
    }

    gl_FragColor = color;
}
`;

export default class OpaqueFilter extends Filter {
    constructor(alpha: number, backgroundColor: [number, number, number]) {
        super(defaultVertex, fragment);
        this.alpha = alpha;
        this.backgroundColor = backgroundColor;
    }

    get alpha(): number {
        return this.uniforms.alpha;
    }

    set alpha(value: number) {
        this.uniforms.alpha = value;
    }

    get backgroundColor(): [number, number, number] {
        return [this.uniforms.bgR, this.uniforms.bgG, this.uniforms.bgB];
    }

    set backgroundColor(value: [number, number, number]) {
        this.uniforms.bgR = value[0];
        this.uniforms.bgG = value[1];
        this.uniforms.bgB = value[2];
    }
}
