import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const notificationsData = [
  { id: '1', text: 'Welcome to the app!' },
  { id: '2', text: 'Your profile was updated.' },
  { id: '3', text: 'New job opportunities available.' },
];

const Navbar = () => {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        {/* Profile Section */}
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => router.push('/profile')}
        >
          <View style={styles.profileImage}>
            <AntDesign name="user" size={24} color="black" />
          </View>
        </TouchableOpacity>

        {/* Current Location Section */}
        <View style={styles.locationInfo}>
          <Text style={styles.locationLabel}>Current Location</Text>
          <View style={styles.locationRow}>
            <Text style={styles.locationText}>Thiruvananthapuram</Text>
            <Ionicons name="chevron-down" size={16} color="white" />
          </View>
        </View>

        {/* Right side - Icons */}
        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => setShowNotifications(!showNotifications)}
          >
            <Ionicons name="notifications-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Notifications Modal */}
      <Modal
        visible={showNotifications}
        animationType="slide"
        transparent
        onRequestClose={() => setShowNotifications(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.notificationsModal}>
            <Text style={styles.notificationsTitle}>Notifications</Text>
            <FlatList
              data={notificationsData}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.notificationItem}>
                  <Text style={styles.notificationText}>{item.text}</Text>
                </View>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowNotifications(false)}
            >
              <Text style={{ color: 'white' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c5aa0',
  },
  navbar: {
    backgroundColor: '#2c5aa0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 60,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationInfo: {
    flex: 1,
    alignItems: 'center',
  },
  locationLabel: {
    color: '#ebf2fa',
    fontSize: 12,
    opacity: 0.9,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  iconButton: {
    marginLeft: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(44,90,160,0.7)',
    justifyContent: 'flex-end',
  },
  notificationsModal: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 200,
  },
  notificationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c5aa0',
  },
  notificationItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notificationText: {
    fontSize: 15,
    color: '#333',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#2c5aa0',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default Navbar;