import { Form, Link, Outlet } from '@remix-run/react';

import { useUser } from '~/utils';

export default function PostsPage() {
	const user = useUser();

	return (
		<div className="flex h-full min-h-screen flex-col">
			<header className="flex items-center justify-between bg-gradient-to-r from-zinc-900 to-blue-800  p-4 text-white">
				<h1 className="flex gap-5 text-3xl font-bold">
					<Link to=".">Posts</Link>|<Link to="/notes">Notes</Link>
				</h1>
				<p>{user.email}</p>
				<Form action="/logout" method="post">
					<button
						type="submit"
						className="text-blue-000 rounded bg-slate-600 py-2 px-4 hover:bg-zinc-800 active:bg-slate-600"
					>
						Logout
					</button>
				</Form>
			</header>

			<main className="flex justify-center">
				<div className="prose py-10 lg:prose-xl">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
