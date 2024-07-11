import { View, Text, TextInput, useColorScheme, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
interface Props {
    email: string
    password: string
    setemail: React.Dispatch<React.SetStateAction<string>>
    setpasswrd: React.Dispatch<React.SetStateAction<string>>
    username: string;
    setusername: React.Dispatch<React.SetStateAction<string>>
    confpass: string;
    setconfpass: React.Dispatch<React.SetStateAction<string>>
}

const Signupform = ({ email, password, setemail, setpasswrd, username, setusername, setconfpass, confpass }: Props) => {
    const theme = useColorScheme();
    const textColor = theme === 'dark' ? 'text-white' : 'text-black';
    const [emailfoc, setemailfoc] = useState<boolean>(false)
    const [usernamefoc, setusernamefoc] = useState<boolean>(false)
    const [passfoc, setpassfoc] = useState<boolean>(false)
    const [passfoc2, setpassfoc2] = useState<boolean>(false)
    const [hidden, sethidden] = useState<boolean>(true)
    const [hidden2, sethidden2] = useState<boolean>(true)
    return (
        <View className='mt-10 h-max'>
            <Text className={`${textColor}`}>Email</Text>
            <View className={`mt-4 w-full border-2  h-[15%] rounded-xl ${emailfoc ? "border-custom-red" : "border-white"}`} >
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
            <Text className={`${textColor} mt-4`}>Username</Text>
            <View className={`mt-4 w-full border-2  h-[15%] rounded-xl ${usernamefoc ? "border-custom-red" : "border-white"}`} >
                <TextInput
                    className='flex-1 text-white font-semibold text-base px-4'
                    value={username}
                    placeholder='email'
                    onChangeText={(e) => setusername(e)}
                    placeholderTextColor={'#7b7b8b'}
                    secureTextEntry={false}
                    onFocus={() => setusernamefoc(true)}
                    onBlur={() => setusernamefoc(false)}
                />
            </View>
            <Text className={`${textColor} mt-5`}>
                Password
            </Text>
            <View className={`mt-4 w-full border-2  h-[15%] rounded-xl ${passfoc ? "border-custom-red" : "border-white"} flex-row `}>
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
            <Text className={`${textColor} mt-5`}>
                Confirm Password
            </Text>
            <View className={`mt-4 w-full border-2  h-[15%] rounded-xl ${passfoc2 ? "border-custom-red" : "border-white"} flex-row `}>
                <TextInput
                    className=' w-[85%] text-white font-semibold text-base px-4'
                    value={confpass}
                    placeholder='password'
                    onChangeText={(e) => setconfpass(e)}
                    placeholderTextColor={'#7b7b8b'}
                    secureTextEntry={hidden2}
                    onFocus={() => setpassfoc2(true)}
                    onBlur={() => setpassfoc2(false)}
                />
                <TouchableOpacity
                    onPress={() => sethidden2(prev => !prev)}
                    className='items-center justify-center'
                >
                    <Image
                        source={hidden2 ? icons.eye : icons.eyeHide}
                        className='w-9 h-9' />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default Signupform