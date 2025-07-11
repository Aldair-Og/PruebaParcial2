import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase/Config'

export default function RegistroOperacionScreen({ navigation }: any) {

  const [precio, setPrecio] = useState("")
  const [cantidad, setCantidad] = useState("")
  const [descripcion, setDescripcion] = useState("")

  async function guardarOperacion() {
    const p = parseFloat(precio)
    const c = parseInt(cantidad)

    if (p < 0) {
      Alert.alert("Error", "El precio no puede ser negativo.")
      return
    }

    if (p < 1 || p > 20) {
      Alert.alert(
        "Advertencia",
        "El monto está fuera del rango $1 - $20. ¿Deseas continuar?",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Continuar", onPress: () => guardarEnFirestore(p, c, descripcion) }
        ]
      )
    } else {
      guardarEnFirestore(p, c, descripcion)
    }
  }

  async function guardarEnFirestore(precio: number, cantidad: number, descripcion: string) {
    await addDoc(collection(db, "operaciones"), {
      precio,
      cantidad,
      descripcion,
      fecha: new Date()
    })
    Alert.alert("Guardado", "Operación guardada correctamente")
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Registrar Operación</Text>
      <TextInput placeholder='Precio' onChangeText={setPrecio} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder='Cantidad' onChangeText={setCantidad} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder='Descripción' onChangeText={setDescripcion} style={styles.input} />
      <Button title='Guardar' onPress={guardarOperacion} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 28, textAlign: 'center', marginBottom: 20 },
  input: { fontSize: 20, backgroundColor: "#ddd", marginVertical: 8, padding: 10, borderRadius: 8 }
})
