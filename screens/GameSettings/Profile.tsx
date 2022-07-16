import { Text, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import {
  GamesPlayedGoalMilestones,
  PointsGoalMilestones,
} from "../../constants";
import { AppLayout } from "../../components/AppLayout/AppLayout";
import { COLOR_COMBINATION_1, STANDARDISED_STYLES } from "../../styles/styles";
import { CustomizableButton } from "../../components/CustomizableButton/CustomizableButton";

// @ts-expect-error
export const Profile = ({ navigation }): JSX.Element => {
  return (
    <AppLayout>
      <Text style={{ color: COLOR_COMBINATION_1.ORANGE, textAlign: "center" }}>
        Daily Points Goal:
      </Text>
      <Picker
        itemStyle={{ marginTop: -70 }}
        // complete this functionality - should not be static
        selectedValue={2000}
        style={
          Platform.OS === "ios"
            ? { width: 200, height: 70, backgroundColor: "white" }
            : { width: 200, backgroundColor: "white" }
        }
        onValueChange={() => {}}
      >
        {PointsGoalMilestones.map(
          (pointMilestone: number, milestoneIndex: number) => (
            <Picker.Item
              key={`${pointMilestone}-${milestoneIndex}`}
              label={pointMilestone.toString()}
              value={pointMilestone}
            />
          )
        )}
      </Picker>
      <Text style={{ color: COLOR_COMBINATION_1.ORANGE, textAlign: "center" }}>
        Daily Completed Games Goal:
      </Text>
      <Picker
        itemStyle={{ marginTop: -70 }}
        // complete this functionality - should not be static
        selectedValue={2000}
        style={
          Platform.OS === "ios"
            ? { width: 200, height: 70, backgroundColor: "white" }
            : { width: 200, backgroundColor: "white", marginTop: 5 }
        }
        onValueChange={() => {}}
      >
        {GamesPlayedGoalMilestones.map(
          (pointMilestone: number, milestoneIndex: number) => (
            <Picker.Item
              key={`${pointMilestone}-${milestoneIndex}`}
              label={pointMilestone.toString()}
              value={pointMilestone}
            />
          )
        )}
      </Picker>
      <CustomizableButton
        onPress={() => navigation.navigate("Main Menu")}
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
        title="Back"
      />
    </AppLayout>
  );
};
