import {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Song } from '@/hooks/usePlayer';
import { useGlobalPlayer } from '@/context/PlayerContext';

export default function HomeScreen() {
  const [songs, setSongs] = useState<Song[]>([]);
  const { currentSong, isPlaying, playSong, togglePlayPause } = useGlobalPlayer();

  useEffect(() => {
    fetch('http://172.20.10.11:3000/songs')
      .then(res => res.json())
      .then(data => setSongs(data));
  }, []);

   return (
    <View style={{ marginTop: 50, backgroundColor: '#fff', flex: 1, alignItems: 'center' }}>
      {songs.map(song => (
        <TouchableOpacity key={song.id} onPress={() => playSong(song, songs)}>
          <Text>{song.title}</Text>
        </TouchableOpacity>
      ))}
      {currentSong && (
        <View style={{ marginTop: 30 }}>
          <Text>Now Playing: {currentSong.title}</Text>

          <TouchableOpacity onPress={togglePlayPause}>
            <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}