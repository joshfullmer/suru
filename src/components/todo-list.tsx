import { completeTodo, getTodos as getTodoList } from '@/services/todo.service';
import { cn } from '@/utils/cn.util';
import { formatDate } from '@/utils/date.util';
import { CompleteTodoButton } from './complete-todo-button';

export async function TodoList() {
	const todoListResult = await getTodoList();

	if (!todoListResult.ok) return null;

	return todoListResult.data.map((todo) => (
		<li key={todo.id} className="border-b border-b-slate-600 last:border-b-0">
			<div
				className={cn(
					'flex items-center justify-between p-4 transition-colors focus-within:bg-slate-700 hover:bg-slate-700',
					todo.isComplete && 'opacity-40',
				)}
			>
				<div className="flex flex-col gap-1">
					<span>{todo.description}</span>

					{todo.dueDate && (
						<span
							className={cn(
								'text-sm text-slate-400',
								new Date(todo.dueDate) < new Date() &&
									!todo.isComplete &&
									'text-red-500',
							)}
						>
							Due date: {formatDate(todo.dueDate)}
						</span>
					)}
				</div>

				<form action={completeTodo}>
					<CompleteTodoButton todo={todo} />
				</form>
			</div>
		</li>
	));
}
