
interface ButtonProps {
    label: string; 
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button = ({
    label,
    onClick,
}: ButtonProps) => {
    return ( 
        <div 
            //@ts-ignore
            onClick={onClick}
            className="
                bg-black 
                w-full
                flex
                items-center
                justify-center
                p-3 
                rounded-md 
                text-white 
                hover:opacity-55 
                text-md 
                font-md 
                cursor-pointer
            "

        >
            {label}
        </div>
     );
}
 
export default Button;