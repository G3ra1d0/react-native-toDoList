import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';

// Style Padroes
import commonStyles from '../commonStyles';

//  Data
import moment from 'moment';
import 'moment/locale/pt-br';

//  Imagens
import todayImage from '../../assets/imgs/today.jpg';

export default () => {
  const today = moment()
    .locale('pt-br')
    .format('ddd, D [de] MMMM');

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={todayImage}>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.taksList}>
        <Text>Taks List</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    flex: 3,
  },
  taksList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commonStyles.fontfamily,
    fontSize: 50,
    color: commonStyles.color.secondary,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: commonStyles.fontfamily,
    fontSize: 20,
    color: commonStyles.color.secondary,
    marginLeft: 20,
    marginBottom: 30,
  },
});
