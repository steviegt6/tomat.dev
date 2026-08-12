import { AsciiFilter } from "@pixi/filter-ascii";
import { PixiRef, Sprite, Stage, useTick } from "@pixi/react";
import { DefaultEasingFunction } from "lib/transforms/easing";
import { CSSProperties, Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { clamp } from "lib/math";
import { transform, waitAndTransform } from "lib/transforms/transform";
import OpaqueFilter from "lib/filters/opaqueFilter";
import SilentErrorBoundary from "../SilentErrorBoundary";
import { useRouter } from "next/router";

export type TomatLogoProps = {
    width: number;
    height: number;
    interactable?: boolean;
    clickable?: boolean;
    children?: JSX.Element;
};

enum DisplayState {
    Idle,
    Expanding,
    Hidden
}

type LogoProps = {
    width: number;
    height: number;
    interactable: boolean;
    clickable: boolean;
    stageSize: [number, number];
    state: DisplayState;
    setState: Dispatch<SetStateAction<DisplayState>>;
    setDisplayChildren: Dispatch<SetStateAction<boolean>>;
};

export default function TomatLogo({
    width,
    height,
    interactable = false,
    clickable = false,
    children = <></>
}: TomatLogoProps) {
    const router = useRouter();
    const [displayChildren, setDisplayChildren] = useState(false);
    const [state, setState] = useState(DisplayState.Idle);
    const [stageSize, setStageSize] = useState<[number, number]>(() => {
        const both = interactable ? Math.sqrt(Math.pow(width, 2)) : Math.max(width, height) + 10;
        return [both, both];
    });

    const style: CSSProperties = {
        overflowY: "hidden",
        zIndex: 999,
        top: 0,
        left: 0,
        position: "absolute"
    };

    useEffect(() => {
        if (!clickable) return;

        function recalculate() {
            setStageSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener("resize", () => {
            recalculate();
        });

        recalculate();
    }, [setStageSize, clickable]);

    useEffect(() => {
        if (!router.query.shallow) return;
        setDisplayChildren(true);
        setState(DisplayState.Hidden);
    }, [setDisplayChildren, setState, router]);

    return (
        <>
            <noscript>{children}</noscript>
            {displayChildren ? children : <></>}
            <SilentErrorBoundary fallback={children}>
                {state !== DisplayState.Hidden ? (
                    <Stage
                        width={stageSize[0]}
                        height={stageSize[1]}
                        options={{ backgroundAlpha: 0 }}
                        style={clickable ? style : {}}
                    >
                        <Logo
                            width={width}
                            height={height}
                            interactable={interactable}
                            clickable={clickable}
                            stageSize={stageSize}
                            state={state}
                            setState={setState}
                            setDisplayChildren={setDisplayChildren}
                        />
                    </Stage>
                ) : (
                    <></>
                )}
            </SilentErrorBoundary>
        </>
    );
}

function Logo({ width, height, interactable, clickable, stageSize, state, setState, setDisplayChildren }: LogoProps) {
    const ref = useRef<PixiRef<typeof Sprite>>(null);

    const offset: [number, number] = [stageSize[0] / 2, stageSize[1] / 2];
    const [skew, setSkew] = useState<[number, number]>([0, 0]);
    const [position, setPosition] = useState<[number, number]>([0, 0]);
    const [pulseScale, setPulseScale] = useState(0);
    const [hover, setHover] = useState<boolean>(false);
    const [hoverScale, setHoverScale] = useState(0);
    const [expansionScale, setExpansionScale] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        if (!ref.current) return;

        if (!interactable || state !== DisplayState.Idle) {
            ref.current.alpha = 1;
            return;
        }

        window.addEventListener("mousemove", (ev) => {
            if (state !== DisplayState.Idle) return;
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
    }, [setSkew, setPulseScale, setDisplayChildren, ref, interactable, state]);

    useTick((delta) => {
        if (!ref.current || !interactable) return;
        const scaleMin = 0;
        const scaleMax = 0.5;
        const scaleDiff = (hover ? 0.075 : -0.075) * delta;

        setHoverScale((prev) => clamp(prev + scaleDiff, scaleMin, scaleMax));
    }, state === DisplayState.Idle);

    function onClick() {
        if (!ref.current) return;

        setState(DisplayState.Expanding);
        setExpansionScale([ref.current.scale.x, ref.current.scale.y]);

        transform(
            ref.current,
            DefaultEasingFunction.inBack,
            700,
            (object, progress) => {
                if (!object.transform) return;
                setExpansionScale([object.scale.x + progress * 1, object.scale.y + progress * 1]);
            },
            true,
            true
        );

        waitAndTransform(1000, ref.current, DefaultEasingFunction.linear, 1000, (object, progress) => {
            object.alpha = 1 - progress;
            setDisplayChildren(true);

            if (progress === 1) setState(DisplayState.Hidden);
        });
    }

    return (
        <Sprite
            ref={ref}
            filters={[new AsciiFilter(6), new OpaqueFilter(ref.current?.alpha ?? 1, [12, 12, 12])]}
            width={width}
            height={height}
            skew={skew}
            scale={state === DisplayState.Idle ? 2 + pulseScale + hoverScale : expansionScale}
            image="/icon-themeable.svg"
            anchor={0.5}
            position={[position[0] + offset[0], position[1] + offset[1]]}
            interactive={interactable}
            onmouseenter={() => setHover(true)}
            onmouseleave={() => setHover(false)}
            onclick={() => {
                if (clickable) onClick();
            }}
            ontap={() => {
                if (clickable) onClick();
            }}
        />
    );
}
