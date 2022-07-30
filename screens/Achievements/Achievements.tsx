import { ScrollView } from "react-native";
import { Achievements as AchievementArray, SCREENS } from "../../constants";
import {
  Achievement as AchievementType,
  RootStackParamList,
} from "../../types";
import { COLOR_COMBINATION_1 } from "../../styles/styles";
import { Achievement } from "../../components/Achievement/Achievement";
import { StackScreenProps } from "@react-navigation/stack";

export const Achievements = ({
  navigation,
}: StackScreenProps<RootStackParamList, SCREENS.PROFILE>) => {
  return (
    <ScrollView style={{ backgroundColor: COLOR_COMBINATION_1.BLACK }}>
      {AchievementArray.map((achievement: AchievementType) => (
        <Achievement
          achieved={achievement.achieved}
          id={achievement.id}
          worth={achievement.worth}
          description={achievement.description}
          name={achievement.name}
        />
      ))}
    </ScrollView>
  );
};
