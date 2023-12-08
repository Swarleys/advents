<script lang="ts">
	const { data } = $props();
	import Chart from 'chart.js/auto';

	const wrappedOrCreated: { wrapped: number; created: number } = data.tasks.reduce(
		(acc, task) => {
			if (task.task === 'WRAPPED_PRESENT') acc.wrapped++;
			if (task.task === 'CREATED_TOY') acc.created++;
			return acc;
		},
		{ wrapped: 0, created: 0 }
	);

	const minutesTaken: { wrapped: number; created: number } = data.tasks.reduce(
		(acc, task) => {
			if (task.task === 'WRAPPED_PRESENT') acc.wrapped += task.minutesTaken;
			if (task.task === 'CREATED_TOY') acc.created += task.minutesTaken;
			return acc;
		},
		{ wrapped: 0, created: 0 }
	);

	const createdByElf = data.tasks.reduce(
		(acc, task) => {
			if (task.task === 'CREATED_TOY') {
				acc[task.elf] ? acc[task.elf]++ : (acc[task.elf] = 1);
			}
			return acc;
		},
		{} as Record<string, number>
	);

	const wrappedByElf = data.tasks.reduce(
		(acc, task) => {
			if (task.task === 'WRAPPED_PRESENT') {
				acc[task.elf] ? acc[task.elf]++ : (acc[task.elf] = 1);
			}
			return acc;
		},
		{} as Record<string, number>
	);

	let doughnutData = {
		type: 'doughnut',
		label: 'Count',
		title: 'Wrapped vs Created Presents',
		titleLabel: ['Wrapped', 'Created'],
		position: 'top',
		data: {
			labels: ['Wrapped', 'Created'],
			datasets: [
				{
					data: [wrappedOrCreated.wrapped, wrappedOrCreated.created]
				}
			]
		},
		options: {
			plugins: {
				legend: {
					position: 'bottom'
				},
				title: {
					display: true,
					text: 'Wrapped vs Created Presents'
				}
			}
		}
	};

	let createdData = {
		type: 'bar',
		label: 'Created',
		title: 'Created Presents',
		titleLabel: ['Created'],
		position: 'top',
		data: {
			labels: Object.keys(createdByElf),
			datasets: [
				{
					label: 'Created',
					data: Object.values(createdByElf),
					backgroundColor: 'rgba(134, 239, 172, 0.2)',
					borderColor: 'rgb(34 197 94)',
					borderWidth: 1
				}
			]
		},
		options: {
			plugins: {
				legend: {
					position: 'bottom'
				},
				title: {
					display: true,
					text: 'Created Presents'
				}
			}
		}
	};
	let wrappedData = {
		type: 'bar',
		label: 'Wrapped',
		title: 'Wrapped Presents',
		titleLabel: ['Wrapped'],
		position: 'top',
		data: {
			labels: Object.keys(wrappedByElf),
			datasets: [
				{
					label: 'Wrapped',
					data: Object.values(wrappedByElf),
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
					borderColor: 'rgb(255, 99, 132)',
					borderWidth: 1
				}
			]
		},
		options: {
			plugins: {
				legend: {
					position: 'bottom'
				},
				title: {
					display: true,
					text: 'Wrapped Presents'
				}
			}
		}
	};
	let timeSpentData = {
		type: 'bar',
		label: 'Time Spent',
		title: 'Time Spent Presents',
		titleLabel: ['Time Spent'],
		position: 'top',
		data: {
			labels: ['Time spent wrapping', 'Time spent creating'],
			datasets: [
				{
					label: 'Time Spent',
					data: [(minutesTaken.wrapped / wrappedOrCreated.wrapped).toFixed(2), (minutesTaken.created / wrappedOrCreated.created).toFixed(2)],
					borderWidth: 1
				}
			]
		},
		options: {
			plugins: {
				legend: {
					position: 'bottom'
				},
				title: {
					display: true,
					text: 'Time spent on presents'
				}
			}
		}
	};

	function doughnutRender(node: HTMLCanvasElement) {
		new Chart(node, doughnutData);
	}

	function createdRender(node: HTMLCanvasElement) {
		new Chart(node, createdData);
	}

	function wrappedRender(node: HTMLCanvasElement) {
		new Chart(node, wrappedData);
	}

    function timeSpentRender(node: HTMLCanvasElement) {
        new Chart(node, timeSpentData);
    }
</script>

<h1>Presents Progress</h1>

<h2>Wrapped VS Created</h2>
<p>
	We have created {wrappedOrCreated.created} presents and created {wrappedOrCreated.wrapped} toys, wich
	means we have wrapped {wrappedOrCreated.created - wrappedOrCreated.wrapped} without wrapping 😢.
</p>
<div class="h-[400px] w-[400px] m-auto my-8">
	<canvas use:doughnutRender></canvas>
</div>

<h2>Created by Elf</h2>
<div class="w-[600px] m-auto my-4">
	<canvas use:createdRender></canvas>
</div>

<h2>Wrapped by Elf</h2>
<div class="w-[600px] m-auto my-4">
	<canvas use:wrappedRender></canvas>
</div>

<h2>Time spent creating and wrapping presents </h2>
<p>
	We have spent {Math.floor(minutesTaken.wrapped / wrappedOrCreated.wrapped)} minutes wrapping presents
	and {Math.floor(minutesTaken.created / wrappedOrCreated.created)} minutes creating toys.
</p>
<div class="w-[600px] m-auto my-4">
    <canvas use:timeSpentRender></canvas>
</div>
