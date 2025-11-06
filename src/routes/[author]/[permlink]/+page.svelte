<script lang="ts">
	let { data } = $props();
</script>

<main class="p-4 space-y-4">
	<img
		src={'https://images.hive.blog/u/' + data.post.author + '/avatar'}
		alt={data.post.author}
		class="w-12 h-12 rounded-full"
	/>

	<h1 class="text-2xl font-bold text-gray-300">{data.post.title}</h1>

	<div class="prose max-w-none text-gray-400">
		{@html data.post.body}
	</div>
</main>