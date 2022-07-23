import { ScrollView, View, Image } from "react-native";
import { Achievements as AchievementArray } from "../../constants";
import { Achievement as AchievementType } from "../../types";
import { COLOR_COMBINATION_1 } from "../../styles/styles";
import { Achievement } from "../../components/Achievement/Achievement";

export const Achievements = () => {
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
