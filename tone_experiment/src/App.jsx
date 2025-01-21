import './App.css'
import { useEffect, useState, useMemo } from 'react';
import * as Tone from 'tone'

function App() {
  // Estado para almacenar la tecla actualmente activa
  const [activeKey, setActiveKey] = useState(null);

  // Función para tocar una nota
  const playNote = (note) => {
    const synth = new Tone.Synth().toDestination(); // Crear un sintetizador
    synth.triggerAttackRelease(note, "8n"); // Tocar la nota especificada
  };

  // Mapa de teclas físicas a notas musicales
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

  // Manejar eventos de teclado
  useEffect(() => {
    const handleKeyPress = (event) => {
      const note = keyMap[event.key];
      if (note) {
        setActiveKey(event.key); // Establecer la tecla activa
        playNote(note); // Reproducir la nota asociada a la tecla presionada
      }
    };

    const handleKeyRelease = (event) => {
      if (keyMap[event.key]) {
        setActiveKey(null); // Limpiar la tecla activa al soltarla
      }
    };

    // Agregar eventos de teclado
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyRelease);

    // Eliminar eventos cuando el componente se desmonte
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyRelease);
    };
  }, [keyMap]); // Incluir keyMap en el arreglo de dependencias

  // Lista de notas musicales para el teclado
  const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
  const keys = Object.keys(keyMap);

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>¡Hola Tone.js!</h1>
      <p>Usa las teclas <strong>A, S, D, F, G, H, J, K</strong> para tocar.</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        {notes.map((note, index) => {
          const key = keys[index];
          const isActive = activeKey === key; // Verificar si esta tecla está activa
          return (
            <button
              key={note}
              onClick={() => playNote(note)}
              style={{
                padding: '15px 20px',
                fontSize: '16px',
                backgroundColor: isActive ? '#ffd700' : '#f0f0f0', // Cambiar color si está activa
                border: '1px solid #ccc',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
            >
              {note} <br /> ({key || ""})
            </button>
          );
        })}
      </div>
    </div>
    </>
  )
}

export default App
