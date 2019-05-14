import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';
import FichaSuscriptor from '../suscriptores/FichaSuscriptor';

class PrestamoLibro extends Component {
  state = {
    noResultados: false,
    busqueda: '',
    resultado: {}
  }

  // Buscar alumno por código
  buscarAlumno = e => {
    e.preventDefault();
    
    // Obtener el valor a buscar
    const { busqueda } = this.state;

    // Extraer firestore
    const { firestore } = this.props;

    // Hacer la consulta
    const coleccion = firestore.collection('suscriptores');
    const consulta = coleccion.where('codigo', "==", busqueda).get();

    // Leer los resultados
    consulta.then(resultado => {
      if (resultado.empty) {
        // No hay resultados
        this.setState({
          noResultados: true,
          resultado: {}
        });
      } else {
        // Si hay resultados
        const datos = resultado.docs[0];
        this.setState({
          resultado: datos.data(),
          noResultados: false
        })
      }
    });
  }

  // Almacenar el código en el state
  leerDato = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // Almacenar datos del alumno para solicitar el libro
  solicitarPrestamo = () => {
    const suscriptor = this.state.resultado;

    // Fecha de alta
    suscriptor.fecha_solicitud = new Date().toLocaleDateString();

    // Obtener el libro
    const libroActualizado = this.props.libro;

    // Agregar el suscriptor al libro
    libroActualizado.prestados.push(suscriptor);

    // Obtener firestore y history de props
    const { firestore, history, libro } = this.props;

    // Almacenar en DB
    firestore.update({
      collection: 'libros',
      doc: libro.id
    }, libroActualizado).then(history.push('/'));
  }

  render() {
    // Extraer el libro
    const { libro } = this.props;

    // Mostrar spinner
    if (!libro) return <Spinner />

    // Extraer los datos del alumno
    const { resultado } = this.state;

    let fichaAlumno, btnSolicitar;
    if (resultado.nombre) {
      fichaAlumno = <FichaSuscriptor alumno={resultado} />;
      btnSolicitar = <button type="button" className="btn btn-primary btn-block" onClick={this.solicitarPrestamo}>Solicitar Prestamo</button>;
    } else {
      fichaAlumno = null;
      btnSolicitar = null;
    }
    
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={'/'} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> {''}
            Volver al Listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-book"></i> {''}
            Solicitar Prestamo : {libro.titulo}
          </h2>

          <div className="row justify-content-center mt-5">
            <div className="col-md-8">
              <form onSubmit={this.buscarAlumno} className="mb-4">
                <legend className="color-primary text-center">
                  Busca el suscriptor por código
                </legend>
                <div className="form-group">
                  <input type="text" name="busqueda" className="form-control" onChange={this.leerDato} />
                </div>
                <input type="submit" value="Buscar Alumno" className="btn btn-success btn-block"/>
              </form>
              {/* Muestra la ficha del alumno y el botón para solicitar el prestamo */}
              {fichaAlumno}
              {btnSolicitar}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PrestamoLibro.propTypes = {
  firestore: PropTypes.object.isRequired
}
 
export default compose(
  firestoreConnect(props => [
    {
      collection: 'libros',
      storeAs: 'libro',
      doc : props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    libro: ordered.libro && ordered.libro[0]
  }))
)(PrestamoLibro);