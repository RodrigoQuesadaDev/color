export type MapProps<T, V> = {
    [P in keyof T]: V
};

export type Writable<T> = {
    -readonly [K in keyof T]: T[K]
}

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
