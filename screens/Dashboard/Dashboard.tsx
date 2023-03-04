import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import Swiper from "react-native-swiper";
import { useAuth } from "../../contexts/authContext";
import { COLOR_COMBINATION_1, STANDARDISED_STYLES } from "../../styles/styles";
import { AppLayout } from "../../components/AppLayout/AppLayout";
import { GameModes, Status } from "../../constants";
import { StatisticalData } from "../../types";
import { Picker } from "@react-native-picker/picker";
import { CustomizableButton } from "../../components/CustomizableButton/CustomizableButton";
import { Modal } from "../../components/Modal/Modal";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

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

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForLabels: {
    fontSize: 20,
  },
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const barAndLineChartDimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height / 1.5,
};

export const Dashboard = ({ navigation }: any): JSX.Element => {
  const [isCacheRead, setIsCacheRead] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const { data, error } = useSWR<StatisticalData>(
    `https://us-central1-react-native-characters-8a00b.cloudfunctions.net/getStatisticalData?id=${currentUser?.uid}`,
    statisticalDataFetcher
  );
  const { getItem: getCachedModalSettings, setItem: setCachedModalSettings } =
    useAsyncStorage("@dashboardModalSetting");

  useEffect(() => {
    const readModalSettingsFromStorage = async () => {
      const modalSettings = await getCachedModalSettings();
      const parsedModalSettings: any = JSON.parse(modalSettings ?? "[]");
      setIsCacheRead(true);
      setModalVisible(parsedModalSettings.shouldPopUp ?? true);
    };

    readModalSettingsFromStorage();
  }, []);

  // ToDo: refactor colors so they come from one place
  // ToDo: add Contribution Graph for daily goals
  // ToDo: add Pie Chart for different game characters
  // ToDo: try to use AppLayout for the swiper, remove as any for styles
  // ToDo: add statistics for achievements
  return (
    <>
      <AppLayout>
        {!data || !isCacheRead || error ? (
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
        ) : (
          <>
            <Modal
              isModalVisible={isModalVisible}
              footerComponent={
                <View>
                  <CustomizableButton
                    onPress={() => setModalVisible(false)}
                    title="Got it!"
                  />
                  <CustomizableButton
                    primary={false}
                    onPress={async () => {
                      await setCachedModalSettings(
                        JSON.stringify({
                          shouldPopUp: false,
                        })
                      );
                      setModalVisible(false);
                    }}
                    title="Do not show again"
                  />
                </View>
              }
              headerTitle="Tip!"
              headerText="Swipe left or right to change cards!"
            />
            <Swiper
              style={{
                backgroundColor: COLOR_COMBINATION_1.DARK_BLUE,
              }}
              dotStyle={{
                backgroundColor: "#F7B42F",
              }}
              activeDotStyle={{
                backgroundColor: "white",
              }}
              buttonWrapperStyle={{
                display: "none",
              }}
              showsButtons={true}
            >
              <View>
                <Text
                  style={{
                    ...styles.slideContainerDescriptionText,
                    fontSize: 30,
                  }}
                >
                  Points gained, each game representing a dot
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
                  {...barAndLineChartDimensions}
                  yAxisSuffix="pt"
                  yAxisInterval={1}
                  chartConfig={chartConfig}
                  bezier
                />
              </View>
              <View>
                <Text
                  style={{
                    ...styles.slideContainerDescriptionText,
                    fontSize: 30,
                  }}
                >
                  Chosen game modes
                </Text>
                <BarChart
                  fromZero
                  yAxisSuffix=""
                  yAxisLabel=""
                  yAxisInterval={1}
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
                  chartConfig={chartConfig}
                  {...barAndLineChartDimensions}
                />
              </View>
              <View>
                <Text style={styles.slideContainerDescriptionText}>
                  Frequency of game results
                </Text>
                <PieChart
                  data={data.pieChartStatusData}
                  width={Dimensions.get("window").width}
                  height={Dimensions.get("window").height / 2}
                  avoidFalseZero
                  chartConfig={chartConfig}
                  hasLegend={false}
                  accessor="count"
                  backgroundColor={"transparent"}
                  paddingLeft={"15"}
                  center={[80, 0]}
                />
                <Text style={{ alignSelf: "center", color: "#F7B42F" }}>
                  Legend
                </Text>
                <View style={styles.pieChartPickerContainer}>
                  <Picker
                    itemStyle={{
                      marginTop: -70,
                    }}
                    selectedValue={Object.values(Status)[0]}
                    style={
                      Platform.OS === "ios"
                        ? styles.pickerIos
                        : styles.pickerAndroid
                    }
                  >
                    {Object.values(Status).map((status: Status) => (
                      <Picker.Item
                        enabled={false}
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
              <View style={styles.slideContainer}>
                <Text style={styles.slideContainerDescriptionText}>
                  Average Duration
                </Text>
                <View style={styles.sliderContainerBox}>
                  <Text style={styles.sliderContainerBoxText}>
                    {Number(data.averageGameDuration).toFixed(2)}
                  </Text>
                  <Text>seconds</Text>
                </View>
              </View>
              <View style={styles.slideContainer}>
                <Text style={styles.slideContainerDescriptionText}>
                  Most played duration
                </Text>
                <View style={styles.sliderContainerBox}>
                  <Text style={styles.sliderContainerBoxText}>
                    {data.mostPlayedDuration}
                  </Text>
                  <Text style={styles.sliderContainerBoxText}>seconds</Text>
                </View>
              </View>
              <View style={styles.slideContainer}>
                <Text style={styles.slideContainerDescriptionText}>
                  Number of played games
                </Text>
                <View style={styles.sliderContainerBox}>
                  <Text style={styles.sliderContainerBoxText}>
                    {data.individualPoints?.length || ""}
                  </Text>
                </View>
              </View>
              <View style={styles.slideContainer}>
                <Text style={styles.slideContainerDescriptionText}>
                  Total points won
                </Text>
                <View style={styles.sliderContainerBox}>
                  <Text style={styles.sliderContainerBoxText}>
                    {data.pointsWon}
                  </Text>
                </View>
              </View>
            </Swiper>
          </>
        )}
      </AppLayout>
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
  slideContainer: {
    padding: 32,
    backgroundColor: COLOR_COMBINATION_1.DARK_BLUE,
  },
  slideContainerDescriptionText: {
    color: "#F7B42F",
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sliderContainerBox: {
    width: Dimensions.get("window").width / 1.5,
    height: Dimensions.get("window").height / 2,
    backgroundColor: "#DFDFD9",
    borderRadius: 16,
    borderStyle: "solid",
    borderWidth: 5,
    borderColor: "#F7B42F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  sliderContainerBoxText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#333",
  },
  pieChartPickerContainer: {
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    alignSelf: "center",
  },
  pickerIos: { width: 200, height: 70, backgroundColor: "white" },
  pickerAndroid: {
    width: 200,
    backgroundColor: "white",
    textAlign: "center",
  },
});
