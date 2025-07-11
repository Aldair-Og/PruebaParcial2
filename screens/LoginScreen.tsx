import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Config';

export default function LoginScreen({navigation}: any) {
    const [correo, setcorreo] = useState("")
    const [contraseña, setcontraseña] = useState("")

    function login() {
        signInWithEmailAndPassword(auth, correo, contraseña)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate('Tabs') 
                Alert.alert("Mensaje", "Inicio sesion con exito")
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;

                if (errorCode === "auth/invalid-credential") {
                    errorCode = "Credenciales inválidas"
                    errorMessage = "Verifica tu correo y contraseña"
                } else if (errorCode === "auth/missing-password") {
                    errorCode = "Contraseña faltante"
                    errorMessage = "Debes ingresar una contraseña"
                } else {
                    errorCode = "Error"
                    errorMessage = "Verifica tu correo y contraseña"
                }

                Alert.alert(errorCode, errorMessage)
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            <TextInput
                placeholder='Ingresar correo'
                onChangeText={(texto) => setcorreo(texto)}
                style={styles.txt}
            />

            <TextInput
                placeholder='Ingresar contraseña'
                secureTextEntry
                onChangeText={(texto) => setcontraseña(texto)}
                style={styles.txt}
            />

            <View style={styles.buttonContainer}>
                <Button title='Login' onPress={login} color='#007AFF' />
            </View>

            <Text
                onPress={() => navigation.navigate('Restablecer')}
                style={styles.txt2}
            >
                ¿Olvidaste la contraseña?
            </Text>
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
    title: {
        fontSize: 28,
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#333',
    },
    txt: {
        backgroundColor: "#fff",
        margin: 10,
        fontSize: 18,
        width: "80%",
        borderRadius: 8,
        padding: 12,
        elevation: 2, 
    },
    buttonContainer: {
        width: "80%",
        marginTop: 10,
        marginBottom: 20,
    },
    txt2: {
        fontSize: 16,
        color: '#007AFF',
    },
});
