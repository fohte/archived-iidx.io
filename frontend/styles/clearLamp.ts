import * as _ from 'lodash'
import { css, keyframes } from 'styled-components'

import { ClearLamp } from '@app/queries'
import * as colors from './colors'

const colorTransitions: { [key in colors.ClearLampKeys]: string[] } = {
  [ClearLamp.Failed]: [colors.base.black, colors.base.grey],
  [ClearLamp.Assist]: [colors.base.purple],
  [ClearLamp.Easy]: [colors.base.green],
  [ClearLamp.Normal]: [colors.base.blue],
  [ClearLamp.Hard]: ['#FFFFFF'],
  [ClearLamp.ExHard]: [colors.base.red, colors.base.yellow],
  [ClearLamp.FullCombo]: ['#FFFFFF', colors.base.teal, colors.base.yellow],
  default: [colors.base.grey],
}

const generateKeyframe = (
  colorTransition: string[],
): ReturnType<typeof keyframes> => {
  return keyframes`
    ${colorTransition
      .map(
        (color, i) =>
          `${(colorTransition.length > 1
            ? i / (colorTransition.length - 1)
            : 1) * 100}% { background-color: ${color}; }`,
      )
      .join('\n')}
  `
}

export const backgroundCSS = _.mapValues(colorTransitions, transition =>
  transition.length > 1
    ? css`
        animation: ${generateKeyframe(transition)} 150ms infinite;
      `
    : css`
        background-color: ${transition[0]};
      `,
) as { [key in colors.ClearLampKeys]: ReturnType<typeof css> }
