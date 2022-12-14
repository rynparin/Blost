import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, Link, NavLink, Outlet, useLoaderData } from '@remix-run/react';

import { requireUserId } from '~/session.server';
import { useUser } from '~/utils';
import { getNoteListItems } from '~/models/note.server';

export async function loader({ request }: LoaderArgs) {
	const userId = await requireUserId(request);
	const noteListItems = await getNoteListItems({ userId });
	return json({ noteListItems });
}

export default function NotesPage() {
	const data = useLoaderData<typeof loader>();
	const user = useUser();

	return (
		<div className="flex h-full min-h-screen flex-col">
			<header className="flex items-center justify-between bg-gradient-to-r from-zinc-900 to-blue-800  p-4 text-white">
				<h1 className="flex gap-5 text-3xl font-bold">
					<Link to=".">Notes</Link>|<Link to="/posts">Posts</Link>
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

			<main className="flex h-full bg-white">
				<div className="h-full w-80 border-r bg-gray-50">
					<Link to="new" className="block p-4 text-xl text-blue-500">
						+ New Note
					</Link>

					<hr />

					{data.noteListItems.length === 0 ? (
						<p className="p-4">No notes yet</p>
					) : (
						<ol>
							{data.noteListItems.map((note) => (
								<li key={note.id}>
									<NavLink
										className={({ isActive }) =>
											`block border-b p-4 text-xl ${
												isActive ? 'bg-white' : ''
											}`
										}
										to={note.id}
									>
										📝 {note.title}
									</NavLink>
								</li>
							))}
						</ol>
					)}
				</div>

				<div className="flex-1 p-6">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
