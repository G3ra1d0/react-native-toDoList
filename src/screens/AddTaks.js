import React, {useState} from 'react';
import {
  Modal,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
// Style Padroes
import commonStyles from '../commonStyles';

const initState = {
  desc: '',
  date: new Date(),
  showDate: false,
};

export default props => {
  const [state, setState] = useState({...initState});

  save = () => {
    const newTask = {
      desc: state.desc,
      date: state.date,
    };

    if (props.onSave) props.onSave(newTask);
    setState({...initState});
  };

  return (
    <Modal
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.onCancel}
      animationType="slide">
      <TouchableWithoutFeedback onPress={props.onCancel}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.header}>Nova Tarefa</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe a Descrição..."
          value={state.desc}
          onChangeText={desc => setState({...state, desc})}
        />
        <View>
          <TouchableOpacity
            onPress={() => setState({...state, showDate: true})}>
            <Text style={styles.date}>
              {moment(state.date).format('ddd, D [de] MMMM [de] YYYY')}
            </Text>
          </TouchableOpacity>

          {state.showDate && (
            <DateTimePicker
              value={state.date}
              mode="date"
              onChange={(event, date) =>
                setState({...state, date, showDate: false})
              }
            />
          )}
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={props.onCancel}>
            <Text style={styles.button}> Cencelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={save}>
            <Text style={styles.button}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableWithoutFeedback onPress={props.onCancel}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    backgroundColor: '#fff',
  },
  header: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.color.today,
    color: commonStyles.color.secondary,
    textAlign: 'center',
    padding: 15,
    fontSize: 18,
  },
  input: {
    fontFamily: commonStyles.fontfamily,
    height: 40,
    margin: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 6,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    fontSize: 15,
    margin: 20,
    marginRight: 30,
    color: commonStyles.color.today,
  },
  date: {
    fontFamily: commonStyles.fontfamily,
    fontSize: 20,
    margin: 15,
  },
});
