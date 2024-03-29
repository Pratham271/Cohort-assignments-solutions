import { atom, selector } from "recoil";


export const networkAtom = atom({
    key: 'networkAtom',
    default: 104
})

export const jobsAtom = atom({
    key: 'jobsAtom',
    default: 0
})

export const notificationsAtom = atom({
    key: 'notificationsAtom',
    default: 12
})

export const messagingAtom = atom({
    key: 'messagingAtom',
    default: 0
})

export const totalNotificationsCounter = selector({
    key: "totalNotificationsCounter",
    get:  ({get}) => {
        const networkCount = get(networkAtom)
        const jobsCount = get(jobsAtom)
        const notificationsCount = get(notificationsAtom)
        const messagingCount = get(messagingAtom)

        return networkCount + jobsCount + notificationsCount + messagingCount
    }
})