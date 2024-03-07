import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import eventsData from '../data/eventData.json'

export default function EventDetailScreen({route}: any): JSX.Element {
  const {eventId} = route.params;
 
  const event = eventsData.find(item => item.id === eventId);

  return (
    <View style={styles.container}>
      <Image source={{uri: event?.imageUrl}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.eventName}>{event?.name}</Text>
        <Text style={styles.location}>{event?.location}</Text>
        <Text style={styles.entryType}>Entry: {event?.entryType}</Text>
        <Text style={styles.description}>{event?.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover'
  },
  detailsContainer: {
    padding: 20,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  location: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000000',
  },
  entryType: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000000',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
});
