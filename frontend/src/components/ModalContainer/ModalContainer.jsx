const ModalContainer = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999]">
      {children}
    </div>
  );
};

export default ModalContainer;