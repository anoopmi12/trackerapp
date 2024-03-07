import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import eventsData from '../data/eventData.json'
import DraggableFlatList from 'react-native-draggable-flatlist';

export default function EventListScreen({navigation}: any): JSX.Element {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [trackedEvents, setTrackedEvents] = useState(eventsData);

  const handleRemoveEvent = (eventId: number) => {
    setTrackedEvents(prevEvents =>
      prevEvents.filter(event => event.id !== eventId)
    );
  };

  const renderEventItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.push('EventDetail', {eventId: item.id})}>
        <View style={styles.eventItem}>
          <Image source={{uri: item.imageUrl}} style={styles.eventImage} />
          <View style={styles.eventInfo}>
            <Text style={styles.eventName}>{item.name}</Text>
            <Text style={styles.eventLocation}>{item.location}</Text>
            <Text style={styles.entryType}>
              {item.entryType === 'free' ? 'Free Entry' : 'Paid Entry'}
            </Text>
            <TouchableOpacity
              onPress={() => handleRemoveEvent(item.id)}
              style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {viewMode === 'list' ? (
        <FlatList
          data={trackedEvents}
          renderItem={renderEventItem}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <ScrollView>
        <View style={styles.gridContainer}>
          {trackedEvents.map(event => (
            <TouchableOpacity
              key={event.id}
              onPress={() =>
                navigation.push('EventDetail', {eventId: event.id})
              }>
              <Image
                source={{uri: event.imageUrl}}
                style={styles.gridEventImage}
              />
              <Text style={styles.gridEventName}>{event.name}</Text>
              <TouchableOpacity
                  onPress={() => handleRemoveEvent(event.id)}
                  style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
        </ScrollView>
      )}
      <TouchableOpacity
        onPress={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}>
        <View style={styles.toggleButton}>
          <Text style={styles.toggleButtonText}>
            {viewMode === 'list'
              ? 'Switch to Grid View'
              : 'Switch to List View'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  eventItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  eventImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventLocation: {
    color: '#666',
  },
  entryType: {
    color: '#666',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    elevation: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    gap: 10
  },
  gridEventImage: {
    width: (Dimensions.get('window').width - 30) / 2,
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
  },
  gridEventName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#666',
  },
  removeButton: {
    backgroundColor: '#6A1B4D',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  toggleButton: {
    backgroundColor: '#6A1B4D',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
