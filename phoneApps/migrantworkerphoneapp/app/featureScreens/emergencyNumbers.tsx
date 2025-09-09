import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Linking,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import BackButton from '../components/BackButton';

const emergencyNumbers = [
  { id: 1, name: 'Police', number: '100', icon: 'shield' },
  { id: 2, name: 'Fire Brigade', number: '101', icon: 'flame' },
  { id: 3, name: 'Ambulance', number: '102', icon: 'medical' },
  { id: 4, name: 'Disaster Management', number: '108', icon: 'warning' },
  { id: 5, name: 'Women Helpline', number: '1091', icon: 'woman' },
  { id: 6, name: 'Child Helpline', number: '1098', icon: 'people' },
  { id: 7, name: 'Railway Helpline', number: '139', icon: 'train' },
  { id: 8, name: 'Road Accident', number: '1073', icon: 'car' },
];

const EmergencyNumbers = () => {
  const [personalContacts, setPersonalContacts] = useState([
    { id: 1, name: 'Mom', number: '+919876543210' },
    { id: 2, name: 'Dad', number: '+919876543211' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', number: '' });

  const makeCall = (number) => {
    Alert.alert(
      'Make Call',
      `Do you want to call ${number}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call', 
          onPress: () => {
            Linking.openURL(`tel:${number}`);
          }
        },
      ]
    );
  };

  const addPersonalContact = () => {
    if (newContact.name.trim() && newContact.number.trim()) {
      setPersonalContacts([
        ...personalContacts,
        {
          id: Date.now(),
          name: newContact.name.trim(),
          number: newContact.number.trim(),
        }
      ]);
      setNewContact({ name: '', number: '' });
      setShowAddModal(false);
    } else {
      Alert.alert('Error', 'Please fill in both name and number');
    }
  };

  const deletePersonalContact = (id) => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setPersonalContacts(personalContacts.filter(contact => contact.id !== id));
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <BackButton />
      
      <View style={styles.header}>
        <Text style={styles.title}>Emergency Numbers</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Emergency Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Services</Text>
          {emergencyNumbers.map(service => (
            <TouchableOpacity
              key={service.id}
              style={styles.emergencyCard}
              onPress={() => makeCall(service.number)}
            >
              <View style={styles.serviceInfo}>
                <View style={styles.iconContainer}>
                  <Ionicons name={service.icon} size={24} color="#e74c3c" />
                </View>
                <View style={styles.serviceDetails}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceNumber}>{service.number}</Text>
                </View>
              </View>
              <Ionicons name="call" size={24} color="#e74c3c" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Personal Emergency Contacts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Personal Emergency Contacts</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddModal(true)}
            >
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          {personalContacts.map(contact => (
            <View key={contact.id} style={styles.personalCard}>
              <View style={styles.contactInfo}>
                <View style={styles.iconContainer}>
                  <Ionicons name="person" size={24} color="#2c5aa0" />
                </View>
                <View style={styles.contactDetails}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactNumber}>{contact.number}</Text>
                </View>
              </View>
              <View style={styles.contactActions}>
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => makeCall(contact.number)}
                >
                  <Ionicons name="call" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deletePersonalContact(contact.id)}
                >
                  <Ionicons name="trash" size={20} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {personalContacts.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="person-add-outline" size={48} color="#ccc" />
              <Text style={styles.emptyText}>No personal contacts added</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add Contact Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Emergency Contact</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Contact Name"
              value={newContact.name}
              onChangeText={(text) => setNewContact({...newContact, name: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={newContact.number}
              onChangeText={(text) => setNewContact({...newContact, number: text})}
              keyboardType="phone-pad"
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowAddModal(false);
                  setNewContact({ name: '', number: '' });
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.saveButton}
                onPress={addPersonalContact}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
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
  content: {
    flex: 1,
  },
  section: {
    margin: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  emergencyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  personalCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceDetails: {
    flex: 1,
  },
  contactDetails: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  serviceNumber: {
    fontSize: 14,
    color: '#e74c3c',
    fontWeight: '500',
  },
  contactNumber: {
    fontSize: 14,
    color: '#666',
  },
  contactActions: {
    flexDirection: 'row',
    gap: 10,
  },
  addButton: {
    backgroundColor: '#2c5aa0',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: '#27ae60',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#2c5aa0',
    alignItems: 'center',
  },
  cancelText: {
    color: '#666',
    fontSize: 16,
  },
  saveText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default EmergencyNumbers;