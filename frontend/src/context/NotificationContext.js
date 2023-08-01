import { useContext, createContext, useEffect, useState, useRef, useCallback } from "react"
import { HeadlessService } from '@novu/headless';

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {

    const [notifications, setNotifications] = useState([]);
    const [active, setActive] = useState(false);

    const headlessServiceRef = useRef(null);
    const [pageNum, setPageNum] = useState(0);

    const fetchNotifications = useCallback(() => {
        const headlessService = headlessServiceRef.current;
        if (headlessService) {
            headlessService.fetchNotifications({
                listener: ({ data, error, isError, isFetching, isLoading, status }) => {
                    console.log({ data, error, isError, isFetching, isLoading, status });
                    // Handle the state of the fetching process and errors here.
                },
                onSuccess: (response) => {

                    // Handle the fetched notifications here.
                    console.log("response from context", response);
                    setNotifications(response.data); // Store notifications in the state
                },
                page: pageNum, // page number to be fetched
            });
        }
    }, [pageNum])


    useEffect(() => {

        const headlessService = new HeadlessService({
            applicationIdentifier: 'SWMw97ec1ZNA',
            subscriberId: '12345',
        });

        headlessService.initializeSession({
            listener: (res) => {
                console.log("res in listner", res)
            },
            onSuccess: (session) => {
                console.log("session", session);
                // setInitializeHeadless(session);
                headlessServiceRef.current = headlessService;
                fetchNotifications();


            },
            onError: (error) => {
                console.log("headlessSice error:", error);
            },
        })

    }, [fetchNotifications])

    // Function to mark notifications as read
    const markNotificationsAsRead = (messageIds) => {
        if (!Array.isArray(messageIds)) {
            messageIds = [messageIds];
        }

        const headlessService = headlessServiceRef.current;

        if (headlessService) {
            headlessService.markNotificationsAsRead({
                messageId: messageIds,
                listener: (result) => {
                    console.log(result);
                },
                onError: (error) => {
                    console.error('Error marking notifications as read:', error);
                },
            });
        }

    };

    const deleteNotification = (messageId) => {
        // if (!Array.isArray(messageIds)) {
        //     messageIds = [messageIds];
        // }
        const headlessService = headlessServiceRef.current;
        if (headlessService) {
            headlessService.removeNotification({
                messageId: messageId,
                listener: function (result) {
                    console.log('deleteeee', result);
                    // setNotifications((prevNotifications) =>
                    //     prevNotifications.filter((notification) => notification.id !== messageId)
                    // );
                },
                onSuccess: function (message) {
                    console.log(message);
                },
                onError: function (error) {
                    console.error(error);
                },
                messageIds: 'messageOne',
            });

        }
    }

    const markAllMessagesAsRead = (feedId) => {
        const headlessService = headlessServiceRef.current;

        headlessService.markAllMessagesAsRead({
            listener: (result) => {
                console.log(result);
                // Handle the result of marking all messages as read
                // You can update the state or perform other actions here
            },
            onError: (error) => {
                console.error('Error marking all messages as read:', error);
                // Implement error handling if needed
            },
            feedId: feedId, // Pass the feed ID here, it can be an array or a single ID
        });
    };


    return (
        <NotificationContext.Provider value={{ notifications, markNotificationsAsRead, markAllMessagesAsRead, deleteNotification, pageNum, setPageNum, fetchNotifications, active, setActive }}>
            {children}
        </NotificationContext.Provider>
    )
}

const useNotification = () => useContext(NotificationContext);

export { useNotification, NotificationProvider };
