import client from '$lib/hiveClient.js';

export async function load({ params }) {
	const { author, permlink } = params;
	const post = await client.database.call('get_content', [author, permlink]);

	return {
		post
	};
}
