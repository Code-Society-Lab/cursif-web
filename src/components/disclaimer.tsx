export default function DisclaimerBanner() {
  return (
    <div className="fixed top-0 w-full bg-yellow-400 p-0 text-center">
      <p className="text-sm text-gray-800">
        <a href="/disclaimer" className="underline text-blue-600"><b>Disclaimer</b></a>:
        We are still in the development phase. Data loss could occur. Please use at your own risk.
      </p>
    </div>
  );
}
