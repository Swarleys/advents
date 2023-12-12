<script lang="ts">
	import cardBack from '$lib/images/card-back.png';

	type Difficulty = 8 | 16 | 24;
	type GameState = 'start' | 'playing' | 'finished';

	let gameState: GameState = $state('start');

	let createCards = (quantity: Difficulty) => {
		let cards: string[] = [];
		for (let number = 1; number <= quantity; number++) {
			cards.push(`https://advent.sveltesociety.dev/data/2023/day-eight/${number}.png`);
			cards.push(`https://advent.sveltesociety.dev/data/2023/day-eight/${number}.png`);
		}
		return cards;
	};
	let difficulty: Difficulty = $state(8);
	let deck: string[] = $derived(createCards(difficulty));
	let selectedCards: number[] = $state([]);
	let matches: number[] = [];
	let disabled: boolean = $state(false);

	const shuffle = (array: string[]) => {
		let currentIndex = array.length;
		let randomIndex: number;

		// While there remain elements to shuffle.
		while (currentIndex > 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}

		return array;
	};

	const matchCards = () => {
		if (selectedCards.length === 2) {
			let [firstCard, secondCard] = selectedCards;
			if (deck[firstCard] === deck[secondCard]) {
				matches.push(firstCard, secondCard);
				if (matches.length === difficulty * 2) {
					gameState = 'finished';
				}
			}
		}
	};

	let shuffledDeck = $derived(shuffle(deck));

	const selectedCard = (cardIndex: number) => {
		selectedCards.push(cardIndex);
	};

	$effect(() => {
		if (selectedCards.length === 2) {
			disabled = true;
			matchCards();
			setTimeout(() => {
				selectedCards = [];
				disabled = false;
			}, 1000);
		}
	});

	$effect(() => {
		if (gameState === 'start') {
			selectedCards = [];
			matches = [];
		}
	});

</script>

<header class="flex flex-col gap-4 items-center">
	<h1>Santa's Mysterious Deck of doubles</h1>

	<p>Choose the difficulty of the game</p>

	<div>
		<button
			class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-72"
			onclick={() => (difficulty = 8)}
			disabled={gameState === 'playing' || gameState === 'finished'}
		>
			Easy 8 pairs</button
		>
		<button
			class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-72"
			onclick={() => (difficulty = 16)}
			disabled={gameState === 'playing' || gameState === 'finished'}
		>
			Medium 16 pairs</button
		>
		<button
			class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-72"
			onclick={() => (difficulty = 24)}
			disabled={gameState === 'playing' || gameState === 'finished'}
		>
			Hard 24 pairs</button
		>
	</div>
</header>

{#if gameState === 'start'}
	<h2>Are you ready to play with {difficulty} pairs.</h2>
	<button
		class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-72"
		onclick={() => (gameState = 'playing')}
	>
		Play</button
	>
{/if}

{#snippet showDeck()}
	<div class={`grid grid-cols-8 gap-2 max-w-[800px] m-auto`}>
		{#each shuffledDeck as card, index}
		{@const selectedOrMatched = selectedCards.includes(index) || matches.includes(index)}
			<button onclick={() => selectedCard(index)} disabled={selectedOrMatched || disabled} class='h-[138px]'>
				<img
					src={selectedOrMatched ? card : cardBack}
					alt={`card ${index}`}
					class:opacity-70={matches.includes(index)}
				/>
			</button>
		{/each}
	</div>
{/snippet}

{#if gameState === 'playing'}
	{@render showDeck()}
{/if}

{#if gameState === 'finished'}
	{@render showDeck()}
	<h2>You won the game!!!!!!</h2>
	<p>Do you want to play again</p>
	<button
		class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-72"
		onclick={() => (gameState = 'start')}
	>
		Reset</button
	>
{/if}
