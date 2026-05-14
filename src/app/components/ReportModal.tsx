import { X } from "lucide-react";

interface ReportModalProps {
  onClose: () => void;
  type: "post" | "user" | "message";
}

export function ReportModal({ onClose, type }: ReportModalProps) {
  const reasons = [
    "Spam",
    "Harassment or bullying",
    "Hate speech or symbols",
    "Violence or dangerous organizations",
    "Nudity or sexual activity",
    "False information",
    "Scam or fraud",
    "Intellectual property violation",
    "Sale of illegal or regulated goods",
    "Something else",
  ];

  const handleReport = (reason: string) => {
    console.log(`Reporting ${type}:`, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="w-full max-w-[480px] bg-white rounded-t-3xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="font-bold text-lg">Report {type}</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Reasons */}
        <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-4">
              Why are you reporting this {type}?
            </p>
            <div className="space-y-1">
              {reasons.map((reason) => (
                <button
                  key={reason}
                  onClick={() => handleReport(reason)}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-gray-900">{reason}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
