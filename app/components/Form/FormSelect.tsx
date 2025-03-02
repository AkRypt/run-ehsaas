interface FormSelectOption {
    value: string;
    label: string;
}

interface FormSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: FormSelectOption[];
    required?: boolean;
}

const FormSelect = ({ label, value, onChange, options, required }: FormSelectProps) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                required={required}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FormSelect;