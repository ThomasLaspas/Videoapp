import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
interface Props {
    title: string;
    isLoading: boolean;
    containerStyles: string
    handlePress: any
}
const CustomButton = ({
    title,
    handlePress,
    containerStyles,
    isLoading,
}: Props) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-custom-red rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""
                }`}
            disabled={isLoading}
        >
            <Text className={`text-primary font-psemibold text-lg `}>
                {title}
            </Text>

            {isLoading && (
                <ActivityIndicator
                    animating={isLoading}
                    color="#fff"
                    size="small"
                    className="ml-2"
                />
            )}
        </TouchableOpacity>
    );
};

export default CustomButton;