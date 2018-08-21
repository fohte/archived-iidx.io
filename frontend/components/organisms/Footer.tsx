import { Icon } from 'antd'

const originalCopyrightYear = 2018

const getCopyrightYears = (): string => {
  const currentYear = new Date().getFullYear()

  if (currentYear === originalCopyrightYear) {
    return `${originalCopyrightYear}`
  }

  return `${originalCopyrightYear}-${currentYear}`
}

const Footer: React.SFC = () => (
  <>
    <Icon type="copyright" /> {getCopyrightYears()} iidx.io
  </>
)

export default Footer
