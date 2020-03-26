import {Color} from './color';
import {WithOptional} from './common/utility-types';
import {
    changeHundredBasedPercentageValueBy,
    changeHundredBasedPercentageValueTowardBy
} from './common/percentage-value-utils';

type Data = {
    readonly r: number,
    readonly g: number,
    readonly b: number,
    readonly a: number
};

type PercentageData = Pick<Data, 'a'>;

type CreationData = WithOptional<Data, 'a'>;

export class RgbaColor extends Color<RgbaColor, Data, PercentageData> {

    constructor({r, g, b, a = 1}: CreationData) {
        super(
            {r, g, b, a},
            () => `rgba(${r}, ${g}, ${b}, ${a})`,
            {
                a: {
                    changeByFn: changeHundredBasedPercentageValueBy,
                    changeTowardByFn: changeHundredBasedPercentageValueTowardBy
                }
            }
        );
    }

    protected newInstance(data: Data): RgbaColor {
        return new RgbaColor(data);
    }
}

export const rgba = (r: number, g: number, b: number, a?: number) => new RgbaColor({r, g, b, a});
