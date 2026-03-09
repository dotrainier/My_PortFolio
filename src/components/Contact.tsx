import { MoveUpRight } from "lucide-react"
import { useState } from "react"

export default function Contact(){
    const [copyText, setCopyText] = useState<string>("Copy");
    const copyValue = "rainiersapin0131@gmail.com";

    const handleCopy = () => {

    navigator.clipboard.writeText(copyValue)
        .then(() => {
            setCopyText("Copied");
            console.log("Text copied to clipboard");


            setTimeout(() => {
                setCopyText("Copy");
            }, 2000);
        })
        .catch(err => {
            console.error("Failed to copy text: ", err);
        });
    };

    return (
        <div className="2xl:px-32  lg:px-16 md:px-16 sm:px-10 px-4  py-4 space-y-2 text-gray-700 dark:text-zinc-50 box-border md:mt-28 mt-12 lg:mt-40 pt-8 pb-4  font-nunito_sans">
            <div className="flex justify-between">
                <div>
                    <div className="md:text-xl sm:text-lg text-base font-nunito_sans text-shadow-neutral-800 font-semibold">Get In Touch</div>
                    <div className="group relative">
                        rainiersapin0131@gmail.com
                        <div onClick={handleCopy} className="absolute opacity-0  cursor-pointer group-hover:opacity-100 transition-all duration-300 top-3/4 -translate-y-1/2 font-semibold bg-gray-300 text-shadow-neutral-800 rounded-md w-full px-4 py-1">{copyText}</div>
                    </div>
                </div>
                <div className="md:font-medium text-sm md:text-base space-y-0.5">
                    <a href="https://www.facebook.com/rxxx31/" target="_blank" className="flex gap-0.5 ">Facebook <MoveUpRight strokeWidth={2} size={16}/></a>
                    <a  href="https://www.linkedin.com/in/rainier-sapin-69858a284/"  target="_blank" className="flex gap-0.5 ">Linkedin <MoveUpRight strokeWidth={2} size={16}/></a>
                    <a href="https://github.com/dotrainier"  target="_blank" className="flex gap-0.5 ">Github <MoveUpRight strokeWidth={2} size={16}/></a>
                </div>
            </div>

            <div className="flex font-medium text-xs md:text-sm justify-between items-center">
                <div > &copy; {new Date().getFullYear()} <span>Rainier Sapin</span>  </div>
                <div>Pampanga, Philippines</div>
            </div>
        </div>
    )
}