import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { Feather, FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Alert, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LoadingScreen from '../components/loading-screen';
import ScrollableKeyBoardView from '../components/scrollableKeyBoardView';
import { styles } from '../constants/mobile/mobile_forum';

export default function SignIn() {
  const router = useRouter();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const teamRef = useRef("");

  const [hidPass, setHidPass] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if(!emailRef.current || !passwordRef.current || !nameRef.current || !teamRef.current) {
      Alert.alert('Sign Un', 'Please fill all the fields!')
      return
    }

    // Sign Up process
    setLoading(true)

    setLoading(false)
  }
  return (
    <ScrollableKeyBoardView style={styles.container}>
      <StatusBar style="auto" />
      <ThemedView>
        <Image style={styles.image_sign_up} source={require('../assets/images/sign-up-illustration.png')}/>
      </ThemedView>
      {/* Inputs View */}
      <ThemedView style={{gap:10}}>
        <ThemedText style={{textAlign: 'center', paddingBottom: hp(1)}} type='title'>Sign Up</ThemedText>
        {/* signIn inputs*/}
        <ThemedView style={styles.input_background}>
            <Feather name="user" size={hp(2.2)} style={{margin: 'auto', marginLeft: 0}}/>
            <TextInput style={styles.inputs} 
                onChangeText={value => nameRef.current = value}
                placeholder='Full Name' placeholderTextColor={'#5f5f5f'}
                textContentType='name'
                autoCapitalize="words"
                autoCorrect={false}/>
        </ThemedView>
        <ThemedView style={styles.input_background}>
            <Octicons name="mail" size={hp(2.7)} style={{margin: 'auto', marginLeft: 0}}/>
            <TextInput style={styles.inputs} 
                onChangeText={value => emailRef.current = value}
                placeholder='Email Address' placeholderTextColor={'#5f5f5f'}
                keyboardType="email-address" // Shows email-optimized keyboard
                textContentType="emailAddress" // Enables autofill on iOS
                autoCapitalize="none"
                autoCorrect={false}/>
        </ThemedView>
        <ThemedView style={styles.input_background}>
            <Octicons name="lock" size={hp(2.7)} style={{margin: 'auto', marginLeft: 0}}/>
            <TextInput style={styles.inputs} 
                onChangeText={value => passwordRef.current = value}
                placeholder='Password' placeholderTextColor={'#5f5f5f'}
                secureTextEntry={hidPass}
                textContentType="password" // Enables autofill on iOS
                autoCapitalize="none"
                autoCorrect={false}/>
              <TouchableOpacity style={styles.password_eye} onPress={() => setHidPass(!hidPass)}>
              <Ionicons
                name={hidPass ? 'eye-off' : 'eye'}
                size={24}
                color="gray"
              />
              </TouchableOpacity>
        </ThemedView>
        <ThemedView style={styles.input_background}>
            <FontAwesome5 name="dragon" size={hp(2.2)} style={{margin: 'auto', marginLeft: 0}}/>
            <TextInput style={styles.inputs} 
                onChangeText={value => teamRef.current = value}
                placeholder='Dragon Boat Team' placeholderTextColor={'#5f5f5f'}
                autoCapitalize="none"
                autoCorrect={false}/>
        </ThemedView>

        <ThemedView style={{marginTop:2}}>
          {
            loading? (
              <ThemedView>
                <LoadingScreen size={hp(10)} loading={loading} />
              </ThemedView>
            ):(
              <ThemedView>
                <TouchableOpacity style={styles.submit_button} onPress={handleSignUp}>
                  <ThemedText style={styles.submit_text} type='title'>Sign Up</ThemedText>
                </TouchableOpacity>
              </ThemedView>
              )
          }
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.more_options_container}>
        <ThemedText style={styles.grey_small_text}>Don't have an account?   </ThemedText>
        <Pressable onPress={() => router.replace('/signIn')}>
          <ThemedText style={styles.more_option_text}>Log In</ThemedText>
        </Pressable>
      </ThemedView>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link"> TESTING FOR NOW Go to home screen</ThemedText>
      </Link>
    </ScrollableKeyBoardView>
  );
}
