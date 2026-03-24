import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:hp(8)
  },
  input_background: {
    flexDirection: 'row',
    gap: 4,
    width: wp(85),
    height: hp(5),
    backgroundColor: '#aaaaaa',
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  inputs: {
    fontSize: hp(2),
    flex: 1,
    fontWeight: 'semibold',
    color: "#404040",
  },
  grey_small_text: {
    fontSize: hp(1.8),
    textAlign: 'right',
    color: "#5f5f5f",
  },
  submit_button: {
    height: hp(6.5),
    backgroundColor: '#624494',
    borderRadius: 10,
    justifyContent: 'center',
  },
  submit_text: {
    height: hp(3.8),
    color: '#FFFFFF',
    fontWeight: 'bold',
    letterSpacing: wp(0.6),
    textAlign: 'center',
  },
  more_options_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(1)
  },
  more_option_text: {
    fontSize: hp(1.8),
    fontWeight: 'semibold',
    color: '#624494',
  },
  password_eye: {
    justifyContent: 'center',
    marginRight: hp(0.85),
  },
  image_sign_up: {
    alignSelf:'center',
    height:hp(31),
    width: wp(85),
    marginBottom: hp(2),
  },
  image_log_in: {
    alignSelf:'center',
    gap: 12,
    height:hp(35),
    width: wp(85),
    marginBottom: hp(2),
    paddingTop: 0,
    marginTop: 0
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});