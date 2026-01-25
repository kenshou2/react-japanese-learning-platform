export default function capitalizeText(text: string | undefined): string | undefined {
    if (!text) return text;
    const trimmed = text.trim();
    if (!trimmed) return "";
    
    return trimmed[0].toUpperCase() + trimmed.slice(1);
}
