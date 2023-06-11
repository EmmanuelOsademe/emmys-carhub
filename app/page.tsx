"use client"

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import {  CarProps, FilterProps, HomeProps } from "@/types";
import { fetchCars } from "@/utils";
import { useEffect, useState } from "react";
import Image from "next/image";

const Home: React.FC<HomeProps> = ({searchParams}) => {
    const [allCars, setAllCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Search States
    const [manufacturer, setManufacturer] = useState<string>("");
    const [model, setModel] = useState<string>("");

    // Filter States
    const [fuel, setFuel] = useState<string>("");
    const [year, setYear] = useState<number>(2022);
    const [limit, setLimit] = useState<number>(10);

    useEffect(() => {
        const getCars = async () => {
            setLoading(true)
            try {
                const cars = await fetchCars({
                    manufacturer: manufacturer || "",
                    model: model || "",
                    fuel: fuel || "",
                    limit, 
                    year
                })
                setAllCars(cars);
            } catch (e: any) {
                console.log(e.message);
            }finally{
                setLoading(false);
            }
        }

        getCars()
    }, [fuel, limit, manufacturer, model, year])


    const isDataEmpty = !allCars || !Array.isArray(allCars) || allCars.length < 1;

    return (
        <main className="overflow-hidden">
            <Hero />
            <div className="mt-12 padding-x padding-y max-width" id="discover">
                <div className="home__text-container">
                    <h1 className="text-4xl font-extrabold">
                        Car Catalogue
                    </h1>
                    <p className="">
                        Explore the cars you might like
                    </p>
                </div>
                <div className="home__filters">
                    <SearchBar 
                        setManufacturer = {setManufacturer}
                        setModel={setModel}
                    />
                    <div className="home__filter-container">
                        <CustomFilter title="fuel" options={fuels} setFilter={setFuel}/>
                        <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear}/>
                    </div>
                </div>

                {allCars.length > 0 ? (
                    <section>
                        <div className="home__cars-wrapper">
                            {allCars?.map((car, index) => (
                                <CarCard 
                                    key={index}
                                    car={car}
                                />
                            ))}
                        </div>
                        {loading && (
                            <div className="mt-16 w-full flex-center">
                                <Image 
                                   src="/loader.svg"
                                   alt="loader" 
                                   width={50}
                                   height={50}
                                   className="object-contain"
                                />
                            </div>
                        )}
                        <ShowMore 
                            pageNumber={(limit)/10}
                            isNext={limit > allCars.length}
                            setLimit={setLimit}
                        />
                    </section>
                ) : (
                    <div>
                        <h2 className="text-black text-xl font-bold">Oops, no results</h2>
                        <p></p>
                    </div>
                )}

            </div>
        </main>
    )
}

export default Home;