import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import React from 'react'
import images from '@/constants/images'
import icons from '@/constants/icons'

const SignIn = () => {

    const handleLogin = () => {
        // TODO: Implement Google OAuth and login process.
        console.log('Google OAuth login clicked.')
    }

    return (
        // SafeAreaView - ensures that you show safely fits within the area of the screen.
        <SafeAreaView className='bg-white h-full'>
            {/* Allow the users to scroll */}
            <ScrollView contentContainerClassName='h-full'>
                <Image source={images.onboarding} className='w-full h-4/6' resizeMode="contain"/>
                <View className='px-10'>
                    <Text className='text-base text-center uppercase font-rubik text-black-200'>Welcome to JasVin Homes</Text>
                    <Text className='text-3xl font-rubik-bold text-black-300 text-center mt-2'>
                        Let's Get you Closer to {"\n"}
                        <Text className='text-primary-300'>Our Ideal Homes</Text>
                    </Text>
                    <Text className='text-lg font-rubik text-black-200 text-center mt-12'>
                        Login to view your real estates with Google
                    </Text>

                    {/* Button */}
                    <TouchableOpacity onPress={handleLogin} className='bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5'>
                        <View className='flex flex-row items-center justify-center'>
                            <Image 
                                source={icons.google} 
                                className='w-5 h-5'
                                resizeMode='contain'
                            />
                            <Text className='text-lg font-rubik-medium text-black-300 ml-2'>Continue with Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn