import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from './constants/colors';

const Features = ({ onDocumentsPress, onAbhaPress }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.featureRow}
        onPress={() => router.push('/featureScreens/hospitalsNearby')}
        activeOpacity={0.8}
      >
        <Ionicons name="medkit-outline" size={26} color={Colors.lightBlue} style={styles.icon} />
        <Text style={styles.text}>Hospitals Nearby</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.featureRow} 
        onPress={() => router.push('/featureScreens/medicalRecords')}
        activeOpacity={0.8}
      >
        <MaterialIcons name="folder-open" size={26} color={Colors.lightBlue} style={styles.icon} />
        <Text style={styles.text}>Medical Records</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.featureRow} 
        onPress={() => router.push('/featureScreens/emergencyNumbers')}
        activeOpacity={0.8}
      >
        <Ionicons name="call-outline" size={26} color={Colors.lightBlue} style={styles.icon} />
        <Text style={styles.text}>Emergency Numbers</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.featureRow} 
        onPress={onAbhaPress}
        activeOpacity={0.8}
      >
        <Ionicons name="id-card-outline" size={26} color={Colors.lightBlue} style={styles.icon} />
        <Text style={styles.text}>View ABHA ID</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    gap: 14,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bluishWhite,
    padding: 18,
    borderRadius: 15,
    marginBottom: 8,
    elevation: 4,
    shadowColor: Colors.darkBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: `${Colors.lightBlue}20`,
  },
  icon: {
    marginRight: 18,
  },
  text: {
    fontSize: 17,
    color: Colors.darkBlue,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});

export default Features;