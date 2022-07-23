import { View, Text, Dimensions } from "react-native";
import type { Achievement as AchievementType } from "../../types";
import { COLOR_COMBINATION_1, STANDARDISED_STYLES } from "../../styles/styles";
import { WorthColorMapperObject } from "../../constants";

//ToDo import all types with import type
export const Achievement = ({
  id,
  name,
  worth,
  description,
  achieved,
}: AchievementType) => {
  return (
    <View
      style={{
        opacity: achieved ? 1 : 0.2,
        width: Dimensions.get("window").width - 50,
        height: 80,
        margin: 20,
          borderRadius: 15,
        borderStyle: "solid",
        borderWidth: 5,
        borderColor: WorthColorMapperObject[worth],
      }}
    >
      <View
        style={{
          borderStyle: "solid",
          borderBottomWidth: 5,
          borderColor: WorthColorMapperObject[worth],
          height: 20,
        }}
      >
        <Text
          style={{
            color: COLOR_COMBINATION_1.ORANGE,
            fontSize: 10,
            textAlign: "center",
          }}
        >
          {name}
        </Text>
      </View>
      <Text
        style={{
          color: COLOR_COMBINATION_1.ORANGE,
          marginTop: 5,
          textAlign: "center",
        }}
      >
        {description}
      </Text>
    </View>
  );
};
