import { SafeAreaView, useColorScheme, FlatList, View, Image, Alert, TouchableOpacity, Text, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { icons, images } from '@/constants';
import Searchinput from '@/components/Searchinput';
import EmptyState from '@/components/EmptyState';
import { getAccount, getCurrentUser, getUserPosts, signOut } from '@/lib/appwrite';
import VideoCard from '@/components/VideoCard';
import { router } from 'expo-router';


const Profile = () => {
    const theme = useColorScheme();
    const [refreshing, setRefreshing] = useState(false);
    const textColor = theme === 'dark' ? 'text-white' : 'text-black';
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [useerdt, setuserdt] = useState<any>([])
    const [id, setid] = useState<string>('')

    const Logout = async () => {
        try {
            await signOut()
            router.push("/")
        } catch (err: any) {
            Alert.alert("Some error occured", "Try again")
        }

    }

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getCurrentUser();
            setuserdt(res);
            const response = await getUserPosts(res!.$id)
            setData(response);

        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const refetch = () => fetchData();
    const onRefresh = async () => {
        setRefreshing(true);
        refetch()
        setRefreshing(false);
    };

    return (
        <SafeAreaView className='h-full' >
            <FlatList
                data={data}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <VideoCard
                        title={item.tittle}
                        thumbnail={item.thumbmeil}
                        video={item.video}
                        avatar={item.creator.avatar}
                        creator={item.creator.username} />
                )}

                ListHeaderComponent={() => (
                    <View className='my-6 px-4 space-y-6 h-max'>
                        <View className=' flex-1 items-end '>
                            <TouchableOpacity onPress={Logout}>
                                <Image source={icons.logout}
                                    className='w-6 h-6'
                                    resizeMode="contain"
                                /></TouchableOpacity>
                        </View>
                        <View className='items-center w-full mt-4 gap-4'>
                            <Image
                                source={{ uri: useerdt.avatar }}
                                className='w-[70px] h-[70px] rounded-2xl'
                                resizeMode="contain"
                            />
                            <Text className={`${textColor} text-4xl font-semibold`}>{useerdt.username}</Text>
                            <View className='flex-row gap-8'>
                                <View className='items-center'>
                                    <Text className={`${textColor} text-xl font-bold`}>{loading ? "0" : data.length}</Text>
                                    <Text className={`${textColor} font-thin`}>posts</Text>
                                </View>
                                <View className='items-center'>
                                    <Text className={`${textColor} text-xl font-bold`}>1.3k</Text>
                                    <Text className={`${textColor} font-thin`}>Views</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subtitle="No videos created yet"
                    />
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );

}

export default Profile