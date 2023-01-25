import { AsciiFilter } from "@pixi/filter-ascii";
import { Sprite, Stage } from "@pixi/react";
import PixelateFilter from "lib/filters/pixelateFilter";

export type TomatLogoProps = {
    width: number;
    height: number;
};

type LogoProps = {
    width: number;
    height: number;
    stageSize: number;
};

export default function TomatLogo({ width, height }: TomatLogoProps) {
    const stageSize = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    return (
        <Stage width={stageSize} height={stageSize} options={{ backgroundAlpha: 0 }}>
            <Logo width={width} height={height} stageSize={stageSize} />
        </Stage>
    );
}

function Logo({ width, height, stageSize }: LogoProps) {
    return (
        <Sprite
            filters={[new AsciiFilter(6)]}
            scale={[width / 100, height / 100]}
            image="/icon-themeable.svg"
            anchor={0.5}
            position={stageSize / 2}
        />
    );
}
