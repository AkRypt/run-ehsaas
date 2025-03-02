import FormInput from "./FormInput";

interface MediaUrlInputProps {
    type: 'youtube' | 'image';
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
}

const MediaUrlInput = ({ type, value, onChange, required }: MediaUrlInputProps) => {
    const getHelpText = () => {
        if (type === 'youtube') {
            return "Supports YouTube URLs (e.g., youtube.com/watch?v=... or youtu.be/...)";
        }
        if (type === 'image') {
            return "Supports any image URL, including Google Drive sharing links";
        }
        return null;
    };

    const getLabel = () => {
        switch (type) {
            case 'youtube':
                return 'YouTube Video URL';
            case 'image':
                return 'Image URL';
            default:
                return 'URL';
        }
    };

    return (
        <FormInput
            label={getLabel()}
            type="url"
            value={value}
            onChange={onChange}
            placeholder={`Paste ${getLabel().toLowerCase()} here`}
            required={required}
            helpText={getHelpText()}
        />
    );
};

export default MediaUrlInput;