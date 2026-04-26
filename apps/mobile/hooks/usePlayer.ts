import { useState, useRef } from "react";
import { Audio } from "expo-av";

export type Song = {
  id: number;
  title: string;
  artist: string;
  url: string;
};

export const usePlayer = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off");
  const [isShuffle, setIsShuffle] = useState(false);

  const soundRef = useRef<Audio.Sound | null>(null);

  const playSong = async (song: Song, songList: Song[] = []) => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      const index = songList.findIndex((s) => s.id === song.id);

      setQueue(songList);
      setCurrentIndex(index !== -1 ? index : 0);

      const { sound } = await Audio.Sound.createAsync(
        { uri: song.url },
        { shouldPlay: true },
      );

      sound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis || 0);

          // 🔥 Auto next
          if (status.didJustFinish) {
            playNext();
          }
        }
      });

      soundRef.current = sound;
      setCurrentSong(song);
      setIsPlaying(true);
    } catch (e) {
      console.log("Error playing song", e);
    }
  };

  const playNext = async () => {
    if (queue.length === 0) return;

    // 🔀 Shuffle mode
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * queue.length);
      const nextSong = queue[randomIndex];
      setCurrentIndex(randomIndex);
      await playSong(nextSong, queue);
      return;
    }

    // 🔁 Repeat one
    if (repeatMode === "one") {
      await playSong(queue[currentIndex], queue);
      return;
    }

    // Normal next
    if (currentIndex < queue.length - 1) {
      const nextSong = queue[currentIndex + 1];
      setCurrentIndex(currentIndex + 1);
      await playSong(nextSong, queue);
    }
    // 🔁 Repeat all
    else if (repeatMode === "all") {
      const nextSong = queue[0];
      setCurrentIndex(0);
      await playSong(nextSong, queue);
    }
  };

  const playPrevious = async () => {
    if (queue.length === 0) return;

    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * queue.length);
      const prevSong = queue[randomIndex];
      setCurrentIndex(randomIndex);
      await playSong(prevSong, queue);
      return;
    }

    if (currentIndex > 0) {
      const prevSong = queue[currentIndex - 1];
      setCurrentIndex(currentIndex - 1);
      await playSong(prevSong, queue);
    }
  };

  const toggleShuffle = () => {
    setIsShuffle((prev) => !prev);
  };

  const cycleRepeatMode = () => {
    setRepeatMode((prev) => {
      if (prev === "off") return "all";
      if (prev === "all") return "one";
      return "off";
    });
  };

  const togglePlayPause = async () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const seekTo = async (value: number) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(value);
    }
  };

  return {
    currentSong,
    isPlaying,
    playSong,
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
  };
};
