import { useState, useEffect } from 'react';

const ASCIIAnimation = ({asciiArt, color, skip, autoSkip}) => {
  const textWithNewlines = asciiArt
  const lines = textWithNewlines.split('\n');
  const [currentText, setCurrentText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typingTimer = setTimeout(() => {
      if (lineIndex < lines.length) {
        if (charIndex < lines[lineIndex].length) {
          setCurrentText((prevText) => prevText + lines[lineIndex][charIndex]);
          setCharIndex(charIndex + 1);
        } else {
          setCurrentText(currentText + '\n');
          setLineIndex(lineIndex + 1);
          setCharIndex(0);
        }
      }
    }, (skip ? .99 : 1));

    return () => clearTimeout(typingTimer);
  }, [lineIndex, charIndex, lines, skip]);

  if (!skip && (currentText === asciiArt)) {
    autoSkip()
  }

  return (
    <pre style={{fontSize: '.7vw', color: color, marginBottom: '64px'}}>{currentText}</pre>
  );
};

export default ASCIIAnimation;
