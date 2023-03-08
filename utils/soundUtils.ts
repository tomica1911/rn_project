import { Audio } from "expo-av";
import { AvailableCharacters } from "../characters";
import staticPaths from "../assets/sounds/characters/staticPaths";

let sound: Audio.Sound | undefined;

export async function playButtonSound() {
  try {
    const { sound: newSound } = await Audio.Sound.createAsync(
      require("../assets/sounds/buttonSound.wav")
    );
    sound = newSound;
    await sound.playAsync();
  } catch (error: any) {
    console.log(`Failed to load sound: ${error.message}`);
  }
}

export async function playCharacterSound(
  characterSet: AvailableCharacters,
  id: number
) {
  const mp3Source = (staticPaths as any)[characterSet][id];
  try {
    const { sound: newSound } = await Audio.Sound.createAsync(mp3Source);
    sound = newSound;
    await sound.playAsync();
    sound.setOnPlaybackStatusUpdate((status: any) => {
      if (status.didJustFinish && !status.isLooping) {
        cleanupSound();
      }
    });
  } catch (error) {
    console.log(`Failed to load sound: ${error}`);
  }
}

export function cleanupSound() {
  if (sound) {
    console.log("Unloading Sound");
    sound.unloadAsync();
  }
}

export function playButtonSoundOnExecution(fn: Function) {
  playButtonSound();
  fn();
}
