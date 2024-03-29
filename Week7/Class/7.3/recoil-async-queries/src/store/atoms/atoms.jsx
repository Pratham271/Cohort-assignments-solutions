import axios from "axios";
import { atom, selector } from "recoil";


export const networkAtom = atom({
    key: "networkAtom",
    default: selector({
        key: "networkAtomSelector",
        get : async() => {
            await new Promise(r => setTimeout(r,5000))
            const res = await axios.get("https://sum-server.100xdevs.com/notifications")
            return res.data
        }
    })
})

export const totalNotificationsCount = selector({
    key: "totalNotificationsCount",
    get: ({get}) => {
        const allNotifications = get(networkAtom)
        return allNotifications.network + allNotifications.jobs + allNotifications.notifications + allNotifications.messaging
    }
}) 