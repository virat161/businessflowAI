import React, { useState } from 'react';
import { PDFUploader } from '../components/PDFUploader';
import { summarizePDF,type PDFSummaryResponse } from '../services/pdfService';

export const PDFSummarizer: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [summaryData, setSummaryData] = useState<PDFSummaryResponse | null>(null);

    const handleFileSelect = (selectedFile: File) => {
        setFile(selectedFile);
        setError(null);
        setSummaryData(null);
    };

    const handleSummarize = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);
        
        try {
            const data = await summarizePDF(file);
            setSummaryData(data);
        } catch (err: any) {
            setError(err.message || 'An error occurred during summarization.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">AI PDF Summarizer</h1>
                    <p className="mt-2 text-gray-600">Upload any document to instantly extract key insights and action items.</p>
                </div>

                <PDFUploader onFileSelect={handleFileSelect} isLoading={loading} />

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {file && !summaryData && (
                    <div className="flex justify-center">
                        <button
                            onClick={handleSummarize}
                            disabled={loading}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Analyzing Document...
                                </>
                            ) : (
                                'Generate Summary'
                            )}
                        </button>
                    </div>
                )}

                {summaryData && (
                    <div className="bg-white shadow rounded-lg overflow-hidden mt-8 animate-fade-in-up">
                        <div className="px-4 py-5 sm:p-6 space-y-6">
                            
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900 border-b pb-2 mb-3">Executive Summary</h3>
                                <p className="text-gray-700 whitespace-pre-line">{summaryData.summary}</p>
                            </div>

                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900 border-b pb-2 mb-3">Key Points</h3>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                    {summaryData.key_points.map((point, index) => (
                                        <li key={index}>{point}</li>
                                    ))}
                                </ul>
                            </div>

                            {summaryData.action_items && summaryData.action_items.length > 0 && (
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 border-b pb-2 mb-3">Action Items</h3>
                                    <ul className="space-y-3">
                                        {summaryData.action_items.map((item, index) => (
                                            <li key={index} className="flex items-start">
                                                <svg className="h-6 w-6 text-green-500 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-gray-700 mt-0.5">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};