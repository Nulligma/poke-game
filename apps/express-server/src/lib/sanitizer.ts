export function sanitizeSlug(input: string): string {
	return input.replace(/\s+/g, "-").toLowerCase().substring(0, 10);
}
