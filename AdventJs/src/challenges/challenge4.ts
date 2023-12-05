const a = decode('hola (odnum)')
console.log(a) // hola mundo

const b = decode('(olleh) (dlrow)!')
console.log(b) // hello world!

const c = decode('sa(u(cla)atn)s')
console.log(c) // santaclaus

export function decode(message: string) {
    let decodedMessage = ""; 
    let temporalString = []; 

    for (const letter of message) {
        if (letter === '(') {
            temporalString.push(decodedMessage) 
            decodedMessage = ''
        } else if (letter === ')') {
            const reversed = decodedMessage.split('').reverse().join('')
            decodedMessage = temporalString.pop() + reversed
        }
        else {
            decodedMessage += letter
        }
    }

    return decodedMessage
}
