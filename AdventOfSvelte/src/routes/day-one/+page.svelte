<script lang="ts">
	const { data } = $props();

	const categorizeData = $state(
		data.list.map((person) => {
			if (person.tally > 0) {
				const categorizePerson = { ...person, categorize: 'nice' };
				return categorizePerson;
			} else {
				const categorizePerson = { ...person, categorize: 'naughty' };
				return categorizePerson;
			}
		})
	);

	function sortByName() {
		categorizeData.sort((a, b) => {
			if (a.name < b.name) return -1;
			if (a.name > b.name) return 1;
			return 0;
		});
	}

	function sortByTally() {
		categorizeData.sort((a, b) => b.tally - a.tally);
	}

	function sortByCategory() {
		categorizeData.sort((a, b) => {
			if (a.categorize < b.categorize) return -1;
			if (a.categorize > b.categorize) return 1;
			return 0;
		});
	}
</script>

<h1 class="text-slate-800 text-8xl mb-8 space-x-6">
	<span class="text-green-800">Nice</span><span class="text-slate-950 text-6xl">or</span><span
		class="text-red-800">Naugthy</span
	>
</h1>

<table
	class={'border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm'}
>
	<caption class="caption-top mb-6 text-2xl text-slate-950">
		List of {categorizeData.length} kids who are nice or naughty
	</caption>
	<thead class={'bg-slate-50 dark:bg-slate-700'}>
		<tr>
			<th
				onclick={sortByName}
				class={'w-1/3 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200  cursor-pointer text-center'}
				>Name</th
			>
			<th
				onclick={sortByTally}
				class={'w-1/3 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200  cursor-pointer text-center'}
				>Tally</th
			>
			<th
				onclick={sortByCategory}
				class={'w-1/3 border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200  cursor-pointer text-center'}
				>Category</th
			>
		</tr>
	</thead>
	<tbody>
		{#each categorizeData as person}
			<tr class="dark:bg-slate-800 dark:even:bg-slate-700">
				<td
					class={`border ${
						person.categorize === 'nice' ? 'text-green-900 bg-green-200' : 'text-red-900 bg-red-200'
					}  text-center py-2 text-lg`}>{person.name}</td
				>
				<td class={'border border-slate-600 text-slate-200 text-center py-2 text-lg'}
					>{person.tally}</td
				>
				<td class={'border border-slate-600 text-slate-200 text-center py-2 text-lg'}
					>{person.categorize === 'nice' ? `👼 Nice kid` : '😈 Naughty kid'}</td
				>
			</tr>
		{/each}
	</tbody>
</table>
