/**
 * Defines an easing function - that is, a function that takes a time value and
 * returns a value (typically) from 0-1.
 */
export interface IEasingFunction {
    /**
     * Applies the easing function given a time.
     * @param time The time value to apply the easing function to.
     */
    applyEasing(time: number): number;
}

/**
 * Simple implementation of IEasingFunction that takes and executes a function.
 * Additionally, contains a number of static functions that can be used as
 * easing functions.
 */
// prettier-ignore
export class DefaultEasingFunction implements IEasingFunction {
    func: (time: number) => number;

    public constructor(func: (time: number) => number) {
        this.func = func;
    }

    applyEasing(time: number): number {
        return this.func(time);
    }

    private static build(func: (time: number) => number): IEasingFunction {
        return new DefaultEasingFunction(func);
    }

    public static linear: IEasingFunction = this.build((time: number) => time);

    public static in: IEasingFunction = this.build((time: number) => time * time);
    public static out: IEasingFunction = this.build((time: number) => time * (2 - time));
    public static inOut: IEasingFunction = this.build((time: number) => time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time);

    public static inCubic: IEasingFunction = this.build((time: number) => time * time * time);
    public static outCubic: IEasingFunction = this.build((time: number) => (--time) * time * time + 1);
    public static inOutCubic: IEasingFunction = this.build((time: number) => time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1);

    public static inQuart: IEasingFunction = this.build((time: number) => time * time * time * time);
    public static outQuart: IEasingFunction = this.build((time: number) => 1 - (--time) * time * time * time);
    public static inOutQuart: IEasingFunction = this.build((time: number) => time < 0.5 ? 8 * time * time * time * time : 1 - 8 * (--time) * time * time * time);

    public static inQuint: IEasingFunction = this.build((time: number) => time * time * time * time * time);
    public static outQuint: IEasingFunction = this.build((time: number) => 1 + (--time) * time * time * time * time);
    public static inOutQuint: IEasingFunction = this.build((time: number) => time < 0.5 ? 16 * time * time * time * time * time : 1 + 16 * (--time) * time * time * time * time);

    public static inSine: IEasingFunction = this.build((time: number) => 1 - Math.cos(time * Math.PI / 2));
    public static outSine: IEasingFunction = this.build((time: number) => Math.sin(time * Math.PI / 2));
    public static inOutSine: IEasingFunction = this.build((time: number) => (1 - Math.cos(Math.PI * time)) / 2);

    public static inExpo: IEasingFunction = this.build((time: number) => time === 0 ? 0 : Math.pow(1024, time - 1));
    public static outExpo: IEasingFunction = this.build((time: number) => time === 1 ? 1 : 1 - Math.pow(2, -10 * time));
    public static inOutExpo: IEasingFunction = this.build((time: number) => {
        if (time === 0) return 0;
        if (time === 1) return 1;
        if ((time *= 2) < 1) return 0.5 * Math.pow(1024, time - 1);
        return 0.5 * (-Math.pow(2, -10 * (time - 1)) + 2);
    });

    public static inCirc: IEasingFunction = this.build((time: number) => 1 - Math.sqrt(1 - time * time));
    public static outCirc: IEasingFunction = this.build((time: number) => Math.sqrt(1 - (--time) * time));
    public static inOutCirc: IEasingFunction = this.build((time: number) => {
        if ((time *= 2) < 1) return -0.5 * (Math.sqrt(1 - time * time) - 1);
        return 0.5 * (Math.sqrt(1 - (time -= 2) * time) + 1);
    });

    public static inElastic: IEasingFunction = this.build((time: number) => {
        let s = 1.70158;
        let p = 0;
        let a = 1;
        if (time === 0) return 0;
        if (time === 1) return 1;
        if (!p) p = 0.3;
        if (a < 1) { a = 1; s = p / 4; }
        else s = p / (2 * Math.PI) * Math.asin(1 / a);
        return -(a * Math.pow(2, 10 * (time -= 1)) * Math.sin((time - s) * (2 * Math.PI) / p));
    });
    public static outElastic: IEasingFunction = this.build((time: number) => {
        let s = 1.70158;
        let p = 0;
        let a = 1;
        if (time === 0) return 0;
        if (time === 1) return 1;
        if (!p) p = 0.3;
        if (a < 1) { a = 1; s = p / 4; }
        else s = p / (2 * Math.PI) * Math.asin(1 / a);
        return a * Math.pow(2, -10 * time) * Math.sin((time - s) * (2 * Math.PI) / p) + 1;
    });
    public static inOutElastic: IEasingFunction = this.build((time: number) => {
        let s = 1.70158;
        let p = 0;
        let a = 1;
        if (time === 0) return 0;
        if ((time *= 2) === 2) return 1;
        if (!p) p = 0.3 * 1.5;
        if (a < 1) { a = 1; s = p / 4; }
        else s = p / (2 * Math.PI) * Math.asin(1 / a);
        if (time < 1) return -0.5 * (a * Math.pow(2, 10 * (time -= 1)) * Math.sin((time - s) * (2 * Math.PI) / p));
        return a * Math.pow(2, -10 * (time -= 1)) * Math.sin((time - s) * (2 * Math.PI) / p) * 0.5 + 1;
    });

    public static inBack: IEasingFunction = this.build((time: number) => {
        let s = 1.70158;
        return time * time * ((s + 1) * time - s);
    });
    public static outBack: IEasingFunction = this.build((time: number) => {
        let s = 1.70158;
        return (time = time - 1) * time * ((s + 1) * time + s) + 1;
    });
    public static inOutBack: IEasingFunction = this.build((time: number) => {
        let s = 1.70158 * 1.525;
        if ((time *= 2) < 1) return 0.5 * (time * time * ((s + 1) * time - s));
        return 0.5 * ((time -= 2) * time * ((s + 1) * time + s) + 2);
    });

    public static inBounce: IEasingFunction = this.build((time: number) => 1 - this.outBounce.applyEasing(1 - time));
    public static outBounce: IEasingFunction = this.build((time: number) => {
        if (time < (1 / 2.75)) {
            return (7.5625 * time * time);
        } else if (time < (2 / 2.75)) {
            return (7.5625 * (time -= (1.5 / 2.75)) * time + 0.75);
        } else if (time < (2.5 / 2.75)) {
            return (7.5625 * (time -= (2.25 / 2.75)) * time + 0.9375);
        } else {
            return (7.5625 * (time -= (2.625 / 2.75)) * time + 0.984375);
        }
    });
    public static inOutBounce: IEasingFunction = this.build((time: number) => {
        if (time < 0.5) return this.inBounce.applyEasing(time * 2) * 0.5;
        return this.outBounce.applyEasing(time * 2 - 1) * 0.5 + 0.5;
    });
}
