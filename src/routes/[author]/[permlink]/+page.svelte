<script lang="ts">
	// @ts-ignore
	import { DefaultRenderer } from '@hiveio/content-renderer';
	let { data } = $props();

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

	// svelte-ignore non_reactive_update
		let renderedBody = '';
	if (data?.post?.body) {
		renderedBody = renderer.render(data.post.body);
	}
</script>

<main class="p-4 space-y-4">
	<img
		src={'https://images.hive.blog/u/' + data.post.author + '/avatar'}
		alt={data.post.author}
		class="w-12 h-12 rounded-full"
	/>

	<h1 class="text-2xl font-bold text-gray-300">{data.post.title}</h1>

	<div class="prose max-w-none text-gray-400">
		{@html renderedBody}
	</div>
</main>