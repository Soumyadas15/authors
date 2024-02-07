import { Eye, Notebook, Star, User } from "lucide-react";
import { MdReviews } from "react-icons/md";

interface AuthorCardProps {
    firstName?: string;
    lastName?: string;
    posts?: string;
}

export const AuthorCard = ({
    firstName,
    lastName,
    posts,
}: AuthorCardProps) => {
    return (
        <div
            className="
                col-span-1
                cursor-pointer 
                group 
                shadow-md 
                dark:shadow-transparent
                bg-neutral-300
                p-3 
                rounded-lg
            "
        >
            <div className="w-full h-full flex flex-col gap-2 justify-between">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-1 font-bold">
                        <div><User/></div>
                        <div className="flex gap-2">
                            <div>{firstName}</div>
                            <div>{lastName}</div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-center justify-between p-5 gap-2">
                        <div className="font-bold text-7xl">
                            {posts}
                        </div>
                        <div>
                            Total posts
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
    )
}