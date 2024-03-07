import React, {useState} from 'react'
import { Text, StyleSheet, TextInput, TouchableOpacity, View, StatusBar } from 'react-native'

export default function HomeScreen({navigation}: any):JSX.Element {
  const [name, setName] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const handleStartApp = () => {
    if(name.length > 0) {
    navigation.push('EventList')
    }
    else {
      setError('Please enter your name')
    }
  };
  
  const handleNameChange = (text: string) => {
    setName(text);
    setError(null);
  };

  return (
    <>
    <StatusBar backgroundColor={'#fff'} />
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor='#999'
        placeholder='Enter your name'
        value={name}
        onChangeText={handleNameChange} 
        />
        {
          error && <Text style={styles.error}>{error}</Text>
        }
      <TouchableOpacity onPress={handleStartApp}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Start App</Text>
        </View>
      </TouchableOpacity>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#000', 
  },
  button: {
    borderRadius: 12,
    backgroundColor: '#6A1B4D',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    padding: 10,
  },
  error: {
    color:'#FF0000',
    fontSize: 16,
    marginBottom: 10,
  }
})