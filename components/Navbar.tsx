"use client"

import usePostModal from "@/hooks/usePostModal"
import Button from "./Button"
import useAuthorModal from "@/hooks/useAuthorModal"
import { useRouter } from "next/navigation"

export const Navbar = () => {
    const router = useRouter();
    const postModal = usePostModal()
    const authorModal = useAuthorModal()
    return (
        <div className="shadow-md h-[4.5rem] w-full fixed flex items-center pl-8 pr-8  justify-between z-10 bg-white">
            <div className="flex text-blue-600 cursor-pointer" onClick={() => {router.push('/')}}>
                <div className="font-bold text-2xl">Poeto</div> 
                <span className="font-light">&reg;</span>
            </div>
            
            <div className="flex items-center w-[22rem] justify-between gap-2">
                <div
                    className="bg-neutral-300 p-3 rounded-full hover:opacity-75 transition cursor-pointer"
                    onClick={() => {router.push('/authors')}}
                >
                    Authors
                </div>
                <div className="w-[30%]">
                    <Button 
                        label="Add Post"
                        onClick={postModal.onOpen}
                    />
                </div>
                <div className="w-[40%]">
                   <Button 
                        label="Add Author"
                        onClick={authorModal.onOpen}
                    /> 
                </div>
                
            </div>
        </div>
    )
}