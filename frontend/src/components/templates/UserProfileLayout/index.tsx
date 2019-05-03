import * as classnames from 'classnames/bind'
import * as _ from 'lodash'
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

export enum Tab {
  Overview = 'Overview',
  Musics = 'Musics',
}

export interface Props extends ComponentProps {
  activeTab: Tab
}

const UserProfileLayout = ({ screenName, children, activeTab }: Props) => {
  const tabLinks: { [key in Tab]: string } = {
    [Tab.Overview]: `/@${screenName}`,
    [Tab.Musics]: `/@${screenName}/musics`,
  }

  return (
    <MainLayout>
      <Container>
        <div className={cx('user-profile-header')}>
          <div className={cx('user-profile-content')}>
            <div className={cx('user-avatar')} />
            <h2>@{screenName}</h2>
          </div>

          <ul className={cx('tabs')}>
            {_.map(tabLinks, (link, key) => (
              <li
                key={key}
                className={cx('tab-item', { active: activeTab === key })}
              >
                <Link route={link}>
                  <a>{key}</a>
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

export default UserProfileLayout
