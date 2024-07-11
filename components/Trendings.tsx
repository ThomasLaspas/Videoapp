import { FlatList } from 'react-native'
import React, { useState } from 'react'
import VideoCardh from './Videocardh';
interface Props {
    posts: any
}

const Trendings = ({ posts }: Props) => {
    const [activeItem, setActiveItem] = useState<any>(posts[0]);

    const viewableItemsChanged = ({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }
    };
    return (
        <FlatList data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => <VideoCardh
                thumbnail={item.thumbmeil}
                video={item.video}
                active={activeItem}
                id={item.$id}
            />}
            horizontal
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70,
            }}
            contentOffset={{ x: 170, y: 0 }}

        />

    )
}

export default Trendings