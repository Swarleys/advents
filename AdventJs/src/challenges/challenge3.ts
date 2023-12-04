let original = 'abcd'
let modified = 'abcde'
findNaughtyStep(original, modified) 
console.log(findNaughtyStep(original, modified));

original = 'stepfor'
modified = 'stepor'
findNaughtyStep(original, modified) 
console.log(findNaughtyStep(original, modified));

original = 'abcde'
modified = 'abcdec'
findNaughtyStep(original, modified) 
console.log(findNaughtyStep(original, modified));

original = ''
modified = 'b'
findNaughtyStep(original, modified) 
console.log(findNaughtyStep(original, modified));

export function findNaughtyStep(original: string, modified: string) {
    if (original === modified) return ''
    const originalLetters = original.split('')
    const modifiedLetters = modified.split('')
    if (originalLetters.length > modifiedLetters.length) {
        return originalLetters.filter((letter, index) => letter !== modifiedLetters[index])[0]
    }
    if (originalLetters.length < modifiedLetters.length) {
        return modifiedLetters.filter((letter, index) => letter !== originalLetters[index])[0]
    }
}