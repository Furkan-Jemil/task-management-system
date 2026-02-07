import { useState, useRef } from 'react';
import Button from './Button';
import toast from 'react-hot-toast';

interface FileUploadProps {
    onSuccess?: (attachment: any) => void;
    taskId: string;
}

export default function FileUpload({ onSuccess, taskId }: FileUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type (images only)
        if (!file.type.startsWith('image/')) {
            toast.error('Only image files are allowed');
            setError('Only image files are allowed');
            return;
        }

        // Validate size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size must be less than 5MB');
            setError('File size must be less than 5MB');
            return;
        }

        setIsUploading(true);
        setError('');

        try {
            // Direct base64 upload to our backend
            const { uploadsApi } = await import('../../lib/api/uploads');
            const result = await uploadsApi.uploadImage(file, taskId);
            onSuccess?.(result);
            if (fileInputRef.current) fileInputRef.current.value = '';
            toast.success('Image uploaded successfully');
        } catch (err: any) {
            const message = err.response?.data?.message || 'Failed to upload image';
            setError(message);
            toast.error(message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-4">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    id="file-upload"
                />
                <label htmlFor="file-upload">
                    <Button
                        type="button"
                        variant="outline"
                        className="cursor-pointer"
                        disabled={isUploading}
                        as="span"
                    >
                        {isUploading ? 'Uploading...' : 'Attach Image'}
                    </Button>
                </label>
                <span className="text-xs text-slate-400 italic">Max 5MB (PNG, JPG)</span>
            </div>

            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
        </div>
    );
}
