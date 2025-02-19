import { LoaderCircle } from "lucide-react";

const Loading = () => {
    return (
        <div className="flex justify-center items-center w-full h-full">
            <LoaderCircle color="#2563eb" className="w-12 h-12 animate-spin text-gray-500" />
        </div>
    );
};

export default Loading;
