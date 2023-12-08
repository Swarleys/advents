<script lang="ts">
	const songsByBpm = {
		50: [
			{ id: '1qYz7rfgLWE', title: `Brenda Lee - Rockin' Around The Christmas Tree` },
			{ id: 'RGqVS6ONO4Y', title: 'John Williams - Carol of the Bells' },
			{ id: 'NDxaT4m6ZFY', title: 'The Disney Holiday Chorus - We Wish You a Merry Christmas' }
		],
		100: [
			{ id: 'E8gmARGvPlI', title: 'Wham! - Last Christmas' },
			{ id: 'QJ5DOWPGxwg', title: `Michael Bubblé - It's Beginning to Look a Lot like Christmas` },
			{ id: 'iUnWS9R2RUo', title: 'Frank Sinatra - Silent Night' }
		],
		150: [
			{ id: 'aAkMkVFwAoo', title: 'Mariah Carey - All I Want for Christmas Is You' },
			{ id: '8Q94C9FRRpM', title: 'Frank Sinatra - Santa Claus Is Coming To Town' },
			{ id: 'AN_R4pR1hck', title: `Andy Williams - It's the Most Wonderful Time of the Year` }
		]
	};

	let songs: { id: string; title: string }[] = [];

	let lastTap = $state(0);
	let bpm = $state(0);

	const calculateBpm = () => {
		const now = Date.now();
		const rythm = (1 / ((now - lastTap) / 1000)) * 60;
		lastTap = now;
		bpm = Math.floor(rythm);
	};

	const randomSong = (bpm: number) => {
		if (bpm < 24) {
			songs = [];
			return 'The BPM is too low';
		}
		if (bpm >= 25 && bpm <= 75) {
			songs = songsByBpm[50];
			return songs[Math.floor(Math.random() * songs.length)];
		}
		if (bpm >= 76 && bpm <= 125) {
			songs = songsByBpm[100];
			return songs[Math.floor(Math.random() * songs.length)];
		}
		if (bpm >= 126 && bpm < Infinity) {
			songs = songsByBpm[150];
			return songs[Math.floor(Math.random() * songs.length)];
		}
	};

	const recommendedSong = $derived(randomSong(bpm));
</script>

<div class="space-y-4">
	<h1>Recommended Songs</h1>
	<p>Tap twice the button to get a rythm on bpm, and you will get a recommended song</p>
    <p>You tapped with a rythm of {bpm} bpm</p>
	<button
		onclick={calculateBpm}
		class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-72"
		>Tap</button
	>
	{#if recommendedSong && typeof recommendedSong === 'object'}
		<h2>Recommended Song</h2>
		<iframe
			width="560"
			height="315"
			src={`https://www.youtube.com/embed/${recommendedSong.id}`}
			frameborder="0"
			allowfullscreen
			title={recommendedSong?.title}
		/>
	{/if}

    {#if typeof recommendedSong === 'string'}
        <h2>{recommendedSong}</h2>
    {/if}
</div>
