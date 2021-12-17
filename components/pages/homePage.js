import React, {useState, useEffect} from "react";
import { Text, ScrollView, StyleSheet } from "react-native";
import { ListItem, Header } from "react-native-elements";
import axios from "axios";

export default function homePage() {
    const [VakantieData, setVakantieData] = useState([]);
    const [Loaded, SetLoaded] = useState(false);
    const [SchoolYear, SetSchoolYear] = useState("2021-2022");
  
    function getVakantieData() {
      axios
        .get(
          "https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/2021-2022?output=json"
        )
        .then((res) => {
          const data = res.data.content[0];
          setVakantieData(data);
          SetLoaded(true);
        });
    }
  
    useEffect(() => {
      getVakantieData();
    }, []);
  
    return (
      <ScrollView>
        <Header
        leftComponent={{text: 'N'}}
            centerComponent={{text: 'Homepage', style: {color: 'darkblue', fontWeight: 'bold', fontSize: 30}}}
            containerStyle={{
                backgroundColor: 'orange',
            }}
        />
        {Loaded ? (
          VakantieData.vacations.map((d, i) => (
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