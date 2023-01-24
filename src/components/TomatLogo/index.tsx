import { Sprite, Stage } from "@saitonakamura/react-pixi";
import PixelateFilter from "lib/filters/pixelateFilter";

export type TomatLogoProps = {
    width: number;
    height: number;
};

type LogoProps = {
    width: number;
    height: number;
};

export default function TomatLogo({ width, height }: TomatLogoProps) {
    return (
        <Stage width={width} height={height} options={{ backgroundAlpha: 0 }}>
            <Logo width={width} height={height} />
        </Stage>
    );
}

function Logo({ width, height }: LogoProps) {
    return (
        <Sprite
            filters={[new PixelateFilter()]}
            scale={[width / 100, height / 100]}
            image="/tomat.svg"
            anchor={0.5}
            x={width / 2}
            y={height / 2}
        />
    );
}
