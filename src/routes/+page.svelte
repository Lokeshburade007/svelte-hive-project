<script lang="ts">
	import { onMount } from 'svelte';
	import client from '$lib/hiveClient.js';
	import { goto } from '$app/navigation';

	let posts: any[] = [];
	let loading = true;
	let error: string | null = null;

	const category = 'trending';
	const query = {
		tag: '',
		limit: 10
	};

	// Helper to safely parse post.json_metadata
	function parseMetadata(json: string) {
		try {
			return JSON.parse(json);
		} catch {
			return {};
		}
	}

	onMount(async () => {
		try {
			const discussions = await client.database.getDiscussions(category, query);
			posts = discussions;
		} catch (err: any) {
			console.error('Hive API error:', err);
			error = err.message || 'Failed to load posts.';
		} finally {
			loading = false;
		}
	});

	function handleListdetail(author: string, permlink: string) {
		// Navigate to the post detail page using a string path
		goto(`/${author}/${permlink}`);
	}
</script>

<main>
	{#if loading}
		<p>Loading posts...</p>
	{:else if error}
		<p class="text-red-500">Error: {error}</p>
	{:else}
		<ul class="list rounded-box bg-base-100 shadow-md">
			<li class="p-4 pb-2 text-xs tracking-wide opacity-60">Trending Posts</li>

			{#each posts as post (post.permlink)}
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<li class="list-row flex gap-3 border-b border-gray-200 p-3" on:click={() => handleListdetail(post.author, post.permlink)}>
					<div>
						{#if parseMetadata(post.json_metadata)?.image?.length > 0}
							<!-- svelte-ignore a11y_img_redundant_alt -->
							<img
								class="size-10 rounded-box"
								src={parseMetadata(post.json_metadata)?.image?.[0]
									? 'https://images.hive.blog/256x512/' + parseMetadata(post.json_metadata).image[0]
									: 'https://images.hive.blog/u/' + post.author + '/avatar'}
								alt="Post image"
								on:error={(e: Event) => {
									(e.currentTarget as HTMLImageElement).src = 'https://images.hive.blog/u/' + post.author + '/avatar';
								}}
							/>
						{:else}
							<div
								class="flex size-10 items-center justify-center rounded-box bg-gray-200 text-xs text-gray-500"
							>
								No image
							</div>
						{/if}
					</div>

					<div class="flex-1">
						<div class="font-semibold">{post.title}</div>
						<div class="text-xs font-semibold uppercase opacity-60">
							{post.author}
						</div>
						<p class="mt-1 line-clamp-3 text-xs opacity-80">
							{post.body.slice(0, 180)}...
						</p>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</main>
