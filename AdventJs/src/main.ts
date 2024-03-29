import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { findFirstRepeated } from './challenges/challenge1.ts'
import { manufacture } from './challenges/challenge2.ts'
import { findNaughtyStep } from './challenges/challenge3.ts'
import { decode } from './challenges/challenge4.ts'
import { cyberReindeer } from './challenges/challenge5.ts'
import { maxDistance } from './challenges/challenge6.ts'
import { drawGift } from './challenges/challenge7.ts'

findFirstRepeated([2, 1, 3, 5, 3, 2])

manufacture(['tren', 'oso', 'pelota'], 'tronesa')
findNaughtyStep('abcd', 'abcde')

decode('hola (odnum)')

cyberReindeer('S..|...|..', 10)

maxDistance('<<>><')

drawGift(4, '+')



document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
