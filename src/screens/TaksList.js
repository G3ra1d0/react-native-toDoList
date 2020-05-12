import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';

// Icons
import Icon from 'react-native-vector-icons/FontAwesome';

// componentes
import Taks from '../components/taks';
// Style Padroes
import commonStyles from '../commonStyles';

//  Data
import moment from 'moment';
import 'moment/locale/pt-br';

//  Imagens
import todayImage from '../../assets/imgs/today.jpg';

export default () => {
  const [tasks, setTasks] = useState([
    {
      id: Math.random(),
      desc: 'Compra Livro',
      estimateAt: new Date(),
      doneAt: new Date(),
    },
    {
      id: Math.random(),
      desc: 'Ler Livro',
      estimateAt: new Date(),
      doneAt: null,
    },
  ]);

  const [showDoneTasks, setShowDoneTasks] = useState(false);
  const [visibleTask, setVisibleTask] = useState(
    [...tasks].filter(el => el.doneAt == null),
  );

  const today = moment()
    .locale('pt-br')
    .format('ddd, D [de] MMMM');

  const toggleFilter = () => {
    setShowDoneTasks(!showDoneTasks);
  };

  const filterTask = () => {
    let visibleTask = null;
    if (showDoneTasks) {
      visibleTask = [...tasks];
    } else {
      visibleTask = [...tasks].filter(el => el.doneAt == null);
    }

    setVisibleTask(visibleTask);
  };

  const toggleTask = id => {
    let newTasks = [...tasks];
    newTasks.forEach(element => {
      if (element.id === id) {
        element.doneAt = element.doneAt ? null : new Date();
      }
    });

    setTasks(newTasks);
    filterTask();
  };

  useEffect(() => {
    filterTask();
  }, [showDoneTasks]);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={todayImage}>
        <View style={styles.iconBar}>
          <TouchableOpacity onPress={() => toggleFilter()}>
            <Icon
              size={25}
              color={commonStyles.color.secondary}
              name={showDoneTasks ? 'eye' : 'eye-slash'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.titleBar}>
          <Text style={styles.title}>Hoje</Text>
          <Text style={styles.subtitle}>{today}</Text>
        </View>
      </ImageBackground>
      <View style={styles.taksList}>
        <FlatList
          data={visibleTask}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => <Taks {...item} toggleTask={toggleTask} />}
        />
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
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    justifyContent: 'flex-end',
  },
});
