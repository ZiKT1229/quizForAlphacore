export default function Modal({ children }) {
  return (
    <dialog className="w-full h-lvh flex justify-center items-center" open>
      {children}
    </dialog>
  );
}
