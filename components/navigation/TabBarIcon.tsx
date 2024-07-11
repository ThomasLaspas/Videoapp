import { Colors } from "@/constants/Colors";
import { Image, ImageSourcePropType, View, Text, useColorScheme } from "react-native";

interface Props {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean
}
export function TabBarIcon({ icon, color, name, focused }: Props) {

  const activeTextColor = focused ? 'text-custom-red' : 'text-white';
  return <View className="text-center items-center  mt-5 gap-1">
    <Image source={icon}
      resizeMode="contain"
      tintColor={color}
      className="w-5 h-5" />
    <Text className={`${activeTextColor}`}>{name}</Text>
  </View>
}

