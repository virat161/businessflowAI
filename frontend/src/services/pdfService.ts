import axios from 'axios';

// Interfaces for strict typing
export interface PDFSummaryResponse {
    summary: string;
    key_points: string[];
    action_items: string[];
}

// Adjust the base URL to match your existing Axios configuration/environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const summarizePDF = async (file: File): Promise<PDFSummaryResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post<PDFSummaryResponse>(
            `${API_BASE_URL}/pdf/summarize`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.detail || 'Failed to summarize PDF.');
        }
        throw new Error('An unexpected error occurred while communicating with the server.');
    }
};