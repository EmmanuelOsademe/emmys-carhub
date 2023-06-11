import { CarProps, FilterProps, OptionProps } from "@/types";

const formatCurrency = (amount: number, currency?: "USD" | "EUR" | "GBP"): string => {
    let formatter: Intl.NumberFormat;

    if(currency){
        formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        })
    }else{
        formatter = new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        })
    }

    return formatter.format(amount).toString();
}

export const calculateCarRent = (city_mpg: number, year: number): string => {
    const basePricePerDay = 50; // Base rental per day in dollar
    const mileageFactor = 0.1; // Additional rate per mile
    const ageFactor = 0.05; //Additional rate per year of vehicle age

    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    // Calculate total rent rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return formatCurrency(rentalRatePerDay);
}

export const fetchCars = async (filters: FilterProps) => {
    const {manufacturer, model, fuel, limit, year} = filters;
    
    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}&year=${year}&fuel_type=${fuel}&limit=${limit}`;
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9d200b653bmsh01ae9777e02c459p188c24jsn9e1dab0421f7',
            'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
        }
    }

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (e: any) {
        console.log(e.message);
    }
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const key = "ngcyphercrescent";

    const url = new URL(`https://cdn.imagin.studio/getimage`);
    const {make, year, model} = car;

    url.searchParams.append('customer', key);
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomtype', "fullscreen");
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle}`);

    return `${url}`;
}

export const updateSearchParams = (option: OptionProps) => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set(option.title, option.value);

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`
    return newPathname;
}