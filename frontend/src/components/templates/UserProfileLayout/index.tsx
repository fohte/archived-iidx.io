import * as classnames from 'classnames/bind'
import * as _ from 'lodash'
import * as React from 'react'

import Breadcrumb, {
  Item as BreadcrumbItem,
} from '@app/components/atoms/Breadcrumb'
import Container from '@app/components/atoms/Container'
import MainLayout from '@app/components/templates/MainLayout'
import { PlayStyle } from '@app/queries'
import { Link } from '@app/routes'
import {
  faEye,
  faList,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import * as css from './style.scss'

const cx = classnames.bind(css)

export enum Tab {
  Overview = 'Overview',
  Musics = 'Musics',
}

export interface Props {
  screenName: string
  playStyle: PlayStyle
  breadcrumbItems?: BreadcrumbItem[]
  children?: React.ReactNode
  activeTab: Tab
}

const UserProfileLayout = ({
  screenName,
  playStyle,
  breadcrumbItems = [],
  children,
  activeTab,
}: Props) => {
  const tabs: { [key in Tab]: { link: string; icon: IconDefinition } } = {
    [Tab.Overview]: {
      link: `/@${screenName}/${playStyle.toLowerCase()}`,
      icon: faEye,
    },
    [Tab.Musics]: {
      link: `/@${screenName}/${playStyle.toLowerCase()}/musics`,
      icon: faList,
    },
  }

  return (
    <MainLayout>
      <Container>
        <div className={cx('user-profile-header-wrapper')}>
          <div className={cx('user-profile-header')}>
            <div className={cx('user-profile-content')}>
              <div className={cx('user-avatar')} />
              <h2>@{screenName}</h2>
            </div>
          </div>

          <div className={cx('tabs-wrapper')}>
            <ul className={cx('tabs')}>
              {_.map(tabs, (tab, key) => (
                <li
                  key={key}
                  className={cx('tab-item', { active: activeTab === key })}
                >
                  <Link route={tab.link}>
                    <a>
                      <span className={cx('icon-text')}>{key}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {breadcrumbItems.length > 0 && (
        <Container>
          <div className={cx('position-relative-container')}>
            <Breadcrumb className={cx('breadcrumb')} items={breadcrumbItems} />
          </div>
        </Container>
      )}

      <Container>{children}</Container>
    </MainLayout>
  )
}

export default UserProfileLayout
