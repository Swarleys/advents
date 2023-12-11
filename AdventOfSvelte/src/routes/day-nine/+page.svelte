<script lang="ts">
	let xmas = new Date('12/25/2023');
	let timeLeft: Date = $state(new Date(xmas.getTime() - new Date().getTime()));
	let days = $derived(timeLeft.getDate().toString().padStart(2, '0'));
	let hours = $derived(timeLeft.getHours().toString().padStart(2, '0'));
	let minutes = $derived(timeLeft.getMinutes().toString().padStart(2, '0'));
	let seconds = $derived(timeLeft.getSeconds().toString().padStart(2, '0'));

	$effect(() => {
		let interval = setInterval(() => {
			timeLeft = new Date(xmas.getTime() - new Date().getTime());
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<h1>Santa's final countdown</h1>

<p>Time until Santa's starts delivering the presents is: {days} days, {hours}:{minutes}h and {seconds} seconds.</p>
