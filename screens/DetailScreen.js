import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Button,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';


import { connect } from 'react-redux';


class DetailScreen extends Component {
	
	constructor(props)
	{
		
		super(props);
		this.urlPress = this.urlPress.bind(this);
	}
	
	urlPress() {
		
		const { driverInfo} = this.props;
		
		 Linking.openURL(driverInfo.url);
	}
	
	
	render() {
		
		const { driverInfo } = this.props;
		
	return (
	<View style={styles.container}>
		<View style={styles.tableWrapper}>
		  <View style={styles.rowWrapper}>
		    <View style={styles.cellName}><Text style={styles.textCenter}>Имя и фамиилия</Text></View>
		    <View style={styles.cellName}><Text style={styles.textCenter}>{driverInfo.givenName} {driverInfo.familyName}</Text></View>
          </View>
		  <View style={styles.rowWrapper}>
		    <View style={styles.cellName}><Text style={styles.textCenter}>Дата рождения</Text></View>
		    <View style={styles.cellName}><Text style={styles.textCenter}>{driverInfo.dateOfBirth} </Text></View>
          </View>
		  <View style={styles.rowWrapper}>
		    <View style={styles.cellName}><Text style={styles.textCenter}>Национальность</Text></View>
		    <View style={styles.cellName}><Text style={styles.textCenter}>{driverInfo.nationality} </Text></View>
          </View>
		  {driverInfo.url && <View style={styles.rowWrapper}>
		    <View style={styles.cellName}><Text style={styles.textCenter}>Ссылка в википедии</Text></View>
		    <View style={styles.cellName}><TouchableOpacity onPress={this.urlPress}><Text style={styles.textLink}>{driverInfo.driverId} </Text></TouchableOpacity></View>
          </View>}
        </View>
	  </View>
    
	);
	}
  
}

const styles = StyleSheet.create({
  container: {
    
	flex: 1, padding: 5,  backgroundColor: '#fff'
  },
  textCenter: {
	  
    
  },
  textLink: {
	     color: '#497DDD',
	textDecorationLine: 'underline',
    
  },
  rowWrapper: {
	  
	  flex: 1,
	  flexDirection: 'row',
	  height: 50,
  },
  tableWrapper : {
	minHeight: 150,  
  },
  
   cellName: {
	padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 3, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  cellRaces: {
	padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  
    
});

const mapStateToProps = state => ({
  driverInfo: state.pageList.driverInfo,
});


export default connect(mapStateToProps)(DetailScreen)