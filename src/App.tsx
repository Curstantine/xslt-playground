import { useEffect, useEffectEvent, useState } from "react";
import { Code2 } from "lucide-react";

import { CodeEditor } from "@/components/CodeEditor";
import { EditorPanel, OutputPanel } from "@/components/EditorPanel";
import { defaultInputXml, defaultXslt } from "@/lib/samples";
import { downloadText, transformXslt } from "@/lib/xslt";

const TRANSFORM_DEBOUNCE_MS = 350;
const REPOSITORY_URL = "https://github.com/Curstantine/xslt-transformer";

export default function App() {
	const [inputXml, setInputXml] = useState(defaultInputXml);
	const [xslt, setXslt] = useState(defaultXslt);
	const [output, setOutput] = useState("");
	const [error, setError] = useState<string | null>(null);

	const runTransform = useEffectEvent(() => {
		try {
			setOutput(transformXslt(inputXml, xslt));
			setError(null);
		} catch (err) {
			setOutput("");
			setError(err instanceof Error ? err.message : "Transformation failed");
		}
	});

	useEffect(() => {
		const timer = window.setTimeout(runTransform, TRANSFORM_DEBOUNCE_MS);
		return () => window.clearTimeout(timer);
	}, [inputXml, xslt]);

	const handleDownload = () => {
		if (!output || error) return;
		downloadText(output, "transform-output.xml");
	};

	const handleCopy = () => {
		if (!output || error) return;
		navigator.clipboard.writeText(output);
	};

	return (
		<div className="flex h-svh flex-col bg-background text-foreground">
			<header className="flex shrink-0 items-center border-b border-border px-5 py-2 gap-5">
				<div className="flex-1">
					<h1 className="text-lg font-semibold tracking-tight">XSLT Transformer</h1>
					<p className="text-xs font-medium uppercase text-muted-foreground">
						Playground
					</p>
				</div>
				<p className="hidden text-xs text-muted-foreground sm:block">
					Browser-native XSLT 1.0 via{" "}
					<code className="rounded bg-muted px-1.5 py-0.5 font-mono">XSLTProcessor</code>
				</p>
				<a
					href={REPOSITORY_URL}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="GitHub repository"
				>
					<Code2 />
				</a>
			</header>

			<main className="flex min-h-0 flex-1 flex-col gap-3 p-3">
				<div className="contents sm:flex min-h-0 flex-1 gap-3">
					<EditorPanel title="Input XML" description="Source document">
						<CodeEditor
							value={inputXml}
							onChange={setInputXml}
							aria-label="Input XML editor"
						/>
					</EditorPanel>

					<EditorPanel title="XSLT Stylesheet" description="Transformation rules">
						<CodeEditor
							value={xslt}
							onChange={setXslt}
							aria-label="XSLT stylesheet editor"
						/>
					</EditorPanel>
				</div>

				<OutputPanel
					output={output}
					error={error}
					onDownload={handleDownload}
					onCopy={handleCopy}
				/>
			</main>
		</div>
	);
}
