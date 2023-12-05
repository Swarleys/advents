<script lang="ts">
	const { data } = $props();
	const sortedData = data.list.sort((a, b) => b.tally - a.tally);

	const categorizeData = sortedData.map((person) => {
		if (person.tally > 0) {
			const categorizePerson = { ...person, categorize: 'nice' };
			return categorizePerson;
		} else {
			const categorizePerson = { ...person, categorize: 'naughty' };
			return categorizePerson;
		}
	});
</script>

<h1 class="text-red-800 text-8xl">Pokemon</h1>
