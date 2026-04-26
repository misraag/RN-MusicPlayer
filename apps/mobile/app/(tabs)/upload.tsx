import { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function UploadScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [url, setUrl] = useState('');

  const handleUpload = async () => {
    try {
      const res = await fetch('http://172.20.10.11:3000/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, artist, url }),
      });

      const data = await res.json();

      Alert.alert('Success', 'Song added!');
      router.push('/');


      setTitle('');
      setArtist('');
      setUrl('');
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Failed to upload');
    }
  };

  return (
    <View style={{ padding: 20, paddingTop: 100 }}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ marginBottom: 10, backgroundColor: 'black', padding: 10, color: 'white'  }}
      />

      <TextInput
        placeholder="Artist"
        value={artist}
        onChangeText={setArtist}
        style={{ marginBottom: 10, backgroundColor: 'black', padding: 10, color: 'white'  }}
      />

      <TextInput
        placeholder="Song URL"
        value={url}
        onChangeText={setUrl}
        style={{ marginBottom: 10, backgroundColor: 'black', padding: 10, color: 'white'  }}
      />

      <Button title="Upload Song" onPress={handleUpload} />
    </View>
  );
}