import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { AvailableCharacters, characters } from "../../../characters";
import { FlatList, Text, View, Platform, StyleSheet } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { CustomizableButton } from "../../../components/CustomizableButton/CustomizableButton";
import { CharacterTile } from "../../../components/CharacterTile/CharacterTile";
import {
  COLOR_COMBINATION_1,
  STANDARDISED_STYLES,
} from "../../../styles/styles";
import { Modal } from "../../../components/Modal/Modal";
import { GameDurations, SCREENS } from "../../../constants";
import { shuffle } from "lodash";
import { AppLayout } from "../../../components/AppLayout/AppLayout";
import { GameSelectionState } from "../../../types";
import { playButtonSoundOnExecution } from "../../../utils/soundUtils";
import Checkbox from "expo-checkbox";

//ToDo: add return type to the component (GameSelectionFormProps)
export const GameSelectionForm = ({ navigation }: any) => {
  const [formValues, setFormValues] = useState<GameSelectionState>({
    characterSet: AvailableCharacters.HIRAGANA,
    duration: GameDurations.D2,
    selectedCharacters: [],
    selectedGameMode: SCREENS.GAME_MODE_ONE,
    mixCharacters: false,
    playCharacterSounds: true,
    trackGame: false,
  });
  const userData = {};
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [charSelectionVisible, setCharSelectionVisible] = useState(false);
  const {
    getItem: getCachedSelectedCharacters,
    setItem: setCachedSelectedCharacters,
  } = useAsyncStorage("@selectedCharactersFormValue");
  const { getItem: getRestCachedFormValues, setItem: setRestCachedFormValues } =
    useAsyncStorage("@restFormValues");
  const availableCharacters = Object.values(AvailableCharacters);

  const renderDurationPickerItems = () =>
    Array.from({ length: 30 }, (_, i) => i + 2)
      .filter((n) => n % 2 === 0)
      .map((n) => <Picker.Item key={n} label={n.toString()} value={n} />);

  useEffect(() => {
    const readSelectedCharactersFromStorage = async () => {
      const stringifiedSelectedCharactersFormValues =
        await getCachedSelectedCharacters();
      const parsedCachedFormValues = JSON.parse(
        stringifiedSelectedCharactersFormValues ?? "[]"
      );
      setFormValues((prevValues) => ({
        ...prevValues,
        selectedCharacters: parsedCachedFormValues,
      }));
    };

    const readRestFormValuesFromStorage = async () => {
      const stringifiedRestFormValues = await getRestCachedFormValues();
      const parsedCachedRestFormValues = JSON.parse(
        stringifiedRestFormValues ?? "[]"
      );
      setFormValues((prevValues) => ({
        ...prevValues,
        ...parsedCachedRestFormValues,
      }));
    };

    readSelectedCharactersFromStorage();
    readRestFormValuesFromStorage();
  }, []);

  return (
    <AppLayout>
      {!characters || !userData ? (
        <p>loading...</p>
      ) : (
        <>
          <Modal
            onRequestClose={() => setIsModalVisible(false)}
            isModalVisible={isModalVisible}
            footerComponent={
              <View>
                <CustomizableButton
                  onPress={() =>
                    playButtonSoundOnExecution(() =>
                      setIsModalVisible((prevValue: boolean) => !prevValue)
                    )
                  }
                  stylesButton={styles.modalButton}
                  title="Back to selection"
                />
              </View>
            }
            headerTitle="You're just one step away"
            headerText="Please select a few characters"
          />
          <Text style={styles.pickerText}>Characters</Text>
          <Picker
            itemStyle={styles.pickerItem}
            selectedValue={formValues.characterSet}
            style={
              Platform.OS === "ios"
                ? styles.pickerStyleIos
                : styles.pickerStyleAndroid
            }
            onValueChange={(characterSet: AvailableCharacters) => {
              setFormValues({
                ...formValues,
                characterSet,
              });
              const { selectedCharacters, ...rest } = formValues;
              setRestCachedFormValues(
                JSON.stringify({ ...rest, characterSet })
              );
            }}
          >
            {availableCharacters.map((key) => (
              <Picker.Item key={key} label={key} value={key} />
            ))}
          </Picker>
          <Text style={styles.checkboxText}>Mix different character sets</Text>
          <Checkbox
            value={formValues.mixCharacters}
            onValueChange={(nextCheckboxValue: boolean) => {
              setFormValues({
                ...formValues,
                mixCharacters: nextCheckboxValue,
              });
              const { characterSet, ...rest } = formValues;
              setRestCachedFormValues(
                JSON.stringify({ ...rest, mixCharacters: nextCheckboxValue })
              );
            }}
            color={COLOR_COMBINATION_1.ORANGE}
          />
          <Text style={styles.checkboxText}>Play character sounds</Text>
          <Checkbox
            value={formValues.playCharacterSounds}
            onValueChange={(nextCheckboxValue: boolean) => {
              setFormValues({
                ...formValues,
                playCharacterSounds: nextCheckboxValue,
              });
              const { characterSet, ...rest } = formValues;
              setRestCachedFormValues(
                JSON.stringify({
                  ...rest,
                  playCharacterSounds: nextCheckboxValue,
                })
              );
            }}
            color={COLOR_COMBINATION_1.ORANGE}
          />
          <Text style={styles.checkboxText}>Training mode (No points)</Text>
          <Checkbox
            value={formValues.trackGame}
            onValueChange={(nextCheckboxValue: boolean) => {
              setFormValues({
                ...formValues,
                trackGame: nextCheckboxValue,
              });
              const { characterSet, ...rest } = formValues;
              setRestCachedFormValues(
                JSON.stringify({ ...rest, trackGame: nextCheckboxValue })
              );
            }}
            color={COLOR_COMBINATION_1.ORANGE}
          />
          <Text style={styles.checkboxText}>Track game (Premium only)</Text>
          <Checkbox
            disabled={true}
            value={formValues.trackGame}
            onValueChange={(nextCheckboxValue: boolean) => {
              setFormValues({
                ...formValues,
                trackGame: nextCheckboxValue,
              });
              const { characterSet, ...rest } = formValues;
              setRestCachedFormValues(
                JSON.stringify({ ...rest, trackGame: nextCheckboxValue })
              );
            }}
            color={COLOR_COMBINATION_1.ORANGE}
          />
          <Text
            style={{
              color: COLOR_COMBINATION_1.ORANGE,
            }}
          >
            Select characters
          </Text>
          <CustomizableButton
            onPress={() =>
              playButtonSoundOnExecution(() => setCharSelectionVisible(true))
            }
            stylesButton={styles.characterSelectionButton}
            title="Selection"
          />
          <Modal
            containerStyles={styles.modalContainer}
            onRequestClose={() => setCharSelectionVisible(false)}
            headerTextStyles={styles.modalText}
            headerTitleStyles={styles.modalText}
            isModalVisible={charSelectionVisible}
            footerComponent={
              <View style={styles.modalFooterContainer}>
                <FlatList
                  persistentScrollbar
                  keyExtractor={(item, index) => item.letter + index}
                  numColumns={5}
                  data={
                    characters.find(
                      (arrayItem) =>
                        arrayItem.setName === formValues.characterSet
                    )?.letters
                  }
                  renderItem={({ item }) => {
                    const isSelected = formValues.selectedCharacters?.some(
                      (char) => char.id === item.id
                    );
                    return (
                      <CharacterTile
                        selected={isSelected}
                        character={item.letter}
                        onPress={() =>
                          playButtonSoundOnExecution(() => {
                            if (isSelected) {
                              setFormValues((prevValues) => {
                                const withoutToBeRemoved =
                                  prevValues?.selectedCharacters?.filter(
                                    (charObj) => charObj.letter !== item.letter
                                  );
                                return {
                                  ...prevValues,
                                  selectedCharacters: [
                                    ...(withoutToBeRemoved ?? []),
                                  ],
                                };
                              });
                            } else {
                              setFormValues((prevValues) => {
                                if (
                                  !prevValues.selectedCharacters?.find(
                                    (char) => char.letter === item.letter
                                  )
                                ) {
                                  return {
                                    ...prevValues,
                                    selectedCharacters: [
                                      ...(prevValues.selectedCharacters ?? []),
                                      {
                                        ...item,
                                        characterSet: formValues.characterSet,
                                      },
                                    ],
                                  };
                                }
                                return {
                                  ...prevValues,
                                };
                              });
                            }
                          })
                        }
                      />
                    );
                  }}
                  style={styles.flatList}
                />
                <CustomizableButton
                  onPress={async () => {
                    if (formValues.selectedCharacters) {
                      await setCachedSelectedCharacters(
                        JSON.stringify(formValues.selectedCharacters)
                      );
                    }
                    playButtonSoundOnExecution(() =>
                      setCharSelectionVisible(false)
                    );
                  }}
                  title="Choose"
                />
              </View>
            }
            headerTitle="You're just one step away"
            headerText={`Character selection \n\n Scroll down for more`}
          />
          <Text style={styles.gameModeText}>Select mode</Text>
          <Picker
            itemStyle={styles.pickerItem}
            selectedValue={formValues.selectedGameMode}
            style={
              Platform.OS === "ios"
                ? styles.pickerStyleIos
                : styles.pickerStyleAndroid
            }
            onValueChange={async (gameMode) => {
              setFormValues({
                ...formValues,
                selectedGameMode: gameMode,
              });
              const { characterSet, ...rest } = formValues;
              setRestCachedFormValues(
                JSON.stringify({ ...rest, selectedGameMode: gameMode })
              );
            }}
          >
            <Picker.Item
              key="Game Mode 1"
              label="Game Mode 1"
              value={SCREENS.GAME_MODE_ONE}
            />
            <Picker.Item
              key="Game Mode 2"
              label="Game Mode 2"
              value={SCREENS.GAME_MODE_TWO}
            />
          </Picker>
          <Text
            style={{
              color: COLOR_COMBINATION_1.ORANGE,
            }}
          >
            Select duration
          </Text>
          <Picker
            itemStyle={styles.pickerItem}
            selectedValue={formValues.duration}
            style={
              Platform.OS === "ios"
                ? styles.pickerStyleIos
                : styles.pickerStyleAndroid
            }
            onValueChange={async (duration: GameDurations) => {
              setFormValues({
                ...formValues,
                duration,
              });
              const { characterSet, ...rest } = formValues;
              setRestCachedFormValues(JSON.stringify({ ...rest, duration }));
            }}
          >
            {renderDurationPickerItems()}
          </Picker>
          <CustomizableButton
            stylesButton={STANDARDISED_STYLES.BUTTON}
            onPress={() =>
              playButtonSoundOnExecution(() => {
                const charactersToBeUsed = formValues.mixCharacters
                  ? formValues.selectedCharacters
                  : formValues.selectedCharacters?.filter(
                      ({ characterSet }) =>
                        characterSet === formValues.characterSet
                    );
                if (charactersToBeUsed && charactersToBeUsed.length === 0) {
                  return setIsModalVisible(true);
                }
                navigation.navigate(formValues.selectedGameMode, {
                  formValues: {
                    ...formValues,
                    selectedCharacters: shuffle(charactersToBeUsed),
                  },
                });
              })
            }
            title="Play"
          />
        </>
      )}
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  modalButton: {
    marginTop: 10,
    width: "100%",
  },
  pickerText: {
    marginTop: 10,
    color: COLOR_COMBINATION_1.ORANGE,
  },
  pickerItem: { marginTop: -70 },
  pickerStyleIos: { width: 200, height: 70, backgroundColor: "white" },
  pickerStyleAndroid: { width: 200, backgroundColor: "white" },
  checkboxText: {
    color: COLOR_COMBINATION_1.ORANGE,
    textAlign: "center",
  },
  characterSelectionButton: {
    marginTop: 0,
    ...STANDARDISED_STYLES.CENTER_CONTENT,
    ...STANDARDISED_STYLES.BUTTON,
    fontSize: 50,
  } as any,
  modalContainer: {
    backgroundColor: COLOR_COMBINATION_1.DARK_BLUE,
    borderColor: COLOR_COMBINATION_1.ORANGE,
    borderStyle: "solid",
    borderWidth: 10,
    borderRadius: 25,
  },
  modalText: { color: COLOR_COMBINATION_1.ORANGE },
  modalFooterContainer: {
    height: 210,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  flatList: {
    width: "100%",
  },
  gameModeText: {
    color: COLOR_COMBINATION_1.ORANGE,
  },
});
