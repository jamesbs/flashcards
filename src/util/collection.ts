export function zip<TArray1, TArray2>(a1: TArray1[], a2: TArray2[]) {
    const length = Math.min(a1.length, a2.length)
    let index = 0
    const result: [TArray1, TArray2][] = []
    
    while(index < length) {
        result.push([ a1[index], a2[index] ])
        index += 1
    }    

    return result
}
