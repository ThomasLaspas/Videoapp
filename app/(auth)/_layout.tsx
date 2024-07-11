
import Loader from "@/components/Loader";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";


//import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
    //const { loading, isLogged } = useGlobalContext();

    //if (!loading && isLogged) return <Redirect href="/home" />;

    return (
        <>
            <Stack>
                <Stack.Screen
                    name="Singin"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Signup"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>

            <Loader isLoading={false} />
            <StatusBar backgroundColor="#161622" style="light" />
        </>
    );
};

export default AuthLayout;
