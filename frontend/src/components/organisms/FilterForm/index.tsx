import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as classnames from 'classnames/bind'
import * as _ from 'lodash'
import * as React from 'react'
import { Field as FinalField, Form as FinalForm } from 'react-final-form'
import { toast } from 'react-toastify'

import Button from '@app/components/atoms/Button'
import Checkbox from '@app/components/atoms/Checkbox'
import Container from '@app/components/atoms/Container'
import FormGroup from '@app/components/atoms/FormGroup'
import { Difficulty } from '@app/queries'

import * as css from './style.scss'

const cx = classnames.bind(css)

export type FormValues = {
  title?: string | null
  difficulties: Difficulty[]
  levels: number[]
}

export type Props = {
  initialValues: FormValues
  onSubmit: (values: FormValues) => void
  onCloseRequested: () => void
}

const FilterForm: React.SFC<Props> = ({
  initialValues,
  onCloseRequested,
  onSubmit,
}) => {
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
    <FinalForm onSubmit={onSubmit} initialValues={initialValues}>
      {({ form, handleSubmit, hasSubmitErrors, submitError }) => {
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
              </Container>

              <footer className={cx('footer')}>
                <Container className={cx('container')}>
                  <div className={cx('footer-button-group')}>
                    <Button
                      className={cx('clear-button')}
                      expand={false}
                      type="button"
                      onClick={() => {
                        form.reset({
                          difficulties: [],
                          levels: [],
                        })
                      }}
                    >
                      Clear
                    </Button>
                    <Button color="primary" type="submit">
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
