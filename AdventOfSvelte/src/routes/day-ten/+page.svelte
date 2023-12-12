<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	let seconds = 2;
	let open = $state(false);
	let dialog: HTMLDialogElement;
	$effect(() => {
		let interval = setTimeout(() => {
			dialog.showModal();
			open = true;
		}, seconds * 1000);


		return () => clearInterval(interval);
	});
</script>

<h1>Holiday greeting pop-up</h1>

{#if open}
	<div
		class="mx-auto w-full"
		use:confetti={{
			particleCount: 150,
			force: 0.45,
			stageWidth: innerWidth,
			stageHeight: innerHeight
		}}
	/>
{/if}
<div class="fixed top-0 flex w-full h-full flex-col justify-center items-center">
	<dialog open={false} bind:this={dialog} class="p-6 rounded-lg">
		<h2 class="text-2xl font-bold">Happy Holidays!</h2>
		<p class="text-lg">We wish you a merry Christmas and a happy new year!</p>
		<button
			class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
			onclick={() => dialog.close()}>Close</button
		>
	</dialog>
</div>
