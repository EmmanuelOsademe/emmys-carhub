"use client";

import { useRouter } from "next/navigation";

import { ShowMoreProps } from "@/types";
import CustomButton from "./CustomButton";
import { updateSearchParams } from "@/utils";

const ShowMore: React.FC<ShowMoreProps> = ({pageNumber, isNext}) => {
    const router = useRouter();

    const handleNavigation = () => {
        const newLimit = (pageNumber + 1) * 10;
        const newPathname = updateSearchParams({title: "limit", value: `${newLimit}`});
        router.push(newPathname);
    }

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

// CLIENT side rendering


// const ShowMore: React.FC<ShowMoreProps> = ({pageNumber, isNext, setLimit}) => {
//     // const router = useRouter();

//     const handleNavigation = () => {
//         const newLimit = (pageNumber + 1) * 10;
//         setLimit(newLimit)
//     }
//     console.log(pageNumber);

//     return (
//         <div className="w-full flex-center gap-5 mt-10">
//             {!isNext && (
//                 <CustomButton 
//                     title="Show More"
//                     btnType="button"
//                     containerStyles="bg-primary-blue rounded-full text-white"
//                     handleClick={handleNavigation}
//                 />
//             )}
//         </div>
//     )
// }