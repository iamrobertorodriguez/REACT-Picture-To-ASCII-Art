import { useState } from "react";
import ASCIIAnimation from "./ASCIIAnimation";

const ArtWrapper = ({art, handleExit}) => {

  const [artColor, setArtColor] = useState('#01FDC8')
  const [copyState, setCopyState] = useState('NOT_TRIED')
  const [skipAnimation, setSkipAnimation] = useState(false)

  const colorList = [
    "#01FDC8",   // Default
    "#FFFFFF",   // Blanco
    "#00FFFF",   // Cyan
    "#800080",   // Purpura
    "#E4007F",   // Rosa Mexicano
    "#FF0000",   // Rojo
    "#39FF14",   // Verde Neon
    "#0000FF"    // Azul Rey
  ]

  const handleCopy = () => {
    navigator.clipboard.writeText(art.ascii_art).then(() => {
      setCopyState('SUCCESS')
    }).catch(() => {
      setCopyState('ERROR')
    })
  }

  return (
    <div id="art-wrapper">

      <ASCIIAnimation asciiArt={art.ascii_art} color={artColor} skip={skipAnimation} autoSkip={() => setSkipAnimation(true)}/>

      <div id="color-picker">
        {
          colorList.map(color => {
            return (
              <div
                key={color}
                onClick={() => setArtColor(color)}
                style={{
                  backgroundColor: color,
                  width: `calc(100% / ${colorList.length})`
                }}
              >

              </div>
            )
          })
        }
      </div>

      {
        !skipAnimation &&
        <button onClick={() => setSkipAnimation(true)}>
          Skip typing animation
        </button>
      }

      <button
        style={copyState === 'ERROR' ? {borderColor: 'red', color: 'red'} : {}}
        onClick={() => handleCopy()}
      >
        {
          copyState === 'NOT_TRIED' ? 'Copy to clipboard' :
          copyState === 'SUCCESS' ? 'Copied' :
          'Fail'
        }
      </button>

      <button onClick={() => handleExit()}>Keep playing</button>

    </div>
  );
};

export default ArtWrapper;