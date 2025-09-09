import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Features = ({ onDocumentsPress, onAbhaPress }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.featureRow}
        onPress={() => router.push('/featureScreens/hospitalsNearby')}
      >
        <Ionicons name="medkit-outline" size={24} color="#2c5aa0" style={styles.icon} />
        <Text style={styles.text}>Hospitals Nearby</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.featureRow} 
        onPress={() => router.push('/featureScreens/medicalRecords')}
      >
        <MaterialIcons name="folder-open" size={24} color="#2c5aa0" style={styles.icon} />
        <Text style={styles.text}>Medical Records</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.featureRow} 
        onPress={() => router.push('/featureScreens/emergencyNumbers')}
      >
        <Ionicons name="call-outline" size={24} color="#2c5aa0" style={styles.icon} />
        <Text style={styles.text}>Emergency Numbers</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.featureRow} onPress={onAbhaPress}>
        <Ionicons name="id-card-outline" size={24} color="#2c5aa0" style={styles.icon} />
        <Text style={styles.text}>View ABHA ID</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    gap: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebf2fa',
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
    elevation: 2,
  },
  icon: {
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#2c5aa0',
    fontWeight: '500',
  },
});

export default Features;