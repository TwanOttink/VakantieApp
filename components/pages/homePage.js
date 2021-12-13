import React, {useState, useEffect} from "react";
import { Text, ScrollView, StyleSheet } from "react-native";
import { ListItem, Header } from "react-native-elements";
import axios from "axios";

export default function homePage() {
    const [HolidayData, setHolidayData] = useState([]);
    const [Available, SetAvailable] = useState(false);
  
    function getHolidayData() {
      axios
        .get(
          "https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/2021-2022?output=json"
        )
        .then((res) => {
          const data = res.data.content[0];
          setHolidayData(data);
          SetAvailable(true);
        });
    }
  
    useEffect(() => {
      getHolidayData();
    }, []);
  
    return (
      <ScrollView>
        <Header
            centerComponent={{text: 'Homepage', style: {color: 'darkblue', fontWeight: 'bold', fontSize: 30}}}
            containerStyle={{
                backgroundColor: 'orange',
            }}
        />
        {Available ? (
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
          <Text>No data available</Text>
        )}
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  centerText: {
    textAlign: 'center', // <-- the magic
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