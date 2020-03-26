import {clamp} from "lodash-es";

export const changeHundredBasedPercentageValueBy = (value: number, byAmount: number) => {
    return changeOneBasedPercentageValueBy(value / 100, byAmount / 100) * 100;
};

export const changeOneBasedPercentageValueBy = (value: number, byAmount: number) => clamp((byAmount + 1) * value, 0, 1);

export const changeHundredBasedPercentageValueTowardBy = (value: number, byAmount: number) => {
    return changeOneBasedPercentageValueTowardBy(value / 100, byAmount / 100) * 100;
};

export const changeOneBasedPercentageValueTowardBy = (value: number, byAmount: number) => {
    return byAmount > 0
        ? clamp(value + byAmount * (1 - value), 0, 1)
        : changeOneBasedPercentageValueBy(value, byAmount);
};
