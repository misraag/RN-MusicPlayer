import { View, Text, TouchableOpacity } from "react-native";
import { useGlobalPlayer } from "../context/PlayerContext";
import Slider from "@react-native-community/slider";

export default function MiniPlayer() {
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
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 15,
        backgroundColor: "#222",
      }}
    >
      <Text style={{ color: "white" }}>{currentSong.title}</Text>

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

      <TouchableOpacity onPress={togglePlayPause}>
        <Text style={{ color: "white" }}>{isPlaying ? "Pause" : "Play"}</Text>
      </TouchableOpacity>
    </View>
  );
}
