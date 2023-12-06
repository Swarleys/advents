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
    const roadArray = road.split('');
    const filteredBarriers: number[] = [];
    roadArray.filter((road, index) => {
        if (road === '|') {
            filteredBarriers.push(index);
            return true;
        }
    })
    const result = [];
    let sledPosition = 0;

    for (let i = 0; i < time; i++) {
        if (i === 0) {
            result.push(roadArray.join(''))
            continue;
        }
        if (i > 4) {
            roadArray.forEach((char, index) => {
                if (char === '|') {
                    roadArray[index] = '*';
                }
            })
        }

        if (roadArray[sledPosition + 1] === '.' || roadArray[sledPosition + 1] === '*') {
            roadArray[sledPosition] = '.';
            filteredBarriers.forEach(barrier => {
                if (barrier === sledPosition && barrier < i) {
                    console.log('barrier', barrier, sledPosition);
                    roadArray[sledPosition] = '*';
                }
            });
            sledPosition++;
            roadArray[sledPosition] = 'S';
        }

        result.push(roadArray.join(''));
    }

    return result;
}
