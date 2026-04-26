import { useState, useRef } from 'react';
import { Audio } from 'expo-av';

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

  const soundRef = useRef<Audio.Sound | null>(null);

  const playSong = async (song: Song) => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: song.url },
        { shouldPlay: true }
     );

      sound.setOnPlaybackStatusUpdate((status: any) => {
        if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis || 0);
        }
    });

      soundRef.current = sound;
      setCurrentSong(song);
      setIsPlaying(true);
    } catch (e) {
      console.log('Error playing song', e);
    }
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
        soundRef,
        seekTo,
    };
}