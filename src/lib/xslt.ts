export function transformXslt(xmlSource: string, xsltSource: string): string {
	const parser = new DOMParser();

	const xmlDoc = parser.parseFromString(xmlSource, "application/xml");
	const xmlError = xmlDoc.querySelector("parsererror");
	if (xmlError) {
		throw new Error(formatParserError("Input XML", xmlError));
	}

	const xsltDoc = parser.parseFromString(xsltSource, "application/xml");
	const xsltError = xsltDoc.querySelector("parsererror");
	if (xsltError) {
		throw new Error(formatParserError("XSLT", xsltError));
	}

	const processor = new XSLTProcessor();
	processor.importStylesheet(xsltDoc);

	const resultDoc = processor.transformToDocument(xmlDoc);
	if (!resultDoc) {
		throw new Error("Transformation produced no output");
	}

	const resultError = resultDoc.querySelector("parsererror");
	if (resultError) {
		throw new Error(formatParserError("Transform", resultError));
	}

	return new XMLSerializer().serializeToString(resultDoc);
}

function formatParserError(label: string, node: Element): string {
	const message = node.textContent?.replace(/\s+/g, " ").trim();
	return message ? `${label}: ${message}` : `${label}: parse error`;
}

export function downloadText(content: string, filename: string) {
	const blob = new Blob([content], { type: "application/xml;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = filename;
	anchor.click();
	URL.revokeObjectURL(url);
}
