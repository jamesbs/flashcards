// to do: add jsdoc
export const random = (min: number, max?: number): number => {
    if(min !== undefined && max === undefined) {
        max = min;
        min = 0;    
    }
    
    const diff = max - min;
    
    return Math.floor(Math.random() * diff) + min;
}
