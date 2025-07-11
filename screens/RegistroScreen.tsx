import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/Config';
import { doc, setDoc } from 'firebase/firestore';

export default function RegistroScreen({ navigation }: any) {

    const [correo, setcorreo] = useState("")
    const [contraseña, setcontraseña] = useState("")
    const [usuario, setusuario] = useState("")
    const [celular, setcelular] = useState(0)

    function registro() {
        createUserWithEmailAndPassword(auth, correo, contraseña)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate('Login')
                guardar(user.uid)
            })
            .catch((error) => {
                const errorCode = error.code;
                let titulo = "Error";
                let mensaje = "Intenta de nuevo.";

                if (errorCode === "auth/email-already-in-use") {
                    titulo = "Correo en uso";
                    mensaje = "Este correo ya está registrado.";
                } else if (errorCode === "auth/weak-password") {
                    titulo = "Contraseña débil";
                    mensaje = "La contraseña debe tener al menos 6 caracteres.";
                }

                Alert.alert(titulo, mensaje);
            });
    }

    function guardar(uid: string) {
        setDoc(doc(db, "usuarios", uid), {
            usuario: usuario,
            correo: correo,
            celular: celular,
        })
        .then(() => {
            console.log("Datos guardados en Firestore");
            Alert.alert("Guardado", "Usuario registrado correctamente");
        })
        .catch((error) => {
            console.error("Error al guardar datos:", error);
            Alert.alert("Error", "No se pudo guardar en Firestore");
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <TextInput 
                placeholder='Correo'
                onChangeText={(texto) => setcorreo(texto)}
                style={styles.txt}
                keyboardType='email-address'
            />
            <TextInput 
                placeholder='Contraseña'
                secureTextEntry
                onChangeText={(texto) => setcontraseña(texto)}
                style={styles.txt}
            />
            <TextInput 
                placeholder='Usuario'
                onChangeText={(texto) => setusuario(texto)}
                style={styles.txt}
            />
            <TextInput 
                placeholder='Celular'
                keyboardType='numeric'
                onChangeText={(texto) => setcelular(+texto)}
                style={styles.txt}
            />

            <View style={styles.buttonContainer}>
                <Button title='Registrar' onPress={registro} color='#28a745' />
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
    title: {
        fontSize: 28,
        marginBottom: 30,
        fontWeight: 'bold',
        color: '#333',
    },
    txt: {
        backgroundColor: "#fff",
        marginBottom: 15,
        fontSize: 18,
        width: "80%",
        borderRadius: 8,
        padding: 12,
        elevation: 2, 
    },
    buttonContainer: {
        width: "80%",
        marginTop: 10,
    },
});
