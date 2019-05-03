import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

import Libros from './componentes/libros/Libros';
import MostrarLibro from './componentes/libros/MostrarLibro';
import NuevoLibro from './componentes/libros/NuevoLibro';
import EditarLibro from './componentes/libros/EditarLibro';
import PrestamoLibro from './componentes/libros/PrestamoLibro';

import Suscriptores from './componentes/suscriptores/Suscriptores';
import MostrarSuscriptor from './componentes/suscriptores/MostrarSuscriptor';
import EditarSuscriptor from './componentes/suscriptores/EditarSuscriptor';
import NuevoSuscriptor from './componentes/suscriptores/NuevoSuscriptor';

import Navbar from './componentes/layout/Navbar';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<div className="container">
					<Switch>
						<Route exact path="/" component={Libros} />
						<Route exact path="/libros/nuevo" component={NuevoLibro} />
						<Route exact path="/libros/mostrar/:id" component={MostrarLibro} />
						<Route exact path="/libros/editar/:id" component={EditarLibro} />
						<Route exact path="/libros/prestamo/:id" component={PrestamoLibro} />

						<Route exact path="/suscriptores" component={Suscriptores} />
						<Route exact path="/suscriptores/nuevo" component={NuevoSuscriptor} />
						<Route exact path="/suscriptores/mostrar/:id" component={MostrarSuscriptor} />
						<Route exact path="/suscriptores/editar/:id" component={EditarSuscriptor} />
					</Switch>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
