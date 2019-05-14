import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Configurar firestore.
const firebaseConfig = {
	apiKey: 'AIzaSyCzklUR-5zOrcmC6ltmzerwnFEjxxeZMmY',
	authDomain: 'bibliostore-d1895.firebaseapp.com',
	databaseURL: 'https://bibliostore-d1895.firebaseio.com',
	projectId: 'bibliostore-d1895',
	storageBucket: 'bibliostore-d1895.appspot.com',
	messagingSenderId: '880072965787',
};

// Inicializar firebase
firebase.initializeApp(firebaseConfig);

// Configuración de react-redux
const rrfConfig = {
	userProfile: 'users',
	useFirestoreForProfile: true,
};

// Crear el enhacer (potenciador) con compose de redux y firestore
const createStoreWithFirebase = compose(reactReduxFirebase(firebase, rrfConfig), reduxFirestore(firebase))(createStore);

// Reducers
const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
});

// State inicial
const initialState = {};

// Create el store
const store = createStoreWithFirebase(
	rootReducer,
	initialState,
	compose(reactReduxFirebase(firebase), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
);

export default store;
