import { BlurView } from "expo-blur";
import { StyleSheet, Text, TextInput, Pressable } from "react-native";

export default function Input({ onPress, value, onChangeText, placeholder }) {
    return (
    <BlurView intensity={30} style={styles.input_container}>
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            style={styles.input}
        />
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.button_text}>Search</Text>
      </Pressable>
    </BlurView>
    );
}

const styles = StyleSheet.create({
    input_container: {
        width: '50%',
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 10
    },
    input: {
        width: '70%',
        textAlign: 'center',
        marginTop: 15,
        borderWidth: 1,
        height: 35,
        padding: 5,
        borderRadius: 5,
        color: 'white',
        borderColor: 'grey'
    },
    button: {
        elevation: 3,
        borderRadius: 4,

    },
    button_text: {
        fontWeight: '600',
        fontSize: 24,
        color: 'white',
        letterSpacing: 0.3,
        padding: 10
    }
});