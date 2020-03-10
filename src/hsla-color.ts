import {Color} from './color';
import {WithOptional} from './common/utility-types';
import {changeHundredBasedPercentageValue, changeOneBasedPercentageValue} from './common/percentage-value-utils';

type Data = {
    readonly h: number,
    readonly s: number,
    readonly l: number,
    readonly a: number
};

type PercentageData = Pick<Data, 's' | 'l' | 'a'>;

type CreationData = WithOptional<Data, 's' | 'l' | 'a'>;

export class HslaColor extends Color<HslaColor, Data, PercentageData> {

    constructor({h, s = 100, l = 100, a = 1}: CreationData) {
        super(
            {h, s, l, a},
            () => `hsla(${h}, ${s}%, ${l}%, ${a})`,
            {
                s: {changeFn: changeHundredBasedPercentageValue},
                l: {changeFn: changeHundredBasedPercentageValue},
                a: {changeFn: changeOneBasedPercentageValue}
            }
        );
    }

    protected newInstance(data: Data): HslaColor {
        return new HslaColor(data);
    }
}

export const hsla = (h: number, s?: number, l?: number, a?: number) => new HslaColor({h, s, l, a});
