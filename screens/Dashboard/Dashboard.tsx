import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
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
import { GameModes } from "../../constants";

// @ts-expect-error
export const Dashboard = ({ navigation }): JSX.Element => {
  // @ts-expect-error
  let { userFirestoreData, getUserData } = useFirestore();
  // @ts-expect-error
  const { currentUser } = useAuth();

  useEffect(() => {
    getUserData(currentUser.uid);
  }, []);

  const getAverageGameDuration = () => {
    const playedGamesDurations = userFirestoreData.playedGames.map(
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
          buttonWrapperStyle={{
            marginTop: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
          showsButtons={true}
        >
          <View>
            <Text style={{ backgroundColor: "white" }}>Bezier Line Chart</Text>
            <LineChart
              data={{
                labels: ["Time"],
                datasets: [
                  {
                    data: [
                      ...userFirestoreData.playedGames.map(
                        (game: any) => game.settings.points
                      ),
                      5,
                      10,
                      11,
                      50,
                      200,
                      5,
                      10,
                      20,
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
            <Text>Bezier Line Chart</Text>
            <LineChart
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                ],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get("window").width} // from react-native
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
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
            <Text>Bar Chart</Text>
            <BarChart
              fromZero
              yAxisSuffix="x"
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
                        return userFirestoreData.playedGames.reduce(
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
            <Text>Pie Chart</Text>
            <PieChart
              data={[
                {
                  name: "Seoul",
                  population: 21500000,
                  color: "rgba(131, 167, 234, 1)",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                },
                {
                  name: "Toronto",
                  population: 2800000,
                  color: "#F00",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                },
                {
                  name: "Beijing",
                  population: 527612,
                  color: "red",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                },
                {
                  name: "New York",
                  population: 8538000,
                  color: "#ffffff",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                },
                {
                  name: "Moscow",
                  population: 11920000,
                  color: "rgb(0, 0, 255)",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15,
                },
              ]}
              width={Dimensions.get("window").width}
              height={150}
              avoidFalseZero
              hasLegend={false}
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
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              center={[80, 0]}
            />
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
