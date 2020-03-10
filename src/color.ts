import {MapProps, Writable} from './common/utility-types';

export abstract class Color<C extends Color<C, Data, PercentageData>, Data, PercentageData extends Partial<Data>> {
    readonly css: string;

    protected constructor(
        protected readonly data: Data,
        generateVal: () => string,
        protected readonly percentageProperties: MapProps<PercentageData, { changeFn: (value: number, byAmount: number) => number }>
    ) {
        this.css = generateVal();
    }

    protected abstract newInstance(data: Data): C;

    with(data: Partial<Data>): C {
        return this.newInstance({...this.data, ...data});
    }

    changeValueBy(percentageAmount: Partial<PercentageData>): C {
        let newData: Writable<Data> = {...this.data};
        Object.keys(this.percentageProperties).forEach(prop => {
            this.changePropertyBy(newData, prop as keyof PercentageData, percentageAmount, this.percentageProperties[prop as keyof PercentageData].changeFn);
        });
        return this.newInstance(newData);
    }

    private changePropertyBy(
        newData: Writable<Data>,
        prop: keyof PercentageData,
        percentageAmount: Partial<PercentageData>,
        changeFn: (value: number, byAmount: number) => number
    ) {
        // @ts-ignore
        if (percentageAmount[prop] !== undefined) newData[prop] = changeFn(this.data[prop], percentageAmount[prop]!);
    }
}
