import { FC } from 'react'

interface LogoProps {
  variant: 'dark' | 'light'
}

export const Logo: FC<LogoProps> = ({ variant }) => {
  switch (variant) {
    case 'dark':
      return (

        <img
          className="h-12  w-fit object-contain"
          src={`https://res.cloudinary.com/dfsykt9gi/image/upload/v1742340280/qhmud0xbhoupjjfmhfcy.png`}
          alt="logo"
        />)
    case 'light':
      return (
        <img
          className="h-12 w-fit object-contain"
          src={`https://res.cloudinary.com/dfsykt9gi/image/upload/v1742324451/rhj0hb4ly6lt0dognvb8.png`}
          alt="logo"
        />
      )
  }
}
