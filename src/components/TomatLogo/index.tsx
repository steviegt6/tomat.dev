import { AsciiFilter } from "@pixi/filter-ascii";
import { PixiRef, Sprite, Stage, useTick } from "@pixi/react";
import { useEffect, useRef, useState } from "react";

export type TomatLogoProps = {
    width: number;
    height: number;
    interactable?: boolean;
};

type LogoProps = {
    width: number;
    height: number;
    interactable: boolean;
    stageSize: number;
};

export default function TomatLogo({ width, height, interactable = false }: TomatLogoProps) {
    const stageSize = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

    return (
        <Stage width={stageSize} height={stageSize} options={{ backgroundAlpha: 0 }}>
            <Logo width={width} height={height} interactable={interactable} stageSize={stageSize} />
        </Stage>
    );
}

function Logo({ width, height, interactable, stageSize }: LogoProps) {
    const ref = useRef<PixiRef<typeof Sprite>>(null);

    const offset = stageSize / 2;
    const [skew, setSkew] = useState<[number, number]>([0, 0]);
    const [position, setPosition] = useState<[number, number]>([0, 0]);
    const [pulseElapsed, setPulseElapsed] = useState(0);
    const [pulseScale, setPulseScale] = useState(0);
    const [hover, setHover] = useState(false);
    const [hoverElapsed, setHoverElapsed] = useState(0);
    const [hoverScale, setHoverScale] = useState(0);

    useEffect(() => {
        if (!interactable) return;
        window.addEventListener("mousemove", (ev) => {
            /*//setSkew([ev.clientY / window.innerHeight - 0.5, ev.clientX / window.innerWidth - 0.5]);
            //setSkew([ev.clientY / window.innerHeight - 0.5, -(ev.clientY / window.innerHeight - 0.5)]);
            //setSkew([ev.clientX / window.innerWidth - 0.5, -(ev.clientX / window.innerWidth - 0.5)]);
            //setSkew([ev.clientX / window.innerHeight - 0.5, 0]);

            // setSkew([-1, 0.5]);

            //const sprite = ref.current;
            //if (sprite) {
            //    console.log(sprite.transform);
            //
            //    sprite.transform.setRotation2d(1, 1);
            //    /*sprite.rotation = Math.atan2(
            //        ev.clientY / window.innerHeight - 0.5,
            //        ev.clientX / window.innerWidth - 0.5
            //    );*/
            //}*/

            // parallax
            setPosition([(ev.clientX / window.innerWidth - 0.5) * 30, (ev.clientY / window.innerHeight - 0.5) * 30]);
        });
    }, [setSkew, ref, interactable]);

    useTick((delta) => {
        if (!interactable) return;

        setPulseElapsed((pulseElapsed) => pulseElapsed + delta);

        const sprite = ref.current;
        if (sprite) {
            const scale = 1 + Math.sin(pulseElapsed * 0.05) * 0.05;
            setPulseScale(scale);
        }
    });

    useTick((delta) => {
        function easeInOutCubic(x: number): number {
            return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        }

        // lazily slow down scaling lol
        delta /= 10;

        if (hover) setHoverElapsed((hoverElapsed) => Math.min(hoverElapsed + delta, 1));
        else setHoverElapsed((hoverElapsed) => Math.max(hoverElapsed - delta, 0));

        const sprite = ref.current;
        if (sprite) {
            const scale = easeInOutCubic(hoverElapsed) * 0.5;
            console.log(scale);
            setHoverScale(scale);
        }
    });

    return (
        <Sprite
            ref={ref}
            filters={[new AsciiFilter(6)]}
            width={width}
            height={height}
            skew={skew}
            scale={1 + pulseScale + hoverScale}
            image="/icon-themeable.svg"
            anchor={0.5}
            position={[position[0] + offset, position[1] + offset]}
            interactive={interactable}
            onmouseenter={() => setHover(true)}
            onmouseleave={() => setHover(false)}
        />
    );
}
