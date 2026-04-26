import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

import { useGlobalPlayer } from '@/context/PlayerContext';

export default function MiniPlayer() {
  const router = useRouter();

  const {
    currentSong,
    isPlaying,
    togglePlayPause,
    position,
    duration,
    seekTo,
  } = useGlobalPlayer();

  if (!currentSong) return null;

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Pressable
      onPress={() => router.push('/player')}
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#121212',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderTopWidth: 0.5,
        borderTopColor: '#333',
      }}
    >
      {/* Top Row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {/* Song Info */}
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white' }} numberOfLines={1}>
            {currentSong.title}
          </Text>
          <Text style={{ color: 'gray', fontSize: 12 }} numberOfLines={1}>
            {currentSong.artist}
          </Text>
        </View>

        {/* Play/Pause Button */}
        <Pressable
          onPress={(e) => {
            e.stopPropagation(); // prevent opening player
            togglePlayPause();
          }}
          style={({ pressed }) => ({
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={24}
            color="white"
          />
        </Pressable>
      </View>

      {/* Progress Bar */}
      <Slider
        minimumValue={0}
        maximumValue={duration || 1}
        value={position}
        onSlidingComplete={seekTo}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#555"
        thumbTintColor="#1DB954"
      />

      {/* Time Row */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ color: 'gray', fontSize: 10 }}>
          {formatTime(position)}
        </Text>
        <Text style={{ color: 'gray', fontSize: 10 }}>
          {formatTime(duration)}
        </Text>
      </View>
    </Pressable>
  );
}