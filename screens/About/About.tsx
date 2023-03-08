import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { COLOR_COMBINATION_1 } from "../../styles/styles";
import packageJson from "../../package.json";
import { AppLayout } from "../../components/AppLayout/AppLayout";

const appVersion = packageJson.version;

export const About = (): JSX.Element => (
  <AppLayout>
    <ScrollView
      contentContainerStyle={{
        paddingLeft: 50,
        paddingRight: 50,
        alignItems: "center",
        backgroundColor: COLOR_COMBINATION_1.DARK_BLUE,
      }}
    >
      <View style={styles.section}>
        <Text style={styles.sectionHeadlineText}>1.1. General Info</Text>
        <Text style={styles.sectionText}>
          This application was created mainly for personal use.{"\n"} However,
          because I thought it may also benefit broader range of people I came
          to decision to make it available for everyone using Android devices.
          {"\n"} The application was designed under UI/UX usability guidelines
          to make the usage as simple and fun as possible.{"\n"}
          Through various game modes, it is supposed to make learning of foreign
          characters like Hiragana interactive and fun.{"\n"}
          Because of its fun-like nature and ease of use, its intended to be
          used by people of all age groups independent of their backgrounds.
          {"\n"}
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeadlineText}>1.2. Feedback & Contact</Text>
        <Text style={styles.sectionText}>
          I strongly encourage everyone to send any available feedback or
          similar through the contact form built in the application. This may
          include, proposals for improvement, questions about development or
          similar.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeadlineText}>1.3. Funding</Text>
        <Text style={styles.sectionText}>
          The application is being funded by Google Ads and in-app purchases.
          The funds are mainly used to keep the application running.{"\n"}
          Expenses include development costs like Firebase subscription plans,
          additional writing and reading accesses, serverless functions and
          similar.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeadlineText}>1.4. Application Version</Text>
        <Text style={styles.sectionText}>
          To update your app to the latest version, simply navigate to the
          Google Play Store and select "Update" for the app.{"\n"}
          Current installed application version is {appVersion}.
        </Text>
      </View>
    </ScrollView>
  </AppLayout>
);

const styles = StyleSheet.create({
  section: {
    marginTop: 10
  },
  sectionText: {
    color: COLOR_COMBINATION_1.ORANGE,
    padding: 10,
  },
  sectionHeadlineText: {
    color: "white",
  },
});
