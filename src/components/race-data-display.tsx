import { race_styles, RaceData } from "@/constants/race"
import { msToTime } from "@/scripts/time-utility"
import { ScrollView } from "react-native"
import { ThemedText } from "./themed-text"
import { ThemedView } from "./themed-view"

export type RaceListDisplayProps = {
    races: RaceData[]
}

export type RaceDataDisplayProps = {
    race: RaceData
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
    let timeArray = race.completed_time_ms
    return (
        <ThemedView style={{ ...race_styles.raceDataContianer }}>
            <ThemedView style={{ ...race_styles.raceAndSchedule, backgroundColor: race.background_color }}>
                <ThemedText>Race {race.race_num}</ThemedText>
                <ThemedText>{race.schedule_timestamp}</ThemedText>
            </ThemedView>
            {
                race.teams.map((team, index: number) => {
                    let completedTimeOrDNF;
                    if (timeArray.length > 0) { // Check if Race has started yet
                        completedTimeOrDNF = timeArray[index] && timeArray[index] != 'DNF' ? msToTime(timeArray[index]) : 'DNF'
                    } else {
                        completedTimeOrDNF = "TBD" // Yet to Race
                    }
                    return (
                        <ThemedView key={race.race_num + ' ' + index} style={race_styles.timesAndTeam}>
                            <ThemedText>{team}</ThemedText>
                            <ThemedText>{completedTimeOrDNF}</ThemedText>
                        </ThemedView>
                    )
                })
            }
        </ThemedView>
    )
}