import { useEffect, useEffectEvent, useState } from "react";

import { CodeEditor } from "@/components/CodeEditor";
import { EditorPanel, OutputPanel } from "@/components/EditorPanel";
import { defaultInputXml, defaultXslt } from "@/lib/samples";
import { downloadText, transformXslt } from "@/lib/xslt";

const TRANSFORM_DEBOUNCE_MS = 350;

function App() {
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

	return (
		<div className="flex h-svh flex-col bg-background text-foreground">
			<header className="flex shrink-0 items-center justify-between border-b border-border px-5 py-3">
				<div>
					<p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
						Playground
					</p>
					<h1 className="text-lg font-semibold tracking-tight">XSLT Transformer</h1>
				</div>
				<p className="hidden text-xs text-muted-foreground sm:block">
					Browser-native XSLT 1.0 via{" "}
					<code className="rounded bg-muted px-1.5 py-0.5 font-mono">XSLTProcessor</code>
				</p>
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

				<OutputPanel output={output} error={error} onDownload={handleDownload} />
			</main>
		</div>
	);
}

export default App;
