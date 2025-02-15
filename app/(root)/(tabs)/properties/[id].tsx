import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Property = () => {
    // Your property details component goes here. For now, it's a placeholder.

    // destructure the ID
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>Property {id}</Text>
        </View>
    );
};

export default Property;
