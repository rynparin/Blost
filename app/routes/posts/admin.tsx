import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, Outlet, useLoaderData } from '@remix-run/react';

import { getPosts } from '~/models/post.server';
import { requireAdminUser } from '~/session.server';

type LoaderData = {
	posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async ({ request }) => {
	await requireAdminUser(request);
	return json({ posts: await getPosts() });
};

export default function PostAdmin() {
	const { posts } = useLoaderData() as unknown as LoaderData;
	return (
		<div className="mx-auto max-w-4xl">
			<h3 className="flex justify-center">Blog Admin</h3>
			<div className="flex justify-between gap-20">
				<nav className="col-span-4 md:col-span-1">
					<ul>
						{posts.map((post) => (
							<li key={post.slug}>
								<Link
									to={post.slug}
									className="text-blue-600 underline"
								>
									{post.title}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<main className="col-span-4 md:col-span-3">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
