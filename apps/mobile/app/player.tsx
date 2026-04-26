import { View, Text, TouchableOpacity } from 'react-native';
import { useGlobalPlayer } from '@/context/PlayerContext';

export default function PlayerScreen() {
  const { currentSong, isPlaying, togglePlayPause } = useGlobalPlayer();

  if (!currentSong) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No song playing</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: 'white', fontSize: 20 }}>
        {currentSong.title}
      </Text>

      <Text style={{ color: 'gray', marginBottom: 20 }}>
        {currentSong.artist}
      </Text>

      <TouchableOpacity onPress={togglePlayPause}>
        <Text style={{ color: 'white', fontSize: 18 }}>
          {isPlaying ? 'Pause' : 'Play'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}