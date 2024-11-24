import {LinearGradient} from 'expo-linear-gradient';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Colors} from '@/constants/Colors';
import {Image} from '@rneui/themed';
import TicDriveLogo from '../../assets/images/TicDriveLogo.jpeg';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import ServicesCard from '@/components/ServicesCard';
import Feather from '@expo/vector-icons/Feather';
import CarRepairService from '../../assets/svg/carRepairService.svg';
import {MotiView} from 'moti';
import {useContext, useState} from 'react';
import {Dimensions} from 'react-native';
import smallDevicebreakpointHeight from '@/constants/smallDevicebreakpointHeight';
import {globalStyles} from '@/styles/globalStyles';
import NavigationContext from '@/stateManagement/contexts/NavigationContext';
import navigationPush from '@/services/navigation/push';

const {width, height} = Dimensions.get('window');

const LandingScreen = () => {
  const [isSearchButtonPressed, setIsSearchButtonPressed] = useState(false);
  const [isOfferButtonPressed, setIsOfferButtonPressed] = useState(false);

  const {navigation} = useContext(NavigationContext);

  return (
    <View className={`flex-1 bg-white`}>
      <LinearGradient
        colors={[
          Colors.light.backgroundLinearGradient.start,
          Colors.light.backgroundLinearGradient.start,
          Colors.light.green.drive,
        ]}
        locations={[0, 0.45, 1]}
        className="flex-1 absolute w-full h-full"
      >
        <View
          className="flex-1 justify-between"
          style={globalStyles().safeAreaView}
        >
          <View>
            <View
              style={{marginTop: 60}}
              className="items-center justify-center relative"
            >
              <Image
                source={TicDriveLogo}
                style={styles.logoImage}
                placeholderStyle={{backgroundColor: 'transparent'}}
              />
            </View>
          </View>
          <View
            style={styles.emptySpace}
            className="justify-center items-center px-1 p-6"
          >
            {/* intentionally left blank */}
          </View>
          <MotiView
            className="flex-row justify-center p-2"
            from={{
              scale: 0.8,
            }}
            animate={{
              scale: 1,
            }}
            transition={{
              type: 'timing',
              duration: 150,
            }}
          >
            <MotiView
              className="flex-1"
              from={{
                scale: 0.8,
              }}
              animate={{
                scale: isSearchButtonPressed ? 0.95 : 1,
              }}
              transition={{
                type: 'timing',
                duration: 150,
              }}
            >
              <TouchableWithoutFeedback
                onPressIn={() => setIsSearchButtonPressed(true)}
                onPressOut={() => setIsSearchButtonPressed(false)}
                onPress={() =>
                  navigationPush(navigation, 'ChooseServicesScreen', {
                    category: 'user',
                  })
                }
                onLongPress={() => alert('long press')}
              >
                <ServicesCard
                  id={1}
                  title="Search a service"
                  description="What service are you looking for?"
                  cardStyle={styles.card}
                  titleStyle={styles.cardTitle}
                  descriptionStyle={styles.cardDescription}
                  iconStyle={styles.cardIcon}
                  isCheckIconAvailable={false}
                  icon={() => (
                    <Feather
                      name="search"
                      size={height > smallDevicebreakpointHeight ? 50 : 40}
                      color={'green'}
                    />
                  )}
                  disabledPressIn={true}
                />
              </TouchableWithoutFeedback>
            </MotiView>
            <MotiView
              className="flex-1"
              from={{
                scale: 0.8,
              }}
              animate={{
                scale: isOfferButtonPressed ? 0.95 : 1,
              }}
              transition={{
                type: 'timing',
                duration: 150,
              }}
            >
              <TouchableWithoutFeedback
                onPressIn={() => setIsOfferButtonPressed(true)}
                onPressOut={() => setIsOfferButtonPressed(false)}
                onPress={() =>
                  navigationPush(navigation, 'ChooseServicesScreen', {
                    category: 'workshop',
                  })
                }
                onLongPress={() => alert('Service offering long pressed')}
              >
                <ServicesCard
                  id={2}
                  title="Offer a service"
                  description="What services do you want to offer?"
                  cardStyle={styles.card}
                  titleStyle={styles.cardTitle}
                  descriptionStyle={styles.cardDescription}
                  iconStyle={styles.cardIcon}
                  iconWidth={40}
                  iconHeight={40}
                  isCheckIconAvailable={false}
                  icon={() => (
                    <CarRepairService
                      width={height > smallDevicebreakpointHeight ? 50 : 40}
                      height={height > smallDevicebreakpointHeight ? 50 : 40}
                      fill={'green'}
                    />
                  )}
                  disabledPressIn={true}
                />
              </TouchableWithoutFeedback>
            </MotiView>
          </MotiView>
          <View
            className="mx-5 flex-row justify-between bg"
            style={{marginBottom: 50}}
          >
            <Pressable
              onPress={() => {
                navigationPush(navigation, 'UserAuthenticationScreen', {
                  isUser: true,
                });
              }}
            >
              <Text className="text-lg">login</Text>
            </Pressable>
            <Pressable
              onPress={() => navigationPush(navigation, 'userTabs', {}, 'Home')}
            >
              <Text className="text-lg">skip</Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    height: 280,
  },
  logoImage: {
    width: height > smallDevicebreakpointHeight ? 180 : 150,
    height: height > smallDevicebreakpointHeight ? 180 : 150,
    resizeMode: 'contain',
  },
  cardIcon: {
    flex: 1,
    alignItems: 'center',
  },
  cardDescription: {
    color: 'green',
    textAlign: 'center',
  },
  cardTitle: {
    color: 'green',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'lightgreen',
    borderColor: Colors.light.green.drive,
    height: 160,
  },
  emptySpace: {
    width: '100%',
    alignSelf: 'flex-end',
    height: 150,
  },
});

export default LandingScreen;
