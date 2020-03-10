export const changeHundredBasedPercentageValue = (value: number, byAmount: number) => {
    return changeOneBasedPercentageValue(value / 100, byAmount / 100) * 100;
};

export const changeOneBasedPercentageValue = (value: number, byAmount: number) => Math.min(Math.max((byAmount + 1) * value, 0), 1);
