import { View, Text, useColorScheme, SafeAreaView, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '@/components/CustomButton';
import { images } from '@/constants';
import Signupform from '@/components/Signupform';
import { createUser } from '@/lib/appwrite';
import { router } from 'expo-router';


const Signup = () => {
    const colorScheme = useColorScheme();
    const [password, setpassword] = useState<string>('')
    const [confpass, setconfpass] = useState<string>('')
    const [email, setemail] = useState<string>('')
    const [username, setusername] = useState<string>('')
    const [load, setload] = useState<boolean>(false)
    const texxtcol = colorScheme === 'light' ? "text-black" : "text-white"
    const submit = async () => {
        setload(true)
        if (password !== confpass) {
            setload(false)
            Alert.alert("error", "Password isnt match")
            return
        }
        if (password === '' || confpass === '' || username === '' || email === '') {
            setload(false)
            Alert.alert("error", "All fields are required")
            return
        }

        try {
            await createUser({ email, password, username })
            router.replace('/Home')
        } catch (err: any) {
            Alert.alert("ERROR", err.message)
        } finally {
            setload(false)
        }


    }
    return (
        <SafeAreaView className='h-full'>
            <ScrollView className='h-full'>
                <View className='w-full justify-center h-full px-4 mt-[20%]'>
                    <Image
                        source={images.logo} resizeMode='contain' className='w-[120px] h-[35px]' />
                    <Text className={`${texxtcol} font-semibold mt-10`}>Singup to Aura</Text>
                    <Signupform
                        email={email}
                        password={password}
                        setemail={setemail}
                        setpasswrd={setpassword}
                        username={username}
                        setusername={setusername}
                        confpass={confpass}
                        setconfpass={setconfpass}
                    />
                    <CustomButton
                        title="Sign un"
                        handlePress={submit}
                        containerStyles="w-full mt-4"
                        isLoading={load}
                    />


                </View>


            </ScrollView>

        </SafeAreaView>
    )
}

export default Signup