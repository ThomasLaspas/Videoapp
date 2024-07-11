import { Text, SafeAreaView, useColorScheme, FlatList, View, Image, RefreshControl, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { images } from '@/constants';
import Searchinput from '@/components/Searchinput';
import Trendings from '@/components/Trendings';
import EmptyState from '@/components/EmptyState';
import { getAllPosts, getLatestPosts } from '@/lib/appwrite';
import VideoCard from '@/components/VideoCard';

const Home = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [tredata, settrendata] = useState<any>([])
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getAllPosts();
            const response = await getLatestPosts()
            setData(res);
            settrendata(response)
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
    const theme = useColorScheme();
    const textColor = theme === 'dark' ? 'text-white' : 'text-black';


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
                        <View className='justify-between flex-row mb-6'>
                            <View >
                                <Text className={`${textColor} font-medium text-sm`}>Welcome back</Text>
                                <Text className={`${textColor} text-2xl font-semibold`}>Thomas</Text>
                            </View>
                            <View className='mt-1'>
                                <Image
                                    source={images.logoSmall}
                                    className='w-10 h-10'
                                    resizeMode='contain' />
                            </View>
                        </View>
                        <Searchinput />

                        <Text className={`${textColor}`}>Latest videos</Text>
                        <Trendings posts={tredata} />
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
};

export default Home;
