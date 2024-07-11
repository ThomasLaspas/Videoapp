import { Alert, Image, SafeAreaView, ScrollView, Text, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { images } from '@/constants';
import Signinform from '@/components/Signinform';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { signIn } from '@/lib/appwrite';

export default function Singin() {
    const colorScheme = useColorScheme();
    const [password, setpassword] = useState<string>('')
    const [email, setemail] = useState<string>('')
    const [load, setload] = useState<boolean>(false)
    const texxtcol = colorScheme === 'light' ? "text-black" : "text-white"
    const submit = async () => {
        setload(true)
        if (password === '' || email === '') {
            setload(false)
            Alert.alert("error", "All fields are required")
            return
        }

        try {
            await signIn(email, password)
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
                <View className='w-full justify-center h-full px-4 mt-[13%]'>
                    <Image
                        source={images.logo} resizeMode='contain' className='w-[120px] h-[35px]' />
                    <Text className={`${texxtcol} font-semibold mt-10`}>Singin to Aura</Text>
                    <Signinform
                        email={email}
                        password={password}
                        setemail={setemail}
                        setpasswrd={setpassword}
                    />
                    <CustomButton
                        title="Sign In"
                        handlePress={submit}
                        containerStyles="w-full mt-1"
                        isLoading={load}
                    />
                    <Text className={`${texxtcol} text-center mt-5`}>Dont have an acount ? <Link href='/Signup' className='text-custom-red underline'>Create one</Link></Text>

                </View>


            </ScrollView>

        </SafeAreaView>
    )
}