import { Link } from '@remix-run/react';

import { useOptionalUser } from '~/utils';

export default function Index() {
	const user = useOptionalUser();
	return (
		<main className="relative min-h-screen bg-slate-300 sm:flex sm:items-center sm:justify-center">
			<div className="relative  w-full sm:pb-16 sm:pt-8 ">
				<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="relative  bg-gradient-to-r from-zinc-900 to-blue-800 shadow-xl sm:overflow-hidden sm:rounded-2xl">
						<div className="relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-32">
							<h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
								<span className="block uppercase text-zinc-500 drop-shadow-md">
									blost
								</span>
							</h1>
							{user ? (
								<p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
									Welcome {user.email}
								</p>
							) : (
								<p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
									Login before enter
								</p>
							)}

							<div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
								{user ? (
									<div className="flex justify-center gap-5">
										<Link
											to="/notes"
											className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-yellow-50 sm:px-8"
										>
											Notes
										</Link>
										<Link
											to="/posts"
											className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-yellow-50 sm:px-8"
										>
											Blogs
										</Link>
									</div>
								) : (
									<div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
										<Link
											to="/join"
											className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
										>
											Sign up
										</Link>
										<Link
											to="/login"
											className="flex items-center justify-center rounded-md bg-blue-700 px-4 py-3 font-medium text-white hover:bg-blue-600"
										>
											Log In
										</Link>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
