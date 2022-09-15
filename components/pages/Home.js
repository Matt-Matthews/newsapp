/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  useColorScheme,
} from 'react-native';
import React from 'react';
import HorizintalView from '../HorizintalView';
import VerticalView from '../VerticalView';
import styles from '../styles';
import ToggleSwitch from 'toggle-switch-react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons';

export default function Home({navigation}) {
  const {height} = useWindowDimensions();
  const [isDarkMode, setIsDarkMode] = React.useState(
    useColorScheme() === 'dark',
  );
  return (
    <SafeAreaView
      style={{height: height, backgroundColor: isDarkMode ? 'black' : 'white'}}>
      <ScrollView stickyHeaderIndices={[2]}>
        <View
          style={[
            styles.sectionContainer,
            {flexDirection: 'row', justifyContent: 'space-between'},
          ]}>
          <Text
            style={[
              styles.sectionTitle,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}>
            Your News
          </Text>
          <ToggleSwitch
            isOn={isDarkMode}
            onColor="#ABC9FF"
            offColor="gray"
            size="medium"
            icon={
              isDarkMode ? (
                <FontAwesomeIcon icon={faMoon} color="#ABC9FF" size={16} />
              ) : (
                <FontAwesomeIcon icon={faSun} color="orange" size={16} />
              )
            }
            onToggle={() => setIsDarkMode(prev => !prev)}
          />
        </View>
        <HorizintalView isDarkMode={isDarkMode} navigation={navigation} />
        <View
          style={[
            styles.sectionContainer,
            {backgroundColor: isDarkMode ? 'black' : 'white'},
          ]}>
          <Text
            style={[
              styles.sectionTitle,
              isDarkMode ? styles.darkText : styles.lightText,
            ]}>
            Recomended
          </Text>
        </View>
        <VerticalView isDarkMode={isDarkMode} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}
