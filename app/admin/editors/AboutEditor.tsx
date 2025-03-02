import FormInput from "@/app/components/Form/FormInput";
import FormTextArea from "@/app/components/Form/FormTextArea";
import { db } from "@/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const AboutEditor = () => {
    const [aboutContent, setAboutContent] = useState<any>({
        title: "",
        subtitle: "",
        description1: "",
        description2: "",
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState("");

    useEffect(() => {
        const fetchContent = async () => {
            const docRef = doc(db, "content", "about");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setAboutContent(docSnap.data());
            }
        };

        fetchContent();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        setSaveStatus("");

        try {
            const docRef = doc(db, "content", "about");
            await updateDoc(docRef, aboutContent);
            setSaveStatus("Content saved successfully!");
        } catch (error) {
            console.log(error);
            setSaveStatus("Error saving content. Please try again.");
        }

        setIsSaving(false);
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">Edit About Section</h1>



            <div className="space-y-6">
                <FormInput
                    label="Title"
                    value={aboutContent?.title}
                    onChange={(e) => setAboutContent({ ...aboutContent, title: e })}
                    placeholder="Highlight title"
                    required
                />

                <FormInput
                    label="Subtitle"
                    value={aboutContent?.subtitle}
                    onChange={(e) => setAboutContent({ ...aboutContent, subtitle: e })}
                    placeholder="Highlight subtitle"
                    required
                />

                <FormTextArea
                    label="Main Description"
                    value={aboutContent?.description1}
                    onChange={(e) => setAboutContent({ ...aboutContent, description1: e })}
                    placeholder="Main description"
                    required
                />

                <FormTextArea
                    label="Secondary Description"
                    value={aboutContent?.description2}
                    onChange={(e) => setAboutContent({ ...aboutContent, description2: e })}
                    placeholder="Secondary description"
                    required
                />

                {saveStatus && (
                    <div className={`p-4 rounded ${saveStatus.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                        }`}>
                        {saveStatus}
                    </div>
                )}

                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 disabled:opacity-50"
                >
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    )
}

export default AboutEditor;