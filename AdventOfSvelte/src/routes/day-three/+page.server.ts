type List = { name: string, weight: number }[];

export async function load() {
    const list: List = []
    await fetch('https://advent.sveltesociety.dev/data/2023/day-three.json')
        .then((res) => res.json())
        .then((data) => {
            list.push(...data)
        });
    return {
        list
    };
}