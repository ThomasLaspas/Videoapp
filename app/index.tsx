import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import Loader from "@/components/Loader";
import CustomButton from "@/components/CustomButton";
import useAuth from "../context/GlobalProvider";

const Welcome = () => {
    const colorScheme = useColorScheme();
    const texxtcol = colorScheme === 'light' ? "text-black" : "text-white"
    const textcol2 = colorScheme === 'light' ? "text-black" : "text-gray-100"
    const { authState, user } = useAuth();

    if (!authState.loading && authState.isLogged) return <Redirect href="/Home" />;

    return (
        <SafeAreaView className="bg-primary h-full">
            <Loader isLoading={authState.loading} />

            <ScrollView
                contentContainerStyle={{
                    height: "100%",
                }}
            >
                <View className="w-full flex justify-center items-center h-full px-4">
                    <Image
                        source={images.logo}
                        className="w-[130px] h-[84px]"
                        resizeMode="contain"
                    />

                    <Image
                        source={images.cards}
                        className="max-w-[380px] w-full h-[298px]"
                        resizeMode="contain"
                    />

                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-bold text-center">
                            Discover Endless{"\n"}
                            Possibilities with{" "}
                            <Text className="text-secondary-200">Aora</Text>
                        </Text>


                    </View>

                    <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                        Where Creativity Meets Innovation: Embark on a Journey of Limitless
                        Exploration with Aora
                    </Text>


                    <CustomButton
                        title="Continue with Email"
                        handlePress={() => router.push("/Singin")}
                        containerStyles="w-full mt-7"
                        isLoading={false}
                    />
                </View>
            </ScrollView>

            <StatusBar backgroundColor="#161622" style="light" />
        </SafeAreaView>
    );
};

export default Welcome;