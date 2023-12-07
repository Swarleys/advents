<script lang="ts">
	const { data } = $props();

	const dataWithId = $state(data.list.map((gifts, index) => ({ ...gifts, id: index })));

    let filteredData = $state([...dataWithId]);

    type Gift = typeof dataWithId[0];

	let gifts = $state<typeof dataWithId>([]);

    const totalWeight = $derived(gifts.reduce((acc, cur) => {
				return Number((acc + cur.weight).toFixed(2));
			}, 0));
    const moreLoad = $derived((100 - totalWeight).toFixed(2));

    const addGift = (gift: Gift) => {
        gifts.push(gift)
        filteredData.splice(filteredData.indexOf(gift), 1)
    }

    const removeGift = (gift: Gift) => {
        filteredData.push(gift)
        gifts.splice(gifts.indexOf(gift), 1)
    }

    $effect(() => {
        if (totalWeight > 100) {
            filteredData = [...dataWithId]
            gifts = []
        }
    })
</script>



<h1>Gifts Balancer</h1>

<div class="flex mt-16 gap-20">
	<table
		class="border-collapse border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm w-96"
	>
		<thead>
			<tr class="text-xl">
				<th
					class={'w-1/3 border border-slate-300 dark:border-slate-600 font-semibold p-2 text-slate-900 dark:text-slate-200  cursor-pointer text-center'}
					>Name</th
				>
				<th
					class={'w-1/3 border border-slate-300 dark:border-slate-600 font-semibold p-2 text-slate-900 dark:text-slate-200  cursor-pointer text-center'}
					>Weight</th
				>
			</tr>
		</thead>
		<tbody>
			{#each filteredData as gift}
				<tr
					class="dark:bg-slate-800 dark:even:bg-slate-700 cursor-pointer"
					onclick={() => addGift(gift)}
				>
					<td class="border border-slate-600 text-slate-200 text-center py-2 text-lg"
						>{gift.name}</td
					>
					<td class="border border-slate-600 text-slate-200 text-center py-2 text-lg"
						>{gift.weight} Kg</td
					>
				</tr>
			{/each}
		</tbody>
	</table>
	<table
		class="border-collapse border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm w-96"
	>
		<thead>
			<tr class="text-xl">
				<th
					class={'w-1/3 border border-slate-300 dark:border-slate-600 font-semibold p-2 text-slate-900 dark:text-slate-200  cursor-pointer text-center'}
					>Name</th
				>
				<th
					class={'w-1/3 border border-slate-300 dark:border-slate-600 font-semibold p-2 text-slate-900 dark:text-slate-200  cursor-pointer text-center'}
					>Weight</th
				>
			</tr>
		</thead>
		<tbody>
			{#each gifts as gift}
				<tr
					class="dark:bg-slate-800 dark:even:bg-slate-700 cursor-pointer"
					onclick={() => removeGift(gift)}
				>
					<td class="border border-slate-600 text-slate-200 text-center py-2 text-lg"
						>{gift.name}</td
					>
					<td class="border border-slate-600 text-slate-200 text-center py-2 text-lg"
						>{gift.weight} Kg</td
					>
				</tr>
			{/each}
		</tbody>
	</table>
	<div>
		<h2>
			Total gifts weight: {totalWeight} Kg
		</h2>
        <p>
            You can add an extra of {moreLoad} Kg
        </p>
	</div>
</div>
