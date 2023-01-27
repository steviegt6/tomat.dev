import { AsciiFilter } from "@pixi/filter-ascii";
import { PixiRef, Sprite, Stage, useTick } from "@pixi/react";
import { DefaultEasingFunction } from "lib/transforms/easing";
import { useEffect, useRef, useState } from "react";
import transform from "lib/transforms/transform";
import { clamp } from "lib/math";

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
    const [pulseScale, setPulseScale] = useState(0);
    const [hover, setHover] = useState<boolean>(false);
    const [hoverScale, setHoverScale] = useState(0);

    useEffect(() => {
        if (!ref.current) return;

        if (!interactable) {
            ref.current.alpha = 1;
            return;
        }

        window.addEventListener("mousemove", (ev) => {
            // parallax
            setPosition([(ev.clientX / window.innerWidth - 0.5) * 30, (ev.clientY / window.innerHeight - 0.5) * 30]);
        });

        // fade in on load
        transform(ref.current, DefaultEasingFunction.inCubic, 1500, (object, progress) => (object.alpha = progress));

        // add scaling breathing effect
        transform(
            ref.current,
            DefaultEasingFunction.inOutSine,
            1000,
            (_, progress) => {
                setPulseScale(progress * 0.1);
            },
            true,
            true
        );
    }, [setSkew, setPulseScale, ref, interactable]);

    useTick((delta) => {
        if (!ref.current || !interactable) return;
        const scaleMin = 0;
        const scaleMax = 0.5;
        console.log(delta);
        const scaleDiff = (hover ? 0.075 : -0.075) * delta;

        setHoverScale((prev) => clamp(prev + scaleDiff, scaleMin, scaleMax));
    });

    return (
        <Sprite
            ref={ref}
            filters={[new AsciiFilter(6)]}
            width={width}
            height={height}
            skew={skew}
            scale={2 + pulseScale + hoverScale}
            image="/icon-themeable.svg"
            anchor={0.5}
            position={[position[0] + offset, position[1] + offset]}
            interactive={interactable}
            onmouseenter={() => setHover(true)}
            onmouseleave={() => setHover(false)}
        />
    );
}
