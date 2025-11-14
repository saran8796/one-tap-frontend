import React from "react";

const DocumentsTab = ({ uploadedDocuments }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium">
          Upload New Document
        </button>
      </div>

      <div className="grid gap-6">
        {uploadedDocuments.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-blue-600 text-xl">📄</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {doc.type} • {doc.size}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Uploaded on {doc.uploadDate}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    doc.status === "verified"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {doc.status === "verified" ? "Verified" : "Pending"}
                </span>
                <div className="flex space-x-2 mt-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">
                    Download
                  </button>
                  <button className="text-red-600 hover:text-red-700 text-sm">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsTab;
