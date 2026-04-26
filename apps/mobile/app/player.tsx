import { View, Text, TouchableOpacity, Image } from "react-native";
import Slider from "@react-native-community/slider";
import { useGlobalPlayer } from "@/context/PlayerContext";
import { Ionicons } from "@expo/vector-icons";

export default function PlayerScreen() {
  const {
    currentSong,
    isPlaying,
    togglePlayPause,
    position,
    duration,
    seekTo,
    playNext,
    playPrevious,
    isShuffle,
    toggleShuffle,
    repeatMode,
    cycleRepeatMode,
  } = useGlobalPlayer();

  if (!currentSong) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No song playing</Text>
      </View>
    );
  }

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        padding: 20,
        justifyContent: "center",
      }}
    >
      {/* Album Art */}
      <Image
        source={{
          uri: "https://via.placeholder.com/300",
        }}
        style={{
          width: "100%",
          height: 300,
          borderRadius: 10,
          marginBottom: 30,
        }}
      />

      {/* Song Info */}
      <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
        {currentSong.title}
      </Text>

      <Text style={{ color: "gray", marginBottom: 20 }}>
        {currentSong.artist}
      </Text>

      {/* Progress Bar */}
      <Slider
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onSlidingComplete={seekTo}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: "white" }}>{formatTime(position)}</Text>
        <Text style={{ color: "white" }}>{formatTime(duration)}</Text>
      </View>

      {/* Shuffle and Repeat */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <TouchableOpacity onPress={toggleShuffle}>
          <Ionicons
            name="shuffle"
            size={24}
            color={isShuffle ? "#1DB954" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={cycleRepeatMode}>
          <Ionicons
            name={
              repeatMode === "one"
                ? "repeat-outline"
                : repeatMode === "all"
                  ? "repeat"
                  : "repeat-outline"
            }
            size={24}
            color={repeatMode !== "off" ? "#1DB954" : "white"}
          />
        </TouchableOpacity>
      </View>

      {/* Controls */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <TouchableOpacity onPress={playPrevious}>
          <Ionicons name="play-skip-back" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={togglePlayPause}>
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={64}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={playNext}>
          <Ionicons name="play-skip-forward" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
