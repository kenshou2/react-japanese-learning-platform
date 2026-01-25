export interface NavMenuSection {
    id: number;
    heading: string;
    links: {name: string; url: string;}[];
    url: string;
    expanded: boolean;
}