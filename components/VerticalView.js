/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  Image,
  useColorScheme,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import * as Progress from 'react-native-progress';

export default function VerticalView({navigation, isDarkMode}) {
  const {width, height} = useWindowDimensions();

  const [info, setInfo] = useState([]);
  const [isError, setIsError] = useState(false);
  const get = async () => {
    const url =
      'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=4c7bfa1af52143b99648078dfc0bde1e';

    const data = await fetch(url);
    const clean = await data.json();
    if (clean.status === 'error') {
      setIsError(true);
    }
    setInfo(clean.articles);
  };

  useEffect(() => {
    get();
  }, []);
  return (
    <View style={[styles.padding, {width: width}]}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        {info.length !== 0 ? (
          info.map((article, index) => {
            return (
              <Pressable
                onPress={() =>
                  navigation.navigate('Info', {
                    article: article,
                    isDarkMode: isDarkMode,
                  })
                }
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <Image
                  style={[
                    styles.img,
                    {height: height * 0.15, width: width * 0.3},
                  ]}
                  source={{uri: article.urlToImage}}
                  resizeMode="contain"
                />
                <View
                  style={{
                    justifyContent: 'center',
                    height: height * 0.15,
                  }}>
                  <Text
                    style={[
                      {
                        width: width * 0.5,
                        color: isDarkMode ? 'white' : 'black',
                      },
                      styles.title,
                    ]}>
                    {article.title}
                  </Text>
                  <Text style={{color: 'gray'}}>{article.source.name}</Text>
                </View>
              </Pressable>
            );
          })
        ) : isError ? (
          <View
            style={{
              height: height * 0.3,
              width: width * 0.9,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>No news found!</Text>
          </View>
        ) : (
          <View
            style={{
              height: height * 0.3,
              width: width * 0.9,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Progress.Circle
              size={height * 0.1}
              borderWidth={3}
              borderColor="#ABC9FF"
              indeterminate={true}
            />
          </View>
        )}
        <View style={{height: height * 0.05}} />
      </ScrollView>
    </View>
  );
}
