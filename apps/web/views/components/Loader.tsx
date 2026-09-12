const Loader = ({ message = 'Loading…' }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-64">
      <div className="w-12 h-12 border-4 border-secondary-light dark:border-secondary-dark border-t-transparent rounded-full animate-spin" />
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default Loader;
