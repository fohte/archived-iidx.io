import * as _ from 'lodash'
import ErrorPage from 'next/error'
import * as React from 'react'
import { Field as FinalField, Form as FinalForm } from 'react-final-form'
import { Divider, Form, Message, Segment } from 'semantic-ui-react'

import ResultTable from '@app/components/molecules/ResultTable'
import { Difficulty, GetUserResultsComponent, PlayStyle } from '@app/queries'
import { Router } from '@app/routes'

export type Props = {
  screenName: string
}

export type FormValues = {
  title: string
  playStyle: PlayStyle
  difficulties: Difficulty[]
  levels: number[]
}

const handleSubmit = () => {}

const ResultSearchForm = ({}) => (
  <FinalForm onSubmit={handleSubmit}>
    {({
      handleSubmit: innerHandleSubmit,
      hasValidationErrors,
      hasSubmitErrors,
      submitting,
      submitError,
    }) => (
      <Form onSubmit={innerHandleSubmit} error={hasSubmitErrors}>
        <Segment.Group>
          <Segment basic>
            <FinalField name="title">
              {({ input }) => (
                <Form.Input
                  {...input}
                  type="text"
                  placeholder="Search..."
                  fluid
                  action={{
                    disabled: submitting || hasValidationErrors,
                    loading: submitting,
                    content: 'Search',
                  }}
                />
              )}
            </FinalField>
          </Segment>

          <Segment secondary basic>
            <Form.Group inline>
              <label>Play Style</label>
              {_.map(PlayStyle, playStyle => (
                <FinalField name="playStyle">
                  {({ input }) => (
                    <Form.Radio
                      {...input}
                      label={playStyle}
                      value={playStyle}
                    />
                  )}
                </FinalField>
              ))}
            </Form.Group>

            <Form.Group inline>
              <label>Difficulty</label>
              {_.map(Difficulty, difficulty => (
                <FinalField name="Difficulties">
                  {({ input }) => (
                    <Form.Checkbox
                      {...input}
                      label={difficulty}
                      value={difficulty}
                    />
                  )}
                </FinalField>
              ))}
            </Form.Group>

            <Form.Group inline>
              <label>Level</label>
              {_.range(1, 12 + 1).map(level => (
                <FinalField name="levels">
                  {({ input }) => (
                    <Form.Checkbox
                      {...input}
                      label={`☆${level}`}
                      value={level}
                    />
                  )}
                </FinalField>
              ))}
            </Form.Group>
          </Segment>

          {hasSubmitErrors && <Message error content={submitError} />}
        </Segment.Group>
      </Form>
    )}
  </FinalForm>
)

const ResultList: React.SFC<Props> = ({ screenName }) => (
  <>
    <ResultSearchForm />
    <Divider />
    <GetUserResultsComponent variables={{ username: screenName }}>
      {({ loading, error, data }) => {
        if (loading) {
          return 'loading'
        }
        if (error || !data || !data.searchMaps) {
          return <ErrorPage statusCode={404} />
        }

        return (
          <ResultTable
            showMapData
            maps={data.searchMaps}
            onClickRow={({ music, playStyle, difficulty }) => {
              if (screenName && music) {
                Router.pushRoute('map', {
                  screenName,
                  musicId: music.id,
                  playStyle: playStyle.toLowerCase(),
                  difficulty: difficulty.toLowerCase(),
                })
              }
            }}
          />
        )
      }}
    </GetUserResultsComponent>
  </>
)

export default ResultList
