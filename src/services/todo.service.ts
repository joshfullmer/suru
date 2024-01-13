'use server';

import { TodoList, TodoListSchema } from '@/schemas/todo.schema';
import { Result } from '@/types/helpers';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Because of the mock API, completed todos are not persisted
// This simulates the completed todos
let completedTodos: string[] = [];

export const getTodos = async (): Promise<Result<TodoList>> => {
	const response = await fetch(
		'https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/get',
		{
			method: 'GET',
			headers: {
				'X-Api-Key':
					'PMAK-65a2d3424d0cd25ba8be6f74-170a6d531bbf8e1919b601302d490766c6',
			},
		},
	);

	if (!response.ok) {
		return {
			ok: false,
			error: new Error(response.statusText),
		};
	}

	const body = await response.json();

	const parsedBody = TodoListSchema.safeParse(body);

	if (!parsedBody.success) {
		return {
			ok: false,
			error: parsedBody.error,
		};
	}

	// Add a todo list due in the future
	// For demonstrating sorting and overdue status
	const todoList = [
		...parsedBody.data,
		{
			id: '7',
			description: 'Write a book',
			isComplete: false,
			dueDate: '2025-10-10T00:00:00.000Z',
		},
	];

	const todoListWithCompleted = todoList.map((todo) => ({
		...todo,
		...(completedTodos.includes(todo.id) && { isComplete: true }),
	}));

	const sortedTodoList = todoListWithCompleted.toSorted((a, b) => {
		if (a.isComplete && !b.isComplete) {
			return 1;
		}

		if (!a.isComplete && b.isComplete) {
			return -1;
		}

		if (a.dueDate && b.dueDate) {
			return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
		}

		if (a.dueDate) {
			return -1;
		}

		if (b.dueDate) {
			return 1;
		}

		return 0;
	});

	return {
		ok: true,
		data: sortedTodoList,
	};
};

export async function completeTodo(formData: FormData): Promise<Result<void>> {
	const formEntries = Object.fromEntries(formData.entries());

	const parsedFormEntries = z
		.object({
			todoId: z.string(),
		})
		.safeParse(formEntries);

	if (!parsedFormEntries.success) {
		return {
			ok: false,
			error: new Error(parsedFormEntries.error.issues[0].message),
		};
	}

	const { todoId } = parsedFormEntries.data;

	const response = await fetch(
		`https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/patch/${todoId}`,
		{
			method: 'PATCH',
			headers: {
				'X-Api-Key':
					'PMAK-65a2d3424d0cd25ba8be6f74-170a6d531bbf8e1919b601302d490766c6',
			},
			body: JSON.stringify({
				isComplete: true,
			}),
		},
	);

	const body = await response.json();
	const parsedBody = z
		.object({
			status: z.string(),
		})
		.safeParse(body);

	if (response.status !== 200) {
		return {
			ok: false,
			error: new Error(response.statusText),
		};
	}

	if (!parsedBody.success) {
		return {
			ok: false,
			error: new Error(parsedBody.error.issues[0].message),
		};
	}

	if (parsedBody.data.status !== 'success') {
		return {
			ok: false,
			error: new Error(parsedBody.data.status),
		};
	}

	completedTodos.push(todoId);

	revalidatePath('/');

	return { ok: true, data: undefined };
}

export async function resetCompleted(): Promise<Result<void>> {
	completedTodos = [];

	revalidatePath('/');

	return { ok: true, data: undefined };
}
