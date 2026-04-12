import { race_styles, raceData } from "@/constants/race"
import { msToTime } from "@/scripts/time-utility"
import { Timestamp } from "firebase/firestore"
import { ScrollView } from "react-native"
import { ThemedText } from "./themed-text"
import { ThemedView } from "./themed-view"

export type RaceListDisplayProps = {
    races: raceData[]
}

export type RaceDataDisplayProps = {
    race: raceData
}

export function RaceListDisplay({ races }: RaceListDisplayProps) {
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{gap: 20}}>
            {
                races.map((race, index) => {
                    return <RaceDataDisplay race={race} key={index}/>
                })
            }
        </ScrollView>
    )
}

export function RaceDataDisplay({ race } : RaceDataDisplayProps) {
    let schedule_timestamp = new Timestamp(race?.schedule_timestamp.seconds, race?.schedule_timestamp.nanoseconds).toDate().toLocaleString(undefined, {
        year: '2-digit',
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    })
    let raceNum: number = race?.race_num
    let timeArray: string[] = race?.completed_time_ms
    let teamArray: string[] = race?.teams
    let raceColor = (timeArray && timeArray.length == 0) ? "#9e9156" : "#49b42e"
    return (
        <ThemedView style={{ ...race_styles.raceDataContianer }}>
            <ThemedView style={{ ...race_styles.raceAndSchedule, backgroundColor: raceColor }}>
                <ThemedText>Race {raceNum}</ThemedText>
                <ThemedText>{schedule_timestamp}</ThemedText>
            </ThemedView>
            {
                teamArray.map((team, index: number) => {
                    let completedTimeOrDNF;
                    if (timeArray.length > 0) { // Check if Race has started yet
                        completedTimeOrDNF = timeArray[index] && timeArray[index] != 'DNF' ? msToTime(timeArray[index]) : 'DNF'
                    } else {
                        completedTimeOrDNF = "TBD" // Yet to Race
                    }
                    return (
                        <ThemedView key={raceNum + ' ' + index} style={race_styles.timesAndTeam}>
                            <ThemedText>{team}</ThemedText>
                            <ThemedText>{completedTimeOrDNF}</ThemedText>
                        </ThemedView>
                    )
                })
            }
        </ThemedView>
    )
}