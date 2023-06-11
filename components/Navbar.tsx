
import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";

const Navbar: React.FC = () => {

    return (
        <header className="w-full absolute z-10">
            <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4">
                <Link href="/" className="flex justify-end items-center">
                    <Image 
                        src="/logo.svg"
                        alt="Emmy's Car hub logo"
                        width={118}
                        height={118}
                        className="object-contain"
                    />
                </Link>
                <CustomButton 
                    title="Sign In"
                    btnType="button"
                    containerStyles="text-primary-blue rounded-full bg-white p-2 main-w-[113px]"
                />
            </nav>
        </header>
    )
}

export default Navbar;