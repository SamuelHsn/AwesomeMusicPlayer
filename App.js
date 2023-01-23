// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!  </Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";
import * as MediaLibrary from "expo-media-library";

const fetchAudioAssets = (setAssets) => async () => {
  const response = await MediaLibrary.getAssetsAsync({
    mediaType: "audio",
  });
  setAssets(response.assets);
};

export default function App() {
  const [permissionResponse, result2] = MediaLibrary.usePermissions({
    request: true,
  });
  const [sound, setSound] = React.useState();
  const [assets, setAssets] = React.useState([]);
  async function playSound() {
    console.log("Loading Sound");
    if (assets?.[0]?.uri) {
      const { sound } = await Audio.Sound.createAsync({ uri: assets[1].uri });
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    }
  }

  // React.useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  React.useEffect(() => {
    if (permissionResponse?.granted) {
      fetchAudioAssets(setAssets)();
    }
  }, [setAssets, permissionResponse?.granted]);

  return (
    <View style={styles.container}>
      <Text>
        {assets
          .filter((asset) => !asset.filename.includes(".ogg"))
          .map((asset) => (
            <React.Fragment key={asset.id}>
              <Text> {asset.filename}</Text>
              {"\n"}
            </React.Fragment>
          ))}
      </Text>
      <Text>hello</Text>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}

const styles = StyleSheet.create({});
