<script lang="ts">
	// @ts-ignore
	import { DefaultRenderer } from '@hiveio/content-renderer';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';
	import client from '$lib/hiveClient';

	// client-side state
	let post: any = null;
	let renderedBody = '';
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		// read route params on the client
		const { author, permlink } = get(page).params;

		try {
			// fetch the post on the client
			const fetched = await client.database.call('get_content', [author, permlink]);
			post = fetched;

			const renderer = new DefaultRenderer({
				baseUrl: 'https://hive.blog/',
				breaks: true,
				skipSanitization: false,
				allowInsecureScriptTags: false,
				addNofollowToLinks: true,
				doNotShowImages: false,
				assetsWidth: 640,
				assetsHeight: 480,
				imageProxyFn: (url: string) => url,
				usertagUrlFn: (account: string) => '/@' + account,
				hashtagUrlFn: (hashtag: string) => '/trending/' + hashtag,
				isLinkSafeFn: (url: string) => true,
				addExternalCssClassToMatchingLinksFn: (url: string) => true,
				ipfsPrefix: 'https://ipfs.io/ipfs/'
			});

			try {
				renderedBody = renderer.render(post.body);
			} catch (e) {
				renderedBody = post.body || '';
			}
		} catch (e) {
			error = 'Failed to load post';
		} finally {
			loading = false;
		}
	});
</script>

<main class="p-4 space-y-4">
	{#if loading}
		<div>Loading...</div>
	{:else if error}
		<div class="text-red-500">{error}</div>
	{:else}
		<img
			src={'https://images.hive.blog/u/' + post.author + '/avatar'}
			alt={post.author}
			class="w-12 h-12 rounded-full"
		/>

		<h1 class="text-2xl font-bold text-gray-300">{post.title}</h1>

		<div class="prose max-w-none text-gray-400">
			{@html renderedBody}
		</div>
	{/if}
</main>