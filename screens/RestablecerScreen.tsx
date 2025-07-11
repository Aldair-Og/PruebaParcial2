import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/Config';

export default function Restablecer() {

  const [correo, setcorreo] = useState("")

  function enviarSolicitud() {
    sendPasswordResetEmail(auth, correo)
      .then(() => {
        Alert.alert("Mensaje", "Correo de restablecimiento enviado correctamente");
      })
      .catch((error) => {
        let titulo = "Error";
        let mensaje = "Hubo un problema, intenta nuevamente.";

        if (error.code === "auth/user-not-found") {
          titulo = "Usuario no encontrado";
          mensaje = "No existe una cuenta con ese correo.";
        } else if (error.code === "auth/invalid-email") {
          titulo = "Correo inválido";
          mensaje = "Por favor ingresa un correo válido.";
        }

        Alert.alert(titulo, mensaje);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restablecer contraseña</Text>
      <TextInput
        placeholder='Ingresar correo'
        onChangeText={setcorreo}
        value={correo}
        style={styles.input}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <View style={styles.buttonContainer}>
        <Button title='Enviar solicitud' onPress={enviarSolicitud} color="#007AFF" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 20,
    elevation: 2,
  },
  buttonContainer: {
    width: '80%',
  }
});
