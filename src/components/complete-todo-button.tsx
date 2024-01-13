'use client';

import { Todo } from '@/schemas/todo.schema';
import { useFormStatus } from 'react-dom';
import { AiOutlineLoading } from 'react-icons/ai';
import { HiCheck } from 'react-icons/hi';

export function CompleteTodoButton({ todo }: { todo: Todo }) {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			aria-disabled={todo.isComplete}
			aria-label="Mark todo as complete"
			className="rounded-md border border-slate-600 p-3 transition-colors focus-within:bg-slate-600 hover:bg-slate-600 focus:outline-none aria-disabled:pointer-events-none"
		>
			<input type="hidden" name="todoId" value={todo.id} />
			{pending ? (
				<AiOutlineLoading className="animate-spin" />
			) : todo.isComplete ? (
				<HiCheck />
			) : (
				<div className="h-4 w-4" />
			)}
		</button>
	);
}
