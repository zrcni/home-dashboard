import cls from 'classnames'

interface Props {
  className?: string
}

export const HeaderCell: React.FC<Props> = ({ children, className }) => (
  <div className={cls('dashboard-header-cell', className)}>{children}</div>
)
