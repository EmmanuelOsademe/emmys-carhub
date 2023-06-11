"use client";

import { CustomFilterProps, OptionProps } from "@/types";
import { useState, Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";
import { updateSearchParams } from "@/utils";

const CustomFilter: React.FC<CustomFilterProps> = ({title, options}) => {
    const [selected, setSelected] = useState<OptionProps>(options[0]);
    const router = useRouter();

    const handleUpdateParams = (e: OptionProps) => {

        const newPathname = updateSearchParams({
            title: e.title, value: e.value.toLowerCase()
        });
        router.push(newPathname);
    }

    return (
        <div className="w-fit">
            <Listbox
                value={selected}
                onChange={(e) => {
                    setSelected(e);
                    handleUpdateParams(e)
                }}
            >
                <div className="relative w-fit z-10">
                    <Listbox.Button 
                        className="custom-filter__btn"
                    >
                        <span className="block truncate">{selected.title}</span>
                        <Image 
                            src="/chevron-up-down.svg"
                            alt="chevron up down"
                            width={20}
                            height={20}
                            className="ml-4 object-contain"
                        />
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            className="custom-filter__options"
                        >
                            {options.map((option) => (
                                <Listbox.Option
                                    key={option.title}
                                    value={option}
                                    className={({active}) =>`relative cursor-default select-none px-2 py-4 ${active ? "bg-primary-blue text-white" : "text-gray-900"}`}
                                >
                                    {({selected}) => (
                                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                            {option.title}
                                        </span>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}



export default CustomFilter;