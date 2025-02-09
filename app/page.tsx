import { DatePickerDemo } from "@/modules/Datepicker";

export default function Home() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="h-[60vh] w-[90vw]">
        <DatePickerDemo />
      </div>
    </div>
  );
}
