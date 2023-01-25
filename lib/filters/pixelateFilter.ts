// MIT License - Copyright (c) 2013-2017 Mathew Groves, Chad Engler
// https://github.com/pixijs/filters/blob/main/filters/pixelate/src/PixelateFilter.ts

import { Filter, Point } from "@pixi/core";
import { pixelate } from "lib/fragments/pixelate";
import { vertexDefault } from "lib/vertexes/vertexDefault";

type Size = number | number[] | Point;

/**
 * This filter applies a pixelate effect making display objects appear 'blocky'.<br>
 * ![original](../tools/screenshots/dist/original.png)![filter](../tools/screenshots/dist/pixelate.png)
 *
 * @class
 * @extends PIXI.Filter
 * @see {@link https://www.npmjs.com/package/@pixi/filter-pixelate|@pixi/filter-pixelate}
 * @see {@link https://www.npmjs.com/package/pixi-filters|pixi-filters}
 */
export default class PixelateFilter extends Filter {
    threshold: number | undefined;

    /**
     * @param {PIXI.Point|Array<number>|number} [size=10] - Either the width/height of the size of the pixels, or square size
     */
    constructor(size: Size = 10, threshold?: number | undefined) {
        super(vertexDefault, pixelate);
        this.size = size;
        this.threshold = threshold;
    }

    /**
     * This a point that describes the size of the blocks.
     * x is the width of the block and y is the height.
     *
     * @member {PIXI.Point|Array<number>|number}
     * @default 10
     */
    get size(): Size {
        return this.uniforms.size;
    }
    set size(value: Size) {
        if (typeof value === "number") {
            value = [value, value];
        }
        this.uniforms.size = value;
        this.uniforms.useThreshold = this.threshold !== undefined;
        this.uniforms.threshold = this.threshold || 0;
    }
}
