import marked from "marked";
import markedForms from "marked-forms";

(marked as any).use(markedForms());

export function parseMarkdown(markdownDocument: string) {
  return marked(markdownDocument);
}
