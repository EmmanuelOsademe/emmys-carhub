"use client";

import { useState } from "react";
import {SearchManufacturer} from "./";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchBarProps{
    setManufacturer: (manufacturer:  string) => void;
    setModel: (model: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({setManufacturer, setModel}) => {
    const [searchManufacturer, setSearchManufacturer] = useState<string>("");
    const [searchModel, setSearchModel] = useState<string>("");

    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(searchManufacturer === " " || searchModel === " "){
            return alert("Please fill in the search bar")
        }

        setModel(searchModel)
        setManufacturer(searchManufacturer)
    }

    return (
        <form className="searchbar" onSubmit={handleSearch}>
            <div className="searchbar__item">
                <SearchManufacturer 
                    selected={searchManufacturer}
                    setSelected={setSearchManufacturer}
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
                    value={searchModel}
                    onChange={(e) => setSearchModel(e.target.value)}
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