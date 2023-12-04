let gifts = ['tren', 'oso', 'pelota']
let materials = 'tronesa'

manufacture(gifts, materials)
console.log(manufacture(gifts, materials));


gifts = ['juego', 'puzzle']
materials = 'jlepuz'
console.log(manufacture(gifts, materials));

manufacture(gifts, materials)

gifts = ['libro', 'ps5']
materials = 'psli'
console.log(manufacture(gifts, materials));

manufacture(gifts, materials)


export function manufacture(gifts: string[], materials: string): string[] {
    return gifts.filter(gift => {
        const giftLetters = gift.split('')
        const giftLettersSet = new Set(giftLetters)
        const materialsLetters = materials.split('')
        const materialsLettersSet = new Set(materialsLetters)
        const intersection = new Set([...giftLettersSet].filter(letter => materialsLettersSet.has(letter)))
        return intersection.size === giftLettersSet.size
    })
}

