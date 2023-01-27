import { DefaultEasingFunction, IEasingFunction } from "lib/transforms/easing";

export function transform<T>(
    object: T,
    easing: IEasingFunction,
    duration: number,
    callback: (object: T, progress: number) => void,
    repeating: boolean = false,
    reverses: boolean = false
) {
    let start: number | undefined;
    let progress: number;
    let reversed: boolean = false;
    let callbackWrapper = (object: T, progress: number) => {
        if (reversed) callback(object, 1 - progress);
        else callback(object, progress);
    };

    function step(timestamp: number) {
        if (!start) start = timestamp;
        progress = timestamp - start;

        if (progress < duration) {
            callbackWrapper(object, easing.applyEasing(progress / duration));
            window.requestAnimationFrame(step);
        } else {
            callbackWrapper(object, easing.applyEasing(1));

            if (repeating) {
                if (reverses) reversed = !reversed;
                start = undefined;
                window.requestAnimationFrame(step);
            }
        }
    }

    window.requestAnimationFrame(step);
}

export function waitAndTransform<T>(
    waitTime: number,
    object: T,
    easing: IEasingFunction,
    duration: number,
    callback: (object: T, progress: number) => void,
    repeating: boolean = false,
    reverses: boolean = false
) {
    transform(null, DefaultEasingFunction.linear, waitTime, (_, progress) => {
        if (progress == 1) transform(object, easing, duration, callback, repeating, reverses);
    });
}
