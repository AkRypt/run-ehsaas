interface FormTextAreaProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    rows?: number;
}

const FormTextArea = ({
    label,
    value,
    onChange,
    placeholder,
    required,
    rows = 3
}: FormTextAreaProps) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                rows={rows}
                required={required}
            />
        </div>
    );
};

export default FormTextArea;