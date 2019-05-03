import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class NuevoLibro extends Component {
  state = {
    titulo: '',
    ISBN: '',
    editorial: '',
    existencia: ''
  }

  leerDato = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // Guarda libro en la DB
  agregarLibro = e => {
    e.preventDefault();
    
    // tomar una copia del state
    const nuevoLibro = this.state;

    // agregar un arreglo de prestados
    nuevoLibro.prestados = [];

    // extraer firestore con sus métodos
    const { firestore, history } = this.props;

    // añadirlo a la base de datos y redireccionar
    firestore.add({ collection: 'libros' }, nuevoLibro)
      .then(() => history.push('/'));
  }

  render() {
    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to="/" className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left"></i> Volver al Listado
          </Link>
        </div>
        <div className="col-12">
          <h2>
            <i className="fas fa-book"></i> Nuevo Libro
          </h2>

          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.agregarLibro}>
                <div className="form-group">
                  <label htmlFor="titulo">Titulo</label>
                  <input
                    type="text"
                    name="titulo"
                    className="form-control" 
                    placeholder="Titulo o nombre del Libro"
                    required
                    value={this.state.titulo}
                    onChange={this.leerDato}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editorial">Editorial</label>
                  <input
                    type="text"
                    name="editorial"
                    className="form-control" 
                    placeholder="Editorial del Libro"
                    required
                    value={this.state.editorial}
                    onChange={this.leerDato}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ISBN">ISBN</label>
                  <input
                    type="text"
                    name="ISBN"
                    className="form-control" 
                    placeholder="ISBN del Libro"
                    required
                    value={this.state.ISBN}
                    onChange={this.leerDato}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="existencia">Existencia</label>
                  <input
                    type="number"
                    min="0"
                    name="existencia"
                    className="form-control" 
                    placeholder="Existencia del Libro"
                    required
                    value={this.state.existencia}
                    onChange={this.leerDato}
                  />
                </div>
                <input type="submit" value="Agregar Libro" className="btn btn-success"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NuevoLibro.propTypes = {
  firestore: PropTypes.object.isRequired
}

export default firestoreConnect()(NuevoLibro);