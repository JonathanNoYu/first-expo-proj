import { Button } from 'react-native';

import { RaceListDisplay } from '@/components/race-data-display';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { thisYear } from '@/constants/dates';
import { db_firebase } from '@/constants/firestore';
import { general_style } from '@/constants/mobile/general';
import { Fonts } from '@/constants/theme';
import { Timestamp, addDoc, collection } from 'firebase/firestore';

export default function RaceDataPage() {
  // const races = useFirestoreRaces()
  let races = [{"completed_time_ms": [], "race_num": 5, "schedule_timestamp": {seconds: 10, nanoseconds: 20}, "teams": ["team1"]}, 
               {"completed_time_ms": [], "race_num": 4, "schedule_timestamp": {seconds: 10, nanoseconds: 20}, "teams": ["team1"]}, 
               {"completed_time_ms": [], "race_num": 3, "schedule_timestamp": {seconds: 10, nanoseconds: 20}, "teams": ["team1"]}, 
               {"completed_time_ms": [], "race_num": 2, "schedule_timestamp": {seconds: 10, nanoseconds: 20}, "teams": ["team1"]}, 
               {"completed_time_ms": [], "race_num": 0, "schedule_timestamp": {seconds: 10, nanoseconds: 20}, "teams": ["team1"]}, 
               {"completed_time_ms": ["150000", "138000"], "race_num": 0, "schedule_timestamp": {seconds: 10, nanoseconds: 20}, "teams": ["team1", "team2"]}]

  const testingAddNewRace = async () => {
    let zeroOrOne = Math.floor(Math.random());
    let randomTeam = zeroOrOne == 0 ? "team1" : "team2"
    console.log(randomTeam)
    const res = await addDoc(collection(db_firebase, "races"), 
    {
      race_num: races?.length,
      schedule_timestamp: Timestamp.now(),
      completed_time_ms: [],
      teams: [randomTeam],
    })
  }
  return (
    <ThemedView style={general_style.container}>
      <ThemedView style={general_style.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          {thisYear.getUTCFullYear()} Races
        </ThemedText>
      </ThemedView>
      <Button title="Add fake race" onPress={testingAddNewRace} />
      <RaceListDisplay races={races}/>
    </ThemedView>
  );
}
