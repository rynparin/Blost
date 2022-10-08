import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useCatch, useLoaderData, useParams } from '@remix-run/react';
import { getPost } from '~/models/post.server';
import invariant from 'tiny-invariant';
import { marked } from 'marked';

type LoaderData = {
	title: string;
	html: string;
};

export const loader: LoaderFunction = async ({ params }) => {
	const { slug } = params;
	invariant(slug, 'slug is required');
	const post = await getPost(slug);

	if (!post) {
		throw new Response('Not Found', { status: 404 });
	}
	const html = marked(post.markdown);
	return json<LoaderData>({ title: post.title, html });
};

export default function PostRoute() {
	const { html } = useLoaderData() as LoaderData;

	return (
		<main className="flex justify-center">
			<div className="prose py-10 lg:prose-xl">
				<div dangerouslySetInnerHTML={{ __html: html }} />
			</div>
		</main>
	);
}
export function CatchBoundary() {
	const caught = useCatch();
	const params = useParams();
	if (caught.status === 404) {
		return (
			<div className="text-red-500">
				Uh oh! The post with the slug "{params.slug}" does not exist!
			</div>
		);
	}
	throw new Error(
		`Unsupported thrown response status code: ${caught.status}`
	);
}
