import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames/bind'
import * as _ from 'lodash'
import * as React from 'react'
import { Field as FinalField, Form as FinalForm } from 'react-final-form'
import { toast } from 'react-toastify'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import spacetime from 'spacetime'

import Button from '@app/components/atoms/Button'
import Checkbox from '@app/components/atoms/Checkbox'
import InputText from '@app/components/atoms/InputText'
import Container from '@app/components/atoms/Container'
import FormGroup from '@app/components/atoms/FormGroup'
import { Difficulty, Grade } from '@app/queries'
import { formats } from '@app/lib/dateTime'
import withClassComponent from '@app/lib/withClassComponent'
import { FilterFormValueType, resetValues } from '@app/models/FilterFormValue'
import ResultSearcherContext from '@app/contexts/ResultSearcherContext'
import { UPDATE_FILTER_FORM } from '@app/reducers/resultSearcherReducer'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  onCloseRequested: () => void
}

// react-day-picker で Function Component を渡すと
// Function components cannot be given refs. Attempts to access this ref will fail.
// という warning が出るので一旦 Class Component に変換する
// @see https://github.com/gpbl/react-day-picker/issues/748
const CInputText = withClassComponent(InputText)

const FilterForm: React.SFC<Props> = ({ onCloseRequested }) => {
  const {
    values: { filterForm },
    dispatch,
  } = React.useContext(ResultSearcherContext)

  // このコンポーネントが開いている間は背景のスクロールを無効化する
  React.useEffect(() => {
    const { top, position } = document.body.style

    // `documentElement` は古いブラウザで未サポートなので `body` に fallback する
    // @see https://ginpen.com/2017/10/06/chrome-61-scrolltop/
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop

    // position を変更すると背景が最上部までスクロールされるので
    // 擬似的に背景位置を固定する
    document.body.style.top = `-${scrollTop}px`

    document.body.style.position = 'fixed'

    return () => {
      document.body.style.top = top
      document.body.style.position = position

      // position を変更すると背景が最上部までスクロールされるので
      // スクロール位置をコンポーネント表示前のスクロール位置に戻す
      document.documentElement.scrollTop = document.body.scrollTop = scrollTop
    }
  })

  return (
    <FinalForm<FilterFormValueType>
      onSubmit={values => {
        dispatch({ type: UPDATE_FILTER_FORM, payload: values })
      }}
      initialValues={filterForm}
    >
      {({ form, handleSubmit, hasSubmitErrors, submitError, values }) => {
        if (hasSubmitErrors) {
          toast.error(submitError)
        }

        return (
          <form
            className={cx('result-search-form')}
            onSubmit={e => {
              handleSubmit(e)
              onCloseRequested()
            }}
          >
            <div className={cx('modal', 'filter-form')}>
              <header className={cx('header')}>
                <Container className={cx('container')}>
                  <h1>Filters</h1>
                  <div
                    className={cx('close-button')}
                    onClick={() => {
                      onCloseRequested()
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                </Container>
              </header>

              <Container className={cx('container')}>
                <FormGroup
                  label="Level"
                  labelClassName={cx('form-group-label')}
                >
                  <div className={cx('level-field-group')}>
                    {_.rangeRight(1, 13).map(level => (
                      <FinalField
                        key={level}
                        type="checkbox"
                        name="levels"
                        value={level}
                      >
                        {({ input }) => (
                          <div className={cx('form-field')}>
                            <Checkbox {...input}>☆{level}</Checkbox>
                          </div>
                        )}
                      </FinalField>
                    ))}
                  </div>
                </FormGroup>

                <FormGroup
                  label="Difficulty"
                  labelClassName={cx('form-group-label')}
                >
                  {_.map(Difficulty, difficulty => (
                    <FinalField
                      key={difficulty}
                      type="checkbox"
                      name="difficulties"
                      value={difficulty}
                    >
                      {({ input }) => (
                        <div className={cx('form-field')}>
                          <Checkbox {...input}>{difficulty}</Checkbox>
                        </div>
                      )}
                    </FinalField>
                  ))}
                </FormGroup>

                <FormGroup
                  label="Grade"
                  labelClassName={cx('form-group-label')}
                >
                  {_.map(Grade, grade => (
                    <FinalField
                      key={grade}
                      type="checkbox"
                      name="grades"
                      value={grade}
                    >
                      {({ input }) => (
                        <div className={cx('form-field')}>
                          <Checkbox {...input}>
                            {grade.replace('_', ' ')}
                          </Checkbox>
                        </div>
                      )}
                    </FinalField>
                  ))}
                </FormGroup>

                <FormGroup
                  label="Updated results"
                  labelClassName={cx('form-group-label')}
                >
                  <FinalField<boolean> type="checkbox" name="onlyUpdated">
                    {({ input }) => (
                      <div className={cx('form-field')}>
                        <Checkbox {...input}>
                          Show only updated results
                        </Checkbox>
                      </div>
                    )}
                  </FinalField>
                </FormGroup>

                {values.onlyUpdated && (
                  <FormGroup
                    label="Updated results in"
                    labelClassName={cx('form-group-label')}
                  >
                    <FinalField<Date> name="updatedOn">
                      {({ input }) => (
                        <DayPickerInput
                          {...input}
                          placeholder={
                            spacetime.now().format(formats.date) as string
                          }
                          format={formats.date}
                          formatDate={(date, format) =>
                            spacetime(date).format(format) as string
                          }
                          component={CInputText}
                          onDayChange={day => {
                            input.onChange(day)
                          }}
                        />
                      )}
                    </FinalField>
                  </FormGroup>
                )}
              </Container>

              <footer className={cx('footer')}>
                <Container className={cx('container')}>
                  <div className={cx('footer-button-group')}>
                    <Button
                      className={cx('clear-button')}
                      expand={false}
                      type="button"
                      onClick={() => {
                        form.reset(resetValues())
                      }}
                    >
                      Clear
                    </Button>
                    <Button
                      className={cx('submit-button')}
                      color="primary"
                      type="submit"
                      expand={false}
                    >
                      Submit
                    </Button>
                  </div>
                </Container>
              </footer>
            </div>
          </form>
        )
      }}
    </FinalForm>
  )
}

export default FilterForm
