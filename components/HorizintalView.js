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

export default function HorizintalView({navigation, isDarkMode}) {
  const {width, height} = useWindowDimensions();

  const [info, setInfo] = useState([]);
  const [isError, setIsError] = useState(false);

  const get = async () => {
    const url =
      'https://newsapi.org/v2/top-headlines?country=za&category=business&apiKey=4c7bfa1af52143b99648078dfc0bde1e';

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
    <View style={[styles.padding, {width: width, height: height * 0.35}]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                key={index}>
                <Image
                  style={[
                    styles.img,
                    {height: height * 0.2, width: width * 0.7},
                  ]}
                  source={{uri: article.urlToImage}}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    {
                      width: width * 0.6,
                      color: isDarkMode ? 'white' : 'black',
                    },
                    styles.title,
                  ]}>
                  {article.title}
                </Text>
                <Text style={{color: 'gray'}}>{article.source.name}</Text>
              </Pressable>
            );
          })
        ) : isError ? (
          <View
            style={{
              height: '100%',
              width: width * 0.9,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>No news found!</Text>
          </View>
        ) : (
          <View
            style={{
              height: '100%',
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
      </ScrollView>
    </View>
  );
}
