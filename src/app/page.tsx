import { ResetCompletedButton } from '@/components/reset-completed-button';
import { TodoList } from '@/components/todo-list';
import { TodoSkeleton } from '@/components/todo-skeleton';
import { resetCompleted } from '@/services/todo.service';
import { Suspense } from 'react';

export default async function RootPage() {
	return (
		<main className="flex items-center justify-center">
			<section className="mt-24 flex w-1/2 flex-col items-center gap-4">
				<h1 className="text-xl">Todos</h1>

				<ul className="flex w-full flex-col rounded-md border border-slate-600">
					<Suspense fallback={<TodoSkeleton />}>
						<TodoList />
					</Suspense>
				</ul>

				<form action={resetCompleted} className="flex self-start">
					<ResetCompletedButton />
				</form>
			</section>
		</main>
	);
}
