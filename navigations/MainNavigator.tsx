import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import RegistroScreen from "../screens/RegistroScreen";
import PerfilScreen from "../screens/PerfilScreen";
import LoginScreen from "../screens/LoginScreen";
import Restablecer from "../screens/RestablecerScreen";
import InicioScreen from "../screens/InicioScreen";



const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()


function Tabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Inicio" component={InicioScreen}/>
            <Stack.Screen name="Perfil" component={PerfilScreen}/>

        </Tab.Navigator>
    )
}

function MyStack(){
    return(
        <Stack.Navigator>
        <Stack.Screen name="Inicio Sesion" component={HomeScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Registro" component={RegistroScreen}/>
        <Stack.Screen name="Restablecer" component={Restablecer}/>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }}/>
        
        </Stack.Navigator>

    )

}

export default function Navegador(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}