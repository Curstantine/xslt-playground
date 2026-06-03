import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { EditorView } from "@codemirror/view";

const syntaxClasses = HighlightStyle.define([
	{ tag: tags.comment, class: "cm-sh-comment" },
	{ tag: tags.meta, class: "cm-sh-meta" },
	{ tag: tags.processingInstruction, class: "cm-sh-meta" },
	{ tag: tags.tagName, class: "cm-sh-tag" },
	{ tag: tags.attributeName, class: "cm-sh-attr" },
	{ tag: tags.attributeValue, class: "cm-sh-string" },
	{ tag: tags.string, class: "cm-sh-string" },
	{ tag: tags.number, class: "cm-sh-number" },
	{ tag: tags.keyword, class: "cm-sh-keyword" },
	{ tag: tags.operator, class: "cm-sh-punctuation" },
	{
		tag: [tags.bracket, tags.angleBracket, tags.squareBracket, tags.paren, tags.separator],
		class: "cm-sh-punctuation",
	},
	{ tag: tags.invalid, class: "cm-sh-invalid" },
]);

export const siteCodeMirrorTheme = [
	EditorView.theme({
		"&": {
			height: "100%",
			backgroundColor: "transparent",
			color: "var(--foreground)",
		},
		"&.cm-focused": {
			outline: "none",
		},
		".cm-scroller": {
			fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
			lineHeight: "1.6",
			scrollbarWidth: "thin",
			scrollbarColor: "var(--scrollbar-thumb) var(--scrollbar-track)",
		},
		".cm-content": {
			padding: "12px 0",
			caretColor: "var(--foreground)",
		},
		".cm-line": {
			color: "var(--foreground)",
		},
		".cm-gutters": {
			backgroundColor: "var(--card)",
			borderRight: "1px solid var(--border)",
			color: "var(--muted-foreground)",
			zIndex: 2,
		},
		".cm-gutter": {
			backgroundColor: "var(--card)",
		},
		".cm-activeLineGutter": {
			backgroundColor: "color-mix(in oklch, var(--accent) 40%, var(--card))",
			color: "var(--foreground)",
		},
		".cm-activeLine": {
			backgroundColor: "color-mix(in oklch, var(--accent) 35%, transparent)",
		},
		".cm-selectionBackground, &.cm-focused .cm-selectionBackground": {
			backgroundColor: "color-mix(in oklch, var(--primary) 22%, transparent) !important",
		},
		".cm-cursor": {
			borderLeftColor: "var(--foreground)",
		},
		".cm-foldPlaceholder": {
			backgroundColor: "var(--muted)",
			border: "none",
			color: "var(--muted-foreground)",
		},
		".cm-matchingBracket, .cm-nonmatchingBracket": {
			backgroundColor: "color-mix(in oklch, var(--primary) 18%, transparent)",
			outline: "1px solid var(--border)",
		},
		".cm-sh-comment": { color: "var(--syntax-comment)" },
		".cm-sh-meta": { color: "var(--syntax-meta)" },
		".cm-sh-tag": { color: "var(--syntax-tag)" },
		".cm-sh-attr": { color: "var(--syntax-attr)" },
		".cm-sh-string": { color: "var(--syntax-string)" },
		".cm-sh-number": { color: "var(--syntax-number)" },
		".cm-sh-keyword": { color: "var(--syntax-keyword)" },
		".cm-sh-punctuation": { color: "var(--syntax-punctuation)" },
		".cm-sh-invalid": {
			color: "var(--destructive)",
			textDecoration: "underline wavy var(--destructive)",
		},

		// Search panel
		".cm-panels": {
			borderTop: "1px solid var(--border) !important",
			borderBottom: "none !important",
		},
		".cm-panel": {
			backgroundColor: "var(--card) !important",
			color: "var(--foreground) !important",
			padding: "4px 8px",
		},
		".cm-panel.cm-search": {
			fontSize: "13px",
		},
		".cm-panel.cm-search [name=close]": {
			color: "var(--muted-foreground) !important",
		},
		".cm-panel.cm-search label": {
			display: "inline-flex",
			alignItems: "center",
			gap: "4px",
			color: "var(--muted-foreground)",
			fontSize: "12px",
		},
		".cm-panel.cm-search input[type=checkbox]": {
			accentColor: "var(--primary)",
			margin: 0,
		},
		".cm-textfield": {
			backgroundColor: "var(--muted) !important",
			color: "var(--foreground) !important",
			border: "1px solid var(--border) !important",
			borderRadius: "4px",
			padding: "2px 6px",
			fontSize: "13px",
			outline: "none",
		},
		".cm-textfield:focus": {
			borderColor: "var(--ring) !important",
		},
		".cm-button": {
			backgroundColor: "var(--secondary) !important",
			color: "var(--secondary-foreground) !important",
			border: "1px solid var(--border) !important",
			borderRadius: "4px",
			padding: "1px 8px",
			fontSize: "12px",
			cursor: "pointer",
			backgroundImage: "none !important",
		},
		".cm-button:hover": {
			backgroundColor: "var(--accent) !important",
		},
		".cm-button:active": {
			backgroundColor: "var(--accent) !important",
		},
		".cm-close-button": {
			fontSize: "14px",
		},

		// Search match highlights
		".cm-searchMatch": {
			backgroundColor: "color-mix(in oklch, var(--primary) 30%, transparent)",
			outline: "1px solid color-mix(in oklch, var(--primary) 50%, transparent)",
		},
		".cm-searchMatch-selected": {
			backgroundColor: "color-mix(in oklch, var(--primary) 50%, transparent)",
			outline: "1px solid var(--primary)",
		},
	}),
	syntaxHighlighting(syntaxClasses, { fallback: true }),
];
