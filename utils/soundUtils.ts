import { Audio } from "expo-av";

let sound: any;

export async function playButtonSound() {
  try {
    const { sound: newSound } = await Audio.Sound.createAsync(
      require("../assets/sounds/buttonSound.mp3")
    );
    sound = newSound;
    await sound.playAsync();
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
