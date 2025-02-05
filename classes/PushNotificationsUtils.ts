const EXPO_PUSH_NOTIFICATION_HOST = 'https://exp.host/--/api/v2/push';
export type PushNotificationParams<T = any> = {
  title: string;
  body: string;
  data?: T;
};

async function sendPushNotification(
  notificationId: string | string[],
  notification: PushNotificationParams
) {
  const notificationIds = [notificationId].flat();

  await Promise.all(
    notificationIds.map(async (notificationId) => {
      const message = {
        to: notificationId,
        sound: 'default',
        ...notification,
      };
      await fetch(`${EXPO_PUSH_NOTIFICATION_HOST}/send?useFcmV1=true`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
    })
  );
}

export const PushNotificationsUtils = {
  EXPO_PUSH_NOTIFICATION_HOST,
  sendPushNotification,
};
