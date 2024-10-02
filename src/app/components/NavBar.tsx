import Image from "next/image";
import Logo from "../lib/images/carepod.png";

export default function NavBar() {
    return (
        <div className="flex flex-row gap-4 w-full md:w-[50vw] min-h-[100px] max-h-[100px] pt-12 z-[99999]">
            <div>
                <Image src={Logo} alt="Logo" height={45} width={45} />
            </div>
            <h1 className="text-white text-2xl font-bold logo-font">Care<span>Pod</span></h1>

        </div>
    );
}