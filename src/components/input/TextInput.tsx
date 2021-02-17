import React, { CSSProperties, useRef, useState } from 'react';
import styles from './TextInput.module.scss';
import useWindowDimensions from '../../hooks/UseWindowDimensions';

interface Props {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  theme?: 'dark' | 'light';
  displayHeight?: number;
  shouldHide?: boolean;
}

const TextInput: React.FC<Props> = ({
  inputText,
  setInputText,
  theme = 'light',
  displayHeight = 300,
  shouldHide,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
  };
  const inputRef = useRef();
  const className = styles[`input--${theme}`];
  const { width } = useWindowDimensions();
  const isWidthSmallEnough = width <= 800 ? true : false;

  const smallWidthHeight =
    40 +
    (inputRef.current
      ? // @ts-ignore
        inputRef.current.innerHTML.split('\n').length * 23.25
      : 0);

  const heightStyle: CSSProperties = {
    height: isWidthSmallEnough ? smallWidthHeight : displayHeight,
  };

  return (
    <textarea
      spellCheck={false}
      autoComplete='false'
      autoCorrect='false'
      autoCapitalize='false'
      value={inputText}
      rows={0}
      className={className}
      hidden={isWidthSmallEnough ? shouldHide : false}
      style={heightStyle}
      onChange={(e) => onChange(e)}
      ref={inputRef}
    />
  );
};

export default TextInput;
