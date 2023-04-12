import { cls } from "@shared/utils"
import { PropsWithChildren } from "react"

interface Props {
  className?: string
}

export const HeaderCell: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
}) => <div className={cls("dashboard-header-cell", className)}>{children}</div>
