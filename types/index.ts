import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    textStyles?: string;
    rightIcon?: string;
    isDisabled?: boolean;
    btnType?: "button" | "submit";
    handleClick?: MouseEventHandler<HTMLButtonElement>
}

export interface CustomFilterProps {
    title: string;
    options: OptionProps[];
}
export interface OptionProps {
    title: string;
    value: string;
}

export interface SearchManufacturerProps {
    manufacturer: string;
    setManufacturer: (manufacturer: string) => void;
}

export interface CarProps {
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;
    displacement: number;
    drive: string;
    fuel_type: "gas" | "diesel" | "electricity";
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
}

export interface FilterProps {
    manufacturer: string;
    model: string;
    fuel: string;
    year: number;
    limit: number;
}

export interface HomeProps {
    searchParams: FilterProps;
}

export interface ShowMoreProps {
    pageNumber: number;
    isNext: boolean;
}