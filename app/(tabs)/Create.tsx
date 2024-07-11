import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    View,
    Text,
    Alert,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
interface FormData {
    title: string;
    prompt: string;
    video: any;
    thumnail: any;
    userId: string;
}
import { icons } from "../../constants";
import { createVideoPost } from "../../lib/appwrite";
import CustomButton from "@/components/CustomButton"
import useAuth from "../../context/GlobalProvider";
import FormField from "@/components/FormField";

const Create = () => {
    const { authState, user } = useAuth();
    const [uploading, setUploading] = useState(false);
    const [title, settitle] = useState<string>('')
    const [prompt, setprompt] = useState<string>('')
    const [video, setvideo] = useState<any>(null)
    const [thumnail, setthubnail] = useState<any>(null)

    const openPicker = async (selectType: any) => {
        const result = await DocumentPicker.getDocumentAsync({
            type:
                selectType === "image"
                    ? ["image/png", "image/jpg"]
                    : ["video/mp4", "video/gif", "video/MOV"],
        });

        if (!result.canceled) {
            if (selectType === "image") {

                setthubnail(result.assets[0])
            }
            if (selectType === "video") {

                setvideo(result.assets[0])
            }
        } else {
            setTimeout(() => {
                Alert.alert("Document picked", JSON.stringify(result, null, 2));
            }, 100);
        }
    };

    const submit = async () => {
        if (
            prompt === "" ||
            title === "" ||
            !thumnail ||
            !video
        ) {
            return Alert.alert("Please provide all fields");
        }

        setUploading(true);
        try {
            const formData: FormData = {
                title,
                prompt,
                video,
                thumnail,
                userId: user.$id, // Pass the user ID
            };
            await createVideoPost(formData);

            Alert.alert("Success", "Post uploaded successfully");
            router.push("/Home");
        } catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setprompt('')
            setthubnail(null)
            setvideo(null)
            settitle('')
            setUploading(false);
        }
    };

    return (
        <SafeAreaView className=" h-full">
            <ScrollView className="px-4 my-6 h-full">
                <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

                <FormField
                    title="Video Title"
                    value={title}
                    placeholder="Give your video a catchy title..."
                    handleChangeText={(e: any) => settitle(e)}
                    otherStyles="mt-10"
                />

                <View className="mt-7 space-y-2">
                    <Text className="text-base text-gray-100 font-pmedium">
                        Upload Video
                    </Text>

                    <TouchableOpacity onPress={() => openPicker("video")}>
                        {video ? (
                            <Video
                                source={{ uri: video.uri }}
                                className="w-full h-64 rounded-2xl"
                                useNativeControls
                                resizeMode={ResizeMode.COVER}
                                isLooping
                            />
                        ) : (
                            <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                                    <Image
                                        source={icons.upload}
                                        resizeMode="contain"
                                        alt="upload"
                                        className="w-1/2 h-1/2"
                                    />
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <View className="mt-7 space-y-2">
                    <Text className="text-base text-gray-100 font-pmedium">
                        Thumbnail Image
                    </Text>

                    <TouchableOpacity onPress={() => openPicker("image")}>
                        {thumnail ? (
                            <Image
                                source={{ uri: thumnail.uri }}
                                resizeMode="cover"
                                className="w-full h-64 rounded-2xl"
                            />
                        ) : (
                            <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                                <Image
                                    source={icons.upload}
                                    resizeMode="contain"
                                    alt="upload"
                                    className="w-5 h-5"
                                />
                                <Text className="text-sm text-gray-100 font-pmedium">
                                    Choose a file
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <FormField
                    title="AI Prompt"
                    value={prompt}
                    placeholder="The AI prompt of your video...."
                    handleChangeText={(e: any) => setprompt(e)}
                    otherStyles="mt-7"
                />

                <CustomButton
                    title="Submit & Publish"
                    handlePress={submit}
                    containerStyles="mt-7"
                    isLoading={uploading}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Create;