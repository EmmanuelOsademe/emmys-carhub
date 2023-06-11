"use client";

import { useState } from "react";
import {SearchManufacturer} from "./";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchBarProps{
    setManufacturer: (manufacturer:  string) => void;
    setModel: (model: string) => void;
}

const SearchBar: React.FC = () => {
    const [manufacturer, setManufacturer] = useState<string>("");
    const [model, setModel] = useState<string>("");

    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(manufacturer === " " || model === " "){
            return alert("Please fill in the search bar")
        }

        updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
    }
    console.log(manufacturer, model)

    const updateSearchParams = (model: string, manufacturer: string) => {
        const searchParams = new URLSearchParams(window.location.search);

        if(model){
            searchParams.set('model', model);
        }else{
            searchParams.delete("model");
        }

        if(manufacturer){
            searchParams.set('manufacturer', manufacturer);
        }else{
            searchParams.delete("manufacturer");
        }

        const newPathname = `${window.location.pathname}?${searchParams.toString()}`
        router.push(newPathname);
    }

    return (
        <form className="searchbar" onSubmit={handleSearch}>
            <div className="searchbar__item">
                <SearchManufacturer 
                    manufacturer={manufacturer}
                    setManufacturer={setManufacturer}
                />
                <SearchButton 
                    otherClasses="sm:hidden"
                />
            </div>
            <div className="searchbar__item">
                <Image 
                    src="/model-icon.png"
                    width={25}
                    height={25}
                    alt="car model"
                    className="absolute w-[20px] h-[20px] ml-4"
                />
                <input 
                    type="text"
                    name="model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Tiguan"
                    className="searchbar__input"
                />
                <SearchButton otherClasses="sm:hidden" />
            </div>
            <SearchButton otherClasses="max-sm:hidden"/>
        </form>
    )
}

interface SearchButtonProp {
    otherClasses: string;
}

const SearchButton: React.FC<SearchButtonProp> = ({otherClasses}) => {

    return (
        <button
            type="submit"
            className={`-ml-3 z-10 ${otherClasses}`}
        >
            <Image 
                src="/magnifying-glass.svg"
                alt="magnifying glass"
                width={40}
                height={40}
                className="object-contain"
            />
        </button>
    )
}

export default SearchBar;


// Client Side


// const SearchBar: React.FC<SearchBarProps> = ({setManufacturer, setModel}) => {
//     const [searchManufacturer, setSearchManufacturer] = useState<string>("");
//     const [searchModel, setSearchModel] = useState<string>("");

//     const router = useRouter();

//     const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         if(searchManufacturer === " " || searchModel === " "){
//             return alert("Please fill in the search bar")
//         }

//         setModel(searchModel)
//         setManufacturer(searchManufacturer)
//     }

//     return (
//         <form className="searchbar" onSubmit={handleSearch}>
//             <div className="searchbar__item">
//                 <SearchManufacturer 
//                     selected={searchManufacturer}
//                     setSelected={setSearchManufacturer}
//                 />
//                 <SearchButton 
//                     otherClasses="sm:hidden"
//                 />
//             </div>
//             <div className="searchbar__item">
//                 <Image 
//                     src="/model-icon.png"
//                     width={25}
//                     height={25}
//                     alt="car model"
//                     className="absolute w-[20px] h-[20px] ml-4"
//                 />
//                 <input 
//                     type="text"
//                     name="model"
//                     value={searchModel}
//                     onChange={(e) => setSearchModel(e.target.value)}
//                     placeholder="Tiguan"
//                     className="searchbar__input"
//                 />
//                 <SearchButton otherClasses="sm:hidden" />
//             </div>
//             <SearchButton otherClasses="max-sm:hidden"/>
//         </form>
//     )
// }

// interface SearchButtonProp {
//     otherClasses: string;
// }

// const SearchButton: React.FC<SearchButtonProp> = ({otherClasses}) => {

//     return (
//         <button
//             type="submit"
//             className={`-ml-3 z-10 ${otherClasses}`}
//         >
//             <Image 
//                 src="/magnifying-glass.svg"
//                 alt="magnifying glass"
//                 width={40}
//                 height={40}
//                 className="object-contain"
//             />
//         </button>
//     )
// }