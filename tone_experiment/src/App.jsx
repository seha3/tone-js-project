import './App.css';
import { useEffect, useState, useMemo } from 'react';
import * as Tone from 'tone';
import NoteButton from './components/NoteButton';

function App() {
  const [activeKey, setActiveKey] = useState(null);

  const playNote = (note) => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note, "8n");
  };

  const keyMap = useMemo(() => ({
    a: "C4",
    s: "D4",
    d: "E4",
    f: "F4",
    g: "G4",
    h: "A4",
    j: "B4",
    k: "C5",
  }), []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const note = keyMap[event.key];
      if (note) {
        setActiveKey(event.key);
        playNote(note);
      }
    };

    const handleKeyRelease = (event) => {
      if (keyMap[event.key]) {
        setActiveKey(null);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyRelease);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyRelease);
    };
  }, [keyMap]);

  const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
  const keys = Object.keys(keyMap);

  return (
    <div className="content">
      <h1>¡Hola Tone.js!</h1>
      <p>Usa las teclas <strong>A, S, D, F, G, H, J, K</strong> para tocar.</p>
      <div className="buttonKeys">
        {notes.map((note, index) => {
          const key = keys[index];
          const isActive = activeKey === key;
          return (
            <NoteButton
              key={note}
              note={note}
              keyLabel={key}
              isActive={isActive}
              onClick={() => playNote(note)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
