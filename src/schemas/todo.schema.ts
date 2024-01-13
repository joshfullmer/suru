import { z } from 'zod';

export const TodoSchema = z.object({
	id: z.string(),
	description: z.string(),
	isComplete: z.boolean(),
	dueDate: z.string().datetime().nullable(),
});
export type Todo = z.infer<typeof TodoSchema>;

export const TodoListSchema = z.array(TodoSchema);
export type TodoList = z.infer<typeof TodoListSchema>;
