import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CyberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const CyberInput = forwardRef<HTMLInputElement, CyberInputProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={id} 
            className="block text-sm text-muted-foreground uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={id}
            className={cn(
              'w-full px-4 py-3 font-mono',
              'bg-background/50 border border-primary/30 text-foreground',
              'placeholder:text-muted-foreground/50',
              'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary',
              'focus:shadow-[0_0_15px_hsl(120_100%_50%/0.2)]',
              'transition-all duration-300',
              className
            )}
            {...props}
          />
          {/* Corner accents */}
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/50" />
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/50" />
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/50" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/50" />
        </div>
      </div>
    );
  }
);

CyberInput.displayName = 'CyberInput';
