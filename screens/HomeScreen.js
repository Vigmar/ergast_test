import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Button,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';


import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as pageActions from '../actions/pageList';
import * as racesActions from '../actions/racesList';


class HomeScreen extends Component {
	
	constructor(props)
	{
		
		super(props);
		console.log(props);
		
	}
	
	componentDidMount() {
		
		let {  actions, pageNumber, totalPages } = this.props;
		
		actions.getPageList(pageNumber);
	}
	
	
	
	
  incrementCount() {
    let {  actions, pageNumber, totalPages } = this.props;
	
	if (pageNumber < totalPages-1 || totalPages ==0)
		actions.getPageList(pageNumber+1)
  }
  
  decrementCount() {
    let {  actions, pageNumber, totalPages } = this.props;
	
	if (pageNumber >0)
		actions.getPageList(pageNumber-1)
  }
  
	onRacePress(driver) {
	  
		let {  actions, navigation } = this.props;
		actions.getRacesList(driver.driverId,0);
		navigation.navigate('Races')
	}
	
	onDriverPress(driver)
	{
		let {  actions, navigation } = this.props;
		actions.setDriverInfo(driver);
		//actions.getRacesList(driver.driverId,0);
		navigation.navigate('Info');
	}
	
	
	render() {
		
		const { pageList, isLoading, pageNumber, totalPages, driverInfo, racesPages, error, navigation } = this.props;
    console.log(pageList);
	
	let self = this;
	
		
  return (
	<ScrollView contentContainerStyle={{flex:1}}>
	<View style={styles.container}>
		<ScrollView>
		<View style={styles.tableWrapper}>
		{error!='' && <Text style={styles.textError}>{error}</Text>}
		{isLoading && <Text>Загрузка...</Text>}
		
		{(!isLoading && error == '') && <View style={styles.rowWrapper}>
			<View style={styles.cellName}>
			<Text style={styles.textHead}>Гонщик</Text>
			</View>
			<View style={styles.cellRaces}>
            	<Text style={styles.textHead}>Заезды</Text>
			</View>
		</View>}
		
        {pageList.map((driver) => (
          <View style={styles.rowWrapper} key={driver.driverId}>
		
            <View style={styles.cellName}>
			<TouchableOpacity onPress={()=>self.onDriverPress(driver)}>
			<Text style={styles.textCenter}>{driver.givenName} {driver.familyName}</Text>
			</TouchableOpacity>
			</View>
			<View style={styles.cellRaces}>
             <TouchableOpacity onPress={()=>self.onRacePress(driver)}>
				<Text style={styles.textCenter}>Заезды</Text>
			</TouchableOpacity>
			</View>
          </View>
        ))}
		</View>
		</ScrollView>
		<View style={styles.bottomWrapper}>
		<View style={styles.rowWrapper}>
		<View style={styles.buttonWrapper}>
		 <TouchableOpacity onPress={() => this.decrementCount()}>
		 <Text style={styles.buttonStyle}>Предыдущая</Text>
		</TouchableOpacity>
		</View>
		<View style={styles.bottomTextWrapper}>
		<Text>{pageNumber+1} из {totalPages}</Text>
		</View>
		<View style={styles.buttonWrapper}>
		<TouchableOpacity onPress={() => this.incrementCount()}>
		 <Text style={styles.buttonStyle}>Следующая</Text>
		</TouchableOpacity>
		</View>	
		</View>
		</View>
	  </View>
    </ScrollView>
  );
	}
  
}

const styles = StyleSheet.create({
  container: {
    
	flex: 1, padding: 5,  backgroundColor: '#fff'
  },
  textCenter: {
	  fontSize: 14,
	  color: '#497DDD',
	 textDecorationLine: 'underline',
  },
  textError: {
	fontSize: 20,
	color:'red',	
  },
  textHead: {
	  color: '#000000',
	 fontWeight: 'bold',
	 fontSize: 14,
  },
  
  rowWrapper: {
	  
	  flex: 1,
	  flexDirection: 'row',
  },
  bottomWrapper: {
	  
	  marginTop: 5,
	  padding: 5,
	  height: 50,
	  
	  
  },
  tableWrapper : {
	  flex:1,
  },
  
  buttonWrapper: {
	flex: 1,
	
  },
  buttonStyle: {
		padding: 10,
      backgroundColor: "#4285F4",
      borderColor: "transparent",
      borderRadius: 10,
	  fontSize: 14,
	  color: '#ffffff',
	  textAlign: 'center',
	  alignItems: 'center',
  },
  
  bottomTextWrapper: {
	flex: 1,
	justifyContent: 'center',
    alignItems: 'center'
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
  pageList: state.pageList.pageList,
  isLoading: state.pageList.isLoading,
  pageNumber: state.pageList.pageNumber,
  totalPages: state.pageList.totalPages,
  racesPages: state.raceList.totalPages,
  driverInfo: state.pageList.driverInfo,
  error: state.pageList.error,
});

const ActionCreators = Object.assign(
  {},
  pageActions,
  racesActions,
  
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)