import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'rounded-full bg-midnight text-white font-semibold border border-transparent hover:bg-white hover:text-midnight hover:border-midnight transition cursor-pointer',
        primary:
          'bg-olivine-600 border border-olivine-600 text-white font-semibold hover:bg-white hover:text-olivine-600 transition cursor-pointer',
        secondary:
          'border border-sakura bg-sakura text-white font-semibold hover:text-sakura hover:bg-white transition cursor-pointer',
        olivineOutline:
          'border border-olivine-600 bg-white text-olivine-600 font-semibold hover:bg-olivine-600 hover:text-white transition cursor-pointer',
        outlineSakura:
          'border border-sakura bg-white text-sakura font-semibold hover:bg-sakura hover:text-white transition cursor-pointer',
        outlineMidnight:
          'border border-midnight bg-white text-midnight font-semibold hover:bg-midnight hover:text-white transition cursor-pointer',
        outlineSalmon:
          'bg-white text-salmon font-semibold hover:bg-salmon hover:text-white transition cursor-pointer',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 p-5 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        'cursor-pointer',
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
