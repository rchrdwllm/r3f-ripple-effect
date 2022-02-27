import type { FunctionComponent } from "react";
import Canvas from "./Canvas";

const Layout: FunctionComponent = ({ children }) => {
    return <Canvas>{children}</Canvas>;
};

export default Layout;
