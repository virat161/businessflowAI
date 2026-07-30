import React, { useState, useRef } from 'react';
import { summarizePDF, type PDFSummaryResponse } from '../services/pdfService';

const PdfPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [summaryData, setSummaryData] = useState<PDFSummaryResponse | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selected = e.target.files[0];
            if (selected.type === 'application/pdf') {
                setFile(selected);
                setError(null);
                setSummaryData(null); // Naya file aane par purana result hata do
            } else {
                setError('Please upload a valid PDF file.');
            }
        }
    };

    const removeFile = () => {
        setFile(null);
        setSummaryData(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
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
                
                {/* Header Section */}
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900">AI PDF Summarizer</h1>
                    <p className="mt-2 text-gray-600">Upload any document to instantly extract key insights and action items.</p>
                </div>

                {/* Upload Section (Matched exactly to your main design) */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    {!file ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                            <svg className="w-12 h-12 text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Upload your PDF</h3>
                            <p className="text-gray-500 mb-6 text-sm">Supports PDF files only</p>
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Choose PDF
                            </button>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                accept="application/pdf" 
                                className="hidden" 
                            />
                        </div>
                    ) : (
                        <div className="space-y-6 animate-fade-in-up">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected File</h3>
                                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                    <div className="flex items-center space-x-3 overflow-hidden">
                                        <svg className="w-6 h-6 text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700 font-medium truncate">{file.name}</span>
                                    </div>
                                    <button 
                                        onClick={removeFile}
                                        disabled={loading}
                                        className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 shrink-0 ml-4"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                            
                            {!summaryData && (
                                <button
                                    onClick={handleSummarize}
                                    disabled={loading}
                                    className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex justify-center items-center disabled:opacity-50"
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
                                        'Summarize PDF'
                                    )}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Error Box */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {/* AI Summary Results */}
                {summaryData && (
                    <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden animate-fade-in-up mt-8">
                        <div className="px-6 py-8 space-y-8">
                            
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3 mb-4">Executive Summary</h3>
                                <p className="text-gray-700 whitespace-pre-line leading-relaxed">{summaryData.summary}</p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3 mb-4">Key Points</h3>
                                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                    {summaryData.key_points.map((point, index) => (
                                        <li key={index} className="leading-relaxed">{point}</li>
                                    ))}
                                </ul>
                            </div>

                            {summaryData.action_items && summaryData.action_items.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-3 mb-4">Action Items</h3>
                                    <ul className="space-y-4">
                                        {summaryData.action_items.map((item, index) => (
                                            <li key={index} className="flex items-start bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                <svg className="h-6 w-6 text-green-500 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-gray-700 mt-0.5 leading-relaxed">{item}</span>
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

export default PdfPage;