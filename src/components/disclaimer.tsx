export default function DisclaimerBanner() {
  return (
    <div className="flex justify-center w-full bg-yellow-400 p-4">
      <p className="text-sm text-gray-800 text-center">
        <b>Disclaimer</b>: We are still in the development phase.
        Data loss could occur.
        Please use at your own risk. <a href="https://github.com/Code-Society-Lab/cursif" className="underline text-blue-600"><b>Read more</b></a>
      </p>
    </div>
  );
}
