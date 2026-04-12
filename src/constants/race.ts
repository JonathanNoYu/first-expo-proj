import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export type RaceData = { 
    schedule_timestamp: string; 
    race_num: number; 
    completed_time_ms: string[]; 
    teams: string[]
    background_color: string
}

export const race_styles = StyleSheet.create({
  raceDataContianer: {
    borderRadius: 10,
    padding: hp(1),
    backgroundColor: '#808080'
  },
  raceAndSchedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: wp(1),
    paddingRight: wp(1),
    borderRadius: 2,
  },
  timesAndTeam: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#808080'
  },
});