// import React from "react";
// import { Text, View } from "react-native";
// import { Header } from "react-native-elements";

// export default function countdownPage() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
// <Header
//       centerComponent={{text: 'Countdown', style: {color: 'darkblue', fontWeight: 'bold', fontSize: 30}}}
//       containerStyle={{
//           backgroundColor: 'orange',
//       }}
//   />
//       <Text>Countdown!</Text>
//     </View>
//   );
// }
import { Text, View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CountDown from "react-native-countdown-component";
import { Header } from "react-native-elements";

export default function CounterTab() {
  const [HolidayData, setHolidayData] = useState([]);
  const [Available, SetAvailable] = useState(false);

  function getHolidayData() {
    axios
      .get(
        "https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/2021-2022?output=json"
      )
      .then((res) => {
        const data = {};
        let dataSet = false;
        res.data.content[0].vacations.forEach((element) => {
          let ans = calculateDays(element.regions[0].startdate);
          if (dataSet) {
            return;
          }
          if (ans <= 0) {
            return;
          }
          data.type = element.type;
          data.regions = element.regions;
          data.daysToGo = ans;
          dataSet = true;
        });
        console.log(data);
        setHolidayData(data);
        SetAvailable(true);
      });
  }

  useEffect(() => {
    getHolidayData();
  }, []);

  function calculateDays(date) {
    const _MS_PER_DAY = 1000 * 3600 * 24;
    const date1 = new Date();
    const date2 = new Date(date);
    return Math.floor((date2 - date1) / _MS_PER_DAY);
  }

  return (
    <View style={{ flex: 1 }}>
      <Header
        centerComponent={{ text: 'Countdown', style: { color: 'darkblue', fontWeight: 'bold', fontSize: 30 } }}
        containerStyle={{
          backgroundColor: 'orange',
        }}
      />
      {Available ? (
        <CountDown
          until={60 * 60 * 24 * (HolidayData.daysToGo + 1)}
          timeToShow={('D')}
          onFinish={() => alert("Vakantie")}
          onPress={() => alert("Niet klikken")}
          size={50}
          style={styles.Margintest}
        />
      ) : (
        <Text>Data is not available.</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  Margintest: {
    marginTop: 210,
  },
});