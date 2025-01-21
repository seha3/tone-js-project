import './NoteButton.css';
import PropTypes from 'prop-types';

const NoteButton = ({ note, keyLabel, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`button ${isActive ? 'active' : ''}`}
  >
    {note} <br /> ({keyLabel || ""})
  </button>
);
NoteButton.propTypes = {
  note: PropTypes.string.isRequired,
  keyLabel: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default NoteButton;
