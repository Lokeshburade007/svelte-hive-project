# TODO: Update Svelte Page to Display Posts with Proxied Images

## Steps to Complete:
1. **Update script in +page.svelte**: Move post fetching into `onMount`, await the `getDiscussions` call, and set `loading` to false after fetching. Add error handling.
2. **Parse json_metadata**: In the template, parse `post.json_metadata` as JSON to access the image array.
3. **Update template to loop over posts**: Use `{#each posts as post}` to iterate over the posts array instead of treating it as a single object.
4. **Set img src with proxy**: For each post, set the img src to `https://images.hive.blog/256x512/${JSON.parse(post.json_metadata).image[0]}` if image exists, else use a placeholder.
5. **Update post display**: Use `post.title` and `post.body` in the template.
6. **Test the changes**: Run the app and verify posts display with images.

## Progress:
- [x] Step 1: Update script for fetching
- [x] Step 2: Parse json_metadata
- [x] Step 3: Update template loop
- [x] Step 4: Set proxied img src
- [x] Step 5: Update post fields
- [ ] Step 6: Test changes
