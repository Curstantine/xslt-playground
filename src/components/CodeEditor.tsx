import CodeMirror from "@uiw/react-codemirror";
import { xml } from "@codemirror/lang-xml";
import { EditorView } from "@codemirror/view";
import type { Extension } from "@codemirror/state";

import { siteCodeMirrorTheme } from "@/lib/codemirror-theme";
import { cn } from "@/lib/utils";

const readOnlyExtension = EditorView.editable.of(false);

type CodeEditorProps = {
	value: string;
	onChange?: (value: string) => void;
	readOnly?: boolean;
	className?: string;
	"aria-label"?: string;
};

export function CodeEditor({
	value,
	onChange,
	readOnly = false,
	className,
	"aria-label": ariaLabel,
}: CodeEditorProps) {
	const extensions: Extension[] = [xml(), ...siteCodeMirrorTheme];
	if (readOnly) {
		extensions.push(readOnlyExtension);
	}

	return (
		<CodeMirror
			aria-label={ariaLabel}
			className={cn("h-full overflow-hidden text-[13px]", className)}
			value={value}
			height="100%"
			theme="none"
			extensions={extensions}
			onChange={readOnly ? undefined : onChange}
			basicSetup={{
				lineNumbers: true,
				foldGutter: true,
				highlightActiveLine: !readOnly,
				highlightActiveLineGutter: !readOnly,
				autocompletion: false,
				syntaxHighlighting: false,
			}}
		/>
	);
}
