type List = { name: string, tally: number }[];

export async function load() {
    const list: List = []
    await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json')
        .then((res) => res.json())
        .then((data) => {
            list.push(...data)
        });
    return {
        list
    };
}