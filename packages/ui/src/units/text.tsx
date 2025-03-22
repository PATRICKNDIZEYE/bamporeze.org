import { cva, VariantProps } from 'class-variance-authority'
import { FC, HTMLAttributes } from 'react'
import { cn } from '../utils/cn'

const textVariants = cva('w-fit', {
  variants: {
    variant: {
      title:
        'md:ui-text-[54px] msm:ui-text-[32px]  ui-font-black  ',
      title_2:
        'md:ui-text-[34px] msm:ui-text-[24px]  ui-font-semibold ui-text-brand-blackblue ',
      subtitle:
        'md:ui-text-[16px] msm:ui-text-[14px]  ui-font-regular ui-text-brand-lightblack',
      paragraph:
        'md:ui-text-sm ui-font-regular msm:ui-text-[14px]  ui-text-brand-lightblack  leading-loose',
      suptitle:
        'md:ui-text-[16px] ui-font-regular msm:ui-text-[14px]  ui-text-brand-darkblue  ui-tracking-[4px] ui-uppercase',
      heading3:
        'md:ui-text-[18px] ui-font-semibold msm:ui-text-[16px]  ui-text-brand-blackblue',
      heading4:
        'md:ui-text-[16px] ui-font-semibold msm:ui-text-[14px]  ui-text-brand-blackblue',
      label:
        'md:ui-text-sm ui-font-regular ui-text-brand-lightblack ',
      extraSubtitle:
        'md:ui-text-[14px] ui-font-medium ui-text-brand-blackblue ',
    },
  },
  defaultVariants: {
    variant: 'paragraph',
  },
})

interface TextProps
  extends HTMLAttributes<HTMLHeadingElement>,
  VariantProps<typeof textVariants> { }

const Text: FC<TextProps> = ({ className, variant, children, ...props }) => {
  return (
    <p className={cn(textVariants({ variant, className }))} {...props}>
      {children}
    </p>
  )
}
export { Text, textVariants }

