import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import BackButton from '../components/BackButton';

// Mock data - replace with Supabase fetch later
const mockRecords = [
  {
    id: 1,
    date: '2024-01-15',
    type: 'Blood Test',
    doctor: 'Dr. Smith',
    hospital: 'City Hospital',
    status: 'Normal',
  },
  {
    id: 2,
    date: '2024-01-10',
    type: 'X-Ray',
    doctor: 'Dr. Johnson',
    hospital: 'General Hospital',
    status: 'Review Required',
  },
  {
    id: 3,
    date: '2024-01-05',
    type: 'ECG',
    doctor: 'Dr. Brown',
    hospital: 'Care Clinic',
    status: 'Normal',
  },
];

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, recent, pending

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const fetchMedicalRecords = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual Supabase fetch
      // const { data, error } = await supabase
      //   .from('medical_records')
      //   .select('*')
      //   .order('date', { ascending: false });
      
      // Simulate API delay
      setTimeout(() => {
        setRecords(mockRecords);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching medical records:', error);
      Alert.alert('Error', 'Failed to load medical records');
      setLoading(false);
    }
  };

  const getFilteredRecords = () => {
    switch (filter) {
      case 'recent':
        return records.filter(record => {
          const recordDate = new Date(record.date);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return recordDate >= thirtyDaysAgo;
        });
      case 'pending':
        return records.filter(record => record.status === 'Review Required');
      default:
        return records;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Normal':
        return '#27ae60';
      case 'Review Required':
        return '#e74c3c';
      default:
        return '#f39c12';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <BackButton />
        <ActivityIndicator size="large" color="#2c5aa0" />
        <Text style={styles.loadingText}>Loading medical records...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton />
      
      <View style={styles.header}>
        <Text style={styles.title}>Medical Records</Text>
        <TouchableOpacity onPress={fetchMedicalRecords}>
          <Ionicons name="refresh" size={24} color="#2c5aa0" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {['all', 'recent', 'pending'].map(filterType => (
          <TouchableOpacity
            key={filterType}
            style={[
              styles.filterButton,
              filter === filterType && styles.activeFilter
            ]}
            onPress={() => setFilter(filterType)}
          >
            <Text style={[
              styles.filterText,
              filter === filterType && styles.activeFilterText
            ]}>
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.recordsList}>
        {getFilteredRecords().map(record => (
          <TouchableOpacity key={record.id} style={styles.recordCard}>
            <View style={styles.recordHeader}>
              <Text style={styles.recordType}>{record.type}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(record.status) }
              ]}>
                <Text style={styles.statusText}>{record.status}</Text>
              </View>
            </View>
            
            <View style={styles.recordDetails}>
              <View style={styles.recordRow}>
                <Ionicons name="calendar" size={16} color="#666" />
                <Text style={styles.recordInfo}>{record.date}</Text>
              </View>
              
              <View style={styles.recordRow}>
                <Ionicons name="person" size={16} color="#666" />
                <Text style={styles.recordInfo}>{record.doctor}</Text>
              </View>
              
              <View style={styles.recordRow}>
                <Ionicons name="medical" size={16} color="#666" />
                <Text style={styles.recordInfo}>{record.hospital}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        
        {getFilteredRecords().length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No medical records found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c5aa0',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#2c5aa0',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
  },
  activeFilterText: {
    color: 'white',
  },
  recordsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  recordCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recordType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  recordDetails: {
    gap: 5,
  },
  recordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recordInfo: {
    fontSize: 14,
    color: '#666',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
});

export default MedicalRecords;