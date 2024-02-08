import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';

// internal Imports
import Navigation from './Navigation';
import onboardingData from './data/onboardingData';
import RenderItem from './components/RenderItem';
import CustomeButton from './components/CustomeButton';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(2);

  return (
    // <Navigation />
    <View style={styles.container}>
      <View>
        {onboardingData.map((item, index) => {
          return (
            currentIndex === index && <RenderItem item={item} key={index}/>
          )
        })}
      </View>
      <CustomeButton />
      <Text style={styles.credit}>Application by Mridha</Text>
    </View>
  );
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