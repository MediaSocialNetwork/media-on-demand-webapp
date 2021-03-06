import React from 'react'
import styled, { css } from 'styled-components'

import { TextLine } from 'ui/typo'

const Wrapper = styled.div`
`
const Container = styled.div`
  display: grid;
  & > * {
    min-width: 0;
    min-height: 0;
  };
  grid-template-columns: 8px 1fr 8px;
  position: relative;
  height: 16px;
`

const Header = styled.div`
  display: grid;
  & > * {
    min-width: 0;
    min-height: 0;
  };
  grid-template-columns: 1fr minmax(40px, min-content);
`

const Range = styled.input.attrs({
  type: 'range'
})`
  position: absolute;
  height: 16px;
  background: transparent;
  appearance: none;
  outline: none;
  opacity: 0;
  margin: 0;
  top: -7px;
  left: 0;
  width: 100%;
  z-index: 4;
`

const CircleThumb = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${
    ({ disabled, theme }) => disabled ?
      theme.secondary.base :
      theme.primary.base
  };
  position: absolute;
  top: -7px;
  right: -8px;
  user-select: none;
`

const Track = styled.div.attrs({
  style: ({ relativeValue = 100 }) => ({
    width: `${ relativeValue }%`
  })
})`
  position: relative;
  height: 2px;
  transform: translate3d(0, 7px, 0);
  user-select: none;
  background: ${
    ({
      active,
      disabled,
      theme
    }) => {
      if (disabled) {
        return theme.secondary.base
      }

      return active ? theme.primary.base : theme.black.base
    }
  };
  ${
    ({ interactable }) => interactable && css`
      z-index: 1;

      & > ${ Track } {
        transform: translate3d(0, 0, 0);
        transition: width .2s;
      }
    `
  }
`

const SlideBar = ({
  label,
  ...props
}) => {
  const { disabled, min, max, value } = props
  const relativeValue = Math.abs((value - min) / (max - min)) * 100

  return (
    <Wrapper>
      <Header>
        <TextLine mostLeft mostRight>{ label }</TextLine>
        <TextLine align="center">{ value }</TextLine>
      </Header>
      <Container>
        <Track
          active
          disabled={ disabled }
          onClick={ () => !disabled && props.onChange(min) }
        />
        <Track disabled={ disabled } interactable>
          <Track
            active
            disabled={ disabled }
            relativeValue={ relativeValue }
          >
            <CircleThumb disabled={ disabled } />
          </Track>
          <Range
            { ...props }
            onChange={ (event) => props.onChange(Number(event.target.value)) }
            onBlur={ (event) => props.onBlur(Number(event.target.value)) }
          />
        </Track>
        <Track
          disabled={ disabled }
          onClick={ () => !disabled && props.onChange(max) }
        />
      </Container>
    </Wrapper>
  )
}

export default SlideBar
