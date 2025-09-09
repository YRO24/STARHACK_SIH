import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BackButton from '../components/BackButton';

const hospitalsMock = [
  { id: 1, name: 'City Hospital', latitude: 8.5241, longitude: 76.9366, address: 'Medical College Rd, Thiruvananthapuram' },
  { id: 2, name: 'General Hospital', latitude: 8.5200, longitude: 76.9400, address: 'Hospital Rd, Thiruvananthapuram' },
  { id: 3, name: 'Care Clinic', latitude: 8.5260, longitude: 76.9380, address: 'MG Road, Thiruvananthapuram' },
  { id: 4, name: 'SCTIMST', latitude: 8.5470, longitude: 76.9520, address: 'Satellite Rd, Thiruvananthapuram' },
  { id: 5, name: 'Regional Cancer Centre', latitude: 8.5290, longitude: 76.9410, address: 'Medical College Campus, Thiruvananthapuram' },
];

const HospitalsNearby = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHospitals, setFilteredHospitals] = useState(hospitalsMock);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    // Filter hospitals based on search query
    if (searchQuery.trim() === '') {
      setFilteredHospitals(hospitalsMock);
    } else {
      const filtered = hospitalsMock.filter(hospital =>
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHospitals(filtered);
    }
  }, [searchQuery]);

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      
      // Request permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      // Get current position with high accuracy
      let loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 15000,
        maximumAge: 10000,
      });
      
      setLocation(loc.coords);
      setLoading(false);
      
      // Center map on current location
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }, 1000);
      }
      
    } catch (error) {
      console.error('Error getting location:', error);
      setErrorMsg('Failed to get current location');
      setLoading(false);
      
      // Fallback to default location (Thiruvananthapuram)
      setLocation({
        latitude: 8.5241,
        longitude: 76.9366,
      });
    }
  };

  const centerOnCurrentLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }, 1000);
    } else {
      getCurrentLocation();
    }
  };

  const centerOnHospital = (hospital) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: hospital.latitude,
        longitude: hospital.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.center}>
        <BackButton />
        <Text style={styles.errorText}>Map is not supported on web. Please use mobile device.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <BackButton />
        <ActivityIndicator size="large" color="#2c5aa0" />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  if (errorMsg && !location) {
    return (
      <View style={styles.center}>
        <BackButton />
        <Text style={styles.errorText}>{errorMsg}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={getCurrentLocation}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton />
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search hospitals..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchQuery('')}
            style={styles.clearButton}
          >
            <Ionicons name="close" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location?.latitude || 8.5241,
          longitude: location?.longitude || 76.9366,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation={true}
        showsMyLocationButton={false}
        followsUserLocation={false}
        loadingEnabled={true}
      >
        {filteredHospitals.map(hospital => (
          <Marker
            key={hospital.id}
            coordinate={{
              latitude: hospital.latitude,
              longitude: hospital.longitude,
            }}
            title={hospital.name}
            description={hospital.address}
            pinColor="#e74c3c"
          />
        ))}
      </MapView>

      {/* Current Location Button */}
      <TouchableOpacity
        style={styles.locationButton}
        onPress={centerOnCurrentLocation}
      >
        <Ionicons name="locate" size={24} color="white" />
      </TouchableOpacity>

      {/* Hospital List (when searching) */}
      {searchQuery.length > 0 && (
        <View style={styles.resultsContainer}>
          <ScrollView style={styles.resultsList}>
            {filteredHospitals.map(hospital => (
              <TouchableOpacity
                key={hospital.id}
                style={styles.hospitalItem}
                onPress={() => centerOnHospital(hospital)}
              >
                <Ionicons name="medical" size={20} color="#2c5aa0" />
                <View style={styles.hospitalInfo}>
                  <Text style={styles.hospitalName}>{hospital.name}</Text>
                  <Text style={styles.hospitalAddress}>{hospital.address}</Text>
                </View>
              </TouchableOpacity>
            ))}
            {filteredHospitals.length === 0 && (
              <Text style={styles.noResults}>No hospitals found</Text>
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#2c5aa0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
  },
  searchContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  clearButton: {
    padding: 5,
  },
  locationButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#2c5aa0',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resultsContainer: {
    position: 'absolute',
    top: 150,
    left: 20,
    right: 20,
    maxHeight: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    zIndex: 999,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  resultsList: {
    maxHeight: 200,
  },
  hospitalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  hospitalInfo: {
    marginLeft: 10,
    flex: 1,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  hospitalAddress: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  noResults: {
    padding: 20,
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
});

export default HospitalsNearby;