import styled from "styled-components";
import type { FunctionComponent } from "react";
import { Canvas as FiberCanvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import Scene from "./Scene";
import Effects from "./Effects";

const StyledCanvasContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
`;

const Canvas: FunctionComponent = ({ children }) => {
    return (
        <StyledCanvasContainer>
            <FiberCanvas orthographic>
                <color attach="background" args={["white"]} />
                <ScrollControls damping={5} pages={3}>
                    <Scroll>
                        <Scene />
                        <Effects />
                    </Scroll>
                    <Scroll html>{children}</Scroll>
                </ScrollControls>
            </FiberCanvas>
        </StyledCanvasContainer>
    );
};

export default Canvas;
