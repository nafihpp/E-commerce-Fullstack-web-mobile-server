import React, { Fragment, useEffect, useState } from "react";
import Homepage from "../screens/Homepage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Accordion from "../screens/Cart";
import OnBoarding from "../screens/OnBoarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import TabNavigation from "./TabNavigation";

const Stack = createStackNavigator();

export default function MainStackNavigation() {
    const [firstTimeUser, setFirstTimeUser] = useState();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        checkFirstTimeUser();
    }, []);

    async function checkFirstTimeUser() {
        await AsyncStorage.clear();
        const result = await AsyncStorage.getItem("firstTimeUser");
        if (result === null) {
            setFirstTimeUser(true);
            AsyncStorage.setItem("firstTimeUser", "false");
        } else {
            setFirstTimeUser(false);
        }
    }
    console.log(firstTimeUser, "==firstTimeUser");
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="onBoard">
                {firstTimeUser && (
                    <Stack.Screen
                        name="LoggedHomepage"
                        component={TabNavigation}
                        options={{
                            headerShown: false,
                        }}
                    />
                )}
                {!firstTimeUser && !authenticated && (
                    <Fragment>
                        <Stack.Screen
                            name="Signup"
                            component={Signup}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{ headerShown: false }}
                        />
                    </Fragment>
                )}
                {authenticated && (
                    <Stack.Screen
                        name="onBoard"
                        component={OnBoarding}
                        options={{
                            headerShown: false,
                        }}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
