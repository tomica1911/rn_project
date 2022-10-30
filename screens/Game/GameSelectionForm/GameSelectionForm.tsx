import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  AvailableCharacters,
  CharacterObject,
  characters,
} from "../../../characters";
import { FlatList, Text, View, Platform } from "react-native";
import { CustomizableButton } from "../../../components/CustomizableButton/CustomizableButton";
import { CharacterTile } from "../../../components/CharacterTile/CharacterTile";
import {
  COLOR_COMBINATION_1,
  STANDARDISED_STYLES,
} from "../../../styles/styles";
import { Modal } from "../../../components/Modal/Modal";
import {GameDurations, SUBSCREENS} from "../../../constants";
import { shuffle } from "lodash";
import { AppLayout } from "../../../components/AppLayout/AppLayout";
import { GameSelectionState } from "../../../types";

interface GameSelectionFormProps {
  //ToDo: check if all values from GameSelectionState are needed here and rename it to GameSelectionStateProps
  formValues: GameSelectionState & {
    setStartGame: (arg: boolean) => void;
    //ToDo: define proper type for any
    setFormValues: (arg: any) => void;
  };
}

//ToDo: add return type to the component (GameSelectionFormProps)
export const GameSelectionForm = ({ navigation }: any) => {
  //ToDo: make commented lines of code work
  const [formValues, setFormValues] = useState<GameSelectionState>({
    characters: AvailableCharacters.HIRAGANA,
    duration: GameDurations.D2,
    selectedCharacters: [],
    selectedGameMode: SUBSCREENS.GAME_MODE_ONE,
  });
  const userData = {};
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [charSelectionVisible, setCharSelectionVisible] = useState(false);

  const availableCharacters = Object.values(AvailableCharacters);
  // ToDo: add appropriate value to any
  const handleChange = (key: keyof GameSelectionState, value: any) => {
    setFormValues({ ...formValues, [key]: value });
  };

  // ToDo: see if this can be refactored
  const renderDurationPickerItems = () => {
    const menuInputItems = [];

    for (let i = 0; i < 30; i++) {
      if (i % 2 == 0) {
        menuInputItems.push(
          <Picker.Item
            key={`key${i}`}
            label={(i + 2).toString()}
            value={i + 2}
          />
        );
      }
    }

    return menuInputItems.map((item) => item);
  };

  return (
    <AppLayout>
      {!characters || !userData ? (
        <p>loading...</p>
      ) : (
        <>
          <Modal
            isModalVisible={isModalVisible}
            footerComponent={
              <View>
                <CustomizableButton
                  onPress={() =>
                    setIsModalVisible((prevValue: boolean) => !prevValue)
                  }
                  stylesButton={{
                    marginTop: 10,
                    height: 50,
                    ...STANDARDISED_STYLES.CENTER_CONTENT,
                    ...STANDARDISED_STYLES.BUTTON,
                    marginBottom: 10,
                    marginLeft: 5,
                    marginRight: 5,
                  }}
                  title="Back to selection"
                />
              </View>
            }
            headerTitle="You're just one step away"
            headerText="Please select a few characters"
          />
          <Text
            style={{
              marginTop: 10,
              marginBottom: 10,
              color: COLOR_COMBINATION_1.ORANGE,
            }}
          >
            Characters
          </Text>
          <Picker
            itemStyle={{ marginTop: -70 }}
            selectedValue={formValues.characters}
            style={
              Platform.OS === "ios"
                ? { width: 200, height: 70, backgroundColor: "white" }
                : { width: 200, backgroundColor: "white" }
            }
            onValueChange={(itemValue: string) =>
              handleChange("characters", itemValue)
            }
          >
            {availableCharacters.map((key) => (
              <Picker.Item key={key} label={key} value={key} />
            ))}
          </Picker>
          <Text
            style={{
              marginTop: 10,
              marginBottom: 10,
              color: COLOR_COMBINATION_1.ORANGE,
            }}
          >
            Select characters
          </Text>
          <CustomizableButton
            onPress={() => setCharSelectionVisible(true)}
            stylesButton={{
              marginTop: 10,
              height: 50,
              ...STANDARDISED_STYLES.CENTER_CONTENT,
              ...STANDARDISED_STYLES.BUTTON,
              marginBottom: 10,
              marginLeft: 5,
              marginRight: 5,
            }}
            title="Character Selection"
          />
          <Modal
            containerStyles={{
              backgroundColor: COLOR_COMBINATION_1.BLACK,
              borderColor: COLOR_COMBINATION_1.ORANGE,
              borderStyle: "solid",
              borderWidth: 10,
              borderRadius: 25,
            }}
            headerTextStyles={{ color: COLOR_COMBINATION_1.ORANGE }}
            headerTitleStyles={{ backgroundColor: COLOR_COMBINATION_1.ORANGE }}
            isModalVisible={charSelectionVisible}
            footerComponent={
              <View
                style={{
                  height: 210,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <FlatList
                  persistentScrollbar
                  keyExtractor={(item, index) => item.letter + index}
                  numColumns={5}
                  data={
                    characters.filter(
                      (arrayItem) => arrayItem.setName === formValues.characters
                    )[0].letters
                  }
                  renderItem={({ item }) => (
                    <CharacterTile
                      selected={formValues.selectedCharacters.includes(item)}
                      character={item.letter}
                      onPress={() => {
                        if (formValues.selectedCharacters.includes(item)) {
                          return setFormValues(
                            (prevValues: GameSelectionState) => {
                              const withoutToBeRemoved =
                                prevValues.selectedCharacters.filter(
                                  (charObj) => charObj.letter !== item.letter
                                );
                              return {
                                ...prevValues,
                                selectedCharacters: [...withoutToBeRemoved],
                              };
                            }
                          );
                        }
                        return setFormValues(
                          (prevValues: GameSelectionState) => {
                            const duplicate =
                              prevValues.selectedCharacters.find(
                                (el: CharacterObject) =>
                                  el.letter === item.letter
                              );
                            if (!duplicate) {
                              return {
                                ...prevValues,
                                selectedCharacters: [
                                  ...prevValues.selectedCharacters,
                                  item,
                                ],
                              };
                            }
                            return {
                              ...prevValues,
                            };
                          }
                        );
                      }}
                    />
                  )}
                  style={{ width: "100%" }}
                />
                <CustomizableButton
                  onPress={() => setCharSelectionVisible(false)}
                  stylesButton={{
                    marginTop: 10,
                    height: 50,
                    alignSelf: "center",
                    ...STANDARDISED_STYLES.CENTER_CONTENT,
                    ...STANDARDISED_STYLES.BUTTON,
                  }}
                  title="Choose"
                />
              </View>
            }
            headerTitle="You're just one step away"
            headerText={`Character selection \n\n Scroll down for more`}
          />
          <Text
            style={{
              marginTop: 10,
              marginBottom: 10,
              color: COLOR_COMBINATION_1.ORANGE,
            }}
          >
            Select mode
          </Text>
          <Picker
            itemStyle={{ marginTop: -70 }}
            selectedValue={formValues.selectedGameMode}
            style={
              Platform.OS === "ios"
                ? { width: 200, height: 70, backgroundColor: "white" }
                : { width: 200, backgroundColor: "white" }
            }
            onValueChange={(gameMode) =>
              handleChange("selectedGameMode", gameMode)
            }
          >
            <Picker.Item key="key1" label="Game Mode 1" value={SUBSCREENS.GAME_MODE_ONE} />
            <Picker.Item key="key2" label="Game Mode 2" value={SUBSCREENS.GAME_MODE_TWO} />
          </Picker>
          <Text
            style={{
              marginTop: 10,
              marginBottom: 10,
              color: COLOR_COMBINATION_1.ORANGE,
            }}
          >
            Select duration
          </Text>
          <Picker
            itemStyle={{ marginTop: -70 }}
            selectedValue={formValues.duration}
            style={
              Platform.OS === "ios"
                ? { width: 200, height: 70, backgroundColor: "white" }
                : { width: 200, backgroundColor: "white" }
            }
            onValueChange={(duration: GameDurations) =>
              handleChange("duration", duration)
            }
          >
            {renderDurationPickerItems()}
          </Picker>
          <CustomizableButton
            onPress={() => {
              if (formValues.selectedCharacters.length === 0) {
                return setIsModalVisible(true);
              }
              navigation.navigate(formValues.selectedGameMode, {
                formValues: {
                  ...formValues,
                  selectedCharacters: shuffle(formValues.selectedCharacters),
                },
              });
            }}
            stylesButton={{
              ...STANDARDISED_STYLES.CENTER_CONTENT,
              ...STANDARDISED_STYLES.BUTTON,
              marginTop: 10,
              height: 50,
              marginBottom: 10,
              marginLeft: 5,
              marginRight: 5,
              backgroundColor: COLOR_COMBINATION_1.ORANGE,
            }}
            title="Play"
          />
        </>
      )}
    </AppLayout>
  );
};
