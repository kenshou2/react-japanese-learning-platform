import { useEffect, useMemo, useRef, useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import TableOfContents from "./components/TableOfContents";
import ArticleContent from "./components/ArticleContent";
import { useArticle } from "../../features/articles/hooks/useArticles";
import type { Article, Section } from "../../types/Article";
import { useLoaderData } from "react-router";

export default function Article() {
    const { articleId: articleIdStr } = useLoaderData() as { 
        articleId: string;        
    };
    
    const articleId = Number(articleIdStr);
    if (isNaN(articleId)) {
        return <div>Invalid article path</div>;
    }
    const {data: article, isLoading, isError} = useArticle(articleId);
    const [gridLayout, setGridLayout] = useState('250px 1fr');
    const isLargeScreen = useMediaQuery("(min-width: 640px)");
    const [contentsOpen, setContentsOpen] = useState(() => isLargeScreen ? true : false);
    const [currentSection, setCurrentSection] = useState<Section | null>(null);    

    const articleToC = useMemo(() => {
        if (!article) return null
        return getArticleToc(article.content)
    }, [article])

    useEffect(() => {
        if (!contentsOpen)
            setGridLayout('44px 1fr');
        else {
            setGridLayout('250px 1fr');
        }
    }, [contentsOpen]);

    const articleRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!articleRef.current || !articleToC) return;

        const headings = articleRef.current.querySelectorAll('h2');

        const observer = new IntersectionObserver(
            entries => {
                const visible = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

                if (visible.length > 0) {
                const id = visible[0].target.id
                const section = articleToC.find(s => s.id === id) ?? null
                setCurrentSection(section)
                }
            },
            {
                rootMargin: '-10% 0px -60% 0px',
                threshold: 0,
            }
        );

        headings.forEach(h => observer.observe(h));

        return () => observer.disconnect();
    }, [articleToC]);

    function getArticleToc(content: Article['content']): Section[] {
        return content
            .filter((b) => b.type === 'heading')
            .map(h => ({
                id: h.id,
                text: h.text,            
            }));
    }
    
    return (        
        <div 
            style={{gridTemplateColumns: gridLayout}} 
            className="grid gap-5 p-[5%] sm:gap-10 transition-[grid-template-columns] duration-300 ease-out">
            <TableOfContents 
                contents={articleToC ?? null} 
                isLoading={isLoading} 
                isError={isError} 
                isOpen={contentsOpen} 
                setIsOpen={setContentsOpen} 
                currentSection={currentSection}                
            />
            <div ref={articleRef}>
                <ArticleContent article={article ?? null} isLoading={isLoading} isError={isError} />
            </div>
        </div>
    )
}