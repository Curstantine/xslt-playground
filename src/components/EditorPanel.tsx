import { Download } from "lucide-react";
import type { ReactNode } from "react";

import { CodeEditor } from "@/components/CodeEditor";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type EditorPanelProps = {
	title: string;
	description?: string;
	actions?: ReactNode;
	children: ReactNode;
	className?: string;
};

export function EditorPanel({
	title,
	description,
	actions,
	children,
	className,
}: EditorPanelProps) {
	return (
		<section
			className={cn(
				"flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-card",
				className,
			)}
		>
			<header className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-4 py-2.5">
				<div className="min-w-0">
					<h2 className="truncate text-sm font-medium tracking-tight">{title}</h2>
					{description ? (
						<p className="truncate text-xs text-muted-foreground">{description}</p>
					) : null}
				</div>
				{actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
			</header>
			<div className="min-h-0 flex-1">{children}</div>
		</section>
	);
}

type OutputPanelProps = {
	output: string;
	error: string | null;
	onDownload: () => void;
};

export function OutputPanel({ output, error, onDownload }: OutputPanelProps) {
	const hasOutput = output.length > 0;

	return (
		<EditorPanel
			title="Output"
			description={
				error
					? "Transformation failed"
					: hasOutput
						? "Transformation result"
						: "Waiting for input"
			}
			className="min-h-[220px] flex-none basis-[38%]"
			actions={
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={onDownload}
					disabled={!hasOutput || Boolean(error)}
				>
					<Download />
					Download
				</Button>
			}
		>
			{error ? (
				<div className="h-full overflow-auto p-4">
					<pre className="whitespace-pre-wrap font-mono text-sm text-destructive">
						{error}
					</pre>
				</div>
			) : (
				<CodeEditor value={output} readOnly aria-label="Transformation output" />
			)}
		</EditorPanel>
	);
}
