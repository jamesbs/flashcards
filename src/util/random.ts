// to do: add jsdoc
export function random(min: number, max?: number): number {
    if(min !== undefined && max === undefined) {
        max = min
        min = 0
    }

    return Math.floor(Math.random() * (max - min)) + min
}
