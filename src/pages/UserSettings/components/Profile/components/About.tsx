import useEditUserField from "../../../../../hooks/useEditUserField";


export default function About({ inEditMode }: { inEditMode: boolean }) {
  const {
        value: aboutText,
        setValue: setAboutText, 
        userQuery: { isLoading, isError },
    } = useEditUserField('profile', 'about', inEditMode);

  if (isLoading)
    return (
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-semibold">About me</h2>
        <div 
            className={`
                ${inEditMode ? 'outline-2 outline-sakura border-none' : ''}
                flex flex-col gap-3 h-[150px] overflow-auto px-4 py-3 border-1 border-neutral-400 dark:border-neutral-600 rounded-xl`}
            >
            {[...Array(3)].map((_, i) => (
              <div key={i} className="loading rounded-md h-3 w-full"></div>
            ))}
        </div>
      </div>
    );

  if (isError)
    return (
      <span className="text-neutral-300 dark:text-neutral-500 font-semibold px-4 py-3 border-1 border-neutral-400 dark:border-neutral-600 rounded-xl">
        Couldn't load your about content.
      </span>
    );

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold">About me</h2>
      <textarea
        value={aboutText ?? ''}
        onChange={(e) => setAboutText(e.target.value)}
        disabled={!inEditMode}
        className={`${
          inEditMode ? 'outline-2 outline-sakura border-none' : ''
        } resize-none h-[150px] overflow-auto px-4 py-3 border-1 border-neutral-400 dark:border-neutral-600 rounded-xl`}
      />
    </div>
  );
}
