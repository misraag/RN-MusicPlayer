import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Song } from "@/hooks/usePlayer";
import { useGlobalPlayer } from "@/context/PlayerContext";
import { TextInput } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export default function HomeScreen() {
  const [songs, setSongs] = useState<Song[]>([]);
  const { currentSong, isPlaying, playSong, togglePlayPause } =
    useGlobalPlayer();
  const [search, setSearch] = useState("");

  useFocusEffect(
  useCallback(() => {
    fetch(`http://172.20.10.11:3000/songs`)
      .then(res => res.json())
      .then(data => setSongs(data));
  }, [])
);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch(`http://172.20.10.11:3000/songs?query=${search}`)
        .then((res) => res.json())
        .then((data) => setSongs(data));
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <View
      style={{
        marginTop: 50,
        backgroundColor: "#fff",
        flex: 1,
        alignItems: "center",
      }}
    >
      <TextInput
        placeholder="Search songs..."
        placeholderTextColor="gray"
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor: "#222",
          color: "white",
          padding: 10,
          margin: 10,
          borderRadius: 8,
        }}
      />
      {songs.length === 0 && (
        <Text style={{ color: "gray", textAlign: "center" }}>
          No songs found
        </Text>
      )}
      {songs.map((song) => (
        <TouchableOpacity key={song._id} onPress={() => playSong(song, songs)}>
          <Text>{song.title}</Text>
        </TouchableOpacity>
      ))}
      {currentSong && (
        <View style={{ marginTop: 30 }}>
          <Text>Now Playing: {currentSong.title}</Text>

          <TouchableOpacity onPress={togglePlayPause}>
            <Text>{isPlaying ? "Pause" : "Play"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
