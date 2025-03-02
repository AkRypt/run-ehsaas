import { ReactNode } from "react";

interface FormInputProps {
    label: string;
    type?: 'text' | 'url' | 'number' | 'date';
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    min?: string;
    max?: string;
    helpText?: string | ReactNode | null;
    maxLength?: number;
}

const FormInput = ({ 
    label, 
    type = 'text', 
    value, 
    onChange, 
    placeholder, 
    required, 
    min, 
    max,
    helpText,
    maxLength
}: FormInputProps) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                required={required}
                min={min}
                max={max}
                maxLength={maxLength}
            />
            {helpText && (
                <p className="mt-1 text-sm text-gray-500">{helpText}</p>
            )}
        </div>
    );
};

export default FormInput;