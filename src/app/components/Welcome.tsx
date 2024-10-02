import { IoFingerPrint } from "react-icons/io5"; // You can use Heroicons or any other icon library.

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center  pb-10">
      <div className="p-8 text-center w-full max-w-md">
        {/* Welcome Title */}
        <h1 className="text-4xl font-bold mb-4">Selamat Datang!</h1>
        <p className="text-lg mb-6">
          Kami senang bisa melayani Anda. Untuk melanjutkan, silakan pindai sidik jari Anda.
        </p>

        {/* Fingerprint Icon and Call to Action */}
        <div className="flex flex-col items-center justify-center">
          {/* Icon or Fingerprint Image */}
          <IoFingerPrint className="h-20 w-20 text-blue-500 mb-6" />
          
          {/* Instruction Text */}
          <p className="text-lg font-medium mb-4">Pindai sidik jari Anda untuk melanjutkan</p>

          {/* Scan Button (Simulating a fingerprint scan) */}
          <button
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => alert('Fingerprint scan initiated')}
          >
            Pindai Sidik Jari
          </button>
        </div>
      </div>
    </div>
  );
}
