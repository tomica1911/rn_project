import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
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
import { GameModes, Status } from "../../constants";
import {GameData, StatisticalData} from "../../types";
import { Picker } from "@react-native-picker/picker";

const pieChartStatusColors: Record<Status, string> = {
  win: "#0F2F99",
  timeout: "#E6D600",
  incorrect: "#850F99",
};

const statisticalDataFetcher = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const Dashboard = ({ navigation }: any): JSX.Element => {
  const { currentUser } = useAuth();
  const { data, error } = useSWR<StatisticalData>(
    `https://us-central1-react-native-characters-8a00b.cloudfunctions.net/getStatisticalData?id=kGjuDnsoA8Qvkkaz7jGkVn0xlO83`,
    statisticalDataFetcher
  );

  console.log(data);
  // ToDo: move each side to its own component
  // ToDo: refactor colors so they come from one place
  // ToDo: add Contribution Graph for daily goals
  // ToDo: add Pie Chart for different game characters
  // ToDo: try to use AppLayout for the swiper, remove as any for styles
  // ToDo: add statistics for achievements
  return (
    <>
      {!data ? (
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
                    data: data.individualPoints,
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
                    data: data.barChartData,
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
              data={data.pieChartStatusData}
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
              <Text style={{ fontSize: 50 }}>{data.averageGameDuration}</Text>
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
              <Text style={{ fontSize: 50 }}>{data.mostPlayedDuration}</Text>
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
              <Text style={{ fontSize: 20 }}>
                {data.individualPoints?.length || ""}
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
              <Text style={{ fontSize: 15 }}>{data.pointsWon}</Text>
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
