/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  useWindowDimensions,
  SafeAreaView,
  ScrollView,
  Image,
  Pressable,
  Linking,
} from 'react-native';
import React from 'react';
import styles from '../styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

export default function Info({navigation, route}) {
  const {height} = useWindowDimensions();
  // const isDarkMode = useColorScheme() === 'dark';
  const {article, isDarkMode} = route.params;
  return (
    <SafeAreaView
      style={{height: height, backgroundColor: isDarkMode ? 'black' : 'white'}}>
      <ScrollView>
        <View
          style={[
            styles.sectionContainer,
            {
              flexDirection: 'row',
              textAlign: 'center',
            },
          ]}>
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faArrowLeft} color="#ABC9FF" size={24} />
          </Pressable>

          <Text
            style={[
              styles.sectionTitle,
              isDarkMode ? styles.darkText : styles.lightText,
              {marginTop: -5, marginLeft: '33%'},
            ]}>
            Details
          </Text>
        </View>
        <View style={[styles.sectionTitle, styles.padding]}>
          <Image
            source={{uri: article.urlToImage}}
            style={[{height: height * 0.3, width: '100%'}, styles.img]}
            resizeMode="contain"
          />
          <Text
            style={[
              styles.sectionTitle,
              {color: isDarkMode ? 'white' : 'black', marginTop: 15},
            ]}>
            {article.title}
          </Text>
          <Text
            style={{
              fontSize: 13,
              marginTop: 10,
              color: isDarkMode ? 'white' : 'black',
            }}>
            Source: {article.source.name}
          </Text>
          <Text
            style={{
              fontSize: 17,
              marginTop: 20,
              color: isDarkMode ? 'white' : 'black',
            }}>
            {article.description}
          </Text>
          <Text
            style={{
              fontSize: 13,
              marginTop: 20,
              color: isDarkMode ? 'white' : 'black',
            }}>
            Author: {article.author}
          </Text>
          <Text
            style={{
              fontSize: 13,
              marginTop: 6,
              color: isDarkMode ? 'white' : 'black',
            }}>
            Published at: {article.publishedAt}
          </Text>

          <Pressable
            onPress={() => {
              Linking.openURL(article.url);
            }}
            style={{
              marginTop: 30,
              backgroundColor: '#ABC9FF',
              width: 120,
              height: 40,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 25,
            }}>
            <Text style={{fontWeight: 'bold'}}>Visit site</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
