import {
  PixelRatio,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from 'react-native'
import React, { useRef, useState } from 'react';
import { Canvas, Circle, Group, Image, Mask, SkImage, makeImageFromView } from '@shopify/react-native-skia';
import { useSharedValue, withTiming } from 'react-native-reanimated';


// internal Imports
import Navigation from './Navigation';
import onboardingData from './data/onboardingData';
import RenderItem from './components/RenderItem';
import CustomeButton from './components/CustomeButton';
import Pagination from './components/Pagination';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function App() {
  // const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const pd = PixelRatio.get();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const ref = useRef(null);
  const [ active, setActive ] = useState(false);
  const [overlay, setOverlay] = useState(null);
  const mask = useSharedValue(0);
  const buttonVal = useSharedValue(0);
  const [home, setHome] = useState(false);

  const wait = async (ms) => {
    new Promise(resolve => setTimeout(resolve, ms));
  }

  const handlePress = async () => {

    if (currentIndex === onboardingData.length - 1 && !active) {
      console.log('END');
      setHome(true);
      return;
    }

    console.log('Hello')

    if (!active) {
      setActive(true);

      const snapshot1 = await makeImageFromView(ref);
      setOverlay(snapshot1);
      await wait(80);

      setCurrentIndex(prev => prev + 1);
      mask.value = withTiming(SCREEN_HEIGHT, { duration: 1000});
      buttonVal.value = withTiming(buttonVal.value + SCREEN_HEIGHT);
      await wait(1000);

      setOverlay(null);
      mask.value = 0;
      setActive(false);
    }
  }

  // return (
  //   {
  //     home ? <Navigation /> : (
  //       <View style={styles.container}>
  //         <View ref={ref} collapsable={false}>
  //           {onboardingData.map((item, index) => {
  //             return (
  //               currentIndex === index && <RenderItem item={item} key={index} />
  //             )
  //           })}
  //         </View>
  //         {
  //           overlay && (
  //             <Canvas style={StyleSheet.absoluteFill} pointerEvents={'none'}>
  //               <Mask
  //                 mode='luminance'
  //                 mask={
  //                   <Group>
  //                     <Circle
  //                       cx={SCREEN_WIDTH / 2}
  //                       cy={SCREEN_HEIGHT - 160}
  //                       r={SCREEN_HEIGHT}
  //                       color="white"
  //                     />
  //                     <Circle
  //                       cx={SCREEN_WIDTH / 2}
  //                       cy={SCREEN_HEIGHT - 160}
  //                       r={mask}
  //                       color="black"
  //                     />
  //                   </Group>
  //                 }
  //               >
  //                 <Image
  //                   image={overlay}
  //                   x={0}
  //                   y={0}
  //                   width={overlay.width() / pd}
  //                   height={overlay.height() / pd}
  //                 />
  //               </Mask>
  //             </Canvas>
  //           )
  //         }
  //         <CustomeButton handlePress={handlePress} buttonVal={buttonVal} />
  //         <Pagination data={onboardingData} buttonVal={buttonVal} />
  //         <Text style={styles.credit}>Application by Mridha</Text>
  //       </View>
  //     )
  //   }
  // );

return (
  home ? <Navigation /> : <View style={styles.container}>
    <View ref={ref} collapsable={false}>
      {onboardingData.map((item, index) => {
        return (
          currentIndex === index && <RenderItem item={item} key={index} />
        )
      })}
    </View>
    {
      overlay && (
        <Canvas style={StyleSheet.absoluteFill} pointerEvents={'none'}>
          <Mask
            mode='luminance'
            mask={
              <Group>
                <Circle
                  cx={SCREEN_WIDTH / 2}
                  cy={SCREEN_HEIGHT - 160}
                  r={SCREEN_HEIGHT}
                  color="white"
                />
                <Circle
                  cx={SCREEN_WIDTH / 2}
                  cy={SCREEN_HEIGHT - 160}
                  r={mask}
                  color="black"
                />
              </Group>
            }
          >
            <Image
              image={overlay}
              x={0}
              y={0}
              width={overlay.width() / pd}
              height={overlay.height() / pd}
            />
          </Mask>
        </Canvas>
      )
    }
    <CustomeButton handlePress={handlePress} buttonVal={buttonVal} />
    <Pagination data={onboardingData} buttonVal={buttonVal} />
    <Text style={styles.credit}>Application by Mridha</Text>
  </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  credit: {
    position: 'absolute',
    bottom: 22,
    color: 'white'
  }
})