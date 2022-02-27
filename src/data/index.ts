import type { Work } from "typings";

const width = typeof window !== "undefined" ? window.innerWidth : 0;
const height = typeof window !== "undefined" ? window.innerHeight : 0;

const works: Work[] = [
    {
        title: "Back Like We Never Left",
        url: "https://images.unsplash.com/photo-1594343866404-257cced9d38b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        position: [-width / 2 + 500, -height * 0.6, 0],
        scale: [500, 800, 1],
    },
    {
        title: "Smile",
        url: "https://images.unsplash.com/photo-1593007791459-4b05e1158229?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",

        position: [width / 2 - 500, -height * 0.5, 0],
        scale: [700, 400, 1],
    },
    {
        title: "Motion",
        url: "https://images.unsplash.com/photo-1645931058195-3c553c373add?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        position: [width / 2 - 500, -height * 1.25, 0],
        scale: [600, 400, 1],
    },
    {
        title: "Architecture Aesthetics",
        url: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        position: [-width / 2 + 500, -height * 1.75, 0],
        scale: [650, 800, 1],
    },
    {
        title: "Surface",
        url: "https://images.unsplash.com/photo-1640622308069-4352d9b4dcc8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        position: [width / 2 - 500, -height * 2, 0],
        scale: [600, 400, 1],
    },
];

export default works;
