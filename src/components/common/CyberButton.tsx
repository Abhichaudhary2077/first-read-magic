import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CyberButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const CyberButton = forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'relative font-display uppercase tracking-wider transition-all duration-300',
          'border backdrop-blur-sm',
          'hover:scale-105 active:scale-95',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
          // Size variants
          size === 'sm' && 'px-4 py-2 text-xs',
          size === 'md' && 'px-6 py-3 text-sm',
          size === 'lg' && 'px-8 py-4 text-base',
          // Color variants
          variant === 'primary' && [
            'bg-primary/10 border-primary text-primary',
            'hover:bg-primary/20 hover:shadow-[0_0_20px_hsl(120_100%_50%/0.3)]',
          ],
          variant === 'secondary' && [
            'bg-secondary/10 border-secondary text-secondary',
            'hover:bg-secondary/20 hover:shadow-[0_0_20px_hsl(180_100%_50%/0.3)]',
          ],
          variant === 'destructive' && [
            'bg-destructive/10 border-destructive text-destructive',
            'hover:bg-destructive/20 hover:shadow-[0_0_20px_hsl(0_100%_50%/0.3)]',
          ],
          variant === 'ghost' && [
            'bg-transparent border-muted-foreground/30 text-muted-foreground',
            'hover:border-primary hover:text-primary hover:bg-primary/5',
          ],
          className
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {/* Corner accents */}
        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current" />
        <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-current" />
        <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-current" />
        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current" />
      </button>
    );
  }
);

CyberButton.displayName = 'CyberButton';
