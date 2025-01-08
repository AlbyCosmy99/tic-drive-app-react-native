import TicDriveTextOrInput from "@/components/ui/inputs/TicDriveTextOrInput";
import CarContext from "@/stateManagement/contexts/car/CarContext";
import Car, { FuelType } from "@/types/Car";
import React, { useContext, useEffect } from "react";

interface CarDetailsByMakeAndModelProps {
    carSelected: Car;
}

const CarDetailsByMakeAndModel: React.FC<CarDetailsByMakeAndModelProps> = ({ carSelected }) => {
    const { carSelectedByMakeAndModel, setCarSelectedByMakeAndModel } = useContext(CarContext);

    useEffect(() => {
        if(setCarSelectedByMakeAndModel) {
            setCarSelectedByMakeAndModel(carSelected);
        }
    }, []);

    useEffect(() => {
        console.log(carSelectedByMakeAndModel)
    }, [carSelectedByMakeAndModel])

    const updateCarField = (field: Partial<Car>) => {
        if(setCarSelectedByMakeAndModel) {
            //@ts-ignore
            setCarSelectedByMakeAndModel({
                ...carSelectedByMakeAndModel,
                ...field,
            });
        }
    };

    const setCarYear = (year: number) => {
        if (year >= 1886 && year <= new Date().getFullYear()) {
            updateCarField({ year });
        } else {
            console.error("Invalid year");
        }
    };

    const setCarEngineDisplacement = (engineDisplacement: string) => {
        updateCarField({ engineDisplacement });
    };

    const setCarPlateNumber = (plateNumber: string) => {
        updateCarField({ plateNumber });
    };

    const setCarFuelType = (fuel: FuelType) => {
        updateCarField({ fuel });
    };

    const setCarMileage = (mileage: number) => {
        updateCarField({ mileage });
    };

    return (
        <>
            <TicDriveTextOrInput
                title="Year"
                placeholder="Insert car year"
                value={carSelected?.year}
                setValue={setCarYear}
            />
            <TicDriveTextOrInput
                title="Plate number"
                placeholder="Insert plate"
                value={carSelected?.plateNumber}
                setValue={setCarPlateNumber}
            />
            <TicDriveTextOrInput
                title="Engine displacement"
                placeholder="Insert displacement"
                value={carSelected?.engineDisplacement}
                setValue={setCarEngineDisplacement}
            />
            <TicDriveTextOrInput
                title="Fuel"
                placeholder="Insert fuel type"
                value={carSelected?.fuel}
                setValue={setCarFuelType}
            />
            <TicDriveTextOrInput
                title="Mileage"
                placeholder="Insert mileage"
                value={carSelected?.mileage}
                setValue={setCarMileage}
            />
        </>
    );
};

export default CarDetailsByMakeAndModel;
