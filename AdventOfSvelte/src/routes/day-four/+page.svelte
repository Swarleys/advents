<script lang="ts">
	import Chart from 'chart.js/auto';
	type HeartRate = {
		heartRate: number;
		time: string;
	};

	const heartRates: HeartRate[] = $state([
		{ heartRate: 80, time: new Date().toTimeString().slice(0, 8) }
	]);
	const averageHeartRate = $derived(
		(heartRates.reduce((a, b) => a + b.heartRate, 0) / heartRates.length).toFixed(2)
	);
	const labels: string[] = $derived(heartRates.map((d) => d.time));
	const data: number[] = $derived(heartRates.map((d) => d.heartRate));
	let barData = $derived({
		type: 'line',
		data: {
			labels,
			datasets: [
				{
					label: 'Pulsaciones por minuto',
					data: data,
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
					borderColor: 'rgba(255, 99, 132, 1)',
					borderWidth: 1,
                    tension: 1
				}
			]
		},
		options: {
			scales: {
				y: {
					beginAtZero: false
				}
			}
		}
	});

	let chart: Chart;
	$effect(() => {
		setInterval(() => {
			fetch('https://advent.sveltesociety.dev/data/2023/day-four.json')
				.then((data) => data.json())
				.then((data) => {
					heartRates.push({
						...data,
						time: new Date().toTimeString().slice(0, 8)
					});
				});
		}, 1000);
	});

    $effect(() => {
        if (chart) {
            chart.data.labels = labels;
            chart.data.datasets[0].data = data;
            chart.update();
        }
    });

    function chartRender(node: HTMLCanvasElement) {
        chart = new Chart(node, barData);
    }
</script>

<h1>Average heartbeat {averageHeartRate}</h1>
<h2>Actual heartbeat {heartRates[heartRates.length - 1].heartRate}/min <span class="animate-ping">❤️</span></h2>

<canvas use:chartRender></canvas>
