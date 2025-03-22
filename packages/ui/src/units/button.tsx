import { VariantProps, cva } from 'class-variance-authority'
import { FC, HTMLAttributes } from 'react'
import { cn } from '../utils/cn'

const buttonVariants = cva('ui-h-[50px] ui-text-[14px]  ui-px-10 ui-rounded-[6px] disabled:ui-opacity-30 ui-duration-200', {
    variants: {
        variant: {
            primary:
                'ui-bg-brand-darkblue  ui-text-brand-white hover:ui-bg-brand-blackblue',
            secondary:
                'ui-bg-brand-darkblue-10  ui-text-brand-darkblue  hover:ui-bg-white',
            tertiary:
                'ui-bg-transparent  ui-text-brand-darkblue  hover:ui-bg-white ui-border ui-border-brand-darkblue/10',
            ondark:
                'ui-bg-brand-white-10  ui-text-white hover:ui-bg-white hover:ui-text-brand-darkblue',
        },
    },
    defaultVariants: {
        variant: 'primary'
    }
})

interface ButtonProps
    extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    loading?: boolean,
    disabled?: boolean
}


const Button: FC<ButtonProps> = ({ variant, className, children, loading, disabled, ...props }: ButtonProps) => {
    return (
        <button className={cn(buttonVariants({ variant, className }))} {...props} disabled={loading || disabled}>
            {loading ? 'Loading...' : children}
        </button>
    )
}


export { Button }

