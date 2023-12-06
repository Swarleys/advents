export function maxDistance(movements: string) {
    let total: number = 0;
    let special: number = 0;
    for (let i = 0; i < movements.length; i++) {
        if (movements[i] === '>') {
            total++;
        } else if (movements[i] === '<') {
            total--;
        } else if (movements[i] === '*') {
            special++;
        }
    }

    return Math.abs(total) + special
}
