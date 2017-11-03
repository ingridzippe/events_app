import { StyleSheet } from 'react-native';

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    // backgroundColor: '#F5FCFF',
  },
  containerFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  eventsContainer: {
    flex: 1,
    // borderColor: '#000',
    // borderWidth: 1,
    backgroundColor: '#fff',
    width: 360,
    marginLeft: 30
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textBig: {
    fontSize: 30,
    textAlign: 'center',
    margin: 15,
    marginTop: -20,
    fontWeight: '600',
    fontFamily: 'AvenirNext-Regular'
  },
  input: {
    alignSelf: 'stretch',
    paddingTop: 20,
    paddingBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20,
    borderRadius: 5,
    color: '#000',
    borderColor: '#a5c0df',
    borderWidth: 1
  },
  event: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    width: 310,
    height: 85,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#a5c0df',
  },
  words: {
    width: 270,
    marginTop: 6,
    marginLeft: 20,
    fontSize: 16
  },
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5
  },
  buttonRed: {
    backgroundColor: '#FF585B',
  },
  buttonBlue: {
    backgroundColor: '#0198E1'
    // backgroundColor: '#0074D9',
  },
  buttonGreen: {
    backgroundColor: '#2ECC40'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    padding: 10,
    fontFamily: 'AvenirNext-Regular'
  },
  or: {
    fontFamily: 'AvenirNext-Regular',
    padding: 20,
  },
  bottombar: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    height: 70,
    borderTopWidth: 0.5,
    borderColor: '#a5c0df',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    // borderWidth: 1,
    // borderRadius: 10,
    // borderColor: '#a5c0df',
  },
  bottombaritem: {
    marginTop: 10,
    flex: 0.2,
    alignItems: 'center',
  }
});

export default styles;
