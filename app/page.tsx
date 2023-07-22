"use client"

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import {  HomeProps } from "@/types";
import { fetchCars } from "@/utils";

const Home: React.FC<HomeProps> = async ({searchParams}) => {
    const allCars = await fetchCars({
        manufacturer:searchParams.manufacturer || "",
        model: searchParams.model || "",
        year: searchParams.year || 2022,
        limit: searchParams.limit || 10,
        fuel: searchParams.fuel || ""
    });

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
                    <SearchBar />
                    <div className="home__filter-container">
                        <CustomFilter title="fuel" options={fuels}/>
                        <CustomFilter title="year" options={yearsOfProduction}/>
                    </div>
                </div>

                {!isDataEmpty ? (
                    <section>
                        <div className="home__cars-wrapper">
                            {allCars?.map((car, index) => (
                                <CarCard 
                                    key={index}
                                    car={car}
                                />
                            ))}
                        </div>
                        <ShowMore 
                            pageNumber={(searchParams.limit || 10)/10}
                            isNext={(searchParams.limit || 10) > allCars.length}
                        />
                    </section>
                ) : (
                    <div>
                        <h2 className="text-black text-xl font-bold">Oops, no results</h2>
                        <p>{allCars?.message}</p>
                    </div>
                )}

            </div>
        </main>
    )
}
export default Home;