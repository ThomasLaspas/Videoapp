import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
import { router, usePathname } from 'expo-router';


const Searchinput = () => {
    const pathname = usePathname()
    const [searchfo, setsearchfo] = useState<boolean>(false)
    const [query, setquery] = useState<string>('')
    const submit = () => {
        if (query === '') {
            return Alert.alert("Missing query", "Please write something to search")
        }
        if (pathname.startsWith('/search')) router.setParams({ query })
        else router.push(`/search/${query}`)
    }
    return (


        <View className={` w-full border-2  h-[45px] mb-4 rounded-xl ${searchfo ? "border-white" : null} flex-row`} >
            <TextInput
                className='w-[90%] text-white font-semibold text-base px-4'
                value={query}
                placeholder='Search for a video topic'
                onChangeText={(e) => setquery(e)}
                placeholderTextColor={'#7b7b8b'}
                secureTextEntry={false}
                onFocus={() => setsearchfo(true)}
                onBlur={() => setsearchfo(false)}
            />
            <TouchableOpacity
                onPress={submit}
                className='items-center justify-center'
            >
                <Image
                    source={icons.search}
                    className='w-5 h-5' />
            </TouchableOpacity>
        </View>




    )
}

export default Searchinput