"use client";

import { useRouter } from "next/navigation";

import { ShowMoreProps } from "@/types";
import CustomButton from "./CustomButton";
import { updateSearchParams } from "@/utils";

const ShowMore: React.FC<ShowMoreProps> = ({pageNumber, isNext, setLimit}) => {

    const handleNavigation = () => {
        const newLimit = (pageNumber + 1) * 10;
        setLimit(newLimit)
    }
    console.log(pageNumber);

    return (
        <div className="w-full flex-center gap-5 mt-10">
            {!isNext && (
                <CustomButton 
                    title="Show More"
                    btnType="button"
                    containerStyles="bg-primary-blue rounded-full text-white"
                    handleClick={handleNavigation}
                />
            )}
        </div>
    )
}

export default ShowMore;