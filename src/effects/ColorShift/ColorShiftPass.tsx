import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";

const ColorShiftPass = () => {
    const scroll = useScroll();
    const shaderPassRef = useRef<ShaderPass>(null);
    const shader = useMemo<THREE.Shader>(
        () => ({
            uniforms: {
                tDiffuse: { value: null },
                shiftOffset: { value: null },
            },
            vertexShader: `
            varying vec2 vUv;

            void main() {
                vUv = uv;

                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
            fragmentShader: `
            varying vec2 vUv;
            uniform sampler2D tDiffuse;
            uniform float shiftOffset;

            vec2 shifter(vec2 uv, float customOffset) {
                uv.y = uv.y + (shiftOffset * customOffset);

                return uv;
            }

            void main() {
                float r = texture2D(tDiffuse, shifter(vUv, -1.25)).r;
                float g = texture2D(tDiffuse, shifter(vUv, 0.0)).g;
                float b = texture2D(tDiffuse, shifter(vUv, 1.25)).b;
                
                gl_FragColor = vec4(r, g, b, 1.0);
            }
        `,
        }),
        []
    );

    useFrame(() => {
        if (shaderPassRef.current) {
            shaderPassRef.current.uniforms.shiftOffset.value =
                (scroll.offset - (scroll as any).scroll.current) * 0.1;
        }
    });

    return (
        <shaderPass attachArray="passes" args={[shader]} ref={shaderPassRef} />
    );
};

export default ColorShiftPass;
