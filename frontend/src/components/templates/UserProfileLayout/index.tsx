import * as classnames from 'classnames/bind'
import * as _ from 'lodash'
import { withRouter, WithRouterProps } from 'next/router'
import path from 'path'
import * as React from 'react'

import Container from '@app/components/atoms/Container'
import MainLayout from '@app/components/templates/MainLayout'
import { Link } from '@app/routes'
import * as css from './style.scss'

const cx = classnames.bind(css)

interface ComponentProps {
  screenName: string
  children?: React.ReactNode
}

export interface Props extends ComponentProps, WithRouterProps {}

interface Tab {
  key: string
  path: string
  content: string
}

const tabs: Tab[] = [
  {
    key: 'overview',
    path: '',
    content: 'Overview',
  },
  {
    key: 'musics',
    path: 'musics',
    content: 'Musics',
  },
]

const UserProfileLayout = ({ router, screenName, children }: Props) => {
  const generatePath = (tab: Tab) => path.join(`/@${screenName}`, tab.path)

  const defaultActiveTab = _.find(
    tabs,
    tab => generatePath(tab) === router.asPath,
  )

  const [activeTab, setActiveTab] = React.useState<string>(
    defaultActiveTab != null ? defaultActiveTab.key : 'overview',
  )

  return (
    <MainLayout>
      <Container>
        <div className={cx('user-profile-header')}>
          <div className={cx('user-profile-content')}>
            <div className={cx('user-avatar')} />
            <h2>@{screenName}</h2>
          </div>

          <ul className={cx('tabs')}>
            {_.map(tabs, tab => (
              <li
                key={tab.key}
                className={cx('tab-item', { active: activeTab === tab.key })}
              >
                <Link route={generatePath(tab)}>
                  <a
                    onClick={() => {
                      setActiveTab(tab.key)
                    }}
                  >
                    {tab.content}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container>{children}</Container>
    </MainLayout>
  )
}

export default withRouter<ComponentProps>(UserProfileLayout)
