import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import Swiper from "react-native-swiper";
import { useFirestore } from "../../contexts/firebaseContext";
import { useAuth } from "../../contexts/authContext";
import { STANDARDISED_STYLES } from "../../styles/styles";
import { AppLayout } from "../../components/AppLayout/AppLayout";
import { GameModes, SCREENS, Status } from "../../constants";
import { GameData, RootStackParamList } from "../../types";
import { Picker } from "@react-native-picker/picker";
import { StackScreenProps } from "@react-navigation/stack";

export const Dashboard = ({
  navigation,
}: StackScreenProps<RootStackParamList, SCREENS.DASHBOARD>): JSX.Element => {
  let { userFirestoreData, getUserData } = useFirestore();
  const { currentUser } = useAuth();
  useEffect(() => {
    getUserData(currentUser!.uid);
  }, []);

  const getAverageGameDuration = () => {
    const playedGamesDurations = userFirestoreData!.playedGames.map(
      (playedGame: any) => playedGame.settings.duration
    );

    const averageGameDuration =
      playedGamesDurations.reduce(
        (prevValue: number, currValue: number) => prevValue + currValue,
        0
      ) /
        playedGamesDurations.length -
      1;

    return averageGameDuration.toFixed(1);
  };

  const pieChartStatusColors: Record<Status, string> = {
    win: "#0F2F99",
    timeout: "#E6D600",
    incorrect: "#850F99",
  };

  const getMostPlayedDuration = () => {
    const playedGamesDurations = userFirestoreData!.playedGames.map(
      (playedGame: any) => playedGame.settings.duration
    );
    const durationCounts: Record<string, number> = {};

    for (const element of playedGamesDurations) {
      if (durationCounts[element]) {
        durationCounts[element] += 1;
      } else {
        durationCounts[element] = 1;
      }
    }
    let mostPlayed = 0;
    let duration: number = 0;
    for (const [durationKey, timesPlayed] of Object.entries(durationCounts)) {
      if (timesPlayed > mostPlayed) {
        mostPlayed = timesPlayed;
        duration = parseInt(durationKey);
      }
    }

    return duration;
  };

  const getPointsWon = () => {
    const mappedPoints = userFirestoreData!.playedGames.map(
      (playedGame: GameData) => playedGame.settings.points
    );
    const totalPoints = mappedPoints.reduce(
      (prevValue: number, currentValue: number) => prevValue + currentValue,
      0
    );

    return totalPoints;
  };

  const getPieChartStatusData = () => {
    const statusCount = Object.values(Status)
      .map((status: Status) => {
        return {
          [status]: userFirestoreData!.playedGames.filter(
            (gamePlayed: GameData) => gamePlayed.settings.status == status
          ).length,
        };
      })
      .reduce(
        (prevObject, currObject) => Object.assign(prevObject, currObject),
        {}
      );

    const pieChartData = [];
    for (const [status, count] of Object.entries(statusCount)) {
      pieChartData.push({
        name: status,
        color: pieChartStatusColors[status as Status],
        count,
        legendFontColor: pieChartStatusColors[status as Status],
        legendFontSize: 15,
      });
    }

    return pieChartData;
  };
  if (userFirestoreData) {
    getPieChartStatusData();
  }

  // ToDo: move each side to its own component
  // ToDo: refactor colors so they come from one place
  // ToDo: add Contribution Graph for daily goals
  // ToDo: add Pie Chart for different game characters
  // ToDo: try to use AppLayout for the swiper, remove as any for styles
  return (
    <>
      {!userFirestoreData ? (
        <AppLayout>
          <ActivityIndicator
            style={
              {
                ...STANDARDISED_STYLES.CENTER_CONTENT,
                flex: 1,
              } as any
            }
            size="large"
            color="#F7B42F"
          />
        </AppLayout>
      ) : (
        <Swiper
          style={{
            backgroundColor: "#111214",
          }}
          dotStyle={{
            backgroundColor: "#F7B42F",
          }}
          activeDotStyle={{
            backgroundColor: "white",
          }}
          prevButton={
            <Text style={{ fontSize: 50, color: "#F7B42F" }}>{"<"}</Text>
          }
          nextButton={
            <Text style={{ fontSize: 50, color: "#F7B42F" }}>{">"}</Text>
          }
          buttonWrapperStyle={{
            marginTop: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
          showsButtons={true}
        >
          <View>
            <Text
              style={{
                color: "#F7B42F",
                textAlign: "center",
                fontSize: 15,
                margin: 10,
              }}
            >
              Points gained, each game represents a dot
            </Text>
            <LineChart
              data={{
                labels: ["Time"],
                datasets: [
                  {
                    data: [
                      ...userFirestoreData.playedGames.map(
                        (game: any) => game.settings.points
                      ),
                    ],
                  },
                ],
              }}
              width={Dimensions.get("window").width} // from react-native
              height={220}
              yAxisSuffix="pt"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
          <View>
            <Text
              style={{
                color: "#F7B42F",
                textAlign: "center",
                fontSize: 15,
                margin: 10,
              }}
            >
              Chosen game modes
            </Text>
            <BarChart
              fromZero
              yAxisSuffix=""
              yAxisLabel=""
              yAxisInterval={1} // optional, defaults to 1
              data={{
                labels: [
                  ...Object.values(GameModes).map(
                    (gameMode: string) => `Game Mode ${gameMode}`
                  ),
                ],
                datasets: [
                  {
                    data: [
                      ...Object.values(GameModes).map((gameMode: string) => {
                        return userFirestoreData!.playedGames.reduce(
                          (prevValue: any, currValue: any) =>
                            currValue.settings.gameMode == gameMode
                              ? prevValue + 1
                              : prevValue,
                          0
                        );
                      }),
                    ],
                  },
                ],
              }}
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              width={Dimensions.get("window").width}
              height={220}
            />
          </View>
          <View>
            <Text
              style={{
                color: "#F7B42F",
                textAlign: "center",
                fontSize: 15,
                margin: 10,
              }}
            >
              Frequency of game results
            </Text>
            <PieChart
              data={getPieChartStatusData()}
              width={Dimensions.get("window").width}
              height={150}
              avoidFalseZero
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              hasLegend={false}
              accessor="count"
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              center={[80, 0]}
            />
            <Text style={{ alignSelf: "center", color: "#F7B42F" }}>
              Legend
            </Text>
            <View
              style={
                {
                  marginTop: 30,
                  ...STANDARDISED_STYLES.CENTER_CONTENT,
                  flex: 1,
                  alignSelf: "center",
                } as any
              }
            >
              {/*// ToDo: center content in picker.item if possible */}
              {/*// ToDo: add percentages to picker.item values */}
              {/*// ToDo: make picker items not clickable */}
              <Picker
                itemStyle={{
                  marginTop: -70,
                }}
                selectedValue={Object.values(Status)[0]}
                style={
                  Platform.OS === "ios"
                    ? { width: 200, height: 70, backgroundColor: "white" }
                    : {
                        width: 200,
                        backgroundColor: "white",
                        textAlign: "center",
                      }
                }
              >
                {Object.values(Status).map((status: Status) => (
                  <Picker.Item
                    key={status}
                    color={pieChartStatusColors[status as Status]}
                    label={(status + "■■■").replace(/(^\w|\s\w)/g, (m) =>
                      m.toUpperCase()
                    )}
                    value={status}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View>
            <Text
              style={{ color: "#F7B42F", textAlign: "center", fontSize: 50 }}
            >
              Average Duration
            </Text>
            <View
              style={{
                width: 150,
                height: 100,
                backgroundColor: "#DFDFD9",
                borderStyle: "solid",
                borderWidth: 5,
                borderColor: "#F7B42F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Text style={{ fontSize: 50 }}>{getAverageGameDuration()}s</Text>
            </View>
          </View>
          <View>
            <Text
              style={{ color: "#F7B42F", textAlign: "center", fontSize: 50 }}
            >
              Most played duration
            </Text>
            <View
              style={{
                width: 150,
                height: 100,
                backgroundColor: "#DFDFD9",
                borderStyle: "solid",
                borderWidth: 5,
                borderColor: "#F7B42F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Text style={{ fontSize: 50 }}>{getMostPlayedDuration()}s</Text>
            </View>
          </View>
          <View>
            <Text
              style={{ color: "#F7B42F", textAlign: "center", fontSize: 50 }}
            >
              Number of played games
            </Text>
            <View
              style={{
                marginTop: 5,
                width: 150,
                height: 100,
                backgroundColor: "#DFDFD9",
                borderStyle: "solid",
                borderWidth: 5,
                borderColor: "#F7B42F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              {/* ToDo: solve edge case */}
              <Text style={{ fontSize: 20 }}>
                {userFirestoreData.playedGames.length}
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{ color: "#F7B42F", textAlign: "center", fontSize: 50 }}
            >
              Total points won
            </Text>
            <View
              style={{
                width: 150,
                height: 100,
                backgroundColor: "#DFDFD9",
                borderStyle: "solid",
                borderWidth: 5,
                borderColor: "#F7B42F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              {/* ToDo: get rid of the edge case here somehow */}
              <Text style={{ fontSize: 15 }}>{getPointsWon()}</Text>
            </View>
          </View>
        </Swiper>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
