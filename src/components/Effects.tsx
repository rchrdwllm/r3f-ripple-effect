import { useEffect, useRef } from "react";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import RipplePass from "effects/Ripple/RipplePass";
import ColorShiftPass from "effects/ColorShift/ColorShiftPass";
import { extend, useFrame, useThree } from "@react-three/fiber";

extend({ EffectComposer, RenderPass, ShaderPass });

const Effects = () => {
    const composerRef = useRef<EffectComposer>(null);
    const { gl, scene, camera, size } = useThree();

    useEffect(() => {
        composerRef.current!.setSize(size.width, size.height);
    }, [size]);

    useFrame(() => {
        composerRef.current!.render();
    }, 1);

    return (
        <effectComposer ref={composerRef} args={[gl]}>
            <renderPass attachArray="passes" args={[scene, camera]} />
            <ColorShiftPass />
            <RipplePass />
        </effectComposer>
    );
};

export default Effects;
