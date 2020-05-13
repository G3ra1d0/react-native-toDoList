import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';

// Icons
import Icon from 'react-native-vector-icons/FontAwesome';

// componentes
import Taks from '../components/taks';
import AddTaks from './AddTaks';
// Style Padroes
import commonStyles from '../commonStyles';

//  Data
import moment from 'moment';
import 'moment/locale/pt-br';

//  Imagens
import todayImage from '../../assets/imgs/today.jpg';

export default () => {
  const [tasks, setTasks] = useState([]);
  const [showAddTaks, setShowAddTaks] = useState(false);

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

  addTasks = newTasks => {
    if (!newTasks.desc.trim()) {
      Alert.alert('Dados invalido!', 'Descrição não informado!');
      return;
    }

    const cloneTasks = [...tasks];
    cloneTasks.push({
      id: Math.random(),
      desc: newTasks.desc,
      estimateAt: newTasks.date,
      doneAt: null,
    });

    setTasks([...cloneTasks]);
    setShowAddTaks(false);
  };

  useEffect(() => {
    filterTask();
  }, [showDoneTasks, tasks]);

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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddTaks(true)}
        activeOpacity={0.7}>
        <Icon name="plus" size={25} color={commonStyles.color.secondary} />
      </TouchableOpacity>
      <AddTaks
        isVisible={showAddTaks}
        onCancel={() => setShowAddTaks(false)}
        onSave={addTasks}
      />
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
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: commonStyles.color.today,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
