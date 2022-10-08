import { json } from '@remix-run/node';
import { NavLink, Link, useLoaderData } from '@remix-run/react';

import { getPosts } from '~/models/post.server';
import { useOptionalAdminUser } from '~/utils';

type LoaderData = {
	// this is a handy way to say: "posts is whatever type getPosts resolves to"
	posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader = async () => {
	return json<LoaderData>({
		posts: await getPosts(),
	});
};

export default function Posts() {
	const { posts } = useLoaderData() as unknown as LoaderData;

	const adminUser = useOptionalAdminUser();

	return (
		<main className="">
			{adminUser && (
				<Link to="admin" className="text-red-600 underline">
					Admin
				</Link>
			)}
			<ul>
				{posts.map((post) => (
					<li key={post.slug}>
						<Link
							prefetch="intent"
							to={post.slug}
							className="text-blue-800 underline"
						>
							{post.title}
						</Link>
					</li>
				))}
			</ul>
		</main>
	);
}
