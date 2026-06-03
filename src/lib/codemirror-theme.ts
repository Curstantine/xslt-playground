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
	}),
	syntaxHighlighting(syntaxClasses, { fallback: true }),
];
