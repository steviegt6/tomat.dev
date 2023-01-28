import TomatLogo, { TomatLogoProps } from "../TomatLogo";

export type LogoContainerProps = TomatLogoProps;

export default function LogoContainer(props: LogoContainerProps) {
    return <TomatLogo {...props} />;
}
