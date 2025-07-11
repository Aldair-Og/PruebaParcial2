import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function HomeScreen({navigation}: any) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://lh3.googleusercontent.com/a/ACg8ocI8Ztv9boTRWniIBiDtRP2H6NGxdbaGQAtN-ZjjNF9iQypGLa2S=s288-c-no' }}
        style={styles.logo}
      />
      <Text style={styles.title}>Bienvenido a la App</Text>
      <View style={styles.buttonContainer}>
        <Button
          title='Login'
          onPress={() => navigation.navigate('Login')}
          color='#007AFF'
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title='Registro'
          onPress={() => navigation.navigate('Registro')}
          color='green'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60, 
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 15,
  },
});
