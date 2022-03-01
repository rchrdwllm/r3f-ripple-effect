import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import Ripple from "./Ripple";

// got to figure out how to turn this into a post-processing effect
// thanks to https://github.com/nemutas/r3f-homunculus/tree/main/src/components/postprocessing

const RipplePass = () => {
    const shaderPassRef = useRef<ShaderPass>();
    const rippleEffect = useMemo(() => new Ripple(), []);
    const shader = useMemo<THREE.Shader>(
        () => ({
            uniforms: {
                tDiffuse: { value: null },
                uDisplacement: { value: null },
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
            uniform sampler2D uDisplacement;

            void main() {
                vec2 uv = vUv;
                vec4 disp = texture2D(uDisplacement, uv);
                float theta = disp.r * 1.0 * 3.141592653589;
                vec2 dir = vec2(sin(theta), cos(theta));
                uv += dir * disp.r * 0.07;

                gl_FragColor = texture2D(tDiffuse, uv);
            }
        `,
        }),
        []
    );

    useEffect(() => {
        return () => rippleEffect.dispose();
    }, [rippleEffect]);

    useFrame(({ gl }) => {
        rippleEffect.render(gl, shaderPassRef.current!.uniforms.uDisplacement);
    });

    return (
        <shaderPass attachArray="passes" ref={shaderPassRef} args={[shader]} />
    );
};

export default RipplePass;
