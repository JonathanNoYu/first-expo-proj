import { ThemedView } from "@/components/themed-view"
import { general_style } from "@/constants/mobile/general"
import { useFirestoreRaces } from "@/hooks/use-firestore-races"
import { useFirestoreUserData } from "@/hooks/use-firestore-user-date"

export default function PaddlerPage() {
     // let races = [{"completed_time_ms": [], "race_num": 5, "schedule_timestamp": {seconds: 10, nanoseconds: 20}, "teams": ["team1"]}, 
     //           {"completed_time_ms": [], "race_num": 4, "schedule_timestamp": {seconds: 10, nanoseconds: 20}, "teams": ["team1"]}, 
     //           {"completed_time_ms": [], "race_num": 3, "schedule_timestamp": {seconds: 10, nanoseconds: 20}, "teams": ["team1"]}, 
     //           {"completed_time_ms": [], "race_num": 2, "schedule_timestamp": {seconds: 10, nanoseconds: 20}, "teams": ["team1"]}, 
     //           {"completed_time_ms": [], "race_num": 0, "schedule_timestamp": {seconds: 10, nanoseconds: 20}, "teams": ["team1"]}, 
     //           {"completed_time_ms": ["150000", "138000"], "race_num": 0, "schedule_timestamp": {seconds: 10, nanoseconds: 20}, "teams": ["team1", "team2"]}]
     const { nextUpcomingRace } = useFirestoreRaces()
     const { userData } = useFirestoreUserData()
     const nextRace = nextUpcomingRace('team1')
    return(
     <ThemedView style={general_style.container}>
          {
               
          }
     </ThemedView>
    )
}