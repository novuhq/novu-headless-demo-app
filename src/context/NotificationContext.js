import {useContext,createContext,useEffect,useState,useRef} from "react"
import { HeadlessService } from '@novu/headless';

const NotificationContext = createContext();


const NotificationProvider = ({children}) => {
    // const [initializeHeadless,setInitializeHeadless]=useState(null);
    const [notifications,setNotifications]=useState([]);
    const [unseenCount, setUnseenCount] = useState(0);
    const [unreadCount, setUnreadCount] = useState(0);
  
    const headlessServiceRef = useRef(null);


    useEffect(()=>{
        // Connect to the real-time messaging system or WebSocket server
        const socket = new WebSocket('ws://localhost:3000/');

        // Add event listeners to handle real-time updates
        socket.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'notification') {
            handleRealTimeNotification(data.notification);
            } else if (data.type === 'unseenCount') {
            handleUnseenCountChange(data.count);
            } else if (data.type === 'unreadCount') {
            handleUnreadCountChange(data.count);
            }
        });

        // Function to handle real-time updates for new notifications
    const handleRealTimeNotification = (notification) => {
        setNotifications((prevNotifications) => [...prevNotifications, notification]);
      };
  
      // Function to handle real-time updates for unseen count
      const handleUnseenCountChange = (count) => {
        setUnseenCount(count);
      };
  
      // Function to handle real-time updates for unread count
      const handleUnreadCountChange = (count) => {
        setUnreadCount(count);
      };
  





        const headlessService = new HeadlessService({
            applicationIdentifier: 'SWMw97ec1ZNA',
            subscriberId: '555',
            subscriberHash: '66fb7cd276fe65be995c1d8e30d87803e4f9a3f3311db6d90f524c5983a522b5',
          });
          
          headlessService.initializeSession({
            listener: (res)=> {
                console.log("res in listner",res)
            },
            onSuccess: (session) => {
                console.log("session",session);
                // setInitializeHeadless(session);
                headlessServiceRef.current = headlessService;


                headlessService.fetchUserPreferences({
                    listener: (result) => {
                      console.log(result);
                    },
                    onSuccess: (settings) => {
                      console.log("user preference",settings);
                    },
                    onError: (error) => {
                      console.error(error);
                    },
                  });

                headlessService.fetchNotifications({
                    listener: ({ data, error, isError, isFetching, isLoading, status }) => {
                      console.log({ data, error, isError, isFetching, isLoading, status });
                      // Handle the state of the fetching process and errors here.
                    },
                    onSuccess: (response) => {
                    //   console.log(response.data, response.page, response.totalCount, response.pageSize);
                      // Handle the fetched notifications here.
                      console.log("response",response.data);
                      setNotifications(response.data); // Store notifications in the state
                    },
                    page: 1, // page number to be fetched
                  });


            },
            onError: (error) => {
              console.log("headlessSice error:",error);
            },
          })
                    
    },[])

      // Function to mark notifications as read
  const markNotificationsAsRead = (messageIds) => {
    if (!Array.isArray(messageIds)) {
      messageIds = [messageIds];
    }

    const headlessService = headlessServiceRef.current;

    if(headlessService){
        headlessService.markNotificationsAsRead({
          messageId: messageIds,
          listener: (result) => {
            console.log(result);
          },
        //   onSuccess: (message) => {
        //     console.log('Notification marked as read:', message);
        //     // Implement any additional handling after marking notifications as read
        //   },
          onError: (error) => {
            console.error('Error marking notifications as read:', error);
            // Implement error handling if needed
          },
        });
    }

  };

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
        <NotificationContext.Provider value={{notifications,markNotificationsAsRead,markAllMessagesAsRead,unreadCount,unseenCount}}>
            {children}
        </NotificationContext.Provider>
    )
}

const useNotification = () => useContext(NotificationContext);

export { useNotification, NotificationProvider}; 