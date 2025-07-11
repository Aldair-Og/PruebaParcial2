import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase/Config';
import { doc, getDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PerfilScreen({ navigation }: any) {



  const [usuario, setUsuario] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");

  function cerrar() {
    signOut(auth).then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Inicio Sesion' }],
      });
    }).catch((error) => {
      console.log('Error al cerrar sesión:', error);
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        leer(uid);
      }
    });
  }, []);

  function leer(uid: string) {
    const docRef = doc(db, "usuarios", uid);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsuario(data.usuario);
          setCelular(data.celular);
          setCorreo(data.correo);
        }
      })
      .catch((error) => {
        console.error("Error al leer datos:", error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Perfil</Text>

      <Text style={styles.sectionTitle}>Información de perfil</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Icon name="person-outline" size={24} color="#333" />
          <Text style={styles.text}>Usuario: {usuario}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="happy-outline" size={24} color="#333" />
          <Text style={styles.text}>Saludo: ¡Hola {usuario}!</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Mantén actualizada tu información</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Icon name="call-outline" size={24} color="#333" />
          <Text style={styles.text}>Número de celular: {celular}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="mail-outline" size={24} color="#333" />
          <Text style={styles.text}>Correo: {correo}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title='Cerrar sesión' onPress={cerrar} color="#D9534F" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
  status: {
    marginLeft: 'auto',
    backgroundColor: '#d4edda',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    color: '#155724',
    fontSize: 12,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 10,
  },
});
