import { useState } from "react";
import { motion } from "framer-motion";
import { PatientDetailsInfo } from "../../types/types";

interface PatientDetailsProps {
  patientDetails: PatientDetailsInfo;
}

// Accordion Section Component
const AccordionSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <div
        className="cursor-pointer bg-blue-100 p-4 rounded-md text-md font-semibold flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span>{isOpen ? "-" : "+"}</span>
      </div>

      {/* Animated Accordion Body */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="p-4 bg-gray-50">{children}</div>
      </motion.div>
    </div>
  );
};

export default function PatientDetails({ patientDetails }: PatientDetailsProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 text-sm">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Data Pasien</h1>

      {/* Personal Information Accordion */}
      <AccordionSection title="Informasi Pribadi">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><strong>Nama:</strong> {patientDetails.name}</div>
          <div><strong>Kartu Identitas:</strong> {patientDetails.idCardNumber}</div>
          <div><strong>Jenis Kelamin:</strong> {patientDetails.gender === "Male" ? "Laki-laki" : "Perempuan"}</div>
          <div><strong>Tanggal Lahir:</strong> {patientDetails.birthDate}</div>
          <div><strong>Umur:</strong> {patientDetails.age}</div>
        </div>
      </AccordionSection>

      {/* Contact Information Accordion */}
      <AccordionSection title="Informasi Kontak">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><strong>Nomor Telepon:</strong> {patientDetails.phoneNumber}</div>
          <div>
            <strong>Alamat:</strong> {patientDetails.address.street}, {patientDetails.address.city}, {patientDetails.address.state}, {patientDetails.address.zipCode}, {patientDetails.address.country}
          </div>
        </div>
      </AccordionSection>

      {/* Medical Information Accordion */}
      <AccordionSection title="Informasi Medis">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div><strong>Tinggi Badan:</strong> {patientDetails.height} cm</div>
          <div><strong>Berat Badan:</strong> {patientDetails.weight} kg</div>
          <div><strong>Golongan Darah:</strong> {patientDetails.bloodType}</div>
        </div>
      </AccordionSection>

      {/* Handicap Information Accordion */}
      {patientDetails.handicapped && (
        <AccordionSection title="Kecacatan">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><strong>Kecacatan:</strong> {patientDetails.handicapped ? "Ya" : "Tidak"}</div>
            <div><strong>Jenis Kecacatan:</strong> {patientDetails.handicappedType}</div>
            <div className="md:col-span-2"><strong>Keterangan:</strong> {patientDetails.handicappedDescription}</div>
          </div>
        </AccordionSection>
      )}
    </div>
  );
}
