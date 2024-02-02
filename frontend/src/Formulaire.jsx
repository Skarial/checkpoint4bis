import React from "react";
import PropTypes from "prop-types";
import "./css/Formulaire.css";

const handleChange = (event) => {
  const updatedNoms = [...noms];
  updatedNoms[event.target.index] = event.target.value;
  setNoms(updatedNoms);
};

class Formulaire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participantName: "",
      participants: [],
      isFormVisible: true, // Variable d'état pour contrôler la visibilité du formulaire
      isFormSubmitted: false,
    };
  }

  handleInputChange = (event) => {
    this.setState({ participantName: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { participantName, participants } = this.state;
    if (participantName.trim() !== "") {
      // Ajouter le participant à la liste des participants
      this.setState(
        {
          participants: [...participants, participantName],
          participantName: "", // Réinitialiser le champ du formulaire après soumission
        },
        () => {
          // Envoyer le nom du participant au composant parent via la fonction de rappel onSubmit
          this.props.onSubmit(participantName);
        }
      );
    }
    // Masquer le formulaire si le champ est vide
    if (participantName.trim() === "") {
      this.setState({ isFormVisible: false });
    }
  };

  render() {
    return (
      // Afficher le formulaire uniquement si isFormVisible est true
      this.state.isFormVisible && (
        <div className="formulaire">
          <form onSubmit={handleSubmit}>
            {noms.map((nom, index) => (
              <input
                key={index}
                name="nom"
                value={nom}
                onChange={(event) => handleChange(event, index)}
              />
            ))}
            <button type="submit">Envoyer</button>
          </form>
        </div>
      )
    );
  }
}

// Validation des props
Formulaire.propTypes = {
  onSubmit: PropTypes.func.isRequired, // Définissez le type de la prop onSubmit comme une fonction requise
};

export default Formulaire;