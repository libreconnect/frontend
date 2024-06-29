import { classNames } from '@libreconnect/utils'
import { Icon } from '../icons/icon'
import { Tooltip } from '../tooltip/tooltip'

export enum AvatarStyle {
  NORMAL = 'normal',
  STROKED = 'stroked',
}

export interface AvatarProps {
  username: string;
  url?: string;
  style?: AvatarStyle;
  icon?: string;
  logoUrl?: string;
  logoText?: string;
  className?: string;
  alt?: string;
  onClick?: () => void;
  size?: number;
  noTooltip?: boolean;
  rounded?: string;
}

export function Avatar(props: AvatarProps) {
  const {
    username,
    url,
    style,
    icon,
    logoUrl,
    logoText,
    className = '',
    alt,
    onClick,
    size = 32,
    noTooltip = false,
    rounded,
  } = props

  const defineClass = `${
    style === AvatarStyle.STROKED ? 'border border-neutral-200' : ''
  } ${onClick ? 'cursor-pointer' : ''}`

  const avatarContent = (
    <div
      data-testid="avatar"
      style={{ width: size, height: size }}
      className={classNames(
        'block rounded-full relative',
        defineClass,
        className
      )}
      onClick={() => onClick && onClick()}
    >
      {url ? (
        <img
          src={url}
          alt={alt}
          className={classNames('w-full h-full', rounded || 'rounded-full')}
        />
      ) : (
        <div
          className={classNames(
            'w-full h-full rounded-full bg-neutral-200 text-center flex justify-center items-center',
            rounded || 'rounded-full'
          )}
        >
          <span className="text-xs text-neutral-400 font-medium relative">
            {username && username.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      {icon && (
        <Icon
          data-testid="avatar-icon"
          name={icon}
          className="absolute -bottom-1 -right-1 w-4 h-4 drop-shadow-sm"
        />
      )}

      {(logoUrl || logoText) && (
        <div
          data-testid="avatar-logo"
          className="flex items-center text-sm font-medium w-[18px] h-[18px] rounded-full absolute top-[24px] -right-[2px]"
        >
          {logoUrl ? (
            <span className="flex items-center justify-center w-full h-full bg-neutral-50 rounded-full p-[2px]">
              <img src={logoUrl} alt="Logo Organization" />
            </span>
          ) : (
            <span className="w-full h-full text-2xs text-neutral-350 bg-neutral-150 border border-neutral-50 rounded-full flex items-center justify-center uppercase">
              {logoText}
            </span>
          )}
        </div>
      )}
    </div>
  )

  return !noTooltip ? (
    <Tooltip content={`${username}`}>{avatarContent}</Tooltip>
  ) : (
    <div>{avatarContent}</div>
  )
}
