'use client';

import { cn } from '@/utils/cn.util';
import { useFormStatus } from 'react-dom';
import { AiOutlineLoading } from 'react-icons/ai';

export function ResetCompletedButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			className="relative rounded-md border border-slate-600 px-4 py-3 focus-within:bg-slate-600 hover:bg-slate-600 focus:outline-none"
		>
			<span className={cn(pending && 'invisible')}>Reset</span>
			{pending && (
				<span className="absolute inset-0 flex items-center justify-center">
					<AiOutlineLoading className="animate-spin" />
				</span>
			)}
		</button>
	);
}
