import {
  faAngleDown,
  faAngleUp,
  faFolder,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as classnames from 'classnames/bind'
import querystring from 'querystring'
import * as React from 'react'

import { SearchQuery } from '@app/pages/musics'
import Link from 'next/link'

import * as css from './style.scss'

const cx = classnames.bind(css)

export interface Props {
  screenName: string
}

type FolderGroup = {
  groupName: string
  folders: Folder[]
}

type Folder = {
  name: string
  searchQuery: SearchQuery
  num: number
}

const folderGroups: FolderGroup[] = [
  {
    groupName: 'LEVEL',
    folders: [
      { name: 'Level 12', searchQuery: { levels: '12' }, num: 99 },
      { name: 'Level 11', searchQuery: { levels: '11' }, num: 99 },
      { name: 'Level 10', searchQuery: { levels: '10' }, num: 99 },
      { name: 'Level 9', searchQuery: { levels: '9' }, num: 99 },
      { name: 'Level 8', searchQuery: { levels: '8' }, num: 99 },
      { name: 'Level 7', searchQuery: { levels: '7' }, num: 99 },
      { name: 'Level 6', searchQuery: { levels: '6' }, num: 99 },
      { name: 'Level 5', searchQuery: { levels: '5' }, num: 99 },
      { name: 'Level 4', searchQuery: { levels: '4' }, num: 99 },
      { name: 'Level 3', searchQuery: { levels: '3' }, num: 99 },
      { name: 'Level 2', searchQuery: { levels: '2' }, num: 99 },
      { name: 'Level 1', searchQuery: { levels: '1' }, num: 99 },
    ],
  },
  {
    groupName: 'DJ LEVEL',
    folders: [
      { name: 'AAA', searchQuery: {}, num: 99 },
      { name: 'AA', searchQuery: {}, num: 99 },
      { name: 'A', searchQuery: {}, num: 99 },
      { name: 'B', searchQuery: {}, num: 99 },
      { name: 'C', searchQuery: {}, num: 99 },
      { name: 'D', searchQuery: {}, num: 99 },
      { name: 'E', searchQuery: {}, num: 99 },
      { name: 'F', searchQuery: {}, num: 99 },
    ],
  },
  {
    groupName: 'CLEAR LAMP',
    folders: [
      { name: 'FULL COMBO', searchQuery: {}, num: 99 },
      { name: 'EX HARD', searchQuery: {}, num: 99 },
      { name: 'HARD', searchQuery: {}, num: 99 },
      { name: 'CLEAR', searchQuery: {}, num: 99 },
      { name: 'EASY', searchQuery: {}, num: 99 },
      { name: 'ASSIST', searchQuery: {}, num: 99 },
      { name: 'FAILED', searchQuery: {}, num: 99 },
      { name: 'NO PLAY', searchQuery: {}, num: 99 },
    ],
  },
  {
    groupName: 'SERIES',
    folders: [{ name: 'Rootage', searchQuery: {}, num: 99 }],
  },
  {
    groupName: 'OTHERS',
    folders: [{ name: 'Leggendaria', searchQuery: {}, num: 20 }],
  },
]

const MusicsFolderList: React.SFC<Props> = ({ screenName }) => {
  const [openedFolderGroups, setFolderGroups] = React.useState<Set<string>>(
    new Set([folderGroups[0].groupName]),
  )

  return (
    <div className={cx('wrapper')}>
      {folderGroups.map(({ groupName, folders }) => {
        const isOpened = openedFolderGroups.has(groupName)

        return (
          <div key={groupName} className={cx('folder-group')}>
            <div
              className={cx('folder-group-info', { opened: isOpened })}
              onClick={() => {
                setFolderGroups(groups => {
                  const newGroups = new Set([...groups])

                  if (newGroups.has(groupName)) {
                    newGroups.delete(groupName)
                  } else {
                    newGroups.add(groupName)
                  }

                  return newGroups
                })
              }}
            >
              <span className={cx('folder-group-title')}>{groupName}</span>
              <span className={cx('folder-group-icon')}>
                {isOpened ? (
                  <FontAwesomeIcon icon={faAngleUp} />
                ) : (
                  <FontAwesomeIcon icon={faAngleDown} />
                )}
              </span>
            </div>

            {isOpened && (
              <div className={cx('folder-list-box')}>
                {folders.map(({ name, searchQuery, num }) => (
                  <div key={name} className={cx('folder-box')}>
                    <Link
                      href={`/@${screenName}/musics?${querystring.stringify(
                        searchQuery,
                      )}`}
                    >
                      <a>
                        <div className={cx('folder')}>
                          <span className={cx('folder-icon')}>
                            <FontAwesomeIcon icon={faFolder} />
                          </span>
                          <span className={cx('folder-title')}>{name}</span>
                          <span className={cx('folder-number')}>{num}</span>
                        </div>
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default MusicsFolderList
