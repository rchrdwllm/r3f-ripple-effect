import works from "data";
import { useThree } from "@react-three/fiber";
import Image from "./Image";

const Scene = () => {
    const {
        viewport: { width, height },
    } = useThree();

    return (
        <group>
            <Image
                title={works[0].title}
                url={works[0].url}
                position={[-width / 2 + width / 4.01, -height * 0.75, 0]}
                scale={[width / 4.01, width / 2.88, 1]}
            />
            <Image
                title={works[1].title}
                url={works[1].url}
                position={[width / 2 - width / 3.15, -height * 0.65, 0]}
                scale={[width / 3.15, width / 4.77, 1]}
            />
            <Image
                title={works[2].title}
                url={works[2].url}
                position={[width / 2 - width / 4.15, -height * 1.25, 0]}
                scale={[width / 3.51, width / 4.77, 1]}
            />
            <Image
                title={works[3].title}
                url={works[3].url}
                position={[-width / 2 + width / 4.32, -height * 1.75, 0]}
                scale={[width / 3.32, width / 2.88, 1]}
            />
            <Image
                title={works[4].title}
                url={works[4].url}
                position={[width / 2 - width / 3.51, -height * 2, 0]}
                scale={[width / 3.51, width / 4.77, 1]}
            />
        </group>
    );
};

export default Scene;
