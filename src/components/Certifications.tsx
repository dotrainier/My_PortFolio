import Image from "next/image"
import certificate1 from "@/assets/images/certifications/certificate1.png"
import certificate2 from "@/assets/images/certifications/certificate2.png"
import { CloudDownload } from "lucide-react"


export default function Certifications(){
    return (
    <div className="lg:px-32 md:px-20 sm:px-12 px-4  py-4 space-y-2 text-gray-700 dark:text-zinc-50 box-border">
        <div className="text-lg font-bold text-neutral-800 mb-8 dark:text-zinc-50 text-center">MY CERTIFICATIONS</div>
        
        <div className="flex justify-center flex-wrap gap-8 py-4">    
             <a  download="CS50X_Certificate.pdf"  href={"/pdf/CS50X.pdf"} target="_blank" >
                <div className="relative group shadow-md"> 
                    <Image 
                        src={certificate1} 
                        alt={"certicate1"} 
                        width={0}
                        height={0}
                        className="object-cover w-auto h-72" 
                        style={{ width: 'auto' }} 
                    />
                    <div className=" text-white flex justify-center items-center absolute bottom-0 inset-x-0 backdrop-blur-xs w-full opacity-0 h-0 group-hover:h-full group-hover:opacity-100 transition-all duration-200">
                            <button className="bg-amber-300  size-12 flex justify-center items-center box-border cursor-pointer rounded-md">
                                <CloudDownload />
                            </button>
                    </div>
                </div>
             </a>
             
              <a download="CS50P_Certificate.pdf"  href={"/pdf/CS50P.pdf"} target="_blank" >
                <div className="relative group shadow-md"> 
                    <Image 
                        src={certificate2} 
                        alt={"certicate2"} 
                        width={0}
                        height={0}
                        className="object-cover w-auto h-72" 
                        style={{ width: 'auto' }} 
                    />
                    <div className=" text-white flex justify-center items-center absolute bottom-0 inset-x-0 backdrop-blur-xs w-full opacity-0 h-0 group-hover:h-full group-hover:opacity-100 transition-all duration-200">
                        <button className="bg-amber-400  size-12 flex justify-center items-center box-border cursor-pointer rounded-md">
                            <CloudDownload />
                        </button>
                    </div>
                </div>
             </a>
        </div>
    </div>
    )
}