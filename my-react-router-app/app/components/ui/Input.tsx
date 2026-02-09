import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label className="text-sm font-medium text-slate-700">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`
            flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900
            placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 
            focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50
            ${error ? 'border-red-500 focus:ring-red-500' : ''}
            ${className}
          `}
                    {...props}
                />
                {error && <span className="text-xs text-red-500">{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
