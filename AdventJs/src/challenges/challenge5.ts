// Santa 🎅 is testing his new electric sled, the CyberReindeer, on a North Pole road.The road is represented by a string of characters, where:

// . = Road
// S = Santa's Sled
// * = Open barrier
// | = Closed barrier
// Example of a road: S...|....|.....

// Each unit of time, the sled moves one position to the right.If it encounters a closed barrier, it stops until the barrier opens.If it is open, it goes through directly.

// All barriers start closed, but after 5 units of time, they all open forever.

// Create a function that simulates the sled's movement for a given time and returns an array of strings representing the state of the road at each unit of time:

const road = 'S..|...|..'
const time = 10 // units of time
const result = cyberReindeer(road, time)
console.log(result)

/* -> result:
[
  'S..|...|..', // initial state
  '.S.|...|..', // sled advances on the road
  '..S|...|..', // sled advances on the road
  '..S|...|..', // sled stops at the barrier
  '..S|...|..', // sled stops at the barrier
  '...S...*..', // barrier opens, sled advances
  '...*S..*..', // sled advances on the road
  '...*.S.*..', // sled advances on the road
  '...*..S*..', // sled advances on the road
  '...*...S..', // passes through the open barrier
]
*/

export function cyberReindeer(road: string, time: number): string[] {
    const result = [road];
    let i = 0;

    for (let t = 1; t < Math.min(5, time); t++) {
        const nextChar = road[i + 1];
        if (nextChar !== '|') {
            road = `${road.slice(0, i)}${nextChar}S${road.slice(i + 2)}`;
            i++;
        }
        result.push(road);
    }

    road = road.replaceAll('|', '*');
    let aux = '.';

    for (let t = 5; t < time; t++) {
        const nextChar = road[i + 1];
        road = `${road.slice(0, i)}${aux}S${road.slice(i + 2)}`;
        aux = nextChar;
        i++;
        result.push(road);
    }

    return result;
}
