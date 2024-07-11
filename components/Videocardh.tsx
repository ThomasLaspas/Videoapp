
import { useState } from "react";
import { ResizeMode, Video, AVPlaybackStatus, AVPlaybackSource } from "expo-av";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { icons } from "../constants";
interface Props {
    id: string
    video: string;
    thumbnail: string
    active: any
}
const zoomIn = {
    0: {
        scale: 0.9,
    },
    1: {
        scale: 1.1,
    },
};

const zoomOut = {
    0: {
        scale: 1.1,
    },
    1: {
        scale: 0.9,
    },
};
const VideoCardh = ({ thumbnail, video, active, id }: Props) => {

    const [play, setPlay] = useState(false);
    const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if (status.isLoaded && status.didJustFinish) {
            setPlay(false);
        }
    };

    return (
        <Animatable.View
            className="items-center px-4 w-[200px]"
            animation={active === id ? zoomIn : zoomOut}
            duration={500}
        >


            {play ? (
                <Video
                    source={{ uri: video }}
                    className="w-[200px] h-60 rounded-2xl mt-3"
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    shouldPlay
                    onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                />
            ) : (
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                    className="w-full h-60 rounded-2xl mt-3  flex justify-center items-center"
                >
                    <Image
                        source={{ uri: thumbnail }}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode="cover"
                    />


                </TouchableOpacity>
            )}
        </Animatable.View>
    );
};

export default VideoCardh;
