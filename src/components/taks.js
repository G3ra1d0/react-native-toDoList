import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome';

import commonStyles from '../commonStyles';

//  Data
import moment from 'moment';
import 'moment/locale/pt-br';

export default props => {
  const donOrNoStyle =
    props.doneAt != null ? {textDecorationLine: 'line-through'} : {};

  const date = moment(props.estimateAt)
    .locale('pt-br')
    .format('ddd, D [de] MMMM');

  getRightContext = () => {
    return (
      <TouchableOpacity style={styles.right}>
        <Icon name="trash" size={30} color="#FFF" />
      </TouchableOpacity>
    );
  };

  getLeftContext = () => {
    return (
      <View style={styles.left}>
        <Icon name="trash" size={20} color="#FFF" style={styles.excludeIcon} />
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={getRightContext}
      renderLeftActions={getLeftContext}>
      <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
        <View style={styles.contrainer}>
          <View style={styles.checkContainer}>
            {getCheckView(props.doneAt)}
          </View>
          <View>
            <Text style={[styles.desc, donOrNoStyle]}>{props.desc}</Text>

            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Swipeable>
  );
};

function getCheckView(doneAt) {
  if (doneAt != null) {
    return (
      <View style={styles.done}>
        <Icon name="check" size={20} color="#fff" />
      </View>
    );
  } else {
    return <View style={styles.pending} />;
  }
}

const styles = StyleSheet.create({
  contrainer: {
    flexDirection: 'row',
    borderColor: '#AAA',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  checkContainer: {
    width: '20%',
    alignItems: 'center',
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    borderWidth: 1,
    borderColor: '#555',
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    backgroundColor: '#4D7031',
    alignItems: 'center',
    justifyContent: 'center',
  },
  desc: {
    fontFamily: commonStyles.fontfamily,
    color: commonStyles.color.mainText,
    fontSize: 15,
  },
  date: {
    fontFamily: commonStyles.fontfamily,
    color: commonStyles.color.subText,
    fontSize: 13,
  },
  right: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
  left: {
    flex: 1,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
  excludeText: {
    fontFamily: commonStyles.fontfamily,
    color: '#fff',
    fontSize: 20,
    margin: 10,
  },
  excludeIcon: {
    marginLeft: 10,
  },
});
