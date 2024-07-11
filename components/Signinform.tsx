import { View, Text, TextInput, useColorScheme, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
interface Props {
    email: string
    password: string
    setemail: React.Dispatch<React.SetStateAction<string>>
    setpasswrd: React.Dispatch<React.SetStateAction<string>>
}

const Signinform = ({ email, password, setemail, setpasswrd }: Props) => {
    const theme = useColorScheme();
    const textColor = theme === 'dark' ? 'text-white' : 'text-black';
    const [emailfoc, setemailfoc] = useState<boolean>(false)
    const [passfoc, setpassfoc] = useState<boolean>(false)
    const [hidden, sethidden] = useState<boolean>(true)
    return (
        <View className='mt-10 h-max'>
            <Text className={`${textColor}`}>Email</Text>
            <View className={`mt-4 w-full border-2  h-1/4 rounded-xl ${emailfoc ? "border-custom-red" : "border-white"}`} >
                <TextInput
                    className='flex-1 text-white font-semibold text-base px-4'
                    value={email}
                    placeholder='email'
                    onChangeText={(e) => setemail(e)}
                    placeholderTextColor={'#7b7b8b'}
                    secureTextEntry={false}
                    onFocus={() => setemailfoc(true)}
                    onBlur={() => setemailfoc(false)}
                />
            </View>
            <Text className={`${textColor} mt-5`}>
                Password
            </Text>
            <View className={`mt-4 w-full border-2  h-1/4 rounded-xl ${passfoc ? "border-custom-red" : "border-white"} flex-row `}>
                <TextInput
                    className=' w-[85%] text-white font-semibold text-base px-4'
                    value={password}
                    placeholder='password'
                    onChangeText={(e) => setpasswrd(e)}
                    placeholderTextColor={'#7b7b8b'}
                    secureTextEntry={hidden}
                    onFocus={() => setpassfoc(true)}
                    onBlur={() => setpassfoc(false)}
                />
                <TouchableOpacity
                    onPress={() => sethidden(prev => !prev)}
                    className='items-center justify-center'
                >
                    <Image
                        source={hidden ? icons.eye : icons.eyeHide}
                        className='w-9 h-9' />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Signinform