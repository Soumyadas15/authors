import { Delete, Eye, Notebook, Star, Trash, User } from "lucide-react";
import { MdReviews } from "react-icons/md";

interface PostCardProps {
    id: number;
    author?: string;
    body?: string;
    reviews?: string;
    views?: string;
    onDelete: (id: number) => void;
}

export const PostCard = ({
    id,
    author,
    body,
    reviews,
    views,
    onDelete
}: PostCardProps) => {
    return (
        <div
            className="
                col-span-1
                cursor-default 
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
                    <div className="flex items-center justify-between w-full">
                        <div className="flex gap-1 font-bold">
                            <div><User/></div>
                            <div>{author}</div>
                        </div>
                        <div>
                            <Trash 
                                className="
                                    text-red-600 
                                    cursor-pointer 
                                    hover:opacity-50 
                                    transition
                                "
                                onClick={() => onDelete(id)}
                            />
                        </div>
                    </div>
                    <div className="">
                        {body}
                    </div>
                </div>
                <div className="w-full flex items-center justify-between pt-5">
                    <div className="flex gap-1 opacity-30">
                        <div><Eye/></div>
                        <div>{views}</div>
                    </div>
                    <div className="flex gap-1 opacity-30">
                        <div><Star/></div>
                        <div>{reviews}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}