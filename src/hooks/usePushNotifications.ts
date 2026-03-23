import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from 'expo-notifications';
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

export interface PushNotificationState {
  expoPushToken?: Notifications.ExpoPushToken;
  notification?: Notifications.Notification;
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: true,
        shouldShowAlert: true,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export const usePushNotifications = (): PushNotificationState => {
    const [expoPushToken, setExpoPushToken] = useState<Notifications.ExpoPushToken | undefined>( undefined);
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);

    //prevents duplicate navigations when a notification is tapped
    const isNavigatingRef = useRef(false);
    const router = useRouter();

    async function registerForPushNotificationsAsync() : Promise<Notifications.ExpoPushToken | undefined> {
        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== "granted") {
              const { status } = await Notifications.requestPermissionsAsync();
              finalStatus = status;
            }
            let token;
            try {
                const projectId =
                Constants.expoConfig?.extra?.eas?.projectId ??
                Constants.easConfig?.projectId;
                if (!projectId) {
                    throw new Error('Project ID not found');
                }
                token = await Notifications.getExpoPushTokenAsync()
            } catch (e) {
                console.error('Failed to get notification tokens:', e);
            }

            if (finalStatus !== "granted") {
                return;
            }
            if (Platform.OS === "android") {
                await Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: "#FF231F7C",
                });
            }
            return token;
        }
        return undefined
    }

    const handleNotificationResponse = useCallback(
        async (response: Notifications.NotificationResponse) => {
            // Prevent multiple navigations
            if (isNavigatingRef.current) return;
            const data = response.notification.request.content.data;
            if (!data?.screen) return;
            isNavigatingRef.current = true;
            try {
                router.push('/app');
            } catch (error) {
                console.error("Error handling notification tap:", error);
            } finally {
                // Reset flag after a short delay
                setTimeout(() => {
                    isNavigatingRef.current = false;
                }, 1000);
            }
        },[router]
    );

    useEffect(() => {
        // Find better way to handle error here.
        registerForPushNotificationsAsync()
        .then(token => setExpoPushToken(token))
        .catch((error: any) => console.log(error));

        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            handleNotificationResponse(response)
        });

        return () => {
            notificationListener.remove();
            responseListener.remove();
        };
    }, [handleNotificationResponse]);

    return {
        expoPushToken,
        notification,
    };
}