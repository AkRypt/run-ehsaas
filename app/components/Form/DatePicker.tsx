interface DatePickerProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    min?: string;
    max?: string;
}

const DatePicker = ({ label, value, onChange, required, min, max }: DatePickerProps) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <input
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                required={required}
                min={min}
                max={max}
            />
        </div>
    );
};

export default DatePicker;