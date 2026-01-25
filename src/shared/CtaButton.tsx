import { Link } from "react-router";

interface CtaProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
    url?: string;
    padX?: string;
    padY?: string;
    fontSize?: string;
    borderRadius?: string;
    outlined?: boolean;
    isBold?: boolean;
    fullSpace?: boolean;
    customStyle?: string | null;
    type?: "button" | "submit" | "reset";
}

export default function CtaButton({children, url, padX="8", padY="6", fontSize='16', borderRadius='8', outlined=false, isBold=true, fullSpace=false, customStyle=null, type="button", ...props}: CtaProps) {
    const button = 
    <button 
        {...props}
        style={{
            fontSize: `${fontSize}px`,
            borderRadius: `${borderRadius}px`,
            paddingLeft: `${padX}px`,
            paddingRight: `${padX}px`,
            paddingTop: `${padY}px`,
            paddingBottom: `${padY}px`,
        }}
        type={type}
        className={`
            ${customStyle ? `${customStyle}` : ''}
            ${isBold ? 'font-bold' : ''}
            ${fullSpace ? 'w-full' : ''} 
            ${outlined ? 'border-2 border-sakura bg-transparent text-txt-primary' : ''}
            cursor-pointer bg-btn-primary text-[#F4F4F4]`}>
        {children}
    </button>;

    return (
        url          
        ? <Link to={`${url}`}>
            {button}
        </Link>
        : button
    )
}