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
import { bindActionCreators } from 'redux';
import * as pageActions from '../actions/pageList';
import * as racesActions from '../actions/racesList';


 const RaceRow = ({race}) => (
	
	<View style={styles.rowWrapper}>
			<View style={styles.cellRaces}>
			<Text style={styles.textCenter}>{race.season}</Text>
			</View>
			<View style={styles.cellRaces}>
				<Text style={styles.textCenter}>{race.round}</Text>
			</View>
			<View style={styles.cellName}>
				<Text style={styles.textCenter}>{race.raceName}</Text>
			</View>
			<View style={styles.cellRaces}>
				<Text style={styles.textCenter}>{race.date}</Text>
			</View>
			<View style={styles.cellRaces}>
				<Text style={styles.textCenter}>{race.time?race.time:''}</Text>
			</View>
			<View style={styles.cellRaces}>
				<Text style={styles.textCenter}>{race.sprint?race.sprint:''}</Text>
			</View>
			<View style={styles.cellName}>
				<Text style={styles.textCenter}>{race.Circuit?race.Circuit.circuitName:''}</Text>
			</View>
			<View style={styles.cellRaces}>
				<TouchableOpacity onPress={()=>Linking.openURL(race.Circuit.url)}>
					<Text style={styles.textLink}>{race.Circuit?race.Circuit.circuitId:''}</Text>
				</TouchableOpacity>
			</View>
			</View>
	
	);


class RacesScreen extends Component {
	
	constructor(props)
	{
		
		super(props);
		console.log(props);
		
	}
	
	componentDidMount() {
		
		let {  actions, pageNumber, totalPages } = this.props;
		
		//actions.getRaceList(driverId,pageNumber);
	}
	
	
	
	
  incrementCount() {
    let {  actions, pageNumber, totalPages, driverId } = this.props;
	
	
	if (pageNumber < totalPages-1 || totalPages ==0)
		actions.getRacesList(driverId,pageNumber+1)
  }
  
  decrementCount() {
    let {  actions, pageNumber, totalPages, driverId } = this.props;
	
	if (pageNumber >0)
		actions.getRacesList(driverId,pageNumber-1)
  }
  
	render() {
		
		const { racesList, isLoading, pageNumber, totalPages, driverId, error } = this.props;
    
	let self = this;
	
		
  return (
	<ScrollView contentContainerStyle={{flex:1}}>
	<View style={styles.container}>
	{isLoading && <Text>Загрузка...</Text>}
		<ScrollView  horizontal={true}>
		
		<View style={styles.tableWrapper}>
		{error!='' && <Text style={styles.textError}>{error}</Text>}
		{(!isLoading && error == '') && <View style={styles.rowWrapper}>
			<View style={styles.cellRaces}>
			<Text style={styles.textHead}>Season</Text>
			</View>
			<View style={styles.cellRaces}>
				<Text style={styles.textHead}>Round</Text>
			</View>
			<View style={styles.cellName}>
				<Text style={styles.textHead}>Race Name</Text>
			</View>
			<View style={styles.cellRaces}>
				<Text style={styles.textHead}>Date</Text>
			</View>
			<View style={styles.cellRaces}>
				<Text style={styles.textHead}>Time</Text>
			</View>
			<View style={styles.cellRaces}>
				<Text style={styles.textHead}>Sprint</Text>
			</View>
			<View style={styles.cellName}>
				<Text style={styles.textHead}>Circuit</Text>
			</View>
			<View style={styles.cellRaces}>
				<Text style={styles.textHead}>Info</Text>
			</View>
			</View>}
			<ScrollView>
        {racesList.map((race,index) => (
          <RaceRow race={race} key={index} />
        ))}
		</ScrollView>
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
	  
	  fontSize: 12,
	
    
  },
  textHead: {
	    color: '#000000',
	  fontWeight: 'bold',
  },
  textLink: {
	  color: '#497DDD',
	 textDecorationLine: 'underline',
	 fontSize: 12,
  },
  textError: {
	fontSize: 20,
	color:'red',	
  },
  rowWrapper: {
	  
	  flex: 1,
	  flexDirection: 'row',
	  maxHeight: 40,
	  minHeight: 30,
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
	flex: 1  
  },
  
  bottomTextWrapper: {
	flex: 1,
	justifyContent: 'center',
    alignItems: 'center'
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
  
  
   cellName: {
	width: 140,
	padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 2, 
    justifyContent: 'center',
    alignItems: 'center',
	
  },
  
  cellRaces: {
	width: 80,
	padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  
  
    
});

const mapStateToProps = state => ({
  racesList: state.raceList.racesList,
  isLoading: state.raceList.isLoading,
  pageNumber: state.raceList.pageNumber,
  totalPages: state.raceList.totalPages,
  driverId: state.raceList.driverId,
  error: state.raceList.error,
});

const ActionCreators = Object.assign(
  {},
  racesActions,
  
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),

});

export default connect(mapStateToProps, mapDispatchToProps)(RacesScreen)