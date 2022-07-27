import {
    useContext,
    createContext,
    useState,
    useEffect,
    useCallback,
} from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tags, setTags] = useState([]);
    const [cookie, setCookie, removeCookie] = useCookies(["cookie-name"]);

    const getUser = () => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
        setLoading(false);
    };
    const getAllEvents = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/event");
            setEvents(data.data);
            getTags();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }, []);

    const checkIsAdmin = (id) => {
        return id === user.userId;
    };

    const getTags = async () => {
        try {
            const { data } = await axios("/tags");
            setTags(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getEvent = useCallback(async (id) => {
        try {
            const { data } = await axios.get(`/event/${id}`, {
                withCredentials: true,
            });
            return data.data;
        } catch (error) {
            console.log(error);
        }
    }, []);
    const logOut = () => {
        setUser(null);
        removeCookie("jwt");
        localStorage.clear();
    };

    useEffect(() => {
        getAllEvents();
        getUser();
    }, [getAllEvents]);

    return (
        <AppContext.Provider
            value={{
                user,
                events,
                getEvent,
                loading,
                getAllEvents,
                tags,
                getUser,
                setEvents,
                logOut,
                checkIsAdmin,
                setLoading,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => useContext(AppContext);

export default AppProvider;
