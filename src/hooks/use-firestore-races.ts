import { thisYear } from "@/constants/dates"
import { db_firebase } from "@/constants/firestore"
import { collection, DocumentData, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"

/**
 * 
 * Assume if there is no entries in completed_time_ms Array the race is only scheduled
 * if there is any entry in completed_time_ms array the race is complete and in order of completion
 * missing entries is DNF.
 * 
 * Format the data in a useStates
    Race Entity Diaagram for firestore
        race_num:             Int64
        teams:                <Array<String>>
        scheduled_timestampe: <timestamp>
        completed_time_ms:    <Array<Int64>>

        completed_time_ms is in the same order as team i.e. 
        teams: ["team1", "team2"]
        completed_time_ms: [150000, 138000]
        means: team1 completed the race in 150000 milliseconds, team2 in 1380000 milliseconds
 * 
 * @returns races
 */
export const useFirestoreRaces = () => {
    const [races, setRaces] = useState<DocumentData[]>([])

    /**
     * returns next uncompleted race from firestore otherwise it returns null (i.e. returns null if all races are completed)
     * 
     * @returns 
     */
    const nextUpcomingRace = (teamName: (string | undefined) = undefined): DocumentData | null => {
        for (let i = 0; i < races.length; i++) {
            let timeArray = races[i]?.completed_time_ms
            if (timeArray && timeArray.length != 0) {
                let nextRace = races[i - 1]
                // Checks that index is not out of bounds and if teamname exists check if it is in the nextRace teams array.
                if (i - 1 != 0 && (!teamName || nextRace.teams.include(teamName))) {
                    return nextRace
                }
            }
        }
        return null
    }

    useEffect(() => {
        const q = query(collection(db_firebase, "races"),
            where("schedule_timestamp", ">=", thisYear),
            orderBy("schedule_timestamp", 'desc'));
        const unsub = onSnapshot(q, (querySnapshot) => {
          let allRaces = querySnapshot.docs.map((doc) => doc.data())
          setRaces([...allRaces])
          })
          return unsub
        }, [])
    return {
        races, 
        nextUpcomingRace,
    }
}