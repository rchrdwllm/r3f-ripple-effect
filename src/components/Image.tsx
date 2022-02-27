import type { Work } from "typings";
import * as THREE from "three";
import { useMemo, useRef, useState } from "react";
import { Html, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Image = ({
    title,
    url,
    position = [0, 0, 0],
    scale = [100, 100, 1],
}: Work) => {
    const meshRef = useRef<THREE.Mesh>();
    const shaderRef = useRef<THREE.ShaderMaterial>();
    const [hovered, setHovered] = useState(false);
    const texture = useTexture(url);
    const displacement = useTexture("/displacement.png");
    const imageBounds = [texture.image.width, texture.image.height];
    const planeBounds = [scale[0], scale[1]];
    const shader = useMemo(
        () => ({
            uniforms: {
                tDiffuse: { value: texture },
                uDisplacement: { value: displacement },
                imageBounds: { value: imageBounds },
                planeBounds: { value: planeBounds },
                progress: { value: 1 },
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
                uniform vec2 planeBounds;
                uniform vec2 imageBounds;
                uniform sampler2D tDiffuse;
                uniform sampler2D uDisplacement;
                uniform float progress;
                uniform float shiftOffset;
                
                vec2 aspect(vec2 size) {
                    return size / min(size.x, size.y);
                }
                
                void main() {
                    vec2 s = aspect(planeBounds);
                    vec2 i = aspect(imageBounds);
                    float rs = s.x / s.y;
                    float ri = i.x / i.y;
                    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
                    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
                    vec2 uv = vUv * s / new + offset;
                    vec4 displacement = texture2D(uDisplacement, uv.yx);
                    vec2 dispOffset = vec2(uv.x, uv.y + displacement.r);

                    dispOffset.y = mix(uv.y, displacement.r, progress);

                    gl_FragColor = texture2D(tDiffuse, dispOffset);
                }
            `,
        }),
        [scale]
    );

    useFrame((_, delta) => {
        if (hovered) {
            shaderRef.current!.uniforms.progress.value = THREE.MathUtils.damp(
                shaderRef.current!.uniforms.progress.value,
                1,
                6,
                delta
            );
        } else {
            shaderRef.current!.uniforms.progress.value = THREE.MathUtils.damp(
                shaderRef.current!.uniforms.progress.value,
                0,
                6,
                delta
            );
        }
    });

    return (
        <group position={new THREE.Vector3(...position)}>
            <mesh
                ref={meshRef}
                scale={new THREE.Vector3(...scale)}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
            >
                <planeBufferGeometry attach="geometry" args={[1, 1]} />
                <shaderMaterial
                    ref={shaderRef}
                    attach="material"
                    args={[shader]}
                />
            </mesh>
            <Html
                position={[
                    -(scale[0] as number) / 2,
                    -(scale[1] as number) / 2,
                    0,
                ]}
            >
                <p
                    style={{
                        textAlign: "left",
                        marginTop: "1rem",
                        fontWeight: "bold",
                        width: scale[0] as number,
                    }}
                >
                    {title} - 2 / 27 / 2022
                </p>
            </Html>
        </group>
    );
};

export default Image;
