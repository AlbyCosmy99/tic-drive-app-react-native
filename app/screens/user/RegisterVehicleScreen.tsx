import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {Colors} from '@/constants/Colors';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import {useContext, useEffect, useMemo, useState} from 'react';
import options from '../../../constants/VehicleRegistrationOptions';
import ToPreviousPage from '@/components/navigation/ToPreviousPage';
import SegmentedControlSelection from '@/types/SegmentedControlSelection';
import Car from '@/types/Car';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveDropdown from '@/components/ui/dropdowns/TicDriveDropdown';
import TicDriveDropdownData from '@/types/ui/dropdown/TicDriveDropdownData';
import getCarModelsByCarMakeId from '@/services/http/requests/cars/getCarModelsByCarMakeId';
import CarDetailsByMakeAndModel from '@/components/cars/registration/CarDetailsByMakeAndModel';
import CarContext from '@/stateManagement/contexts/car/CarContext';
import BoldTitle1 from '@/components/ui/text/BoldTitle1';
import {useRoute} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import isPlateNumber from '@/utils/car/isPlateNumber';
import CarDetailsByPlate from '@/components/cars/registration/CarDetailsByPlate';
import CarConfirmationDetails from '@/components/cars/registration/CarConfirmationDetails';
import navigationPush from '@/services/navigation/push';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import useCustomerCars from '@/hooks/api/cars/useCustomerCars';
import navigationReset from '@/services/navigation/reset';
import {t} from 'i18next';
import CarMake from '@/types/cars/CarMake';
import getCarsMakes from '@/services/http/requests/cars/getCarsMakes';
import useGlobalErrors from '@/hooks/errors/useGlobalErrors';
import {setCar} from '@/stateManagement/redux/slices/bookingSlice';

