import { PatientDetailsInfo } from "../../types/types";

interface PatientDetailsProps {
  patientDetails: PatientDetailsInfo;
}

export default function PatientDetails({ patientDetails }: PatientDetailsProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 text-sm">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Data Pasien</h1>
      
      {/* Personal Information */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Informasi Pribadi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><strong>Nama:</strong> {patientDetails.name}</div>
          <div><strong>Kartu Identitas:</strong> {patientDetails.idCardNumber}</div>
          <div><strong>Jenis Kelamin:</strong> {patientDetails.gender==="male" ? "Laki-laki" : "Perempuan"}</div>
          <div><strong>Tanggal Lahir:</strong> {patientDetails.birthDate}</div>
          <div><strong>Umur:</strong> {patientDetails.age}</div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Informasi Kontak</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <strong>Nomor Telepon:</strong> {patientDetails.phoneNumber}
          </div>
          <div>
            <strong>Alamat:</strong> {patientDetails.address.street}, {patientDetails.address.city}, {patientDetails.address.state}, {patientDetails.address.zipCode}, {patientDetails.address.country}
          </div>
        </div>
      </div>

      {/* Medical Information */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Informasi Medis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><strong>Tinggi Badan:</strong> {patientDetails.height} cm</div>
          <div><strong>Berat Badan:</strong> {patientDetails.weight} kg</div>
          <div><strong>Golongan Darah:</strong> {patientDetails.bloodType}</div>
        </div>
      </div>

      {/* Handicap Information (optional) */}
      {patientDetails.handicapped && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Kecacatan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><strong>Kecacatan:</strong> {patientDetails.handicapped ? 'Ya' : 'Tidak'}</div>
            <div><strong>Jenis Kecacatan:</strong> {patientDetails.handicappedType}</div>
            <div className="md:col-span-2">
              <strong>Keterangan:</strong> {patientDetails.handicappedDescription}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
