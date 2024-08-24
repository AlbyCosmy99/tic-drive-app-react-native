interface VehicleRegistrationOption {
    index: number;
    name: string;
    placeholder: string;
    inputLabel: string

}

const vehicleRegistrationOptions: VehicleRegistrationOption[] = [
    {
        index: 0,
        name: "Licence Plate",
        placeholder: "E.g. AA123BB",
        inputLabel: 'Plate number'
    },
    {
        index: 1,
        name: "Model",
        placeholder: "E.g. FIAT PANDA 1.2",
        inputLabel: 'Model'
    },
    {
        index: 2,
        name: "VIN",
        placeholder: "E.g. 1HGCM82633A123456",
        inputLabel: 'VIN'
    },
];

export default vehicleRegistrationOptions;