function RegisterVehicleScreen() {
  const [segmentedControlSelection, setSegmentedControlSelection] =
    useState<SegmentedControlSelection | null>(options[0]);
  const [carSelectedByPlate, setCarSelectedByPlate] = useState<Car | undefined>(
    undefined,
  );
  const [loadingCarModels, setLoadingCarModels] = useState(false);
  const [models, setModels] = useState<Array<Car>>([]);
  const [isPlateError, setIsPlateError] = useState(false);
  const [errorYear, setErrorYear] = useState(false);
  const [makeAndModelConfirmation, setMakeAndModelConfirmation] =
    useState(false);
  const [plateConfirmation, setPlateConfirmation] = useState(false);

  const [carMakeDropdownData, setCarMakeDropdownData] = useState<
    TicDriveDropdownData | undefined
  >(undefined);
  const [carModelDropdownData, setCarModelDropdownData] = useState<
    TicDriveDropdownData | undefined
  >(undefined);

  const {
    carSelectedByMakeAndModel,
    setCarSelectedByMakeAndModel,
    carSelectedByPlate: carSelectedByPlateCtx,
    setCarSelectedByPlate: setCarSelectedByPlateCtx,
  } = useContext(CarContext);

  const dispatch = useAppDispatch();

  const selectedWorkshop = useAppSelector(state => state.booking.workshop);

  const token = useAppSelector(state => state.auth.token);
  const {setErrorMessage} = useGlobalErrors();

  const route = useRoute();
  const {goToVehicles} = route.params as {
    carSelected?: Car;
    goToVehicles: boolean;
  };

  const navigation = useTicDriveNavigation();

  const {registerCustomerCar, loadingCustomerCars} = useCustomerCars();
  const [makes, setMakes] = useState<CarMake[]>([]);
  const [loadingCarsMakes, setLoadingCarsMakes] = useState(true);

  useEffect(() => {
    const fetchCarsMakes = async () => {
      try {
        setLoadingCarsMakes(true);
        const data = await getCarsMakes();
        setMakes(data);
      } catch (e) {
        setErrorMessage('Errore durante il caricamento delle marche.');
      } finally {
        setLoadingCarsMakes(false);
      }
    };
    fetchCarsMakes();
  }, []);

  const routeName = useMemo(() => {
    if (
      (segmentedControlSelection?.index === 0 &&
        carSelectedByMakeAndModel &&
        makeAndModelConfirmation) ||
      (segmentedControlSelection?.index === 1 &&
        carSelectedByPlateCtx &&
        plateConfirmation)
    ) {
      if (goToVehicles) {
        return 'CarRegistrationSuccessScreen';
      } else {
        if (selectedWorkshop) {
          return `${token ? 'ReviewBookingDetailsScreen' : 'UserAuthenticationScreen'}`;
        }
        return 'WorkshopsListScreen';
      }
    }
    return '';
  }, [
    carSelectedByMakeAndModel,
    makeAndModelConfirmation,
    carSelectedByPlateCtx,
    plateConfirmation,
    selectedWorkshop,
  ]);

  useEffect(() => {
    if (setCarSelectedByMakeAndModel) {
      setCarSelectedByMakeAndModel(undefined);
    }
  }, []);

  useEffect(() => {
    setErrorYear(false);
  }, [segmentedControlSelection]);

  const buttonIsEnabled = useMemo(() => {
    return (
      (segmentedControlSelection?.index === 0 &&
        carSelectedByMakeAndModel &&
        !!carSelectedByMakeAndModel.engineDisplacement &&
        !!carSelectedByMakeAndModel.fuel &&
        !!carSelectedByMakeAndModel.year &&
        !!carSelectedByMakeAndModel.mileage &&
        isPlateNumber(carSelectedByMakeAndModel.plateNumber) &&
        !errorYear) ||
      (segmentedControlSelection?.index === 1 &&
        carSelectedByPlateCtx &&
        !!carSelectedByPlateCtx.plateNumber &&
        !!carSelectedByPlateCtx.engineDisplacement &&
        !!carSelectedByPlateCtx.fuel &&
        !!carSelectedByPlateCtx.year &&
        !!carSelectedByPlateCtx.mileage &&
        !errorYear)
    );
  }, [
    segmentedControlSelection,
    carSelectedByMakeAndModel,
    carSelectedByPlateCtx,
    errorYear,
  ]);

  useEffect(() => {
    handleOnRightIcon();
  }, [segmentedControlSelection]);

  const backgroundStyle = {
    backgroundColor: Colors.light.backgroundLinearGradient.end,
  };

  const fetchByPlate = (plate: string) => {
    if (isPlateNumber(plate)) {
      setIsPlateError(false);
      //todo: add code here when will be the case
    } else {
      setIsPlateError(true);
    }
  };

  const confirmCarSelected = async () => {
    const carSelected =
      segmentedControlSelection?.index === 0
        ? carSelectedByMakeAndModel
        : carSelectedByPlateCtx;

    dispatch(setCar(carSelected));
    if (goToVehicles) navigationReset(navigation, 0, routeName);
    else navigationPush(navigation, routeName);
    if (goToVehicles && carSelectedByMakeAndModel) {
      registerCustomerCar(carSelectedByMakeAndModel);
    }
  };

  useEffect(() => {
    if (carMakeDropdownData) {
      const getModels = async () => {
        setLoadingCarModels(true);
        const data = await getCarModelsByCarMakeId(carMakeDropdownData?.id);
        setModels(data);
        setLoadingCarModels(false);
      };
      setCarModelDropdownData(undefined);
      getModels();
    }
  }, [carMakeDropdownData]);

  useEffect(() => {
    if (carModelDropdownData) {
      const car = models.find(model => model.id === carModelDropdownData.id);
      if (setCarSelectedByMakeAndModel) {
        setCarSelectedByMakeAndModel({
          ...car,
          make: carMakeDropdownData?.value,
          model: carModelDropdownData?.value,
          year: null, //todo: ignorando l'year preso dal db e lo stiamo chiedendo sempre all'utente. Controllare se e' cio che desideriamo
        });
      }
    }
  }, [carModelDropdownData]);

  useEffect(() => {
    setCarModelDropdownData(undefined);
  }, [segmentedControlSelection]);

  const handleOnRightIcon = () => {
    setCarSelectedByPlate(undefined);
    setIsPlateError(false);
    if (setCarSelectedByPlateCtx) {
      setCarSelectedByPlateCtx(undefined);
    }
  };

  //todo: to remove it when plate option on car registration is added back
  useEffect(() => {
    setSegmentedControlSelection(options[0]); //make and model
  }, []);

  return (
    <SafeAreaViewLayout styles={[backgroundStyle]}>
      <ToPreviousPage containerClassName="m-2 mb-7" />
      <View className="flex-1 justify-between">
        <BoldTitle1
          title={
            makeAndModelConfirmation || plateConfirmation
              ? t('vehicles.confirmCarInformation')
              : t('vehicles.registerVehicleForBookings')
          }
        />
        {/* todo: to add it when plate option on car registration is added back
        <View className="m-3.5">
          <SegmentedControl
            options={options}
            segmentedControlSelection={segmentedControlSelection}
            setSegmentedControlSelection={setSegmentedControlSelection}
          />
        </View> */}
        <View
          style={styles.bookingDetailsContainer}
          className="flex-1 m-3.5 border-2 rounded-xl"
        >
          <View className="h-full">
            <Text className="font-semibold mx-3.5 my-3.5 mb-0 text-lg">
              {segmentedControlSelection?.name}
            </Text>
            {segmentedControlSelection?.index === 0 && (
              <ScrollView className="mt-6" automaticallyAdjustKeyboardInsets>
                {!makeAndModelConfirmation && (
                  <View>
                    <TicDriveDropdown
                      title={t('vehicles.make')}
                      data={makes.map(make => ({
                        id: make.id,
                        value: make.name,
                        icon: make.logoUrl,
                      }))}
                      value={carMakeDropdownData}
                      setValue={setCarMakeDropdownData}
                      placeholder={t('vehicles.selectCarMake')}
                      searchPlaceholder={t('vehicles.searchMake')}
                    />
                    <TicDriveDropdown
                      title={t('vehicles.model')}
                      data={
                        models
                          ? models.map(model => ({
                              id: model.id,
                              value: model.name,
                            }))
                          : []
                      }
                      value={carModelDropdownData}
                      setValue={setCarModelDropdownData}
                      placeholder={t('vehicles.selectCarModel')}
                      searchPlaceholder={t('vehicles.searchModel')}
                      disabled={!carMakeDropdownData || loadingCarModels}
                    />
                    {carSelectedByMakeAndModel && carModelDropdownData && (
                      <CarDetailsByMakeAndModel
                        key={carModelDropdownData?.id}
                        carSelected={carSelectedByMakeAndModel}
                        modelId={
                          models?.find(
                            model =>
                              model.name === carSelectedByMakeAndModel.name,
                          )?.id
                        }
                        errorYear={errorYear}
                        setErrorYear={setErrorYear}
                      />
                    )}
                  </View>
                )}
                <View>
                  {makeAndModelConfirmation && carSelectedByMakeAndModel && (
                    <CarConfirmationDetails
                      carSelected={carSelectedByMakeAndModel}
                      setCarSelected={setCarSelectedByMakeAndModel}
                      setConfirmation={setMakeAndModelConfirmation}
                    />
                  )}
                </View>
              </ScrollView>
            )}
            {segmentedControlSelection?.index === 1 && (
              <ScrollView className="mt-6" automaticallyAdjustKeyboardInsets>
                {!plateConfirmation ? (
                  <View>
                    <TicDriveInput
                      placeholder={segmentedControlSelection.placeholder ?? ''}
                      existsRightIcon
                      isTextUppercase
                      onRightIcon={handleOnRightIcon}
                      onSubmit={value => fetchByPlate(value)}
                      containerStyle={{height: 85}}
                    />
                    {isPlateError && (
                      <Text className="font-medium text-md text-red-500 text-center">
                        {t('vehicles.invalidPlateFormat')}
                      </Text>
                    )}
                    {!isPlateError && carSelectedByPlate && (
                      <CarDetailsByPlate
                        key={carModelDropdownData?.id}
                        carSelected={carSelectedByPlate}
                        errorYear={errorYear}
                        setErrorYear={setErrorYear}
                      />
                    )}
                  </View>
                ) : (
                  plateConfirmation &&
                  carSelectedByPlateCtx && (
                    <CarConfirmationDetails
                      carSelected={carSelectedByPlateCtx}
                      setCarSelected={setCarSelectedByPlateCtx}
                      setConfirmation={setPlateConfirmation}
                    />
                  )
                )}
              </ScrollView>
            )}
          </View>
        </View>
      </View>
      <TicDriveButton
        text={t('confirm')}
        onClick={() => {
          if (makeAndModelConfirmation || plateConfirmation) {
            confirmCarSelected();
          }
          if (segmentedControlSelection?.index === 0) {
            setMakeAndModelConfirmation(true);
            if (setCarSelectedByMakeAndModel) {
              setCarSelectedByMakeAndModel({
                ...carSelectedByMakeAndModel,
                make: carMakeDropdownData?.value,
                model: carModelDropdownData?.value,
              });
            }
          } else if (segmentedControlSelection?.index === 1) {
            setPlateConfirmation(true);
            if (setCarSelectedByPlateCtx) {
              setCarSelectedByPlateCtx({
                ...carSelectedByPlateCtx,
                make: carMakeDropdownData?.value,
                model: carModelDropdownData?.value,
              });
            }
          }
        }}
        disabled={!buttonIsEnabled}
      />
    </SafeAreaViewLayout>
  );
}

const styles = StyleSheet.create({
  bookingDetailsContainer: {
    backgroundColor: Colors.light.background,
    borderColor: Colors.light.extremelyLightGrey,
  },
  carDetailContainer: {
    borderBottomColor: Colors.light.extremelyLightGrey,
  },
});

export default RegisterVehicleScreen;
