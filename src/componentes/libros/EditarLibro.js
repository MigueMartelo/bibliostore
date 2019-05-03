import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';

class EditarLibro extends Component {

  // crear Ref
  tituloRef = React.createRef();
  editorialRef = React.createRef();
  ISBNRef = React.createRef();
  existenciaRef = React.createRef();

  editarLibro = e => {
    // Crear el objeto del libro a actualizar
    const libroActualizado = {
      titulo: this.tituloRef.current.value,
      editorial: this.editorialRef.current.value,
      ISBN: this.ISBNRef.current.value,
      existencia: this.existenciaRef.current.value,
      prestados: []
    }

    // Extraer libro, firestore, history
    const { libro, firestore, history } = this.props;

    // Almacenar en la base de datos con firestore
    firestore.update({
      collection: 'libros',
      doc: libro.id
    }, libroActualizado).then(history.push('/'));
  }

  render() {
    // Obtener libro y firestore
    const { libro } = this.props;

    if (!libro) return <Spinner />
    
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
            Editar Libro
          </h2>
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <form onSubmit={this.editarLibro}>
                <div className="form-group">
                    <label htmlFor="titulo">Titulo</label>
                    <input
                      type="text"
                      name="titulo"
                      className="form-control" 
                      placeholder="Titulo o nombre del Libro"
                      required
                      ref={this.tituloRef}
                      defaultValue={libro.titulo}
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
                      ref={this.editorialRef}
                      defaultValue={libro.editorial}
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
                      ref={this.ISBNRef}
                      defaultValue={libro.ISBN}
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
                      ref={this.existenciaRef}
                      defaultValue={libro.existencia}
                    />
                  </div>
                  <input type="submit" value="Editar Libro" className="btn btn-success"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
EditarLibro.propTypes = {
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
)(EditarLibro);