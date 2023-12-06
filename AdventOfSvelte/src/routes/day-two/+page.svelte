<script lang="ts">
	let coockies = $state(0);
	let mood = $state('neutral');
	$effect(() => {
		if (coockies > 15) {
			mood = 'extremely happy';
		} else if (coockies > 10) {
			mood = 'very happy';
		} else if (coockies > 5) {
			mood = 'happy';
		} else if (coockies > 2) {
			mood = 'little happy';
		} else if (coockies < -15) {
			mood = 'extremely sad';
		} else if (coockies < -10) {
			mood = 'very sad';
		} else if (coockies < -5) {
			mood = 'sad';
		} else if (coockies < -2) {
			mood = 'little sad';
		} else {
			mood = 'neutral';
		}
	});
</script>

<div class="flex flex-col sm:flex-row justify-center items-center">
	<button
		class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-72"
		onclick={() => coockies++}>More cookies</button
	>

	<button
		class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-72"
		onclick={() => coockies--}>Less cookies</button
	>

	<button
		class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-72"
		onclick={() => (coockies = 0)}>Reset</button
	>
</div>

<div>
	<h1>Santas mood is {mood}</h1>
</div>
