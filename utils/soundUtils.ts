import { Audio } from "expo-av";
import { AvailableCharacters } from "../characters";
import staticPaths from "../assets/sounds/characters/staticPaths";

export async function playButtonSound() {
  let sound: Audio.Sound | undefined;
  try {
    const { sound: newSound } = await Audio.Sound.createAsync(
      require("../assets/sounds/buttonSound.wav")
    );
    sound = newSound;
    sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status: any) => {
      if (status.didJustFinish && !status.isLooping) {
        console.log("Unloading Sound");
        sound?.unloadAsync();
      }
    });
  } catch (error: any) {
    console.log(`Failed to load sound: ${error.message}`);
  }
}

export async function playCharacterSound(
  characterSet: AvailableCharacters,
  id: number
) {
  let sound: Audio.Sound | undefined;
  const mp3Source = (staticPaths as any)[characterSet][id];
  try {
    const { sound: newSound } = await Audio.Sound.createAsync(mp3Source);
    sound = newSound;
    sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status: any) => {
      if (status.didJustFinish && !status.isLooping) {
        sound?.unloadAsync();
      }
    });
  } catch (error) {
    console.log(`Failed to load sound: ${error}`);
  }
}

export function playButtonSoundOnExecution(fn: Function) {
  playButtonSound();
  fn();
}
