import Foundation
import Vision
import AppKit

// Read-only OCR of original certificate images; one JSON record per file.
for filename in CommandLine.arguments.dropFirst() {
    let url = URL(fileURLWithPath: filename)
    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.recognitionLanguages = ["de-DE", "en-US"]
    do {
        try VNImageRequestHandler(url: url).perform([request])
        let lines = (request.results ?? []).compactMap { $0.topCandidates(1).first?.string }
        let record: [String: Any] = ["file": filename, "text": lines.joined(separator: "\n")]
        let data = try JSONSerialization.data(withJSONObject: record, options: [.sortedKeys])
        print(String(data: data, encoding: .utf8)!)
    } catch {
        let data = try! JSONSerialization.data(withJSONObject: ["file": filename, "error": String(describing: error)])
        print(String(data: data, encoding: .utf8)!)
    }
}
