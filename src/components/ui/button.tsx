import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6666] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background font-poppins",
  {
    variants: {
      variant: {
        default:
          "bg-[#ff9999] text-white hover:bg-[#ff6666] active:scale-98 shadow-[0_2px_8px_rgba(0,0,0,0.05)]",
        destructive:
          "bg-[#ff3333] text-white hover:bg-[#ff5555] active:scale-98 shadow-[0_2px_8px_rgba(0,0,0,0.05)]",
        outline:
          "border border-[#ff9999] bg-white/90 text-[#F79489] hover:bg-[#fff5f5] hover:text-[#ff6666] active:scale-95",
        secondary:
          "bg-[#f0f0f0] text-[#333] hover:bg-[#ff5555] hover:text-white active:scale-95",
        ghost:
          "text-[#F79489] hover:bg-[#fff5f5] hover:text-[#ff6666] active:scale-95",
        link: "text-[#F79489] text-shadow hover:text-[#ff6666] underline-offset-4 hover:underline",
        success:
          "bg-[#fff5f5] text-[#F79489] border border-[#ff9999] rounded-full px-3 py-1 text-xs font-medium hover:bg-[#ff9999] hover:text-white active:scale-95",
        danger:
          "bg-[#fff5f5] text-[#F79489] border border-[#ff9999] rounded-full px-3 py-1 text-xs font-medium hover:bg-[#ff3333] hover:text-white active:scale-95",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-10 px-6 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
