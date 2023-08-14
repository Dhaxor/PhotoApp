export const asset = (path: string) => {
	const assetUrl = import.meta.env.VITE_API_BASE_URL;
	return `${assetUrl}/storage/${path}`;
}