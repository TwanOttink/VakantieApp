import React, {useState, useEffect} from "react";
import { Text, ScrollView, StyleSheet, RefreshControl } from "react-native";
import { ListItem, Header } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function homePage() {
    const [HolidayData, setHolidayData] = useState([]);
    const [Loaded, SetAvailable] = useState(false);
    const [SchoolYear, SetSchoolYear] = useState("2021-2022");
    const [Region, setRegion] = useState();
    const [refreshing, setRefreshing] = useState(false);
  
    function getHolidayData() {
      axios
        .get(
          "https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/" +
            SchoolYear +
            "?output=json"
        )
        .then((res) => {
          const data = res.data.content[0];
          setHolidayData(data);
          SetAvailable(true);
        });
    }
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getRegion()
      getHolidayData()
      setRefreshing(false);
    }, []);

    const getRegion = async () => {
      try {
        region = await AsyncStorage.getItem("Region");
      } catch (e) {
        console.log(e);
      }
      setRegion(region);
    };
  
    useEffect(() => {
      getHolidayData();
      getRegion();
    }, [SchoolYear]);
  
    return (
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      >
        <Header
            centerComponent={{text: 'Homepage', style: {color: 'darkblue', fontWeight: 'bold', fontSize: 30}}}
            containerStyle={{
                backgroundColor: 'orange',
            }}
        />
        <Picker
        style={{ backgroundColor: "orange", color: "darkblue" }}
        selectedValue={SchoolYear}
        onValueChange={(itemValue, itemIndex) => SetSchoolYear(itemValue)}
      >
        <Picker.Item label="2021-2022" value="2021-2022" />
        <Picker.Item label="2022-2023" value="2022-2023" />
        <Picker.Item label="2023-2024" value="2023-2024" />
        <Picker.Item label="2024-2025" value="2024-2025" />
        <Picker.Item label="2025-2026" value="2025-2026" />
      </Picker>
        {Loaded ? (
          HolidayData.vacations.map((d, i) => (
            <ListItem key={i}>
              <ListItem.Content style={styles.centerText}>
                <ListItem.Title style={styles.bigBlue}>{d.type}</ListItem.Title>
                {d.regions.map((sd, i) => (
                  <ListItem.Subtitle key={i} style={styles.ratingText}>
                      {/* .charAt(0).toUpperCase() + sd.region.slice(1).toLowerCase() maakt eerste letter hoofdletter */}
                    {sd.region.charAt(0).toUpperCase() + sd.region.slice(1).toLowerCase()}: {sd.startdate.slice(0, 10)} tot{" "}
                    {sd.enddate.slice(0, 10)}
                  </ListItem.Subtitle>
                ))}
              </ListItem.Content>
            </ListItem>
          ))
        ) : (
          <Text>Data is not available.</Text>
        )}
        <Text style={{ backgroundColor: "darkblue", color: "white" }}>{[Region]}</Text>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  centerText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
  },
  bigBlue: {
    color: 'darkblue',
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: -125,
  },
  orange: {
    color: 'orange',
    backgroundColor: 'red'
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingText: {
    paddingLeft: 10,
    color: 'orange'
  }
});