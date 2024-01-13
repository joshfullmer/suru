export function TodoSkeleton() {
	return (
		<div className="flex flex-col">
			{Array.from({ length: 6 }).map((_, i) => (
				<div
					key={i}
					className="flex items-center justify-between border-b border-slate-600 p-4 last:border-b-0"
				>
					<div className="flex w-full flex-col gap-1">
						<div className="h-6 w-1/4 animate-pulse rounded-md bg-slate-500" />

						<div className="h-5 w-1/5 animate-pulse rounded-md bg-slate-500" />
					</div>

					<div className="h-11 w-11 animate-pulse rounded-md bg-slate-500" />
				</div>
			))}
		</div>
	);
}
