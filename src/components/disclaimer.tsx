import Config from "../config";

export default function DisclaimerBanner() {
  if (Config.production()) {
    return (
      <div className="flex justify-center w-full bg-yellow-400 p-4">
        <p className="text-sm text-gray-800 text-center">
          Cursif is currently under heavy <b>developement</b>. 
          Data loss could occur. 
          Please use at your own risk. <a href="https://github.com/Code-Society-Lab/cursif" className="underline text-blue-600"><b>Read more</b></a>
        </p>
      </div>
    );
  }
  else {
    return (
      <div className="flex justify-center w-full bg-yellow-400 p-2">
        <p className="text-sm text-gray-800 text-center">
          You are currently in <b>developement!</b></p>
      </div>
    );
  }
}
