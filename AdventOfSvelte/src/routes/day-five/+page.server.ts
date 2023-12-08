type TaskType = 'CREATED_TOY' | 'WRAPPED_PRESENT'

type Tasks = {
    elf: string
    task: TaskType
    minutesTaken: number
    date: string;
}[]
export async function load() {
    const tasks: Tasks = []
    await fetch('https://advent.sveltesociety.dev/data/2023/day-five.json')
        .then((res) => res.json())
        .then((data) => {
            tasks.push(...data)
        });
    return {
        tasks
    };
}