import * as THREE from "three";

export default class Ripple {
    private _targetScene: THREE.Scene;
    private _targetCamera: THREE.OrthographicCamera;
    private _target: THREE.WebGLRenderTarget;
    private _mouse: THREE.Vector2;
    private _prevMouse: THREE.Vector2;
    private _ripples: THREE.Mesh[];
    private _rippleCount = 150;
    private _currentRipple = 0;

    constructor() {
        const { width, height, near, far } = this.getCameraProps();

        this._targetScene = new THREE.Scene();
        this._targetCamera = new THREE.OrthographicCamera(
            -width,
            width,
            height,
            -height,
            near,
            far
        );
        this._target = new THREE.WebGLRenderTarget(
            window.innerWidth,
            window.innerHeight,
            {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                format: THREE.RGBAFormat,
            }
        );
        this._ripples = [];
        this._mouse = new THREE.Vector2();
        this._prevMouse = new THREE.Vector2();

        this.addEventListeners();
        this.createRipples();
    }

    private getCameraProps = () => {
        const frustumSize = window.innerHeight;
        const aspect = window.innerWidth / window.innerHeight;
        const [w, h] = [(frustumSize * aspect) / 2, frustumSize / 2];

        return { width: w, height: h, near: -1000, far: 1000 };
    };

    private addEventListeners = () => {
        window.addEventListener("mousemove", this.onMouseMove);
        window.addEventListener("resize", this.onResize);
    };

    private createRipples = () => {
        const geometry = new THREE.PlaneBufferGeometry(30, 30, 20, 20);

        for (let i = 0; i < this._rippleCount; i++) {
            const material = new THREE.MeshBasicMaterial({
                map: new THREE.TextureLoader().load("/brush.png"),
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthTest: false,
                depthWrite: false,
            });
            const mesh = new THREE.Mesh(geometry, material);

            mesh.visible = false;

            this._ripples.push(mesh);
            this._targetScene.add(mesh);
        }
    };

    private setRipple = (ripple: THREE.Mesh) => {
        ripple.visible = true;
        ripple.position.set(this._mouse.x, this._mouse.y, 1);
        ripple.scale.set(0.02, 0.02, 1);
        (ripple.material as THREE.MeshBasicMaterial).opacity = 1;
    };

    private trackMouse = () => {
        const distance = this._mouse.distanceTo(this._prevMouse);

        if (distance > 3) {
            this.setRipple(this._ripples[this._currentRipple]);

            this._currentRipple = (this._currentRipple + 1) % this._rippleCount;
        }

        this._prevMouse.x = this._mouse.x;
        this._prevMouse.y = this._mouse.y;
    };

    public render = (
        renderer: THREE.WebGLRenderer,
        disp: THREE.IUniform<any>
    ) => {
        this.trackMouse();

        renderer.setRenderTarget(this._target);
        renderer.render(this._targetScene, this._targetCamera);
        disp.value = this._target.texture;
        renderer.setRenderTarget(null);
        renderer.clear();

        this._ripples.forEach((ripple) => {
            if (ripple.visible) {
                const material = ripple.material as THREE.MeshBasicMaterial;

                ripple.scale.y = ripple.scale.x = ripple.scale.x * 1.01 + 0.5;
                ripple.rotation.z += 0.02 * Math.random();
                material.opacity *= 0.95;

                if (material.opacity < 0.002) ripple.visible = false;
            }
        });
    };

    public dispose = () => {
        window.removeEventListener("mousemove", this.onMouseMove);
        window.removeEventListener("resize", this.onResize);
    };

    private onMouseMove = (e: MouseEvent) => {
        this._mouse.x = e.clientX - window.innerWidth / 2;
        this._mouse.y = -e.clientY + window.innerHeight / 2;
    };

    private onResize = () => {
        const { width, height } = this.getCameraProps();

        this._targetCamera.left = -width;
        this._targetCamera.right = width;
        this._targetCamera.top = height;
        this._targetCamera.bottom = -height;
        this._targetCamera.updateProjectionMatrix();
        this._target.setSize(window.innerWidth, window.innerHeight);
    };
}
