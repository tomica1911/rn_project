import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { COLOR_COMBINATION_1 } from "../../styles/styles";

export const About = ({ navigation }: any): JSX.Element => {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingLeft: 50,
        paddingRight: 50,
        alignItems: "center",
        backgroundColor: COLOR_COMBINATION_1.BLACK,
      }}
    >
      <View style={{ marginTop: 10 }}>
        <Text style={styles.headlineText}>1.1. General Info</Text>
        <Text style={styles.text}>
          This application was created mainly for personal use.{"\n"}{" "}
          However, because I thought it may also benefit broader range of people
          I came to decision to make it available for everyone using Android or
          iOS devices.{"\n"} The application was designed under UI/UX usability
          guidelines to make the usage as simple and fun as possible.{"\n"}
          Through various game modes, it is supposed to make learning of foreign
          characters like Hiragana interactive and fun.{"\n"}
          Because of its fun-like nature and ease of use, its intended to be
          used by people of all age groups independent of their backgrounds.
          {"\n"}
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.headlineText}>1.2. Feedback & Contact</Text>
        <Text style={styles.text}>
          I strongly encourage everyone to send any available feedback or
          similar through the contact form built in the application. This may
          include, proposals for improvement, questions about development or
          questions about application functionalities.
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.headlineText}>
          1.3. Funding
        </Text>
        <Text style={styles.text}>
          The application is being funded solely by Google Ads. The funds are
          mainly used to keep the application running.{"\n"}
          Expenses include mainly development costs like basic Firebase
          subscription plans, additional writing and reading from databases and
          everything else that is in some way connected to the application.
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.headlineText}>1.4. Donations</Text>
        <Text style={styles.text}>
          Currently there is no ability to make donations, however, this should
          change over time.
        </Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.headlineText}>1.5. Subscription</Text>
        <Text style={styles.text}>
          As of current time (30.10.2022) there are not any plans to add
          subscription to the application. However, while its currently not
          supported, it does´nt mean that it won´t be added. In case where
          subscription will be added, it will be strongly advocated for the main
          functionalities to stay the same with a few other additional benefits.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLOR_COMBINATION_1.ORANGE,
  },
  headlineText: {
    color: "white",
  },
});
