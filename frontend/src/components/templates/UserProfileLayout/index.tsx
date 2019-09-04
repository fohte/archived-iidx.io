import classnames from 'classnames/bind'
import * as _ from 'lodash'
import * as React from 'react'

import Breadcrumb, {
  Item as BreadcrumbItem,
} from '@app/components/atoms/Breadcrumb'
import Container from '@app/components/atoms/Container'
import MainLayout from '@app/components/templates/MainLayout'
import { PlayStyle } from '@app/queries'
import routes from '@server/routes'

import * as css from './style.scss'

const cx = classnames.bind(css)
const { Link } = routes

export type TabItem = 'overview' | 'musics'

const tabTexts: { [key in TabItem]: string } = {
  overview: 'Overview',
  musics: 'Musics',
}

export interface Props {
  screenName: string
  playStyle: PlayStyle
  breadcrumbItems?: BreadcrumbItem[]
  children?: React.ReactNode
  activeTab: TabItem
}

const UserProfileLayout = ({
  screenName,
  playStyle,
  breadcrumbItems = [],
  children,
  activeTab,
}: Props) => {
  const userPage = `/@${screenName}/${playStyle.toLowerCase()}`

  const tabLinks: { [key in TabItem]: string } = {
    overview: userPage,
    musics: `${userPage}/musics`,
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
              {_.map(tabLinks, (link, key: TabItem) => (
                <li
                  key={key}
                  className={cx('tab-item', { active: activeTab === key })}
                >
                  <Link route={link}>
                    <a>
                      <span className={cx('icon-text')}>{tabTexts[key]}</span>
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
