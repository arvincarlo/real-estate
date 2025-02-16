import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";

import * as Linking from "expo-linking";

import { openAuthSessionAsync } from 'expo-web-browser';

export { Client } from "react-native-appwrite";

export const config = {
    platform: 'com.arvin.realestate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)

// Define the functionalities to use from appwrite
export const avatar = new Avatars(client);
export const account = new Account(client);

// Create a new action
export async function login() {
    try {
        // Handle the oAuth response- redirect URI
        const redirectUri = Linking.createURL('/');

        // request the oauth token from appwrite
        const response = await account.createOAuth2Token(OAuthProvider.Google, redirectUri);

        if (!response) throw new Error('Failed to login');

        // Create browswer session
        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        )

        if (browserResult.type !== "success") throw new Error('Failed to login');

        // Parse to extract query parameters
        const url = new URL(browserResult.url);

        const secret = url.searchParams.get('secret')?.toString();
        const userId = url.searchParams.get('userId')?.toString();

        if (!secret || !userId) throw new Error('Failed to login');

        const session = await account.createSession(userId, secret);

        if (!session) throw new Error('Failed to create a session');

        return true;

    } catch (error) {
        console.error(error);
        return false;
    }
}

// Create logout function
export async function logout() {
    try {
        await account.deleteSession('current');
        return true;
    } catch(error) {
        console.error(error);
        return false;
    }
}

// Create fetch information about the current use session
export async function getUser() {
    try {
        const response = await account.get();

        // form a new use avatar
        if(response.$id) {
            const userAvatar = avatar.getInitials(response.name);

            return {
                ...response,
                avatar: userAvatar.toString(),
            }
        }
        return true;
    } catch(error) {
        console.error(error);
        return null;
    }
}


